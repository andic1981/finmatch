import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import worker from '../src/worker.js';
import { normalizeSource, validateUrl, publicAddress, testSourceUrl, listSources } from '../src/source-management.js';
import { ADMIN_SOURCES_JS } from '../src/admin/sources-ui.js';

function setup() {
  const sqlite = new DatabaseSync(':memory:');
  for (const name of ['0001_sources.sql', '0002_startupcafe_url.sql']) sqlite.exec(readFileSync(new URL('../migrations/' + name, import.meta.url), 'utf8'));
  const db = {
    prepare(sql) {
      let params = [];
      const statement = {
        bind(...values) { params = values; return statement; },
        async first() { return sqlite.prepare(sql).get(...params) || null; },
        async all() { return { results: sqlite.prepare(sql).all(...params) }; },
        async run() { const r = sqlite.prepare(sql).run(...params); return { meta: { changes: Number(r.changes) } }; },
      }; return statement;
    },
    async batch(statements) {
      sqlite.exec('BEGIN'); try { const result = []; for (const s of statements) result.push(await s.run()); sqlite.exec('COMMIT'); return result; }
      catch(e) { sqlite.exec('ROLLBACK'); throw e; }
    }
  };
  const values = new Map([
    ['auth:session:admin', JSON.stringify({ email: 'admin@finmatch.ro' })],
    ['auth:session:user', JSON.stringify({ email: 'user@finmatch.ro' })],
  ]);
  const env = { FINMATCH_DB: db, ADMIN_EMAILS: 'ADMIN@finmatch.ro', FINMATCH_KV: {
    get: async key => values.get(key) || null, put: async (key, value) => values.set(key,value), delete: async key => values.delete(key)
  }};
  const pending = [];
  const call = async (path, method = 'GET', body, cookie = 'admin', origin = 'https://finmatch.test') => {
    const r = await worker.fetch(new Request('https://finmatch.test' + path, { method, headers: {
      Cookie: cookie ? 'fm_session=' + cookie : '', Origin: origin, 'Content-Type':'application/json'
    }, body: body === undefined ? undefined : JSON.stringify(body) }), env, { waitUntil: p => pending.push(p) });
    return { status: r.status, data: await r.json() };
  };
  return { sqlite, env, call, values, pending };
}
const source = { name: 'Test source', url: 'https://funding.ro/calls', type:'regional', tier:2, proxy:'auto', enabled:true };

test('migration seeds sources and records the StartupCafe URL change', async () => {
  const { env, sqlite } = setup();
  const sources = await listSources(env);
  assert.equal(sources.length,10);
  assert.equal(sources.find(s=>s.id==='startupcafe.ro').url,'https://startupcafe.ro/c/finantari');
  const history = sqlite.prepare('SELECT * FROM source_url_history').all();
  assert.equal(history.length,1);
  assert.equal(history[0].old_url,'https://www.startupcafe.ro/finantari');
  sqlite.close();
});

test('authorization and CSRF cover new and legacy mutations', async () => {
  const {call,env,sqlite} = setup();
  assert.equal((await call('/api/admin/sources','GET',undefined,null)).status,401);
  assert.equal((await call('/api/admin/sources','GET',undefined,'user')).status,403);
  assert.equal((await call('/api/admin/sources','POST',source,'admin','https://evil.test')).status,403);
  assert.equal((await call('/api/admin/sources','POST',source,'admin','')).status,403);
  for (const path of ['/api/sources/add','/api/sources/toggle','/api/sources/remove','/api/recrawl','/api/review/approve','/api/published/purge','/api/alerts/send-digests']) {
    assert.equal((await call(path,'POST',source,null)).status,401,path);
  }
  assert.equal((await call('/api/sources/add','POST',source)).status,410);
  env.ADMIN_EMAILS=''; assert.equal((await call('/api/admin/sources')).status,403);
  sqlite.close();
});

test('CRUD, URL history, conflicts, deletion and crawl registry use real SQL', async () => {
  const {call,sqlite,env} = setup();
  let r = await call('/api/admin/sources','POST',source); assert.equal(r.status,201); const id=r.data.source.id;
  assert.equal((await call('/api/admin/sources','POST',source)).status,409);
  const edited={...source,url:'https://funding.ro/new-calls',revision:1};
  r=await call('/api/admin/sources/'+id,'PUT',edited); assert.equal(r.status,200); assert.equal(r.data.source.revision,2);
  assert.equal((await call('/api/admin/sources/'+id,'PUT',edited)).status,409);
  const history=await call('/api/admin/sources/'+id+'/history'); assert.equal(history.data.history[0].changed_by,'admin@finmatch.ro');
  assert.equal(history.data.history[0].new_url,edited.url);
  await call('/api/admin/sources/'+id,'PUT',{...edited,revision:2,enabled:false});
  assert.equal((await listSources(env,false)).some(s=>s.id===id),false);
  r=await call('/api/sources'); assert.equal(r.data.registry.find(s=>s.host==='funding.ro').url,edited.url);
  assert.equal((await call('/api/admin/sources/'+id+'/scan','POST')).status,409);
  assert.equal((await call('/api/admin/sources/'+id+'?revision=2','DELETE')).status,409);
  assert.equal((await call('/api/admin/sources/'+id+'?revision=3','DELETE')).status,200);
  assert.equal((await call('/api/admin/sources/'+id)).status,404);
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM source_url_history WHERE source_id=?').get(id).n,1);
  sqlite.close();
});

