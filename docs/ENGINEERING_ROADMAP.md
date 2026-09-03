# ENGINEERING_ROADMAP.md

> **Living technical roadmap for AstaHub.** Every meaningful change to the repository is
> reflected here. Status legend: `[ ]` Planned · `[~]` In Progress · `[x]` Completed · `[!]` Blocked.
> Priorities: **Critical → High → Medium → Low**.
>
> Last full audit: 2026-08-16. This file is the source of truth for what exists, what is
> broken, and what comes next. Read it before large work.

---

## 1. Current State

**What this is today:** a production-shaped **Vite + React** learning platform (migrated 2026-09-03 from Next.js 15 for speed/stability) with **eight live
tracks** (C, x86-64 Assembly, Python, C++, JavaScript/TypeScript, Rust, SQL & Databases,
Bash/Linux/Git), a working account/progress/achievement/certificate system, a Monaco
playground with real (Piston) and simulated execution, **a live community layer
(learnings feed, Q&A, study groups with realtime chat, moderation)**, **a Phase 3 Live layer
(scheduled live classes/office hours/live-coding events hub, a live room with realtime chat,
and an honest env-gated YouTube export engine)**, and a self-hosted black-and-white
editorial UI. All 340 lessons
(100 C/ASM + 40 Python + 40 C++ + 40 JS/TS + 40 Rust + 40 SQL + 40 Bash) resolve cleanly;
tests, lint, typecheck and build are green.

**Verified at audit time (2026-08-17):**

- `npx tsc --noEmit` clean
- `npm test` → 139/139 passing (simulator + curriculum integrity + validation + community + live + youtube + coach)
- Clean `next build` green (39 routes incl. `/live/*` + `/api/coach`)
- 100 C/ASM day files are hand-written (≥5 KB each); Python/C++/JS/Rust/SQL/Bash are generator-built from
  blueprints (`src/lib/curriculum/{python,cpp,js,rust,sql,bash}/core.ts`)
- Community migration `20260816235719_community` applied to Neon; full authenticated E2E smoke green
- **Database is now Supabase Postgres** (all 4 migrations applied; realtime publications enabled on 10 tables) — live 2026-08-17

**Git state:** working tree clean. Main branch up to date with `origin/main`.

### Live routes (App Router)

| Route | Purpose | Auth |
|---|---|---|
| `/` | Landing (mission + HeroTerminal + tracks + stats) | public |
| `/tracks`, `/tracks/[slug]` | Knowledge-bank hub | public |
| `/curriculum` | C/ASM 100-day map (server-rendered metadata) | public |
| `/lesson/[day]` | C/ASM lesson | middleware-protected |
| `/lesson/{python,cpp,js,rust,sql,bash}/[day]` | Generated-track lesson | middleware-protected |
| `/playground` | Free Monaco workbench (8 languages) | public |
| `/signin` | Sign-in / register | public |
| `/community` | Community hub (feed/Q&A/groups overview) | public |
| `/community/feed`, `/community/questions`, `/community/groups` | Learnings feed, Q&A list, group list | public read; actions auth-gated |
| `/community/feed/[id]`, `/community/questions/[id]` | Post / question detail | public read; actions auth-gated |
| `/community/groups/[slug]` | Group realtime chat | middleware-protected |
| `/community/moderation` | Moderation queue | middleware-protected + mod-gated |
| `/live` | Live events hub (upcoming + past, countdowns) | public |
| `/live/[slug]` | Live event detail (countdown, stream/recording embed, mod controls) | public; mod actions mod-gated |
| `/live/[slug]/room` | Live room — embedded stream + realtime chat | public watch; chat POST authed |
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
| `/api/posts`, `/api/posts/[id]`, `/api/posts/[id]/vote`, `/api/posts/[id]/comments` | GET/POST/DELETE | mixed | Learnings feed |
| `/api/questions`, `/api/questions/[id]`, `/api/questions/[id]/answers`, `/api/questions/[id]/answers/[aid]/vote`, `/api/questions/[id]/answers/[aid]/accept` | GET/POST/PATCH | mixed | Q&A |
| `/api/comments` | GET/POST | mixed | Generic comments (post/question/answer) |
| `/api/groups`, `/api/groups/[slug]`, `/api/groups/[slug]/messages` | GET/POST/PATCH | mixed | Study groups + chat |
| `/api/reports`, `/api/reports/[id]` | GET/POST/PATCH | mod-gated | Reporting + moderation queue |
| `/api/live`, `/api/live/[id]` | GET/POST/PATCH/DELETE | mixed | Live events list/create (mod), update/delete (mod) |
| `/api/live/[id]/messages` | GET/POST | mixed | Live room chat (read public, post authed) |
| `/api/live/[id]/export` | POST | mod-gated | YouTube export engine (env-gated, honest fallback) |

### Data model (`prisma/schema.prisma`)

