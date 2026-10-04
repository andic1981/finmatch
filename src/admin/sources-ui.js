export const ADMIN_SOURCES_JS = String.raw`
(function () {
  const api = '/api/admin/sources';
  const el = (tag, text) => { const n = document.createElement(tag); if (text !== undefined) n.textContent = text; if (tag === 'button') { n.className = 'btn-detail'; n.style.marginBottom = '8px'; n.style.minHeight = '36px'; } return n; };
  async function call(path, method, body) {
    const r = await fetch(api + path, { method: method || 'GET', credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json(); if (!r.ok) throw new Error(j.error || 'Operația a eșuat.'); return j;
  }
  const typeLabels = { official: 'Oficială', regional: 'Regională', editorial: 'Editorială' };
  const statusLabels = { untested: 'Netestată', ok: 'Accesibilă', err: 'Eroare' };
  window.renderManagedPublicSources = async function () {
    const root = document.getElementById('sources-grid');
    root.replaceChildren(el('p', 'Se încarcă sursele…'));
    try {
      const r = await fetch('/api/sources'); if (!r.ok) throw new Error('Nu am putut încărca sursele.');
      const j = await r.json(); const sources = (j.registry || []).filter(s => s.enabled);
      root.replaceChildren(el('p', 'Surse monitorizate: ' + sources.length));
      for (const s of sources) {
        const card = el('section'); card.className = 'source-card';
        const content = el('div'); content.style.cssText = 'min-width:0;overflow-wrap:anywhere;';
        content.append(el('strong', s.name));
        content.append(el('p', 'Tier ' + s.tier + ' · ' + (typeLabels[s.type] || 'Sursă monitorizată')));
        const link = el('a',s.url); link.href = s.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; content.append(link);
        content.append(el('p', 'Ultima scanare reușită: ' + (s.last_successful_scan || '—')));
        card.append(content); root.append(card);
      }
      if (!sources.length) root.append(el('p', 'Nu există surse active.'));
    } catch(e) { root.replaceChildren(el('p',e.message)); }
  };
  window.renderManagedSources = async function () {
    const root = document.getElementById('admin-content');
    root.replaceChildren(el('p', 'Se încarcă sursele…'));
    let j;
    try { j = await call(''); } catch (e) {
      if (typeof currentAdminTab !== 'undefined' && currentAdminTab !== 'sources') return;
      root.replaceChildren(el('p', e.message));
      if (typeof openAuth === 'function') {
        const login = el('button', 'Autentificare'); login.onclick = () => openAuth(); root.append(login);
      }
      return;
    }
    if (typeof currentAdminTab !== 'undefined' && currentAdminTab !== 'sources') return;
    root.replaceChildren();
    const message = el('p'); message.setAttribute('role', 'status'); root.append(message);
    const run = async (button, fn) => { button.disabled = true; message.textContent = ''; try { await fn(); } catch (e) { message.textContent = e.message; } finally { button.disabled = false; } };
    const add = el('button', '+ Adaugă sursă'); root.append(add);
    const imported = el('button', 'Importă sursele existente din KV'); imported.style.marginLeft = '12px'; root.append(imported);
    imported.onclick = () => run(imported, async () => { await call('/import-legacy', 'POST'); await window.renderManagedSources(); });
    const editor = el('div'); root.append(editor);
    function edit(source) {
      editor.replaceChildren();
      const form = el('form'); form.style.cssText = 'padding:20px;margin:16px 0;border:1px solid var(--border);border-radius:12px;display:grid;gap:12px;';
      form.append(el('h3', source ? 'Editează sursa' : 'Sursă nouă'));
      const controls = {};
      function field(key, label, choices, value) {
        const wrap = el('label', label + ' ');
        const input = el(choices ? 'select' : 'input'); input.name = key; input.className = 'wl-input';
        if (choices) choices.forEach(v => { const o = el('option', v[1]); o.value = v[0]; input.append(o); });
        else { input.required = true; input.maxLength = key === 'name' ? 120 : 2048; if (key === 'url') input.type = 'url'; }
        input.value = value; controls[key] = input; wrap.append(input); form.append(wrap);
      }
      field('name', 'Nume', null, source ? source.name : '');
      field('url', 'URL HTTPS', null, source ? source.url : '');
      field('type', 'Tip', [['official','Oficială'],['regional','Regională'],['editorial','Editorială']], source ? source.type : 'official');
      field('tier', 'Tier', [[1,'1 — Oficială'],[2,'2 — Regională'],[3,'3 — Editorială']], source ? source.tier : 1);
      field('proxy', 'Proxy', ['auto','basic','stealth','enhanced'].map(v => [v,v]), source ? source.proxy : 'auto');
      const enabledLabel = el('label', 'Activă '); const enabled = el('input'); enabled.type = 'checkbox'; enabled.checked = source ? !!source.enabled : true; enabledLabel.append(enabled); form.append(enabledLabel);
      const save = el('button', 'Salvează'); save.type = 'submit'; form.append(save);
      const cancel = el('button', 'Anulează'); cancel.type = 'button'; cancel.onclick = () => editor.replaceChildren(); form.append(cancel);
      const error = el('p'); error.setAttribute('role','alert'); form.append(error);
      form.onsubmit = async e => {
        e.preventDefault(); save.disabled = true; error.textContent = '';
        try {
          const body = Object.fromEntries(Object.entries(controls).map(([k,v]) => [k,v.value])); body.tier = Number(body.tier); body.enabled = enabled.checked;
          if (source) body.revision = source.revision;
          await call(source ? '/' + encodeURIComponent(source.id) : '', source ? 'PUT' : 'POST', body);
          await window.renderManagedSources();
        } catch (e) { error.textContent = e.message; } finally { save.disabled = false; }
      };
      editor.append(form); controls.name.focus();
    }
    add.onclick = () => edit(null);
    root.append(el('p', 'Salvările sunt persistente. Testarea verifică accesul HTTP; scanarea folosește Firecrawl.'));
    for (const source of j.sources) {
      const card = el('section'); card.style.cssText = 'padding:16px;margin:12px 0;border:1px solid var(--border);border-radius:12px;overflow-wrap:anywhere;';
      card.append(el('h3', source.name + (source.enabled ? '' : ' — dezactivată')));
      const link = el('a', source.url); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; card.append(link);
      card.append(el('p', 'Tip: ' + typeLabels[source.type] + ' · Tier ' + source.tier + ' · Test URL: ' + (statusLabels[source.status] || source.status)));
      card.append(el('p', 'Ultimul test: ' + (source.last_checked || '—') + ' · Ultima scanare reușită: ' + (source.last_successful_scan || '—')));
      if (source.last_error) card.append(el('p', source.last_error));
      const output = el('p'); output.setAttribute('role','status');
      function action(label, fn) { const b = el('button',label); b.style.marginRight = '8px'; b.onclick = () => run(b, fn); card.append(b); return b; }
      action('Editează', () => edit(source));
      action(source.enabled ? 'Dezactivează' : 'Activează', async () => { await call('/' + encodeURIComponent(source.id), 'PUT', { ...source, enabled: !source.enabled }); await window.renderManagedSources(); });
      action('Testează URL', async () => {
        const data = await call('/' + encodeURIComponent(source.id) + '/test', 'POST');
        await window.renderManagedSources();
        showToast(data.result.status === 'ok' ? 'URL accesibil: HTTP ' + data.result.statusCode : data.result.error);
      });
      const scan = action('Scanează', async () => { const data = await call('/' + encodeURIComponent(source.id) + '/scan', 'POST'); output.textContent = data.message; }); scan.disabled = !source.enabled;
      action('Istoric URL', async () => {
        const data = await call('/' + encodeURIComponent(source.id) + '/history');
        output.replaceChildren();
        if (!data.history.length) output.textContent = 'Nu există modificări ale URL-ului.';
        data.history.forEach(h => output.append(el('div', h.changed_at + ' · ' + h.old_url + ' → ' + h.new_url + ' · ' + h.changed_by)));
      });
      action('Șterge', async () => {
        if (!confirm('Ștergeți sursa ' + source.name + '? Scanările viitoare nu o vor mai folosi.')) return;
        await call('/' + encodeURIComponent(source.id) + '?revision=' + source.revision, 'DELETE'); await window.renderManagedSources();
      });
      card.append(output); root.append(card);
    }
    if (!j.sources.length) root.append(el('p', 'Nu există surse. Adăugați prima sursă.'));
  };
})();
`;
