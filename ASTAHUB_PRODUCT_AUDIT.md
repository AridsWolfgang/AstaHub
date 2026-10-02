# ASTAHUB — Product Audit (2026-10-02)

Verified against the actual repo (`D:\LoneDevWolf\Projects\AstaHub`). Every claim references the responsible file.

## A. Already implemented

- **7 live tracks (Rust removed 2026-10-02):** C/ASM 100 days + 40-day Python/C++/JS/SQL/Bash — `src/lib/curriculum/index.ts`, `src/lib/curriculum/{python,cpp,js,sql,bash}/core.ts`, `src/lib/curriculum/days/day-*.ts`. 300 lessons.
- **Lesson engine:** theory + playground + quizzes + code + assignment per lesson — `src/components/LessonView.tsx`, `src/components/CodePlayground.tsx`.
- **Code execution:** Piston-backed `/api/execute` + honest simulated fallback — `server/index.ts`, `src/lib/simulator.ts` (C + Python subset real; cpp/js/sql/bash return honest "no simulator" message; output truncated at 20KB).
- **Auth:** email/password (bcrypt) + Google OAuth (code flow + One-Tap), JWT cookie — `server/index.ts:137-252`, `src/lib/auth.ts`, `src/lib/auth-client.tsx`.
- **Progress sync:** per-track stores + `PUT /api/progress` with server-side sanitize/level-derivation — `src/lib/store.ts`, `src/lib/progressValidation.ts`, `server/index.ts:316-345`.
- **Leaderboard / export / password / profile:** `server/index.ts:347-427`.
- **Community:** posts/votes/comments, Q&A with evidence-of-effort, groups+chat, reports — `server/index.ts:458-877`, `src/lib/community.ts`, `src/app/community/**`.
- **Live events:** hub + detail + room + YouTube export engine — `server/index.ts:879+`, `src/lib/live.ts`, `src/lib/youtube.ts`, `src/app/live/**`.
- **AI coach (hint ladder, never-oracle):** `src/lib/coach.ts`, `src/lib/openrouter.ts`, `server/index.ts:/api/coach`, `src/components/coach/CoachPanel.tsx`.
- **Certificates (auto-issue), achievements, dashboard, playground, tracks hub:** `server/index.ts:issueCertificateIfComplete`, `src/lib/achievements.ts`, `src/app/dashboard`, `src/app/playground`, `src/lib/tracks.ts`.
- **Knowledge graph / skill tree / review scheduling foundations:** `src/lib/knowledgeGraph.ts`, `src/lib/skillTree.ts`, `src/lib/review.ts`, `src/lib/raincheck.ts`.
- **Build green:** Vite 8 + React 18 + Express 4 + Prisma 6; `npm test` 139+ tests (`tests/`).

## B. Partially implemented

- **Simulator:** only C + Python subset (`src/lib/simulator.ts`). C++/JS/SQL/Bash honest fallback. No timeout/memory model in-sim.
- **PWA/offline baseline present, curriculum offline missing:** `public/manifest.webmanifest` +
  icons + `public/sw.js` (network-first navigation, cache-first assets, `/api/*`
  bypassed), registered in prod (`src/main.tsx:14-16`). App-shell works offline;
  no per-lesson download, no offline action queue, no sync/conflict handling.
- **Certificates:** issued + listed (`src/app/certificates`), verification helper admits "no verification service" (`src/lib/certificate.ts:76`).
- **Notifications:** none (no model, no center, no prefs).
- **Review:** scheduling helpers exist (`src/lib/review.ts`) but no Review UI/route/API.
- **Search:** client-side filter only (`src/components/CurriculumBrowser.tsx`); no global search API.
- **Admin:** moderation queue only (`src/app/community/moderation`); no users/curriculum/analytics admin.
- **Analytics:** event helper exists (`src/lib/analytics.ts`?) but no backend table/endpoints/dashboards.
- **i18n:** English strings hardcoded throughout `src/app/**`.

## C. Broken / known issues