- `User` — identity + C-track progress + `role` ("user"/"mod") + `reputation`
- `UserTrackProgress` — per-track progress for python/cpp (`@@unique([userId, track])`)
- `Certificate` — issued on full-track completion (C on User, others via UserTrackProgress)
- Community: `Post`/`Comment`/`Vote`/`Question`/`Answer`/`Group`/`GroupMember`/`Message`/`Report`
  (migration `20260816235719_community`; cascading deletes, vote/membership unique guards)
- Live (Phase 3): `LiveEvent` (slug, type, track/lessonDay link, startAt, duration, host, YouTube
  stream/recording URLs, status) + `LiveEventMessage` (per-event room chat)
  (migration `20260817072833_live_events`; cascading deletes)

---

## 2. Architecture

```
Vite 8 + React 18 + React Router 7 + TypeScript (strict) + Tailwind CSS  (migrated 2026-09-03; Next.js retained as legacy fallback)
Powered by Prosperity Systems Hub (ps-hub.org)
├── src/app/                  # Pages + API routes (App Router)
│   ├── api/{register,auth,me,progress,leaderboard,password,export,execute}
│   ├── api/{posts,comments,questions,groups,reports}  # Community (Phase 2)
│   ├── lesson/[day]          # C/ASM
│   ├── lesson/{python,cpp,js,rust,sql,bash}/[day]
│   ├── community/            # feed, Q&A, groups+chat, moderation
│   ├── tracks, curriculum, dashboard, profile, achievements, leaderboard,
│   │   settings, certificates, playground, signin
├── src/components/           # Shared UI (CodePlayground, LessonView, Navbar, …)
│   └── community/            # Avatar, VoteButtons, ReportButton
├── src/lib/
│   ├── curriculum/           # Content engine (CORE + lazy day modules + python/cpp/js/rust/sql/bash)
│   ├── community.ts          # Pure community logic (voting, moderation, pagination)
│   ├── realtime.ts           # Supabase Realtime (graceful polling fallback)
│   ├── simulator.ts          # In-browser C/Python/ASM interpreter (regex-based)
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
| JavaScript / TypeScript | 40 | `[x]` live | Generator-built; code challenges gated (32/40 `expectedOutput`, real-runtime path) |
| Rust | 40 | `[x]` live | Generator-built; code challenges gated (32/40 `expectedOutput`, verified with rustc 1.97) |
| SQL & Databases | 40 | `[x]` live | Generator-built; code challenges gated (39/40 `expectedOutput`, verified with sqlite) |
| Bash / Linux / Git | 40 | `[x]` live | Generator-built; code challenges gated (22/40 `expectedOutput`, verified with Git Bash) |
| Mathematics / Physics / EE / ML / Security / Full-stack / Ops | — | `[ ]` planned | Sciences group |

- **[x]** Curriculum page de-heavied (server component + `getLessonMetadata()`)
- **[x]** `TOTAL_TRACKS` + track-aware lesson loading in `src/lib/curriculum/index.ts`
- **[x]** JS/TS track end-to-end (content + store + `/api/execute` mapping + templates) (done 2026-08-16)
- **[x]** Rust / SQL / Bash tracks end-to-end — **Phase 1 (Breadth) complete** (done 2026-08-17)

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

- **[x] Hint-ladder coach (Phase 4 slice 1)** — done 2026-08-17. `/api/coach` +
  `src/lib/coach.ts` (pure hint-ladder logic, validation, gating) + `src/lib/openrouter.ts`
  (plain-fetch chat client) + in-lesson `CoachPanel` UI. Enforces coach-never-oracle: the
  system prompt bans complete solutions, the 4-rung ladder (Clarify → Shrink it → Name the
  concept → Find the bug) is the only path to code, every reply is capped and ends with
  "Now write it yourself." Gated on `OPENROUTER_API_KEY` (real call verified live); until
  configured it returns an honest NOT_CONFIGURED. Rate-limited 10/min/IP.
- **[ ]** Rainchecks + adaptive review (P7) — spaced-repetition review of missed topics and
  periodic low-pressure reflection prompts; needs the evidence model from §9.
- **[ ]** Misconception detection — the coach observing attempt patterns across days (vision §4.3).

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
- **[x]** `tests/api.test.ts` — 16 tests on the extracted pure route logic: register
  validation (missing/type/length/email/password rules + normalization), leaderboard query
  parsing (defaults, clamps, track mapping — includes a negative-limit clamp fix), progress
  certificate completion predicate, rate-limit `clientIp`. The route handlers themselves are
  thin DB/session wrappers; their decision logic now lives in `src/lib/registerValidation.ts`,
  `src/lib/leaderboard.ts`, and `src/lib/progressValidation.ts` (all imported by the routes).
- **[ ]]** API route integration tests (register → persist, progress → certificate issuance,
  leaderboard shape) (Medium) — need a test DB or Prisma mocks
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
   ~~store tests~~ (done), ~~API route tests~~ (done 2026-08-16).
5. **Breadth** (§8): ~~JavaScript/TypeScript track~~ (done 2026-08-16),
   ~~Rust, SQL, Bash/Linux/Git~~ (done 2026-08-17) — **Phase 1 complete**.
6. **Community** (Phase 2): ~~posts, Q&A, groups+realtime chat, moderation~~ (done 2026-08-17).
7. **Live** (Phase 3): ~~events hub + live room + YouTube export engine~~ (slice 1 done 2026-08-17),
   then the recording pipeline (R2/Stream) and WebRTC live-coding room.
8. **AI Companion** (Phase 4): ~~hint-ladder coach~~ (slice 1 done 2026-08-17), then rainchecks
   + adaptive review (needs the evidence model from §9).
9. Then the remaining vision phases (sciences → dream) in order.

---

## 20. Live (Phase 3)

Slice 1 (events hub + room + YouTube export engine) done 2026-08-17.

- **[x]** **Live events hub** — `/live` schedule of live classes, office hours, live coding
  streams, and Q&As. `LiveEvent` model (slug, type, optional track/lessonDay link, startAt,
  duration, host, YouTube stream + recording URLs, status). Public hub + detail pages with
  clock-derived status (scheduled → live → finished — no background job needed), countdowns,
  Google Calendar "add to calendar", and YouTube embeds (youtube-nocookie). Mods (same
  `MODERATOR_EMAILS` whitelist as moderation) create/edit/cancel/delete via `/api/live`.
- **[x]** **Live room** — `/live/[slug]/room`: embedded stream (live or recording) + realtime
  per-event chat (`LiveEventMessage`, Supabase Realtime `postgres_changes` on INSERT with
  honest 4s polling fallback, never fake-live). Read is public; chat POST is authed.
- **[x]** **YouTube export engine** (`src/lib/youtube.ts`) — builds the exact `videos.insert`
  resource (lesson-linked title/description/tags) and gates publishing behind real OAuth env
  (`YOUTUBE_CLIENT_ID/SECRET/REFRESH_TOKEN`). Returns honest `NOT_CONFIGURED` / `NO_SOURCE`
  results until credentials + a recording pipeline exist; `/api/live/[id]/export` wires it in.
- **[~]** **Recording pipeline** — real file upload to YouTube requires a source file; lands
  with Cloudflare R2/Stream (vision §7.3). Until then exports of YouTube-hosted recordings are
  metadata-association only.
- **[ ]** **Live coding room (WebRTC P2P)** — true browser-to-browser live coding needs a
  signaling backend (Socket.io self-hosted or a TURN/STUN config). The honest current version
  is the YouTube-live stream + chat room above; P2P is deferred until the stack has signaling.

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
| 8 | High | Store unit tests + API route tests | `[x]` done (store + API, 2026-08-16) |
| 9 | High | JS/TS track | `[x]` done (2026-08-16) |
| 9b | High | Rust / SQL / Bash tracks (Phase 1 breadth) | `[x]` done (2026-08-17) |
| 10 | High | Runtime pin Node 20/22 + prod deploy | `[ ]` open |
| 11 | High | Self-hosted Piston (public API is whitelist-only; C++/JS/Rust/SQL/Bash can't run for real until then) | `[ ]` open |
| 12 | Medium | Redis rate limiting / leaderboard caching | `[ ]` open |
| 13 | Medium | Track-agnostic achievements (data-driven) | `[ ]` open |
| 14 | Medium | PWA offline support (service worker) | `[ ]` open |
| 15 | Low | `metadataBase` domain confirmation | `[ ]` open |
| 16 | Low | Tier model reconciliation (day vs XP) | `[ ]` open |
| 17 | Medium | Community (Phase 2): feed, Q&A, groups+realtime chat, moderation | `[x]` done (2026-08-17) |
| 18 | Medium | Provision a Supabase project so realtime chat/presence actually goes live | `[x]` done (2026-08-17) — DB moved to Supabase Postgres, realtime publications enabled on 10 tables; needs `NEXT_PUBLIC_SUPABASE_URL` + `ANON_KEY` to go live (polling fallback until then) |
| 19 | Medium | Phase 3 slice 1: live events hub, live room chat, YouTube export engine | `[x]` done (2026-08-17) |
| 20 | Medium | Phase 3: recording pipeline (Cloudflare R2/Stream) so exports can upload real files | `[ ]` open |
| 21 | Low | Phase 3: WebRTC P2P live-coding room (needs a signaling backend) | `[ ]` open |
| 22 | Medium | Phase 4 slice 1: AI hint-ladder coach on OpenRouter | `[x]` done (2026-08-17) |
| 23 | Medium | Phase 4: rainchecks + adaptive review (needs evidence model §9) | `[ ]` open |
