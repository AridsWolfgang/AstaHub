# AstaHub — Free Technical Education, Forever

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)
[![Powered by Prosperity Systems Hub](https://img.shields.io/badge/Powered%20by-Prosperity%20Systems%20Hub-000)](https://ps-hub.org)

**Asta Knowledge Hub** is a free, hands-on, mastery-oriented technical learning platform — **powered by [Prosperity Systems Hub](https://ps-hub.org)**.
The core product today is the original C + x86-64 Assembly curriculum (100 days), expanded
with Python, C++, JavaScript/TypeScript, SQL, and Bash tracks on the same engine —
with accounts, progress sync, achievements, leaderboards, certificates, and a working
code playground.

> Every person on Earth, regardless of wealth or geography, should be able to wake up,
> learn a world-class technical skill, and turn it into a livelihood.

> **Powered by Prosperity Systems Hub** — [ps-hub.org](https://ps-hub.org) — the systems that make free, world-class education sustainable at global scale.

## Live tracks

| Track | Days | What you'll be able to do |
|-------|------|---------------------------|
| **C** | 50 | Memory, pointers, data structures, systems thinking |
| **x86-64 Assembly** | 50 | Read and write code that talks to the metal |
| **Python** | 40 | Automation, data, and AI from first principles |
| **C++** | 40 | Objects, templates, and the STL |
| **JavaScript / TypeScript** | 40 | Web and full-stack development |
| **SQL & Databases** | 40 | Design, query, and optimize real data systems |
| **Bash / Linux / Git** | 40 | The working toolkit every engineer needs |

Every track runs the same engine: day-by-day lessons, theory with live code examples, a
Monaco playground, quizzes, code challenges, assignments with rubrics, and a capstone.

## Features

- **100-day C/Assembly curriculum** — every day is a hand-written lesson with theory,
  playground code, exercises, and an assignment
- **Python, C++, JavaScript/TypeScript, SQL, and Bash tracks** — generated from the same modular engine
- **Code execution** — real compilation via [Piston](https://github.com/engineer-man/piston)
  when a token is configured, with a built-in in-browser simulator as the free fallback.
  The UI always labels execution as *Live* or *Simulated* — never misrepresents one as the other
- **Accounts & identity** — email/password auth (bcrypt), profiles, settings, account export
- **Progress sync** — per-track XP, streaks, levels, completed days, notes; server-backed
- **Gamification** — XP and levels (Initiate → Master), achievements, leaderboard
- **Certificates** — auto-issued on full-track completion
- **Community** — learnings feed, Q&A with evidence-of-effort, study groups with real-time chat,
  and a moderation queue. The human layer: learning stays social and sticky
- **Editorial black & white UI** — calm, minimal, content-first; dark default with a light
  theme; self-hosted fonts; mobile-first
- **Powered by Prosperity Systems Hub** — infrastructure, funding model, and long-term stewardship via [ps-hub.org](https://ps-hub.org)

## Quick start

Prerequisites: Node.js 20 or 22, PostgreSQL (or Neon/Supabase).

```bash
npm install

# 1. Configure environment (copy and fill in)
cp .env.example .env.local

# 2. Apply the database schema
npx prisma migrate deploy   # against a database you own
# or: npx prisma migrate dev --name init

# 3. Run the app — two terminals (Vite HMR, no build step while editing):
npm run dev          # terminal 1: frontend :3000, instant updates on save
npm run server:dev   # terminal 2: Express API :4000, auto-restarts on save
```

Open [http://localhost:3000](http://localhost:3000).

> **Vite + Express (2026-09-03):** migrated from Next.js 15 to **Vite + React Router + Express**. `npm run dev` = Vite `:3000` (proxies `/api` → `:4000`), `npm run server` = Express `:4000`. The `src/lib/curriculum` + `src/components` core is framework-agnostic.

### Environment variables

See `.env.example`:

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | yes | PostgreSQL connection string (Prisma) |
| `JWT_SECRET` | yes | Auth signing secret (`openssl rand -base64 32`, `NEXTAUTH_SECRET` also accepted as fallback) |
| `FRONTEND_URL` | no | Public frontend URL (default `http://localhost:3000`, used for Google OAuth redirect) |
| `PORT` / `SERVER_PORT` | no | Express port (default `4000`) |
| `PISTON_AUTH_TOKEN` | no | Enables real compilation via Piston; without it code runs simulated |
| `MODERATOR_EMAILS` | no | Comma-separated emails that can moderate & schedule live events |
| `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` | no | Supabase Realtime for live chat; without it polling fallback (`NEXT_PUBLIC_*` also accepted) |
| `OPENROUTER_API_KEY` / `AI_MODEL` | no | AI coach (hint ladder) via OpenRouter; honest `503` when unset |
| `YOUTUBE_CLIENT_ID` etc | no | YouTube export (lesson-linked metadata); honest `NOT_CONFIGURED` when unset |

## Commands

```bash
npm run dev          # Vite :3000 — instant HMR (proxies /api → :4000)
npm run server:dev   # Express :4000 with auto-restart (in second terminal)
npm run build        # Vite → dist/ (route-split chunks)
npm run preview      # Serve dist/ on :3000 (STALE until you rebuild — use npm run dev while editing)
npm run server:build # tsc -p tsconfig.server.json → dist-server/
npm run lint         # ESLint
npm test             # Vitest (139 tests)
npm run test:watch   # Vitest watch
```

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | **Vite 8 + React 18 + React Router 7**, TypeScript (strict) |
| Server | **Express 4** + JWT (`jsonwebtoken`) + `helmet` + `cors` + `cookie-parser` |
| Styling | Tailwind CSS + black/white CSS variables |
| Data | PostgreSQL + Prisma (4 migrations) |
| Auth | JWT httpOnly cookie + bcrypt + Google OAuth (`/api/auth/google`) |
| State | Zustand per-track (`asta-*-progress`, `sync: true`, `PUT /api/progress`) |
| Editor | Monaco (CDN) |
| Execution | Piston + in-browser simulator (`real` flag, honest fallback) |
| Realtime | Supabase Realtime (optional; polling fallback) |
| Coach | OpenRouter (`/api/coach`, 10/min) |
| Tests | Vitest (139) |
| CI | GitHub Actions (lint → tsc → tsc -p tsconfig.server.json → test → build) |
| Stewardship | **Prosperity Systems Hub** — [ps-hub.org](https://ps-hub.org) |

## Project structure

```
src/
├── main.tsx              # BrowserRouter + theme init
├── App.tsx               # All routes, React.lazy + Suspense (route-split)
├── index.css             # Tailwind + theme tokens
├── pages/                # Plain React pages, one file per route (lazy-loaded)
│   ├── HomePage.tsx, TracksPage.tsx, TrackDetailPage.tsx, …
│   └── lessons/          # LessonCPage + Lesson{Python,Cpp,Js,Sql,Bash}Page
├── components/           # CodePlayground, LessonView, Navbar, Footer, TrackJourney, CoachPanel …
│   ├── community/        # Avatar, VoteButtons, ReportButton
│   └── live/             # Countdown, CreateEventForm, LiveRoomClient
├── lib/
│   ├── curriculum/       # core + days/day-*.ts (100) + python/cpp/js/sql/bash/core.ts
│   ├── simulator.ts, store.ts, tracks.ts, types.ts
│   ├── auth-client.tsx, realtime.ts            # browser-safe (import.meta.env only)
│   ├── auth.ts, prisma.ts, community.ts, live.ts, youtube.ts, coach.ts, openrouter.ts
│   └── progressValidation.ts, rateLimit.ts, leaderboard.ts, registerValidation.ts
server/index.ts           # Express API (all /api/*, helmet, JWT, rateLimit) — imports server-only lib files
prisma/schema.prisma      # Postgres + 4 migrations
public/                   # fonts, icons, manifest.json, favicon.svg
vite.config.ts            # @ alias + /api proxy → :4000
tests/                    # 9 suites, 139 tests
```

## Adding a track

Mirror the Python/C++/JS/SQL/Bash pattern:

1. `TrackKey` in `src/lib/types.ts` + `src/lib/tracks.ts`
2. `src/lib/curriculum/<track>/core.ts` + `index.ts` loader
3. `TOTAL_TRACKS` in `src/lib/curriculum/index.ts`
4. `getPistonLanguage` in `server/index.ts`
5. Templates in `src/app/playground/page.tsx`
6. Store in `src/lib/store.ts` (`sync: true`)
7. `track` handling in `PUT /api/progress` + `GET /api/leaderboard`

## Documentation

- `VISION.md` — the full product vision (pedagogy, knowledge bank, community, economics)
- `PLANS.md` — original seed notes
- `ENGINEERING_ROADMAP.md` — **living technical roadmap**: state, debt, bugs, security,
  priorities. Read it before large work and update it as work lands.

## Testing & quality gates

Before considering a change complete:

```bash
npm run lint                    # clean
npx tsc --noEmit                # clean
npx tsc -p tsconfig.server.json --noEmit  # server clean
npm test                        # 139/139
npm run build                   # Vite → dist/
```

## Roadmap (short)

- [x] 100-day C/Assembly curriculum (hand-written)
- [x] Python, C++, JavaScript/TypeScript, SQL, and Bash tracks
- [x] Accounts, progress sync, achievements, leaderboard, certificates
- [x] Real (Piston) + simulated execution with honest labeling
- [x] Tests, CI, black & white redesign
- [x] `expectedOutput` for all generated code challenges
- [x] Community: learnings feed, Q&A, study groups + realtime chat, moderation
- [x] **Migrated to Vite + React (from Next.js) + Prosperity Systems Hub attribution** — fast dev, stable builds
- [x] Live events hub + room + YouTube export (honest gated)
- [x] AI coach (hint ladder, OpenRouter, 10/min)
- [ ] PWA offline (service worker)
- [ ] Self-hosted Piston (public API is 401 since 2026-02-15)
- [ ] Sciences tracks (Math/Physics/EE/ML/Sec)

See `ENGINEERING_ROADMAP.md` backlog #10/#11/#20/#21/#23.

## Powered by Prosperity Systems Hub

AstaHub is **powered by [Prosperity Systems Hub](https://ps-hub.org)** — the infrastructure and stewardship layer that keeps free, world-class technical education sustainable, fast, and available to every person on Earth. Learn more at [ps-hub.org](https://ps-hub.org).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the engineering roadmap. Keep changes small,
tested, and committed with Conventional Commits.

## License

MIT — see [LICENSE](LICENSE).
