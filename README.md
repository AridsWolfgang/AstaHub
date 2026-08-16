# AstaHub — Free Technical Education, Forever

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)

**Asta Knowledge Hub** is a free, hands-on, mastery-oriented technical learning platform.
The core product today is the original C + x86-64 Assembly curriculum (100 days), expanded
with Python and C++ tracks on the same engine — with accounts, progress sync, achievements,
leaderboards, certificates, and a working code playground.

> Every person on Earth, regardless of wealth or geography, should be able to wake up,
> learn a world-class technical skill, and turn it into a livelihood.

## Live tracks

| Track | Days | What you'll be able to do |
|-------|------|---------------------------|
| **C** | 50 | Memory, pointers, data structures, systems thinking |
| **x86-64 Assembly** | 50 | Read and write code that talks to the metal |
| **Python** | 40 | Automation, data, and AI from first principles |
| **C++** | 40 | Objects, templates, and the STL |

Every track runs the same engine: day-by-day lessons, theory with live code examples, a
Monaco playground, quizzes, code challenges, assignments with rubrics, and a capstone.

## Features

- **100-day C/Assembly curriculum** — every day is a hand-written lesson with theory,
  playground code, exercises, and an assignment
- **Python & C++ tracks** — generated from the same modular engine
- **Code execution** — real compilation via [Piston](https://github.com/engineer-man/piston)
  when a token is configured, with a built-in in-browser simulator as the free fallback.
  The UI always labels execution as *Live* or *Simulated* — never misrepresents one as the other
- **Accounts & identity** — email/password auth (bcrypt), profiles, settings, account export
- **Progress sync** — per-track XP, streaks, levels, completed days, notes; server-backed
- **Gamification** — XP and levels (Initiate → Master), achievements, leaderboard
- **Certificates** — auto-issued on full-track completion
- **Editorial black & white UI** — calm, minimal, content-first; dark default with a light
  theme; self-hosted fonts; mobile-first

## Quick start

Prerequisites: Node.js 20 or 22 (see note below), PostgreSQL (or Neon/Supabase).

```bash
npm install

# 1. Configure environment (copy and fill in)
cp .env.example .env.local

# 2. Apply the database schema
npx prisma migrate deploy   # against a database you own
# or: npx prisma migrate dev --name init

# 3. Run the app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

See `.env.example`:

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | yes | PostgreSQL connection string (Prisma) |
| `NEXTAUTH_SECRET` | yes | Auth.js signing secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | no | Canonical URL (defaults to localhost) |
| `PISTON_AUTH_TOKEN` | no | Enables real C/ASM/Python/C++ compilation via Piston. Without it, code runs in simulated mode |

> **Node runtime note:** the edge middleware (`withAuth`) can throw an `EvalError` on
> Node 24. Pin to Node 20 or 22 in CI and production.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build (+ regenerates sitemap via postbuild)
npm run start      # serve the production build
npm run lint       # ESLint (next lint)
npm test           # Vitest — simulator + curriculum integrity + validation
npm run test:watch # Vitest watch mode
```

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router), React 18, TypeScript (strict) |
| Styling | Tailwind CSS + custom black/white theme (CSS variables) |
| Data | PostgreSQL + Prisma ORM |
| Auth | Auth.js (NextAuth v4) credentials + bcrypt |
| State | Zustand (per-track, localStorage persisted, server-synced) |
| Editor | Monaco (CDN) |
| Execution | Piston API + in-browser simulator fallback |
| Tests | Vitest |
| CI | GitHub Actions (lint → typecheck → test → build) |

## Project structure

```
src/
├── app/                    # App Router pages + API routes
│   ├── api/                # register, auth, me, progress, leaderboard,
│   │                       # password, export, execute
│   ├── lesson/[day]        # C/Assembly lessons
│   ├── lesson/{python,cpp}/[day]
│   ├── tracks/             # Knowledge-bank hub (all tracks, live + planned)
│   ├── curriculum/         # C/ASM 100-day map (server-rendered metadata)
│   ├── dashboard/ profile/ achievements/ leaderboard/
│   ├── settings/ certificates/ playground/ signin/
│   └── layout.tsx globals.css ...
├── components/             # Shared UI (CodePlayground, LessonView, Navbar, …)
├── lib/
│   ├── curriculum/         # Content engine (core + lazy day modules + python/cpp)
│   ├── simulator.ts        # In-browser interpreter (C/Python/C++/ASM)
│   ├── store.ts            # Per-track Zustand progress stores + sync
│   ├── progressValidation.ts # Server-side progress sanitization
│   ├── rateLimit.ts        # In-process rate limiter for public APIs
│   ├── auth.ts prisma.ts tracks.ts types.ts theme.ts utils.ts
├── middleware.ts           # Route protection (withAuth)
└── types/                  # next-auth type augmentation
prisma/schema.prisma        # Postgres schema (User, UserTrackProgress, Certificate)
tests/                      # Vitest suites
```

## Adding a track

A new language track is a content project, not a platform rewrite. Mirror the Python/C++
pattern:

1. Add a `TrackKey` in `src/lib/types.ts` and entries in `src/lib/tracks.ts`
2. Create `src/lib/curriculum/<track>/` with a blueprint `core.ts` + `index.ts` loader
3. Register totals in `src/lib/curriculum/index.ts` (`TOTAL_TRACKS`)
4. Add the Piston language mapping in `src/app/api/execute/route.ts`
5. Add playground templates in `src/app/playground/page.tsx`
6. Add a store in `src/lib/store.ts` (sync: true)
7. Add a progress store mapping in `src/app/api/progress/route.ts`

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
npm run build       # production build succeeds
```

## Roadmap (short)

- [x] 100-day C/Assembly curriculum (hand-written)
- [x] Python + C++ tracks
- [x] Accounts, progress sync, achievements, leaderboard, certificates
- [x] Real (Piston) + simulated execution with honest labeling
- [x] Tests, CI, black & white redesign
- [ ] JavaScript/TypeScript track, then Rust
- [ ] `expectedOutput` for all generated code challenges
- [ ] PWA offline support (service worker)
- [ ] Community (Q&A, posts, groups)
- [ ] AI learning companion (hint ladders)

See `ENGINEERING_ROADMAP.md` for the full prioritized backlog.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the engineering roadmap. Keep changes small,
tested, and committed with Conventional Commits.

## License

MIT — see [LICENSE](LICENSE).
