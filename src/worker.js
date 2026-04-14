/**
 * FinMatch România — Cloudflare Worker
 *
 * Serves the frontend SPA and provides a lightweight API
 * for opportunities, filters, and saved searches.
 *
 * Deploy:
 *   npx wrangler deploy
 */

import { html } from './app.html.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function err(msg, status = 400) {
  return json({ error: msg }, status);
}

// ── Lightweight in-memory data (replace with D1 / KV in production) ─────────

const OPPORTUNITIES = [
  {
    id: 1, status: 'ACTIV',
    title: 'Sprijin pentru IMM-uri — Digitalizare și transformare digitală',
    source: 'oportunitati-ue.gov.ro', sourceTier: 1,
    official_url: 'https://oportunitati-ue.gov.ro',
    program: 'PNRR / Componenta 7', callCode: 'PNRR/2024/C7/I1',
    summary: 'Finanțare nerambursabilă pentru IMM-uri care doresc să implementeze soluții digitale, cloud computing și securitate cibernetică.',
    domains: ['Digitalizare'], beneficiaries: ['IMM', 'Startup'], regions: ['Național'],
    grantMin: 30000, grantMax: 500000, cofinancing: 20,
    deadline: '2025-06-30', launchDate: '2024-11-01',
  },
  {
    id: 2, status: 'ACTIV',
    title: 'Schema de granturi pentru eficiență energetică',
    source: 'mfe.gov.ro', sourceTier: 1,
    official_url: 'https://mfe.gov.ro',
    program: 'PEO 2021-2027', callCode: 'PEO/2024/EE/1.1',
    summary: 'Program pentru renovarea energetică a clădirilor — reabilitare termică, HVAC, panouri fotovoltaice.',
    domains: ['Energie'], beneficiaries: ['IMM', 'UAT'], regions: ['Național'],
    grantMin: 100000, grantMax: 2000000, cofinancing: 30,
    deadline: '2025-04-15', launchDate: '2024-09-01',
  },
  {
    id: 3, status: 'ACTIV',
    title: 'PNDR — Investiții în exploatații agricole mici și medii',
    source: 'afir.ro', sourceTier: 1,
    official_url: 'https://afir.ro',
    program: 'PNDR 2023-2027 / SM 4.1', callCode: 'AFIR/2024/4.1/C1',
    summary: 'Finanțare pentru modernizarea fermelor: utilaje, irigații, construcții, procesare produse agricole.',
    domains: ['Agricultură'], beneficiaries: ['Fermier'], regions: ['Național'],
    grantMin: 10000, grantMax: 300000, cofinancing: 50,
    deadline: '2025-07-31', launchDate: '2024-12-01',
  },
  {
    id: 4, status: 'URMEAZĂ',
    title: 'Fondul pentru inovare socială — ONG-uri și economie socială',
    source: 'fonduri-structurale.ro', sourceTier: 3,
    official_url: 'https://fonduri-structurale.ro',
    program: 'FSE+ / Incluziune socială', callCode: 'N/A',
    summary: 'Program estimat pentru sprijinirea ONG-urilor în proiecte de incluziune a grupurilor vulnerabile.',
    domains: ['Educație'], beneficiaries: ['ONG'], regions: ['Național'],
    grantMin: 50000, grantMax: 400000, cofinancing: 10,
    deadline: 'Estimat T3 2025', launchDate: 'Estimat mai 2025',
  },
  {
    id: 5, status: 'ACTIV',
    title: 'ADR Vest — Mobilitate urbană și infrastructură regională',
    source: 'adrvest.ro', sourceTier: 1,
    official_url: 'https://adrvest.ro',
    program: 'PR Vest 2021-2027', callCode: 'PRVEST/2024/MU',
    summary: 'Fonduri europene pentru transport urban, piste ciclabile, transport electric în Regiunea Vest.',
    domains: ['Infrastructură'], beneficiaries: ['UAT'], regions: ['Vest'],
    grantMin: 500000, grantMax: 15000000, cofinancing: 30,
    deadline: '2025-05-30', launchDate: '2024-10-15',
  },
];

