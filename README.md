# AstaHub — Free Technical Education, Forever

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)
[![Powered by Prosperity Systems Hub](https://img.shields.io/badge/Powered%20by-Prosperity%20Systems%20Hub-000)](https://ps-hub.org)

**Asta Knowledge Hub** is a free, hands-on, mastery-oriented technical learning platform — **powered by [Prosperity Systems Hub](https://ps-hub.org)**.
The core product today is the original C + x86-64 Assembly curriculum (100 days), expanded
with Python, C++, JavaScript/TypeScript, Rust, SQL, and Bash tracks on the same engine —
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
| **Rust** | 40 | Memory safety without garbage collection |
| **SQL & Databases** | 40 | Design, query, and optimize real data systems |
| **Bash / Linux / Git** | 40 | The working toolkit every engineer needs |

Every track runs the same engine: day-by-day lessons, theory with live code examples, a
Monaco playground, quizzes, code challenges, assignments with rubrics, and a capstone.

## Features

- **100-day C/Assembly curriculum** — every day is a hand-written lesson with theory,
  playground code, exercises, and an assignment
- **Python, C++, JavaScript/TypeScript, Rust, SQL, and Bash tracks** — generated from the same modular engine
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

# 3. Run the app (Vite — fast, no Next.js)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Migration note (2026-09-03):** this repo migrated from Next.js 15 App Router to **Vite + React + React Router**. `npm run dev` now runs Vite (instant HMR, no Next build hangs). `npm run dev:next` / `build:next` remain as fallbacks during the transition. The framework-agnostic core (`src/lib/curriculum`, `src/lib/simulator`, `src/components`, `prisma/`) is unchanged — the migration is a shell swap to fix slowness and instability.

### Environment variables

See `.env.example`:

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | yes | PostgreSQL connection string (Prisma) |
| `NEXTAUTH_SECRET` | yes | Auth signing secret (`openssl rand -base64 32`) — retained for Express auth shim |
| `PISTON_AUTH_TOKEN` | no | Enables real C/ASM/Python/C++/JS/Rust/SQL/Bash compilation via Piston. Without it, code runs in simulated mode |
| `MODERATOR_EMAILS` | no | Comma-separated emails that can view/action the moderation queue |
| `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` | no | Supabase Realtime for live chat/presence. Without them, community features poll (see `.env.example`) |

## Commands

```bash
npm run dev        # Vite dev server (primary) — fast HMR
npm run build      # Vite production build → dist/
npm run preview    # Preview the Vite build
npm run dev:next   # Legacy Next.js dev server (fallback)
npm run build:next # Legacy Next.js build
npm run lint       # ESLint
npm test           # Vitest — simulator + curriculum integrity + validation
npm run test:watch # Vitest watch mode
```

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | **Vite 8 + React 18 + React Router 7**, TypeScript (strict) — migrated from Next.js 15 App Router for speed/stability |
| Styling | Tailwind CSS + custom black/white theme (CSS variables) |
| Data | PostgreSQL + Prisma ORM |
| Auth | Express + JWT session (migrating from Auth.js/NextAuth v4) + bcrypt — `src/shims/next-auth-react.ts` bridges during transition |
| State | Zustand (per-track, localStorage persisted, server-synced) |
| Editor | Monaco (CDN) |
| Execution | Piston API + in-browser simulator fallback |
| Realtime | Supabase Realtime (optional; group chat/presence degrade to polling without it) |
| Tests | Vitest |
| CI | GitHub Actions (lint → typecheck → test → build) |
| Stewardship | **Prosperity Systems Hub** — [ps-hub.org](https://ps-hub.org) |

## Project structure

```
src/
├── main.tsx                # Vite entry — BrowserRouter + theme init
├── App.tsx                 # Root routes (React Router) — replaces src/app/layout.tsx
├── shims/                  # next/link, next/navigation, next/image, next-auth shims for transition
├── app/                    # Legacy App Router pages (being ported route-by-route to React Router)
│   ├── api/                # API routes → migrating to server/ (Express)
│   ├── lesson/[day]        # C/Assembly lessons
│   ├── lesson/{python,cpp,js,rust,sql,bash}/[day]
│   ├── tracks/             # Knowledge-bank hub
│   ├── curriculum/         # C/ASM 100-day map
│   ├── community/          # feed, Q&A, groups+chat, moderation
│   ├── dashboard/ profile/ achievements/ leaderboard/
│   ├── settings/ certificates/ playground/ signin/
│   └── globals.css
├── components/             # Shared UI (CodePlayground, LessonView, Navbar, Footer …)
│   └── community/          # Avatar, VoteButtons, ReportButton
├── lib/
│   ├── curriculum/         # Content engine (core + lazy day modules + python/cpp/js/rust/sql/bash)
│   ├── community.ts        # Pure community logic
│   ├── realtime.ts         # Supabase Realtime client
│   ├── simulator.ts        # In-browser interpreter
│   ├── store.ts            # Per-track Zustand progress stores + sync
│   ├── progressValidation.ts
│   ├── rateLimit.ts
│   ├── auth.ts prisma.ts tracks.ts types.ts theme.ts utils.ts
└── types/                  # type augmentation
prisma/schema.prisma        # Postgres schema
vite.config.ts              # Vite + path aliases + shims
index.html                  # Vite HTML entry
tests/                      # Vitest suites
```

## Adding a track

A new language track is a content project, not a platform rewrite. Mirror the Python/C++/JS/Rust/SQL/Bash
pattern:

1. Add a `TrackKey` in `src/lib/types.ts` and entries in `src/lib/tracks.ts`
2. Create `src/lib/curriculum/<track>/` with a blueprint `core.ts` + `index.ts` loader
3. Register totals in `src/lib/curriculum/index.ts` (`TOTAL_TRACKS`)
4. Add the Piston language mapping in the API execute handler (`src/app/api/execute/route.ts` → `server/` after migration)
5. Add playground templates in `src/app/playground/page.tsx`
6. Add a store in `src/lib/store.ts` (sync: true)
7. Add a progress store mapping in the progress API handler

## Documentation

- `VISION.md` — the full product vision (pedagogy, knowledge bank, community, economics)
- `PLANS.md` — original seed notes
- `ENGINEERING_ROADMAP.md` — **living technical roadmap**: state, debt, bugs, security,
  priorities. Read it before large work and update it as work lands.

## Testing & quality gates

Before considering a change complete:

```bash
npm run lint        # no warnings
npx tsc --noEmit    # clean
npm test            # all green
npm run build       # Vite production build succeeds
```

## Roadmap (short)

- [x] 100-day C/Assembly curriculum (hand-written)
- [x] Python, C++, JavaScript/TypeScript, Rust, SQL, and Bash tracks
- [x] Accounts, progress sync, achievements, leaderboard, certificates
- [x] Real (Piston) + simulated execution with honest labeling
- [x] Tests, CI, black & white redesign
- [x] `expectedOutput` for all generated code challenges
- [x] Community: learnings feed, Q&A, study groups + realtime chat, moderation
- [x] **Migrated to Vite + React (from Next.js) + Prosperity Systems Hub attribution** — fast dev, stable builds
- [ ] PWA offline support (service worker)
- [ ] Live coding + YouTube export (full port to React Router)
- [ ] AI learning companion (hint ladders) — port CoachPanel to Vite routing

See `ENGINEERING_ROADMAP.md` for the full prioritized backlog.

## Powered by Prosperity Systems Hub

AstaHub is **powered by [Prosperity Systems Hub](https://ps-hub.org)** — the infrastructure and stewardship layer that keeps free, world-class technical education sustainable, fast, and available to every person on Earth. Learn more at [ps-hub.org](https://ps-hub.org).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the engineering roadmap. Keep changes small,
tested, and committed with Conventional Commits.

## License

MIT — see [LICENSE](LICENSE).
