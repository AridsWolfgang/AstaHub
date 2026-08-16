# ENGINEERING_ROADMAP.md

> **Living technical roadmap for AstaHub.** Every meaningful change to the repository is
> reflected here. Status legend: `[ ]` Planned · `[~]` In Progress · `[x]` Completed · `[!]` Blocked.
> Priorities: **Critical → High → Medium → Low**.
>
> Last full audit: 2026-08-16. This file is the source of truth for what exists, what is
> broken, and what comes next. Read it before large work.

---

## 1. Current State

**What this is today:** a production-shaped Next.js 15 learning platform with four live
tracks (C, x86-64 Assembly, Python, C++), a working account/progress/achievement/
certificate system, a Monaco playground with real (Piston) and simulated execution, and a
self-hosted black-and-white editorial UI. All 180 lessons (100 C/ASM + 40 Python + 40 C++)
resolve cleanly; tests, lint, typecheck and build are green.

**Verified at audit time (2026-08-16):**

- `npx tsc --noEmit` clean
- `npm test` → 28/28 passing (20 simulator + 8 curriculum integrity)
- Clean `next build` green (21 pages) — see known issue re `next start` on Node 24 below
- 100 C/ASM day files are hand-written (≥5 KB each); Python/C++ are generator-built from
  blueprints (`src/lib/curriculum/{python,cpp}/core.ts`)

**Git state:** working tree clean. Main branch up to date with `origin/main`.

### Live routes (App Router)

| Route | Purpose | Auth |
|---|---|---|
| `/` | Landing (mission + HeroTerminal + tracks + stats) | public |
| `/tracks`, `/tracks/[slug]` | Knowledge-bank hub | public |
| `/curriculum` | C/ASM 100-day map (server-rendered metadata) | public |
| `/lesson/[day]` | C/ASM lesson | middleware-protected |
| `/lesson/{python,cpp}/[day]` | Python/C++ lesson | middleware-protected |
| `/playground` | Free Monaco workbench (4 languages) | public |
| `/signin` | Sign-in / register | public |
| `/dashboard`, `/profile`, `/achievements`, `/leaderboard`, `/settings`, `/certificates` | Learner identity & progress | middleware-protected |

### Live API routes

| Route | Method(s) | Auth | Purpose |
|---|---|---|---|
| `/api/register` | POST | public | Create account |
| `/api/auth/[...nextauth]` | GET/POST | public | NextAuth credentials |
| `/api/me` | GET/PATCH/DELETE | session | Profile read/update, account delete |
| `/api/progress` | PUT | session | Sync track progress + auto-issue certificates |
| `/api/leaderboard` | GET | public | Ranked top-N by track |
| `/api/password` | POST | session | Change password |
| `/api/export` | GET | session | Portable journey export (JSON) |
| `/api/execute` | POST | public | Code execution (Piston + simulated fallback) |

### Data model (`prisma/schema.prisma`)

- `User` — identity + C-track progress (legacy columns kept on User)
- `UserTrackProgress` — per-track progress for python/cpp (`@@unique([userId, track])`)
- `Certificate` — issued on full-track completion (C on User, others via UserTrackProgress)

---

## 2. Architecture

```
Next.js 15 (App Router) + React 18 + TypeScript (strict) + Tailwind CSS
├── src/app/                  # Pages + API routes (App Router)
│   ├── api/{register,auth,me,progress,leaderboard,password,export,execute}
│   ├── lesson/[day]          # C/ASM
│   ├── lesson/{python,cpp}/[day]
│   ├── tracks, curriculum, dashboard, profile, achievements, leaderboard,
│   │   settings, certificates, playground, signin
├── src/components/           # Shared UI (CodePlayground, LessonView, Navbar, …)
├── src/lib/
│   ├── curriculum/           # Content engine (CORE + lazy day modules + python/cpp)
│   ├── simulator.ts          # In-browser C/Python/C++/ASM interpreter (regex-based)
│   ├── store.ts              # Zustand per-track progress stores + server sync
│   ├── auth.ts / prisma.ts   # NextAuth options / Prisma client singleton
│   ├── types.ts              # Lesson/Exercise/Assignment/tier model + XP math
│   ├── tracks.ts             # Knowledge-bank track catalog (single source of truth)
│   ├── theme.ts / utils.ts
├── src/middleware.ts         # Route protection (withAuth)
├── prisma/schema.prisma      # Postgres schema
└── tests/                    # Vitest (simulator + curriculum integrity)
```

Key architectural decisions (documented intent):

- **Curriculum engine:** per-day modules lazily loaded via `import()`, merged through
  `buildLesson()` in `src/lib/curriculum/core.ts`. C/ASM days are hand-written data;
  Python/C++ are generated from blueprints. Content is data, not UI.