// ── Router ────────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    // ── API routes ────────────────────────────────────────────────────────────

    // GET /api/search?q=...&status=ACTIV&domain=Energie&beneficiary=IMM&region=Vest&sort=deadline
    if (pathname === '/api/search') {
      const q = (url.searchParams.get('q') || '').toLowerCase().trim();
      const statusFilter = url.searchParams.getAll('status');
      const domainFilter = url.searchParams.getAll('domain');
      const beneficiaryFilter = url.searchParams.getAll('beneficiary');
      const regionFilter = url.searchParams.getAll('region');
      const sort = url.searchParams.get('sort') || 'relevance';

      let results = OPPORTUNITIES.filter(o => {
        if (statusFilter.length && !statusFilter.includes(o.status)) return false;
        if (domainFilter.length && !domainFilter.some(d => o.domains.includes(d))) return false;
        if (beneficiaryFilter.length && !beneficiaryFilter.some(b => o.beneficiaries.includes(b))) return false;
        if (regionFilter.length && !regionFilter.some(r => o.regions.includes(r))) return false;
        if (q) {
          const hay = [o.title, o.summary, ...o.domains, ...o.beneficiaries, ...o.regions, o.program].join(' ').toLowerCase();
          if (!q.split(' ').filter(Boolean).every(w => hay.includes(w))) return false;
        }
        return true;
      });

      if (sort === 'deadline') results.sort((a, b) => (a.deadline || 'Z').localeCompare(b.deadline || 'Z'));
      else if (sort === 'grant_desc') results.sort((a, b) => b.grantMax - a.grantMax);
      else if (sort === 'newest') results.sort((a, b) => (b.launchDate || '').localeCompare(a.launchDate || ''));
      else results.sort((a, b) => { // relevance: active first, then tier
        const s = (x) => x.status === 'ACTIV' ? 0 : x.status === 'URMEAZĂ' ? 1 : 2;
        return s(a) - s(b) || a.sourceTier - b.sourceTier;
      });

      return json({ total: results.length, results });
    }

    // GET /api/opportunities/:id
    if (pathname.startsWith('/api/opportunities/')) {
      const id = parseInt(pathname.split('/').pop());
      const opp = OPPORTUNITIES.find(o => o.id === id);
      if (!opp) return err('Not found', 404);
      return json(opp);
    }

    // GET /api/filters  — returns available filter values + counts
    if (pathname === '/api/filters') {
      const domains = [...new Set(OPPORTUNITIES.flatMap(o => o.domains))];
      const beneficiaries = [...new Set(OPPORTUNITIES.flatMap(o => o.beneficiaries))];
      const regions = [...new Set(OPPORTUNITIES.flatMap(o => o.regions))];
      const statuses = [...new Set(OPPORTUNITIES.map(o => o.status))];
      return json({ domains, beneficiaries, regions, statuses });
    }

    // GET /api/sources  — registry of all indexed sources
    if (pathname === '/api/sources') {
      return json([
        { id: 'mfe.gov.ro', name: 'MFE / MIPE', tier: 1, pages: [
          'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/',
          'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/page/2/',
          'https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/page/3/',
          'https://mfe.gov.ro/pdd/',
          'https://mfe.gov.ro/actualizare-ghidul-solicitantului-pnrr-unitati-sanitare/',
          'https://mfe.gov.ro/calendar-apeluri-de-finantare/',
        ]},
        { id: 'adrvest.ro', name: 'ADR Vest', tier: 1, pages: [
          'https://www.adrvest.ro',
          'https://adrvest.ro/programul-tranzitie-justa-ghiduri-de-finantare-active/',
          'https://adrvest.ro/programul-sanatate-ghiduri-active/',
        ]},
        { id: 'adrnordest.ro', name: 'ADR Nord-Est', tier: 1, pages: ['https://www.adrnordest.ro'] },
        { id: 'oportunitati-ue.gov.ro', name: 'Oportunități UE Gov', tier: 1, pages: ['https://oportunitati-ue.gov.ro'] },
        { id: 'afir.ro', name: 'AFIR', tier: 1, pages: ['https://afir.ro'] },
        { id: 'commission.europa.eu', name: 'Comisia Europeană', tier: 1, pages: ['https://commission.europa.eu/funding-tenders/find-funding/eu-funding-programmes_ro'] },
        { id: 'vest.ro', name: 'Vest.ro', tier: 1, pages: ['https://vest.ro'] },
        { id: 'fonduri-structurale.ro', name: 'Fonduri Structurale', tier: 3, pages: ['https://fonduri-structurale.ro'] },
        { id: 'startupcafe.ro', name: 'StartupCafe', tier: 3, pages: ['https://startupcafe.ro'] },
      ]);
    }

    if (pathname === '/api/stats') {
      const active = OPPORTUNITIES.filter(o => o.status === 'ACTIV').length;
      const upcoming = OPPORTUNITIES.filter(o => o.status === 'URMEAZĂ').length;
      const sources = [...new Set(OPPORTUNITIES.map(o => o.source))].length;
      const totalBudget = OPPORTUNITIES.reduce((s, o) => s + o.grantMax, 0);
      return json({ total: OPPORTUNITIES.length, active, upcoming, closed: OPPORTUNITIES.length - active - upcoming, sources, totalBudget });
    }

    // ── Serve SPA for all other routes ────────────────────────────────────────
    return new Response(getHTML(), {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  },
};

function getHTML() {
  // In production, inline the built HTML here or serve from R2.
  // For development, wrangler serves public/ automatically.
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=/"></head>
<body>Redirecting...</body></html>`;
}