- Public Piston (`emkc.org`) whitelist-only 401 since 2026-02-15 → C++/JS/SQL/Bash cannot run for real without self-hosted Piston (`server/index.ts:81`, `AGENTS.md` backlog #11).
- Certificate verification openly unbacked (`src/lib/certificate.ts:76`).

## D. Architecturally weak

- **Monolith Express in one file:** `server/index.ts` ~1100 lines — all domains inline. No versioning (`/api/v1`), no routers, no request-ids, no structured logging.
- **Business logic in components:** XP/streak/progress math split between `store.ts` and components; `LessonView.tsx` (~600 lines) mixes gating + UI.
- **No `apps/`/`packages/` monorepo:** web+api share `src/`; mobile would duplicate logic. No shared `api-client`/`types` packages.
- **Prisma schema:** stringly-typed `role/status/track/type` (no enums), no Notification/Review/Analytics models, `completedDays Int[]` unindexed patterns, `User` fat model (`prisma/schema.prisma`).
- **No content versioning:** curriculum is code (`core.ts` blueprints); editor edits = deploys; learner records reference day numbers only.

## E. Missing (launch-critical)

Notifications engine + center + prefs · Review UI + API + reminders · Global search API · Public certificate verification page · `/health`+`/ready` · Versioned API (`/api/v1`) + consistent errors + request IDs · Admin (users/roles/content/analytics) · Product analytics pipeline · Password reset + email verification + session management · Offline queue + sync + conflict handling · Mobile app (`apps/mobile`) + shared contracts.

## F. Security risks

- `/api/execute` (`server/index.ts:96-135`): SSRF via `PISTON_API_URL` env is operator-controlled (ok) but no per-language timeouts, no output byte cap on Piston path, error text echoed; rate limit in-process only (`src/lib/rateLimit.ts`) — multi-instance bypass.
- JWT in cookie (`cookieOpts` lax, secure only in prod) — no rotation/revocation list, no brute-force progressively-backed lockout beyond rate limit.
- Moderation by email whitelist (`MODERATOR_EMAILS`) — no roles in DB beyond `user|mod` string.
- `console.warn/error` in server paths leak internals to logs only (not clients — ok), but raw Prisma errors could surface on unhandled paths; add error-masking middleware.
- No upload path today (good); YouTube/Google fetch paths need timeouts.

## G. UX problems

- No "What should I do right now?" home — `/` is marketing landing, `/dashboard` is stats grid; no Continue-Learning / due-review / goal plumbing (`src/app/page.tsx`, `src/app/dashboard/page.tsx`).
- Lesson pages are long scrolls; no Understand→Try→Prove staging (`LessonView.tsx`).
- Code editor desktop-Monaco only; no mobile bottom-sheet output model (`CodePlayground.tsx`).
- Empty/loading/error states inconsistent across community/live/playground.
- Router has a catch-all `/lesson/:track/:day → /` redirect (`src/App.tsx`); `/lesson/rust/:day` explicitly redirects to `/tracks` (backward compat for the removed track).

## H. Performance problems

- Curriculum integrity test imports all lessons (slow on 4-thread machines); day chunks are code-split but `getTrackLessons` loads full 40-lesson bodies at once.
- Monaco via CDN; no lazy edit-on-mobile strategy.
- No bundle budget enforcement; framer-motion kept for landing only (good) but still in deps.

## I. Scalability risks

- In-process rate limit (no Redis); polling chat (4s) instead of Realtime until Supabase keys set (`src/lib/realtime.ts`).
- `GET /api/live` over-fetches `limit*3` then filters in memory.
- Leaderboard `take: limit` without cursor pagination.

## J. Mobile blockers

No mobile app; web editor not thumb-usable; tables/grids untested at 320–414px; no touch-target pass; no offline; no push/deep-link contracts.

## K. Launch blockers

1. Rust removal — DONE 2026-10-02 (seven tracks, 300 lessons; `/lesson/rust/:day` → `/tracks`). 2. Self-hosted Piston or honest "simulated" labeling everywhere (already honest — keep). 3. `/health`+`/ready` — DONE 2026-10-02 (`server/index.ts`), plus 8–10s outbound fetch timeouts and 20KB execution output cap. 4. Password reset + email verification (or document disabled). 5. Certificate verification page or remove claims. 6. Backups/rollback runbook. 7. Privacy/export/delete verified (export+delete exist — verify). 8. Rust search clean + `npm run lint && npm test && npm run build` green — DONE 2026-10-02 (146/146, tsc + lint + build green).

## L. Post-launch (deprioritize)

Adaptive difficulty, career roadmaps, portfolio URLs, full-text/Meilisearch, R2/Stream recording pipeline, WebRTC live coding, multi-language i18n, humanities/arts content.
