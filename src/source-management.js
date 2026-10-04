export const sourceJson = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

export function validateUrl(value) {
  if (typeof value !== 'string' || value.length > 2048) throw new Error('URL invalid.');
  let url;
  try { url = new URL(value); } catch { throw new Error('Introduceți un URL HTTPS complet.'); }
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443') ||
      !host.includes('.') || /[\[\]:]/.test(host) || /^[\d.]+$/.test(host) ||
      /(^|\.)(localhost|local|internal|test|invalid|example)$/.test(host)) {
    throw new Error('URL-ul trebuie să folosească HTTPS și un domeniu public, fără credențiale sau porturi speciale.');
  }
  url.hash = '';
  return url;
}

export function normalizeSource(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new SyntaxError('JSON invalid.');
  const url = validateUrl(body.url);
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name || name.length > 120) throw new Error('Numele este obligatoriu (maximum 120 caractere).');
  if (![1, 2, 3].includes(body.tier)) throw new Error('Tier invalid.');
  if (!['official', 'regional', 'editorial'].includes(body.type)) throw new Error('Tip invalid.');
  if (!['auto', 'basic', 'stealth', 'enhanced'].includes(body.proxy)) throw new Error('Proxy invalid.');
  if (typeof body.enabled !== 'boolean') throw new Error('Enabled trebuie să fie boolean.');
  return { name, url: url.href, host: url.hostname.replace(/^www\./, ''), tier: body.tier,
    type: body.type, proxy: body.proxy, enabled: body.enabled ? 1 : 0 };
}

export function publicAddress(ip) {
  if (ip.includes(':')) return /^[23][0-9a-f]{3}:/i.test(ip) && !/^2001:(db8|0):/i.test(ip);
  const p = ip.split('.').map(Number);
  return p.length === 4 && p.every(n => Number.isInteger(n) && n >= 0 && n <= 255) &&
    ![0, 10, 127].includes(p[0]) && p[0] < 224 &&
    !(p[0] === 169 && p[1] === 254) && !(p[0] === 172 && p[1] >= 16 && p[1] <= 31) &&
    !(p[0] === 192 && (p[1] === 168 || p[1] === 0)) &&
    !(p[0] === 100 && p[1] >= 64 && p[1] <= 127) && !(p[0] === 198 && [18, 19].includes(p[1]));
}

// Validate DNS before each manually followed redirect; never fetch an IP literal.
export async function testSourceUrl(value, fetcher = fetch) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  let url = validateUrl(value);
  try {
    for (let hop = 0; hop <= 5; hop++) {
      const records = await Promise.all(['A', 'AAAA'].map(async type => {
        const r = await fetcher('https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(url.hostname) + '&type=' + type,
          { headers: { Accept: 'application/dns-json' }, signal: controller.signal });
        if (!r.ok) throw new Error('Verificarea DNS a eșuat.');
        const j = await r.json();
        if (![0, 3].includes(j.Status)) throw new Error('Verificarea DNS a eșuat.');
        return (j.Answer || []).filter(a => a.type === 1 || a.type === 28).map(a => a.data);
      }));
      const addresses = records.flat();
      if (!addresses.length || !addresses.every(publicAddress)) throw new Error('Domeniul nu se rezolvă exclusiv la adrese publice.');
      const r = await fetcher(url.href, { method: 'GET', redirect: 'manual', signal: controller.signal,
        headers: { 'User-Agent': 'FinancingMatch-SourceCheck/1.0', Range: 'bytes=0-1023' } });
      if (r.body) await r.body.cancel();
      if ([301, 302, 303, 307, 308].includes(r.status)) {
        if (hop === 5) throw new Error('Prea multe redirecționări.');
        const location = r.headers.get('Location');
        if (!location) throw new Error('Redirecționare fără Location.');
        url = validateUrl(new URL(location, url).href);
        continue;
      }
      return { status: r.ok ? 'ok' : 'err', statusCode: r.status, finalUrl: url.href,
        checkedAt: new Date().toISOString(), ms: Date.now() - started,
        error: r.ok ? null : 'HTTP ' + r.status };
    }
  } catch (e) {
    return { status: 'err', statusCode: null, finalUrl: url.href, checkedAt: new Date().toISOString(),
      ms: Date.now() - started, error: controller.signal.aborted ? 'Timeout (10 secunde).' : e.message };
  } finally { clearTimeout(timer); }
}