test('legacy import is explicit, preserves edits and does not resurrect deleted sources', async () => {
  const {call,values,sqlite} = setup();
  values.set('sources:custom',JSON.stringify([{...source,host:'funding.ro'}]));
  values.set('sources:disabled',JSON.stringify(['adrvest.ro','startupcafe.ro']));
  assert.equal((await call('/api/admin/sources/import-legacy','POST')).status,200);
  assert.equal(sqlite.prepare("SELECT enabled FROM financing_sources WHERE host='adrvest.ro'").get().enabled,0);
  assert.equal(sqlite.prepare("SELECT enabled FROM financing_sources WHERE host='startupcafe.ro'").get().enabled,0);
  const row=sqlite.prepare("SELECT * FROM financing_sources WHERE host='funding.ro'").get();
  await call('/api/admin/sources/'+row.id+'?revision=1','DELETE');
  assert.equal((await call('/api/admin/sources/import-legacy','POST')).data.alreadyImported,true);
  assert.equal(sqlite.prepare("SELECT * FROM financing_sources WHERE host='funding.ro'").get(),undefined);
  sqlite.close();
});

test('URL and record validation reject unsafe inputs', () => {
  assert.throws(()=>normalizeSource(null));
  for (const u of ['http://funding.ro','https://localhost','https://127.0.0.1','https://[::1]','https://user:pass@funding.ro','https://funding.ro:444','https://service.internal','file:///etc/passwd']) assert.throws(()=>validateUrl(u),u);
  for (const ip of ['127.0.0.1','10.1.2.3','192.168.1.1','169.254.169.254','172.16.0.1','100.64.0.1','::1','fe80::1','fc00::1','2001:db8::1']) assert.equal(publicAddress(ip),false,ip);
  assert.throws(()=>normalizeSource({...source,tier:4}));
  assert.throws(()=>normalizeSource({...source,name:''}));
  assert.equal(normalizeSource({...source,name:'<script>alert(1)</script>'}).name,'<script>alert(1)</script>');
});

test('URL test stores metadata; scheduled crawls use saved enabled D1 URLs', async () => {
  const {call,sqlite,env,pending} = setup();
  const originalFetch = globalThis.fetch;
  let crawled = [];
  globalThis.fetch = async (url, options) => {
    if (url.includes('dns-query')) return Response.json({Status:0,Answer:[{type:1,data:'93.184.216.34'}]});
    if (url === 'https://api.firecrawl.dev/v2/scrape') {
      crawled.push(JSON.parse(options.body).url);
      return Response.json({data:{markdown:'A short page with no opportunities.',metadata:{statusCode:200}}});
    }
    return new Response('ok');
  };
  try {
    const checked = await call('/api/admin/sources/startupcafe.ro/test','POST');
    assert.equal(checked.status,200);
    assert.equal(checked.data.result.statusCode,200);
    assert.equal(sqlite.prepare("SELECT status,last_http_status FROM financing_sources WHERE id='startupcafe.ro'").get().last_http_status,200);
    sqlite.exec('UPDATE financing_sources SET enabled=0');
    await call('/api/admin/sources/startupcafe.ro','PUT',{
      name:'StartupCafe',url:'https://startupcafe.ro/c/updated',type:'editorial',tier:3,proxy:'auto',enabled:true,revision:2
    });
    env.FIRECRAWL_API_KEY='test-only-key';
    assert.equal((await call('/api/admin/sources/startupcafe.ro/scan','POST')).status,202);
    await Promise.all(pending);
    assert.deepEqual(crawled,['https://startupcafe.ro/c/updated']);
    assert.ok(sqlite.prepare("SELECT last_successful_scan FROM financing_sources WHERE id='startupcafe.ro'").get().last_successful_scan);
    crawled=[];
    const scheduled=[];
    await worker.scheduled({},env,{waitUntil:p=>scheduled.push(p)});
    await Promise.all(scheduled);
    assert.deepEqual(crawled,['https://startupcafe.ro/c/updated']);
  } finally { globalThis.fetch=originalFetch; sqlite.close(); }
});

test('URL testing handles HTTP errors and rejects private DNS and unsafe redirects', async () => {
  const dns = () => Response.json({Status:0,Answer:[{type:1,data:'93.184.216.34'}]});
  const r=await testSourceUrl(source.url,async url=>url.includes('dns-query')?dns():new Response('no',{status:403}));
  assert.equal(r.statusCode,403); assert.equal(r.status,'err');
  let targets=0;
  const privateResult=await testSourceUrl(source.url,async url=>{
    if(url.includes('dns-query')) return Response.json({Status:0,Answer:[{type:1,data:'127.0.0.1'}]});
    targets++; return new Response('bad');
  }); assert.equal(privateResult.status,'err'); assert.equal(targets,0);
  const redirect=await testSourceUrl(source.url,async url=>url.includes('dns-query')?dns():new Response(null,{status:302,headers:{Location:'https://127.0.0.1/private'}}));
  assert.equal(redirect.status,'err');
  let calls=0;
  const ok=await testSourceUrl(source.url,async url=>{
    if(url.includes('dns-query')) return dns();
    calls++;return calls===1?new Response(null,{status:301,headers:{Location:'/new'}}):new Response('ok');
  }); assert.equal(ok.status,'ok'); assert.equal(ok.finalUrl,'https://funding.ro/new');
  const timeout=await testSourceUrl(source.url,async()=>{throw new Error('network timeout');});assert.equal(timeout.status,'err');
});

test('UI script and embedded application scripts parse', async () => {
  new Script(ADMIN_SOURCES_JS);
  const html=await (await worker.fetch(new Request('https://finmatch.test/'),{},{})).text();
  assert.match(html,/admin-sources\.js/);
  for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) if(match[1].trim()) new Script(match[1]);
});
