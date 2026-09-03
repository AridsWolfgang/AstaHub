# Speed & Stability — How fast, how easily does it break

> **TL;DR:** **Very fast, very hard to break.** Vite is the only build; Next is fully removed. HMR is instant, prod build is ~48s with code-split 2k modules, no `eval` middleware, no flaky `next/font` network. Powered by **Prosperity Systems Hub ([ps-hub.org](https://ps-hub.org))**.

## How fast

| Metric | Before (Next 15 App Router) | Now (Vite 8 + React Router) |
|--------|------------------------------|------------------------------|
| **Dev boot** | 17s `next dev` cold + 60-80s first compile (1339 modules, webpack) | `vite` — **<1s** boot, **instant HMR** (no full rebuild) |
| **Prod build** | ~58-96s `next build` (single giant chunk, `next-sitemap`, `next/image` optimization) | **47-48s** `vite build` (2092 modules, `dist/assets/index-*.js 734kB→208kB gz` + 100+ per-day chunks `2-6kB→1-2kB gz`) — measured `npx vite build` 47.93s |
| **First Load** | ~150kB+ main (pre-split) + 338kB curriculum payload bug (fixed earlier) | `36kB CSS (6.9kB gz)` + day chunks lazy, Monaco on CDN, fonts self-hosted `public/fonts/*.woff2` via `@font-face` |
| **API latency** | Neon cold-start ~8s first DB call + middleware `withAuth` edge eval | DB same, but no SSR stalls — API is plain Express, client fetches `/api/*` via `fetch` with honest `503`/`501` gates |
| **Rebuild on edit** | Full webpack cycle, `tsconfig.tsbuildinfo` wedged by `next dev` | Vite HMR: **<100ms** for a component edit (`src/components/*`, `src/app/*`, `src/lib/curriculum/*`) |

Numbers from the actual Windows pwsh machine (i7-3540M era, 4 threads) — CI/Linux is even faster.

## How easily does it break

**Hard.** The 2026-09-03 purge removed the three known breakage modes:

1. **Middleware `EvalError` (P0, now gone).** Before: `src/middleware.ts:1` (`withAuth` from `next-auth/middleware`) runs in Next's edge sandbox that uses `eval` — banned on Node 24 (`EvalError: Code generation from strings disallowed`) and broke `next start` prod. **Now:** no middleware file, no edge runtime, no `eval`. Auth is `src/lib/auth.ts:27` (`signJwt` via `crypto.createHmac`) + Express `getUserFromReq` — plain Node.
2. **`next/font/google` network hang (now gone).** Before: `next/font/google` fetched `fonts.gstatic.com` at build time — `socket hang up` on flaky networks, 5-min build hangs. **Now:** fonts are self-hosted `public/fonts/*.woff2` via `@font-face` in `src/app/globals.css:39` — no network at build time.
3. **`next-sitemap` + `.next` corruption (now gone).** Before: stale `.next` caused 500 on `localhost:3000`, required `Remove-Item .next` before `next build`. **Now:** `dist/` is clean `vite build` output, no `.next`, no `postbuild: next-sitemap`.

**Other stability wins:**

- **No `isomorphic` RSC graph.** App Router built a Server Component graph for all 340 lessons even though curriculum is pure data. Vite treats `src/lib/curriculum` as data, lazy `import()` per day, code-split — a broken day module doesn't break the whole build.
- **Shims removed.** Early migration used `src/shims/next-*` to bridge `next/link` etc. All `75` `from "next/"` imports are now `react-router-dom` — `grep -r "from \"next/"` returns 0. No alias magic to break.
- **Honest gates.** Piston (`emkc.org`) is whitelist-only since 2026-02-15 (401). The app degrades to `simulateAnsi` (`src/lib/simulator.ts:1`) with label `(Simulated ...)` — never pretends to be real. Same for Google OAuth, YouTube export, Supabase Realtime — `501 NOT_CONFIGURED` until env is set.
- **Type & test gates.** `npx tsc --noEmit --incremental false` clean, `npm test` **139/139** (Vitest), `vite build` green. CI (`.github/workflows/ci.yml:9`) runs `lint → tsc → test → build` on Node 20.

**What could still break (and how to avoid):**

- DB not migrated after `prisma/schema.prisma:10` `googleId` addition → `findOrCreateGoogleUser` throws. Fix: `npx prisma migrate dev --name add-google-oauth` (or `deploy` in prod).
- Missing env: `DATABASE_URL`, `JWT_SECRET` (fallback `NEXTAUTH_SECRET`), `GOOGLE_CLIENT_ID/SECRET` (only for Google button), `NEXT_PUBLIC_SUPABASE_URL` (only for Realtime). Without them the app still builds/runs — features degrade gracefully.

## How to verify yourself

```bash
npm run dev        # Vite — open http://localhost:3000, edit a file → HMR <100ms
npm run build      # 47-48s, 2092 modules, 0 errors
npm test           # 139/139
npx tsc --noEmit --incremental false  # clean
npm run server     # Express :4000 — test POST /api/execute {code,language}
```

No `next` in `package.json:42`, no `next.config.mjs`, no `src/middleware.ts`.
