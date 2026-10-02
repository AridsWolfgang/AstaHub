# ASTAHUB — Architecture (2026-10-02)

Seven live tracks, 300 lessons. C/x86-64 Assembly (100 days) + Python/C++/JS-TS/SQL/Bash (40 each).
No Rust — removed 2026-10-02 (see AGENTS.md progress log). Stack: Vite 8 + React 18 + React Router 7,
Express 4 API (`server/index.ts`), PostgreSQL via Prisma 6, JWT-cookie auth, PWA baseline.

## 1. Runtime layout (today — monolith, deliberately)

```text
Browser (Vite SPA, dist/)
  → /api/* proxied in dev (vite.config.ts) to Express :4000
Express (server/index.ts, single file ~1100 lines)
  → Prisma → PostgreSQL (Supabase/Neon)
  → Piston (self-hosted URL via PISTON_API_URL, optional token) for real execution
  → OpenRouter (optional) for the AI coach
  → Google OAuth (optional)
```

No monorepo yet. Do NOT split into `apps/*/packages/*` until mobile exists — the
current `src/lib/*` pure modules ARE the future packages (see §5). Splitting now
adds tooling cost with zero consumers.

## 2. Web client (`src/`)

- **Pages** `src/app/**` mounted by `src/App.tsx` (React Router). Lesson routes are
  `Protected` (redirect to `/signin`); `/lesson/rust/:day` redirects to `/tracks`
  (backward compat for the removed track).
- **State** `src/lib/store.ts`: one zustand store per track (`asta-*-progress`,
  localStorage-persisted) + debounced 800ms `PUT /api/progress` sync when
  `asta-100days-synced` is set; `hydrateFromServer()` on session load
  (`src/components/SessionProvider.tsx`). Progress survives reload/offline; server
  is authoritative for XP/level (derived via `levelFromXp`, never trusted).
- **Curriculum** `src/lib/curriculum/`: C/ASM = 100 lazy `day-N` modules + `core.ts`
  builder; python/cpp/js/sql/bash = `core.ts` blueprints + `index.ts` loaders.
  `getTrackLesson(s)` / `getTrackTotalDays` are the only access points — UI never
  imports day files directly. Adding a track = new `core.ts` + 3 functions in
  `index.ts` + union members in `types.ts` (content operation, not rewrite).
- **Learning UI** `src/components/LessonView.tsx` (theory/playground/exercises/
  assignment tabs, `expectedOutput` gates "Mark Complete"), `CodePlayground.tsx`
  (Monaco + run/output, Live vs Simulated badges), `TrackJourney.tsx` (per-track
  progress grid), `CoachPanel.tsx` (hint ladder UI).
- **PWA** `public/manifest.json` + `public/sw.js` (network-first nav, cache-first
  assets, `/api/*` bypassed) registered in prod (`src/main.tsx`). Baseline
  app-shell offline; per-lesson download queue + sync is roadmap, not built.

## 3. API (`server/index.ts` — one file, domain-grouped)

| Domain | Routes |
|---|---|
| Execute | `POST /api/execute` (Piston w/ simulator fallback; 30/min/IP; 50KB code cap; output truncated) |
| Auth | `POST /api/register`, `/api/auth/signin`, `/api/auth/signout`, Google code-flow + One-Tap, `GET/PATCH/DELETE /api/me`, `POST /api/password`, `GET /api/export` |
| Progress | `PUT /api/progress` (sanitize + server-derived level + auto-certificate), `GET /api/leaderboard?track&limit` |
| Community | posts/votes/comments, questions/answers/accept, generic comments, groups join/leave + messages, reports + moderation actions |
| Live | `GET/POST /api/live`, `PATCH/DELETE /api/live/:id`, messages, `/export` (YouTube metadata, gated) |
| Coach | `POST /api/coach` (10/min/IP, 503 when unconfigured) |
| Ops | `GET /health` (liveness), `GET /ready` (DB check) |