- **Progress:** Zustand per-track stores persisted to `localStorage`, debounce-synced to
  `/api/progress`. Server is the source of truth for certificates.
- **Execution:** `/api/execute` prefers Piston (real compilers) when `PISTON_AUTH_TOKEN`
  is set; falls back to the in-browser simulator. The `real` flag is returned so the UI
  never misrepresents simulation as compilation.
- **Identity:** Auth.js v4 (NextAuth) credentials + bcrypt, JWT session strategy.
- **Design:** black & white, token-driven CSS variables; Space Grotesk/Inter/JetBrains Mono
  self-hosted; no color accents except semantic red.

---

## 3. Critical Technical Debt

- **[x] README.md was stale** — rewritten (2026-08-16) to describe the actual AstaHub
  product: live tracks, auth/data layer, real+simulated execution, tests, CI.
- **[x] Pre-audit uncommitted work protected** — the 08-12/08-13 passes (37 hand-written
  days, framer-motion cut, vitest harness, CI, curriculum de-heavying, quiz-ID fix) are
  now committed in four logical commits.
- **[!] `next start` middleware EvalError on Node 24** — `withAuth` from next-auth in the
  edge middleware sandbox throws `EvalError: Code generation from strings disallowed` on
  Node v24.14.1 in some runs; dev mode and `next build` are unaffected, and one clean
  rebuild appeared to resolve it. Action: pin CI/dev runtime to Node 20/22, and re-verify
  `next start` after every clean build.
- **[x] Duplicate generated exercise IDs** — python/cpp quiz generators now derive IDs
  from `quizzes.length + 1`; covered by `tests/curriculum.test.ts`.
- **[x] `<img>` → `next/image` lint warnings** — cleared in leaderboard + ProfileClient.

---

## 4. Bugs

- **[x] `completeDay` double-awarded XP in the store** — `src/lib/store.ts` now guards:
  XP is only awarded when the day was not already completed (committed).
- **[x] PWA manifest referenced missing icons** — `public/icon-192.png` and
  `public/icon-512.png` now exist (committed).
- **[!] `metadataBase` / brand URLs point to `https://asta100.dev`** — needs confirmation
  against the real deployed domain (P3).
- **[!] `getLevelForDay` vs `levelFromXp` divergence** — lessons derive tier from day
  ranges; the store derives level from XP. A learner who completes day 30 has XP level
  "initiate" but lesson tier "apprentice" — cosmetic today, confusing in reports (P3).

---

## 5. Security

- **[x] `/api/execute` abuse protection** — now has a 128 KB body cap, 50 KB code cap,
  30 req/min/IP rate limit, JSON parse guard, 429/413 responses (committed).
- **[x] `/api/register` validation + throttle** — email format, name 2–60 chars, password
  ≤128 chars, 5 req/10min per IP (committed).
- **[x] `/api/progress` server-side validation** — new `src/lib/progressValidation.ts`
  clamps XP/streak/currentDay, sanitizes+dedupes `completedDays` per track, and derives
  `level` from XP server-side; client can no longer inflate leaderboard/level (committed).
- **[~] Certificate issuance is completion-only** — a certificate is issued purely on
  `completedDays` coverage. Per the vision this is honest-but-thin; deepen later with
  exercise/mastery evidence (P4).
- **[x] Passwords** — bcrypt (cost 10), hashed at rest, never logged.
- **[x] Secrets** — `.env.local` is gitignored; `.env.example` has placeholders only;
  CI uses dummy env values.
- **[x] CSRF** — credentials flow via NextAuth's built-in protection; state-changing API
  routes require a session.
- **[ ] Redis (Upstash) rate limiting** — the in-process limiter is single-instance;
  move to Redis before multi-instance deploy (P1, see §16).

### Execution backend note (2026-08-16)

- **[!] Public Piston API (`emkc.org`) is now whitelist-only (as of 2026-02-15)** — the
  configured `PISTON_AUTH_TOKEN` no longer authorizes the public endpoint; it returns 401.
  The app degrades gracefully to the in-browser simulator (verified: `/api/execute` returns
  `real: false` with simulated output). **Action (High):** run a self-hosted Piston instance
  and point `PISTON_AUTH_TOKEN`/API URL at it for real compilation across all four languages.
  Until then C++ cannot run for real (no in-browser C++ simulator; the fallback now says so
  explicitly).

---

## 6. Performance

Done and verified:

- **[x]** framer-motion cut from 8 non-landing files (~40 kB gzipped saved per page)
- **[x]** curriculum page ships only `LessonMeta` (338 kB → ~5 kB route)
- **[x]** self-hosted fonts (no `next/font/google` build-time network hangs)
- **[x]** lazy-loaded day modules + Monaco on CDN (jsdelivr)
- **[x]** `optimizePackageImports: ["framer-motion", "lucide-react"]`
- **[x]** sitemap via `postbuild: next-sitemap`

