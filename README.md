# FinMatch România — Deploy Guide

## What's included

```
finmatch/
├── public/
│   └── index.html          ← Full SPA (frontend app)
├── src/
│   └── worker.js           ← Cloudflare Worker (API + static serving)
├── wrangler.toml           ← Cloudflare Workers config
├── package.json
└── README.md
```

---

## Quick deploy to Cloudflare Workers (free tier)

### 1. Prerequisites

```bash
# Node.js 18+ required
node --version

# Install Wrangler CLI
npm install -g wrangler

# Log in to Cloudflare (opens browser)
wrangler login
```

### 2. Install & deploy

```bash
cd finmatch
npm install

# Local dev server at http://localhost:8787
npm run dev

# Deploy to production (get a *.workers.dev URL instantly)
npm run deploy
```

That's it. You'll get a URL like:
`https://finmatch-romania.YOUR_SUBDOMAIN.workers.dev`

---

## Add a custom domain

```bash
# In Cloudflare Dashboard → Workers & Pages → finmatch-romania → Custom Domains
# Add: finmatch.ro or app.finmatch.ro
```

---

## Production upgrades (optional)

### Add KV for saved searches/alerts persistence

```bash
# Create namespace
wrangler kv namespace create saved-searches

# Copy the returned id into wrangler.toml:
# [[kv_namespaces]]
# binding = "SAVED_SEARCHES"
# id = "PASTE_ID_HERE"
```

Then in worker.js, replace the in-memory `alerts` array with:
```js
// Save
await env.SAVED_SEARCHES.put(`user:${userId}:alerts`, JSON.stringify(alerts));
// Read
const alerts = JSON.parse(await env.SAVED_SEARCHES.get(`user:${userId}:alerts`) || '[]');
```

### Add D1 (SQLite) for full database

```bash
wrangler d1 create finmatch-db

# Run migrations
wrangler d1 execute finmatch-db --file=./migrations/001_schema.sql
```

Sample schema (`migrations/001_schema.sql`):
```sql
CREATE TABLE opportunities (
  id INTEGER PRIMARY KEY,
  status TEXT NOT NULL,
  title TEXT NOT NULL,
  source TEXT,
  source_tier INTEGER,
  official_url TEXT,
  program TEXT,
  call_code TEXT,
  summary TEXT,
  domains TEXT,          -- JSON array
  beneficiaries TEXT,    -- JSON array
  regions TEXT,          -- JSON array
  grant_min INTEGER,
  grant_max INTEGER,
  cofinancing INTEGER,
  deadline TEXT,
  launch_date TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE VIRTUAL TABLE opportunities_fts USING fts5(
  title, summary, domains, beneficiaries, regions, program,
  content=opportunities, content_rowid=id
);
```

Query with D1:
```js
const { results } = await env.DB.prepare(
  `SELECT * FROM opportunities WHERE status = ? ORDER BY grant_max DESC`
).bind('ACTIV').all();
```

---

## Environment variables

Set secrets via Wrangler (never commit to wrangler.toml):
```bash
wrangler secret put SENDGRID_API_KEY    # for email alerts
wrangler secret put JWT_SECRET          # for user auth
```

---

## Architecture overview

```
Browser
  │
  ▼
Cloudflare Edge (150+ locations)
  │
  ├── /                    → Serves public/index.html (SPA)
  ├── /api/search          → Full-text search + filters
  ├── /api/opportunities/* → Single opportunity detail
  ├── /api/filters         → Available filter values
  └── /api/stats           → Dashboard counts
```

## Costs

| Tier | Requests/day | Cost |
|------|-------------|------|
| Free | 100,000 | $0 |
| Paid | Unlimited | $5/month + usage |

FinMatch at launch will comfortably run on the **free tier**.