export async function requireAdmin(request, env, getSession) {
  const session = await getSession(request, env);
  if (!session) return sourceJson({ error: 'Autentificare necesară.' }, 401);
  const allowed = String(env.ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  if (!allowed.includes(session.email.toLowerCase())) return sourceJson({ error: 'Acces rezervat administratorilor.' }, 403);
  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method) && request.headers.get('Origin') !== new URL(request.url).origin) {
    return sourceJson({ error: 'Origin invalid.' }, 403);
  }
  return session;
}

export async function listSources(env, includeDisabled = true) {
  const { results } = await env.FINMATCH_DB.prepare('SELECT * FROM financing_sources' +
    (includeDisabled ? '' : ' WHERE enabled = 1') + ' ORDER BY tier, name').all();
  return results.map(s => ({ ...s, enabled: !!s.enabled, builtin: !!s.builtin }));
}

export async function handleSources(request, env, ctx, session, crawlOne) {
  if (!env.FINMATCH_DB) return sourceJson({ error: 'Configurați FINMATCH_DB și aplicați migrările D1.' }, 503);
  const url = new URL(request.url);
  const parts = url.pathname.slice('/api/admin/sources'.length).split('/').filter(Boolean);
  const id = parts[0] || null;
  const action = parts[1];
  const db = env.FINMATCH_DB;
  try {
    if (!id && request.method === 'GET') return sourceJson({ sources: await listSources(env) });
    if (id === 'import-legacy' && request.method === 'POST') {
      // Explicit, one-time import. Existing D1 edits always win.
      const done = await db.prepare("SELECT value FROM source_settings WHERE key = 'legacy_imported'").first();
      if (done) return sourceJson({ ok: true, alreadyImported: true });
      const custom = JSON.parse(await env.FINMATCH_KV?.get('sources:custom') || '[]');
      const disabled = JSON.parse(await env.FINMATCH_KV?.get('sources:disabled') || '[]');
      const statements = [];
      for (const s of custom) {
        const v = normalizeSource({ ...s, name: s.name || s.host, enabled: s.enabled !== false,
          type: s.tier === 1 ? 'official' : s.tier === 3 ? 'editorial' : 'regional', proxy: s.proxy || 'auto' });
        statements.push(db.prepare('INSERT OR IGNORE INTO financing_sources (id,host,name,url,type,tier,proxy,enabled,changed_by) VALUES (?,?,?,?,?,?,?,?,?)')
          .bind(crypto.randomUUID(), v.host, v.name, v.url, v.type, v.tier, v.proxy, v.enabled, session.email));
      }
      for (const host of disabled) statements.push(db.prepare("UPDATE financing_sources SET enabled=0,changed_by=?,revision=revision+1,updated_at=CURRENT_TIMESTAMP WHERE host=? AND changed_by IN ('migration','migration:startupcafe')").bind(session.email, host));
      statements.push(db.prepare("INSERT OR IGNORE INTO source_settings (key,value) VALUES ('legacy_imported','1')"));
      await db.batch(statements);
      return sourceJson({ ok: true, imported: custom.length });
    }
    if (!id && request.method === 'POST') {
      const v = normalizeSource(await request.json());
      const newId = crypto.randomUUID();
      await db.prepare('INSERT INTO financing_sources (id,host,name,url,type,tier,proxy,enabled,changed_by) VALUES (?,?,?,?,?,?,?,?,?)')
        .bind(newId, v.host, v.name, v.url, v.type, v.tier, v.proxy, v.enabled, session.email).run();
      return sourceJson({ source: await db.prepare('SELECT * FROM financing_sources WHERE id=?').bind(newId).first() }, 201);
    }
    if (!id || parts.length > 2) return sourceJson({ error: 'Rută necunoscută.' }, 404);
    const source = await db.prepare('SELECT * FROM financing_sources WHERE id=?').bind(id).first();
    if (!source) return sourceJson({ error: 'Sursă necunoscută.' }, 404);
    if (action === 'history' && request.method === 'GET') {
      const { results } = await db.prepare('SELECT * FROM source_url_history WHERE source_id=? ORDER BY id DESC LIMIT 100').bind(id).all();
      return sourceJson({ history: results });
    }
    if (action === 'test' && request.method === 'POST') {
      const result = await testSourceUrl(source.url);
      await db.prepare('UPDATE financing_sources SET status=?,last_checked=?,last_http_status=?,last_error=?,final_url=? WHERE id=? AND revision=?')
        .bind(result.status, result.checkedAt, result.statusCode, result.error, result.finalUrl, id, source.revision).run();
      return sourceJson({ result });
    }
    if (action === 'scan' && request.method === 'POST') {
      if (!source.enabled) return sourceJson({ error: 'Activați sursa înainte de scanare.' }, 409);
      if (!env.FIRECRAWL_API_KEY) return sourceJson({ error: 'FIRECRAWL_API_KEY nesetat.' }, 503);
      ctx.waitUntil(crawlOne(source, env));
      return sourceJson({ ok: true, message: 'Scanare pornită.' }, 202);
    }
    if (!action && request.method === 'GET') return sourceJson({ source });
    if (!action && request.method === 'PUT') {
      const b = await request.json();
      const v = normalizeSource(b);
      if (!Number.isInteger(b.revision)) return sourceJson({ error: 'Revision obligatoriu.' }, 400);
      const result = await db.prepare('UPDATE financing_sources SET host=?,name=?,url=?,type=?,tier=?,proxy=?,enabled=?,changed_by=?,revision=revision+1,updated_at=CURRENT_TIMESTAMP,status=CASE WHEN url<>? THEN \'untested\' ELSE status END,last_checked=CASE WHEN url<>? THEN NULL ELSE last_checked END,last_error=NULL,final_url=NULL,last_http_status=NULL,last_scan=CASE WHEN url<>? THEN NULL ELSE last_scan END,last_successful_scan=CASE WHEN url<>? THEN NULL ELSE last_successful_scan END WHERE id=? AND revision=?')
        .bind(v.host, v.name, v.url, v.type, v.tier, v.proxy, v.enabled, session.email, v.url, v.url, v.url, v.url, id, b.revision).run();
      if (!result.meta.changes) return sourceJson({ error: 'Sursa a fost modificată. Reîncărcați lista.' }, 409);
      return sourceJson({ source: await db.prepare('SELECT * FROM financing_sources WHERE id=?').bind(id).first() });
    }
    if (!action && request.method === 'DELETE') {
      const revision = Number(url.searchParams.get('revision'));
      if (!Number.isInteger(revision) || revision < 1) return sourceJson({ error: 'Revision obligatoriu.' }, 400);
      const result = await db.prepare('DELETE FROM financing_sources WHERE id=? AND revision=?').bind(id, revision).run();
      return result.meta.changes ? sourceJson({ ok: true }) : sourceJson({ error: 'Sursa a fost modificată. Reîncărcați lista.' }, 409);
    }
    return sourceJson({ error: 'Metodă sau acțiune neacceptată.' }, 405);
  } catch (e) {
    if (/UNIQUE constraint/i.test(e.message)) return sourceJson({ error: 'Există deja o sursă pentru acest domeniu.' }, 409);
    if (e instanceof SyntaxError || /URL|Numele|Tier|Tip invalid|Proxy invalid|Enabled/.test(e.message)) return sourceJson({ error: e.message }, 400);
    console.error('Source management:', e);
    return sourceJson({ error: 'Operația D1 a eșuat. Verificați migrările și jurnalele Worker.' }, 500);
  }
}
