# Architecture — Backend State (2026-09-03)

> **Current:** **Separate** (decoupled) — **not monolithic**. Frontend and API run as two independent processes that share the same Prisma + Postgres database. Powered by **Prosperity Systems Hub ([ps-hub.org](https://ps-hub.org))**.

## Before → After

| Aspect | Before (Next.js monolith) | Now (Vite + Express, separate) |
|--------|---------------------------|--------------------------------|
| **Framework** | Next.js 15 App Router (SSR + API routes in one process) | **Vite 8 + React 18 + React Router 7** SPA |
| **Routing** | File-system App Router (`src/app/**/page.tsx`, `src/app/api/**/route.ts`) | `src/App.tsx` with `<Routes>` + `src/app/**/page.tsx` as plain components |
| **API layer** | `src/app/api/**/route.ts` using `NextRequest/NextResponse` + `next-auth` middleware | `server/index.ts` **Express 4** server (`/api/*`), `jsonwebtoken` + `bcrypt` + `cors` + `cookie-parser` |
| **Auth** | `next-auth` (NextAuth v4, `withAuth` edge middleware) — breaks on Node 24 | `src/lib/auth.ts` (pure `signJwt/verifyJwt` HMAC-SHA256) + `src/lib/auth-client.tsx:1` React Context (`AuthProvider`) — no Next dependency |
| **Middleware** | `src/middleware.ts` (`withAuth` edge, `EvalError` on Node 24) | Removed — auth checked per-request in Express (`getUserFromReq`) and per-route in React Router |
| **Build** | `next build` — 60-80s first compile, 17s boot, flaky `next/font`/`next-sitemap` network, `EvalError` middleware | `vite build` — **48s**, 2092 modules, code-split day chunks, no network at build time |
| **Dev HMR** | 60-80s cold, slow refresh | **Instant HMR** via Vite |
| **Deployment** | One Vercel/Node process (SSR + API) | Two processes: `npm run dev` (Vite :3000, proxies `/api`→:4000) + `npm run server` (Express :4000). Can be deployed separately (static SPA on CDN + API on Fly/Render). |
| **DB** | Supabase Postgres + Prisma (4 migrations, realtime on 10 tables) | **Unchanged** — `prisma/schema.prisma:1` is the single source of truth |

## Why separate is faster & more stable

1. **No edge-middleware eval.** Next's `withAuth` middleware runs in an edge sandbox that uses `eval` — banned on Node 24 (`EvalError: Code generation from strings disallowed`). Express middleware is plain Node, no sandbox.
2. **No webpack RSC graph.** App Router builds a full React Server Component graph even for static curriculum data (340 lessons). Vite builds only the client SPA; curriculum is lazy `import()` data, already code-split per day (`dist/assets/day-*.js` 2-6kB).
3. **Independent scaling.** The SPA is static (`dist/`) — can be cached on Cloudflare CDN. The API is stateless Express — can be scaled horizontally, rate-limited via `src/lib/rateLimit.ts:1`, without rebuilding the frontend.
4. **Simpler failure domains.** A Piston timeout or DB cold-start no longer stalls SSR. The API returns `{real:false}` simulator fallback; the UI labels it honestly ("Simulated").

## Request flow

```
Browser (React Router SPA @ :3000)
  ├─ GET /           → <HomePage> (src/app/page.tsx) — static, no DB
  ├─ GET /lesson/42  → <LessonView> (src/components/LessonView.tsx) — loads day via src/lib/curriculum lazy import
  ├─ POST /api/execute → Vite proxy → Express :4000 → src/lib/simulator.ts or Piston (emkc.org) → {output,real}
  ├─ POST /api/register → Express → prisma.user.create + bcrypt
  ├─ POST /api/auth/signin → Express → verifyCredentials → signJwt → httpOnly cookie `token`
  ├─ GET  /api/me      → Express → verifyJwt(cookie) → prisma.user
  └─ GET  /api/leaderboard → Express → prisma.user.findMany orderBy totalXp
```

## What still touches `next/*`

**Nothing.** After `2026-09-03` purge:

- `next`, `next-auth`, `eslint-config-next`, `next-sitemap`, `next.config.mjs`, `next-env.d.ts`, `src/middleware.ts`, `src/app/api/*` deleted.
- Shims `src/shims/next-*` deleted, `vite.config.ts:1` no longer aliases `next/*`, `tsconfig.json:20` paths cleaned.
- `npx tsc --noEmit` and `vite build` no longer see `next`.

Legacy `src/app` folder is kept as **pages directory** (convention) but its components are plain React Router pages — no `export const metadata`, no `getServerSession`.

## How to run

```bash
npm install
cp .env.example .env.local   # set DATABASE_URL, JWT_SECRET / NEXTAUTH_SECRET, GOOGLE_CLIENT_ID/SECRET
npx prisma migrate deploy
npm run dev      # Vite :3000 (with /api proxy)
npm run server   # Express :4000 (in second terminal)
# prod
npm run build    # Vite -> dist/
npm run preview  # serve dist/ on :3000
```

See `docs/AUTH.md` for email + Google sign-in details.