To watch:

- **[ ]** Home First Load ~137 kB — re-measure after next dependency changes (Medium)
- **[ ]** Verify `next start` cold-start + DB (Neon cold-start ~8 s first call) (Medium)
- **[ ]** Monaco remains a heavy client chunk; confirm `@monaco-editor/react` lazy import
  is still splitting correctly (Low)

---

## 7. Core Learning Engine

- **[x]** Lesson model: theory sections, playground, exercises, optional assignment
- **[x]** XP rewards, day completion, streak calculation
- **[x] Exercise gating: code challenges verify `expectedOutput` before "Mark Complete"**
  (applies where `expectedOutput` exists — all hand-written C days that declare it)
- **[x] `expectedOutput` added to generated Python/C++ code challenges** — new
  `PY_EXPECTED_OUTPUT` / `CPP_EXPECTED_OUTPUT` maps in `src/lib/curriculum/{python,cpp}/core.ts`
  wire real runtime output into every deterministic code challenge. Python: 24/40 days gated,
  each verified reproducible by the in-browser simulator (works in both real and simulated
  mode). C++: 38/40 days gated (real compiler only — there is no in-browser C++ simulator yet;
  day 6 needs stdin, day 34 is a multi-file stub). **Simulator fixes landed in the same pass:**
  `sorted(..., reverse=True)` honored, `json.dumps` now emits Python-style separators
  (`", "`/`": "`), and the C++ fallback no longer fakes NASM output — it returns an honest
  "no in-browser C++ simulator" message.
- **[ ]** Concept/graph model, prerequisites, difficulty, skills, objectives (P2 — see §14)
- **[ ]** Spaced repetition + rainchecks (P4 — vision §4.3)
- **[ ]** AI hint-ladder coach (P7 — vision §16)

---

## 8. Curriculum

| Track | Days | Status | Notes |
|---|---|---|---|
| C | 100 (days 1–50 C, 51–100 ASM) | `[x]` live | All hand-written |
| x86-64 Assembly | (within C track) | `[x]` live | Days 51–100 |
| Python | 40 | `[x]` live | Generator-built; code challenges gated (24/40 `expectedOutput`, sim-reproducible) |
| C++ | 40 | `[x]` live | Generator-built; code challenges gated (38/40 `expectedOutput`, real-compiler path) |
| JavaScript / TypeScript | — | `[ ]` planned | Next language per vision (tracks.ts `planned`) |
| Rust | — | `[ ]` planned | |
| SQL & Databases | — | `[ ]` planned | |
| Bash / Linux / Git | — | `[ ]` planned | |
| Mathematics / Physics / EE / ML / Security / Full-stack / Ops | — | `[ ]` planned | Sciences group |

- **[x]** Curriculum page de-heavied (server component + `getLessonMetadata()`)
- **[x]** `TOTAL_TRACKS` + track-aware lesson loading in `src/lib/curriculum/index.ts`
- **[ ]** JS/TS track end-to-end (content + store + `/api/execute` mapping + templates) (High)

---

## 9. Assessment

- **[x]** Quiz recall checks (multiple choice, XP on correct)
- **[x]** Code exercises with run-and-verify where `expectedOutput` exists (all tracks now)
- **[x]** Assignments with rubric + XP (self-submitted)
- **[ ]** Server-side exercise/assignment verification (currently client-only)
- **[ ]** Mastery evidence model (capstone results, review performance) (P4)
- **[ ]** Adaptive difficulty / retry tracking (P4)

---

## 10. Gamification

- **[x]** XP, levels (initiate→master), streaks, achievements, leaderboard, certificates
- **[~]** Achievements are per-track static sets; consider data-driven achievements (Medium)
- **[ ]]** XP integrity on the server (tie to §5 `/api/progress` hardening) (P0–P1)
- **[ ]]** Skill trees / badges tied to demonstrated mastery (P5, vision §4.2)

---

## 11. Learner Identity

- **[x]** Profile (name, bio, avatar URL), settings, account delete, journey export
- **[x]** Track-aware dashboard + `TrackJourney` for python/cpp
- **[~]** Avatars are URL-only (no upload yet — R2 planned) (Medium)
- **[ ]** Public/private visibility controls + portable skill portfolio (P4, vision §6)

---

## 12. Certificates

- **[x]** Auto-issued on full-track completion (`/api/progress`), per `(userId, track)`
- **[x]** `/certificates` page + print, listed in `/api/me` and `/api/export`
- **[ ]]** Verification page / public certificate links + revocation (P4, vision §6)
- **[ ]]** Issuance based on mastery evidence, not only completion (P4)

