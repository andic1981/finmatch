# FinancingMatch — persistent Admin Sources

The production entrypoint is `src/worker.js`. It serves the existing Romanian UI and API in one Cloudflare Worker. The separate `src/client.tsx` / `src/server.ts` files are an unused Worker playground starter; this change integrates into the actual Admin page rather than replacing it with that starter.

## Setup and deployment

Requires Node.js 22.13+ for the SQLite-backed tests, npm, and access to the Cloudflare account hosting the existing `FINMATCH_KV` namespace.

```bash
npm ci
npx wrangler login
```

The `FINMATCH_DB` binding is configured in both Wrangler files with your existing D1 ID `a91f5fd6-ec03-4605-aa56-34533aefecd1`. Package scripts explicitly select `wrangler.toml`. Migration scripts select the `FINMATCH_DB` binding so they target that database ID. Verify that the database belongs to the same Cloudflare account as the Worker. Keep both configurations in sync if you use the dashboard or direct Wrangler commands.

Apply migrations before deploying:

```bash
npm run db:migrate:remote
npx wrangler secret put ADMIN_EMAILS --config wrangler.toml
npm run deploy
```

For `ADMIN_EMAILS`, enter a comma-separated list of administrator email addresses (for example, your existing sign-in email). It is intentionally not preconfigured. Sign in using the existing magic-link flow. `RESEND_API_KEY` is needed for login emails; retain your existing secrets, including `FIRECRAWL_API_KEY` for scans. Do not enable `DEV_LOGIN_ECHO` in production. Set `PUBLIC_URL` to the actual deployed URL for scheduled email links.

Open **Admin → Surse monitorizate**. On the first upgrade, click **Importă sursele existente din KV** to import custom sources and disabled built-ins. The import runs once, is transactional, and keeps existing D1 source records. Run it before starting the next crawl if you previously disabled any built-in sources. Invalid legacy records make the import fail without partial changes; correct their URL/name/settings and retry. Built-in sources are seeded by migration. Subsequent deployments never reseed deleted records or overwrite admin edits.

The StartupCafe migration changes `https://www.startupcafe.ro/finantari` to `https://startupcafe.ro/c/finantari` and records the old/new URLs. No external reachability claim is made by this migration: use **Testează URL** after deployment.

## Admin behavior

- Add, edit, enable/disable, and delete any source, including built-ins.
- Edit name, HTTPS URL, type, tier, and proxy; URL determines the crawl host.
- One source per normalized host, matching the existing crawler's host-keyed KV caches.
- URL changes record old URL, new URL, timestamp and administrator via a database trigger. History is retained if a source is deleted.
- Edits and deletion require the current revision to prevent silent overwrites.
- Test follows up to five redirects, validates each destination and public DNS addresses, cancels the response body and has a ten-second overall timeout. A 403/429 is reported as an HTTP error; it may still work through Firecrawl. Testing does not replace the saved URL with a redirect target.
- Scan starts a background Firecrawl job; disabled sources cannot be scanned. Reload the sources tab to see the last successful scan. A successful HTTP test does not guarantee extraction of funding opportunities.
- The public Sources screen also reads the saved registry; edited links appear immediately and disabled/deleted sources are excluded. Names and URLs are rendered using DOM text to prevent stored HTML injection.
- Scheduled and manual crawls read enabled sources directly from D1. Crawl content and existing opportunity/session data remain in KV.
- Existing KV crawl status is host-keyed; changing a source host starts a separate status entry. Existing published opportunities are retained when a source changes or is deleted.

## API

Every endpoint below requires an existing session cookie and an email in `ADMIN_EMAILS`. Mutations also require an `Origin` header matching the Worker origin. Missing login returns 401, non-admin or invalid origin returns 403. Responses are uncached and do not enable cross-origin access.

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/admin/sources` | List source configuration and test/scan metadata |
| POST | `/api/admin/sources` | Add source |
| GET | `/api/admin/sources/:id` | Read source |
| PUT | `/api/admin/sources/:id` | Replace editable fields, including `revision` |
| DELETE | `/api/admin/sources/:id?revision=N` | Delete source |
| GET | `/api/admin/sources/:id/history` | Latest 100 URL changes |
| POST | `/api/admin/sources/:id/test` | Test saved URL and save result |
| POST | `/api/admin/sources/:id/scan` | Start scan (202) |
| POST | `/api/admin/sources/import-legacy` | One-time import from existing KV registry |

Example create/update body (include `revision` only when updating):

```json
{
  "name": "StartupCafe",
  "url": "https://startupcafe.ro/c/finantari",
  "type": "editorial",
  "tier": 3,
  "proxy": "auto",
  "enabled": true,
  "revision": 2
}
```

`GET /api/sources` remains public. Legacy `/api/sources/add`, `/remove`, and `/toggle` mutations are retired with 410 for administrators; unauthenticated callers are rejected. Manual recrawls, review operations, publishing removals and manual email digest triggers now require the same administrator session and origin checks.

## Local validation

```bash
npm test
npm run build
npm run db:migrate:local
npm run dev
```

Tests use real in-memory SQLite with the migration SQL and a small D1 binding adapter. They exercise Worker authorization, CRUD, revision conflicts, history, deletion, import, registry reads, unsafe URLs/DNS/redirects, HTTP failures and JavaScript parsing. A Chromium browser smoke check also verified editing, history, addition, safe HTML display, disabling, deletion and mobile layout. URL tests mock external responses; they do not assert that StartupCafe is currently reachable.

For local login, configure local secrets in a git-ignored `.dev.vars` (`ADMIN_EMAILS`, `RESEND_API_KEY`, etc.) and local KV data. Do not use production login echo. Remote migrations and production deployment are separate from the validated local build.

## Rollback

Keep the D1 database and migration history. Roll back the Worker deployment to the previous version if necessary. The previous Worker uses its original KV source registry and cannot see newer D1 edits. Export/record D1 edits before rolling back; do not delete the database as part of rollback.