Conventions: JWT from `token` cookie (httpOnly, lax, secure in prod) or
`Authorization: Bearer`; mod gate = `MODERATOR_EMAILS` whitelist via
`canModerate()` (`src/lib/community.ts`); validation lives in pure
`src/lib/*Validation|*.ts` modules with unit tests (`tests/`), handlers stay thin.
In-process sliding-window rate limits (`src/lib/rateLimit.ts`) — Redis when
multi-instance. No `/api/v1` versioning yet: add it when the mobile app lands
(keep unversioned routes as aliases).

## 4. Data (`prisma/schema.prisma`)

`User` (auth + C-track progress on the row) · `UserTrackProgress @@unique([userId, track])`
(track is a free string; `rust` rows are inert — whitelist rejects them) ·
`Certificate` · community (`Post Comment Vote Question Answer Group GroupMember Message Report`)
· live (`LiveEvent LiveEventMessage`). Missing (do not fake): Notification, Review,
AnalyticsEvent models — add with migrations when those features land, never sooner.

## 5. Domain modules (the future packages — keep pure, no React, no Prisma)

```text
src/lib/curriculum/*  → packages/curriculum     (lesson builders, blueprints)
src/lib/simulator.ts  → packages/simulator       (C/ASM/Python subset; honest fallback)
src/lib/{coach,review,skillTree,knowledgeGraph,
  achievements,analytics}.ts → packages/learning-engine
progressValidation/leaderboard/registerValidation/
  rateLimit/community/live → packages/api-shared (validation + API contracts)
src/lib/types.ts      → packages/types           (Language/TrackKey/Lesson/Progress)
```

Rule: business logic goes here, never in components. `server/index.ts` imports them;
`apps/mobile` will import the same packages — one backend, one learning engine.

## 6. Execution security model (as built)

```text
Client → POST /api/execute {code≤50KB, language∈allowlist}
  → rate limit → Piston (optional token, 5s run_timeout, 8s fetch timeout)
  → output truncated to 20KB → {output, error, real:false|true}
  → fallback: simulateAnsi() (C/ASM/Python real subset; others honest "no simulator")
```

UI MUST render `real` as Live/Simulated (`CodePlayground.tsx` badges). Never execute
untrusted code in the API process. Next hardening (when self-hosting Piston):
per-language timeouts, execution queue, output sanitization, telemetry.

## 7. Auth & security posture

bcrypt (10 rounds) · JWT 30d cookie · Google OAuth (state cookie + audience check) ·
register 5/10min, signin 10/min, execute 30/min, coach 10/min · `sanitizeProgress`
clamps XP/streak/days and derives level server-side · mod-only routes server-gated ·
helmet + 128KB JSON cap + `trust proxy`. Open items: password reset, email
verification, session revocation list, Redis rate limits (see audit §K).

## 8. Mobile strategy (when, not now)

`apps/mobile` (Expo) consuming the same API + `packages/*` above. Web must not be
reshaped for mobile prematurely — but all new learning logic stays in `src/lib`
(not components) so it ports for free. Contracts to freeze at mobile kickoff:
auth (cookie → bearer), `/api/v1` versioned aliases, track/lesson/progress types,
offline queue format (local action → queue → sync → conflict resolution).

## 9. Deployment & ops

Cloudflare → static `dist/` + Node running `server/index.ts` (`tsx`/compiled) →
Postgres (managed) → optional Piston + Redis later. `GET /health|/ready` for
probes. Backups/retention/rollback: provider PITR (document runbook before launch).
CI (`.github/workflows/ci.yml`): install → lint → typecheck → tests → build.
Envs: `.env.example` is authoritative; never commit secrets.

## 10. What NOT to build yet

Notifications, review UI, global search, certificate verification portal, admin
console, analytics pipeline, content versioning, i18n — all documented in
`ASTAHUB_PRODUCT_AUDIT.md` §E/L with the files that will own them. Build on
evidence of demand, in that order.