---

## 13. Community

- **[ ]]** Posts, Q&A, groups, chat — NOT started (P6). Deliberately deferred until the
  learning core is strong. When built: moderation, reporting, permissions, anti-spam.

---

## 14. AI

- **[ ]]** Hint ladders, rainchecks, misconception detection (P7) — requires the evidence
  model from §9 to avoid fake personalization (vision §2.2, §16).

---

## 15. Knowledge Graph

- **[ ]]** Concept graph with prerequisites/related/skills (P8). The current schema has no
  concept model; `tracks.ts` is the only cross-track structure. Add data models first,
  graph later (vision §3.3, §18).

---

## 16. Infrastructure

- **[x]** Postgres (Neon) + Prisma, Auth.js credentials, bcrypt
- **[x]** CI (GitHub Actions: lint → tsc → test → build on Node 20)
- **[~]** `next-sitemap` regenerated on build; confirm `robots.txt` + sitemap correctness
- **[ ]]** Redis (Upstash) for rate limiting / leaderboards (P1, required by §5)
- **[ ]]** Cloudflare R2 for avatar/uploads (Medium)
- **[ ]]** Observability (Sentry/OpenTelemetry) + structured logs (P9)
- **[ ]]** Turborepo monorepo split (deferred; not needed at current scale)

---

## 17. Testing

- **[x]** Vitest harness (`npm test` / `test:watch`)
- **[x]** `tests/simulator.test.ts` — 20 pinned scenarios (C + Python + ASM)
- **[x]** `tests/curriculum.test.ts` — integrity for all 180 lessons + generated code-challenge
  verification (python `expectedOutput` must be simulator-reproducible; cpp must be non-empty)
- **[x]** `tests/store.test.ts` — XP award/double-award guards, per-track isolation
- **[ ]]** API route tests (register validation, progress hardening, leaderboard shape) (High)
- **[ ]]** E2E learner journey (register → lesson → exercise → XP → certificate) (Medium)

---

## 18. Deployment

- **[~]** Vercel-ready config (`next.config.mjs`, `next-sitemap`, PWA manifest)
- **[ ]]** Actual production deployment + env var wiring (DATABASE_URL, NEXTAUTH_SECRET,
  PISTON_AUTH_TOKEN) (High)
- **[ ]]** PWA service worker (manifest exists; no offline support yet) (Medium)
- **[ ]]** Runtime pin: Node 20/22 to avoid the middleware EvalError (§3) (High)

---

## 19. Future Vision

The long-term roadmap is documented in `VISION.md`. This file tracks engineering only.
Order of the next major phases (see also §3–§18):

1. **P0 fixes** (§4 bugs, §5 security): store XP guard, manifest icons, `/api/execute`
   hardening, `/api/progress` server-side validation, rate limiting.
2. **Documentation truth** (§3): rewrite README, refresh `.env.example` commentary.
3. **Foundation hardening** (§1): runtime pin, prod deploy readiness.
4. **Learning engine depth** (§7–§9): ~~`expectedOutput` for python/cpp~~ (done 2026-08-16),
   ~~store tests~~ (done), API tests.
5. **Breadth** (§8): JavaScript/TypeScript track.
6. Then the vision phases (community → AI → graph) in order.

---

## Prioritized Backlog

| # | Priority | Item | Status |
|---|----------|------|--------|
| 1 | Critical | Guard `completeDay` against double XP | `[x]` done |
| 2 | Critical | `/api/progress`: validate/clamp server-side, compute level | `[x]` done |
| 3 | Critical | `/api/execute`: size/rate limits | `[x]` done |
| 4 | High | PWA icons (192/512) | `[x]` done |
| 5 | High | `/api/register` validation + throttle | `[x]` done |
| 6 | High | README rewrite | `[x]` done |
| 7 | High | `expectedOutput` for python/cpp code challenges | `[x]` done (2026-08-16) |
| 8 | High | Store unit tests + API route tests | `[x]` store tests done; API tests open |
| 9 | High | JS/TS track | `[ ]` open |
| 10 | High | Runtime pin Node 20/22 + prod deploy | `[ ]` open |
| 11 | High | Self-hosted Piston (public API is whitelist-only; C++ can't run for real until then) | `[ ]` open |
| 12 | Medium | Redis rate limiting / leaderboard caching | `[ ]` open |
| 13 | Medium | Track-agnostic achievements (data-driven) | `[ ]` open |
| 14 | Medium | PWA offline support (service worker) | `[ ]` open |
| 15 | Low | `metadataBase` domain confirmation | `[ ]` open |
| 16 | Low | Tier model reconciliation (day vs XP) | `[ ]` open |
