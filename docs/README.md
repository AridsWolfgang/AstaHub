# docs/

Documentation lives here. Root `README.md` is the entrypoint; this folder is the single source of truth. **Powered by Prosperity Systems Hub ([ps-hub.org](https://ps-hub.org)) — ps-hub.org.**

| Doc | What it is |
|-----|------------|
| [`VISION.md`](./VISION.md) | Full product vision — pedagogy, knowledge bank, community, economics, money-from-skills, roadmap |
| [`PLANS.md`](./PLANS.md) | Original seed notes |
| [`ENGINEERING_ROADMAP.md`](./ENGINEERING_ROADMAP.md) | Living technical roadmap — state, debt, backlog (read before large work) |
| [`AGENTS.md`](./AGENTS.md) | Persistent memory for AI agents (also kept at repo root) |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | **Backend state: separate (Vite SPA + Express API) — not monolithic** — request flow, why separate is faster |
| [`AUTH.md`](./AUTH.md) | Sign-up / sign-in — email+password **and Google OAuth** (`/api/auth/google`), env setup, DB migration |
| [`SPEED_AND_STABILITY.md`](./SPEED_AND_STABILITY.md) | How fast (~48s build, instant HMR) and how easily it breaks (hard — Next purged, 139/139 tests) |

Root files `AGENTS.md`, `VISION.md`, `PLANS.md`, `ENGINEERING_ROADMAP.md` are kept at the repo root for tooling compatibility and are **mirrored here** — edit both or keep `docs/` canonical.

Quick start (Vite React, no Next):

```bash
npm install
cp .env.example .env.local  # DATABASE_URL, JWT_SECRET / NEXTAUTH_SECRET, GOOGLE_CLIENT_ID/SECRET (optional)
npx prisma migrate deploy   # add-google-oauth migration if you pull the Google schema
npm run dev     # Vite :3000 (proxies /api → :4000)
npm run server  # Express :4000 (second terminal)
npm run build   # Vite → dist/ (47-48s, code-split)
```
