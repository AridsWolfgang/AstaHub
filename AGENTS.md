# AGENTS.md

Persistent memory for working on this project. Read this first.

## Project identity

- **Name:** AstaHub (formerly "Asta 100 Days of C" / asta-100)
- **Mission:** Free, hands-on, world-class technical education for every person on Earth. Learning should be fun, social, human — and free forever.
- **Location:** `D:\🐺 LoneDevWolf\Projects\Asta_100Days_of_C`
- **Vision doc:** `VISION.md` (the full plan: pedagogy, knowledge bank, community, economics, money-from-skills, roadmap). Read it before large work.
- **Original notes:** `PLANS.md` (the seed; VISION.md expands it).

## Current state (as of 2026-08-06)

- Working production app: 100-day C/x86-64 Assembly curriculum, dashboard, playground (Monaco on CDN), achievements, Piston-backed `/api/execute` with an in-browser simulated fallback.
- Curriculum split into `src/lib/curriculum/` — lazy-loaded per-day modules + `core.ts` blueprints. 63 hand-written days (1–61, 81, 100); rest procedurally generated.
- New simulator `src/lib/simulator.ts` (C + ASM) — recently fixed and verified: for loops, if/else-if/else chains, arrays, pointers, bitwise, inc/dec, compound assignment, `} else {` handling. No function-call/struct/scanf modeling (best-effort fallback).
- Performance work done: self-hosted fonts, `LazyScene3D`, lazy curriculum, `optimizePackageImports`, sitemap (`postbuild: next-sitemap`). Home First Load ~137 kB.
- Everything builds green: `npm run build` (works after `Remove-Item -Recurse -Force .next`).
- Auth & data layer live: Postgres (Neon) + Auth.js credentials + bcrypt, register/signin/profile/leaderboard APIs, middleware route protection, progress sync via `/api/progress`. See progress log for the known `next start` middleware EvalError on Node 24 (dev mode works).

## Design direction (APPLIED — keep going in this direction)

- **Applied.** The UI is now **pure black & white minimalism with mature energy** — black bg (`#000000`), white as the sole accent, hairline borders, typography-driven, content-first. All old accent colors are remapped to monochrome: `cyber-cyan` = white, `cyber-dark` = black, `matrix` = neutral gray ramp, tier colors = grayscale peaking at white for Master. Only `cyber-red` remains, for errors (semantic). Landing page is ONE section: mission headline + interactive typing terminal + expandable principles + hoverable 100-day tier strip + stats + closing mission line.
- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono (code) — all **self-hosted** in `public/fonts/` via `@font-face` (no `next/font/google`, which was causing flaky build-time network hangs).
- **Black-and-white energy rule:** monochrome only. White marks the current action/state and the top tier. Red is reserved for errors. Never reintroduce color accents on new pages/components.
- **Theme system:** dark is default; a light theme exists (`data-theme="light"` on `<html>`, `localStorage["asta-theme"]`). All colors run through CSS variables (`--bg`, `--fg`, `--text-a/b/c`, `--surface`, `--line`, `--danger`, `--tier-1..5`) mapped in `tailwind.config.ts` via `rgb(var(--x) / <alpha-value>)`. Use token classes (`text-white`, `gray-*`, `border-white/5`, `cyber.*`), never hard-coded hex, so new UI stays theme-safe. Tier colors are `var(--tier-N)` — never concatenate alpha suffixes onto them; use `color-mix(in srgb, var(--tier-N) X%, transparent)`.
- Reference sites: Linear, Stripe, Notion, Vercel, Typeform, The Odin Project, freeCodeCamp; galleries: lapa.ninja/category/education, a1.gallery/websites/minimal-landing.

## Tech stack (planned — not yet migrated)

- **Now:** Next.js 14 App Router, React, TypeScript, Tailwind, PWA manifest.
- **Phase 0 (next):** PostgreSQL + Prisma, Auth.js, Redis (Upstash), Cloudflare R2 — for accounts, profiles, progress, leaderboards, certificates.
- **Later:** Pyodide, Socket.io realtime, Cloudflare Stream + YouTube, Vercel AI SDK hint-ladder coach, Meilisearch.
- See VISION.md §7.3 for the full table.

## Roadmap (phases)

| Phase | What | Why this order |
|-------|------|----------------|
| **0 — Foundation** | Redesign (minimal theme), accounts, profiles/avatars, progress sync, leaderboard, certificates | Turns a course into an institution; nothing works without identity |
| **1 — Breadth** | Python, then JS/TS, then Rust through the same engine | Max knowledge-per-effort; validates the "hub" idea |
| **2 — Community** | Posts, Q&A, groups, chat — moderation budgeted | Human layer; makes learning social and sticky |
| **3 — Live** | Live coding, YouTube export, live classes | The "real human feeling" |
| **4 — AI Companion** | Hint ladders, rainchecks, adaptive review | The differentiator; deserves focus |
| **5 — The Sciences** | Math, physics, EE, ML/AI, security, full-stack tracks | Content projects on a proven engine |
| **6 — The Dream** | Humanities, arts, the rest of human knowledge | After technical excellence |

Full detail: VISION.md §12.

## Build & verify commands (Windows / pwsh)

- Dev: `npm run dev`
- Clean prod build: `Remove-Item -Recurse -Force .next; npm run build` (postbuild regenerates sitemap)
- Run prod: `npm run start`
- Quick simulator iteration: `node node_modules\typescript\bin\tsc src\lib\simulator.ts --outDir C:\Users\ok\AppData\Local\Temp\opencode\simtest --module commonjs --target es2020 --moduleResolution node` then copy to `simulator.cjs`; run scenarios via `C:\Users\ok\AppData\Local\Temp\opencode\simtest\test2.cjs`.
- API smoke test: start `npx next start -p 3999`, `POST /api/execute` with `{code, language}`; kill node afterwards.
- Note: PowerShell console mangles UTF-8 box-drawing chars (──, —) — it's terminal rendering, not a bug. Verify bytes when unsure.

## Progress log

Track significant work here as it happens. Format: date — what was done — outcome.

- 2026-08-06 — **Logo refactor + navbar polish (applied).** New reusable `src/components/Logo.tsx`: `LogoMark` (inline SVG replicating `public/favicon.svg` — black rounded square + white monospace "A", theme-safe) + `Logo` (Link to `/` with wordmark + optional tagline). `public/favicon.svg` updated to monochrome (was cyan `#00f0ff`). Navbar now uses `Logo`; mobile drawer polished: body scroll-lock while open, Escape closes, authed users get a name/email chip + "Account" section (Profile/Leaderboard/Sign out), guests get a "Getting started" panel with sign-in CTA, stats bar kept. Footer + signin page now use `LogoMark` instead of lucide `Cpu`. `npx tsc --noEmit` clean; prod build compiled successfully.
- 2026-08-06 — **Dark/light theme system + landing page v2 (applied).** Added a global theme toggle (dark default, `data-theme="light"` on `<html>`, persisted via `localStorage["asta-theme"]`, pre-hydration inline script in `<body>` to kill FOUC). Made the whole app theme-aware with CSS variables (`--bg`, `--fg`, `--text-a/b/c`, `--surface`, `--line`, `--danger`, `--tier-1..5`) mapped through Tailwind by overriding `white`/`black`/`gray` + `cyber.*` tokens to `rgb(var(--x) / <alpha-value>)` so every existing `text-white/border-white/gray-*` usage flips correctly in both themes; tier colors became `var(--tier-N)` (fixed the alpha-suffix sites with `color-mix`, ProgressRing stroke via `style`). **Rebuilt the landing page as ONE section, light and straightforward**: two-column hero (copy + interactive **HeroTerminal**), inline count-up stats, 4 clean principle cards (no expand gimmick), a mobile-scrollable/hoverable 100-day journey strip (`no-scrollbar` snap scroll on mobile, 5-col grid on desktop) with "your current tier" marker + progress line + detail panel, and a closing mission CTA. **Removed the 3D scene (LazyScene3D) from the landing** — the heavy three.js chunk no longer ships on home (Home first load 150 kB). **Rewrote Navbar** per VISION §7.4: slim, hairline, minimal wordmark + tagline, quiet links, theme toggle, auth cluster, clean mobile menu with XP/streak/tier. **Added a global minimal Footer** (brand + mission line, Learn/Account link columns, mission tagline + copyright) to the root layout. Theme toggle also added to all pages via the Navbar. Prod build green, no cyan, no runtime errors, all routes 200. Known quirk: `next dev` overwrites `.next` with eval-source-map dev chunks (6 MB `main-app.js`) — always re-run `npm run build` to restore prod numbers.
- 2026-08-06 — **Pure black & white redesign + mission narrative (applied).** Remapped all design tokens to monochrome: `cyber-cyan`→`#ffffff`, `cyber-dark`→`#000000`, `matrix`→neutral gray ramp, tier colors→grayscale peaking at white for Master; only `cyber-red` stays (errors). Swapped Orbitron → **Space Grotesk** (display) and added **Inter** (body); self-hosted all fonts in `public/fonts/` via `@font-face` from fontsource/jsdelivr and removed `next/font/google` (was hanging builds with `socket hang up` on fonts.gstatic.com). Rewrote **landing page as ONE section** with mission narrative ("Learn C and Assembly. Free. Forever."), new interactive **HeroTerminal** (auto-typing C/ASM demos with simulated output), click-to-expand principle cards, hoverable 100-day tier strip with "your current tier" marker + progress line + count-up stats. Rewrote page copy to the mission voice (Navbar tagline "Free Technical Education", dashboard "Today is your next day", curriculum "Two languages. One honest road to the metal."). Replaced emoji icons with monochrome lucide icons (achievements, leaderboard medals, streak flame). Prod build green, no cyan in compiled CSS, all routes smoke-tested 200.
- 2026-08-06 — Wrote `VISION.md` (expanded AstaHub vision), added tech stack (§7.3), design language (§7.4), money-from-skills (§9). Named the project **AstaHub**.
- 2026-08-06 — Fixed C simulator bugs: non-greedy control-statement regex, `i++`/compound assignments, `unsigned`/`long` types, `&` address-of vs bitwise, `} else {` line splitting, pre/post-increment in expressions. Verified all scenarios; prod build + live API smoke test pass.
- 2026-08-06 — Added AGENTS.md as persistent memory, roadmap phases, design direction + reference sites (Linear, Stripe, Notion, Vercel, Typeform, The Odin Project, freeCodeCamp).
- 2026-08-06 — **Phase 0 redesign applied.** Replaced cyberpunk theme with calm editorial minimalism: new `tailwind.config.ts` palette (cyan accent `#22d3ee`, warm-dark bg `#0a0e14`, emerald matrix), rewrote `globals.css` (removed scanlines/glows/grid, added `.btn`, `.btn-primary`, `.input`, `.hairline`), kept old token names (`cyber-*`, `matrix-500`, `btn-cyber*`, `text-glow-*`) as minimal aliases so ~100 usages inherited the look without edits. Stripped glow shadows from `CyberPanel`, removed pulse-glow from `Navbar`, softened `Scene3D` (slower motion, new palette). Prod build green (route sizes unchanged, ~88.8 kB shared); smoke test confirms no scanline/grid/neon remain and new accent renders.
- 2026-08-06 — **Phase 0 auth & data layer scaffolded (Postgres + Auth.js).** Installed `next-auth@4.24.7`, `@prisma/client@6.19.3`, `prisma@6.19.3` (dev), `bcryptjs@3.0.3`. Schema `prisma/schema.prisma`: `User` (name, email, passwordHash, bio, image, currentDay, totalXp, level, streak, lastActiveDate, completedDays/Notes/Exercises JSON, updatedAt) + `Certificate` (cascade, indexed by userId). Built `src/lib/prisma.ts` + `src/lib/auth.ts` (Credentials/JWT, bcrypt), APIs `/api/auth/[...nextauth]`, `/api/register`, `/api/me` (GET/PATCH), `/api/progress` (PUT), `/api/leaderboard` (GET, top 100), `src/middleware.ts` (protects dashboard/profile/achievements/lesson). Pages: `/signin` (signin+register tabs), `/profile` (server, redirects if unauthed) + `ProfileClient` (edit name/bio, stat cards, completion bar, certificates), `/leaderboard` (server, podium + ranked rows + "(you)"). Store: `queueSync` debounced 800ms → PUT `/api/progress`, `hydrateFromServer` (GET `/api/me` → setState), `markSynced`/`markUnsynced`, gated by localStorage flag `asta-100days-synced`; `SessionProvider` hydrates on session load; Navbar shows Profile/Leaderboard/Sign-in/out. Fixed 3 type errors (next-auth Session augmentation `src/types/next-auth.d.ts`, `Record<string, string|null>` in /api/me, `level as ProficiencyLevel` + `issuedAt: string|Date` in profile/leaderboard). Prod build green (~88.8 kB shared). **Awaiting real `DATABASE_URL` to run migration + live auth test.**
- 2026-08-06 — **Phase 0 live: Postgres + Auth.js verified end-to-end.** User provided Neon URL (`ep-lucky-meadow-ay684ucq-pooler...neon.tech`). `prisma migrate dev --name init` applied (migration `20260806105340_init`). `.env.local` now has real `DATABASE_URL` + generated `NEXTAUTH_SECRET`. Verified on dev server (port 3998): `/signin` 200, `POST /api/register` 201 (user persisted to Neon, `users: 1`), `/api/leaderboard` returns ranked user, `/profile` + `/dashboard` → 307 `/signin?callbackUrl=...` via middleware. **Known issue: `next start` (prod) throws `EvalError: Code generation from strings disallowed` from the edge middleware sandbox on Node v24.14.1** — auth works in dev; needs Node 20/22 or Next.js upgrade for prod middleware. Neon cold-start causes first DB call per server to take ~8s (retry succeeds).
- 2026-08-06 — **Black/white editorial UI pass (Phase 0 design, applied).** Enforced the one-cyan-accent system across every page: `PROFICIENCY_TIERS` colors now a monochrome grayscale ramp (`#64748b`→`#e2e8f0`) peaking at cyan `#22d3ee` for Master; `CyberPanel` glow prop collapsed to one calm hairline (all `glow=` values identical); `ProgressRing` drop-shadow glow removed; Home hero rewritten ("Learn C and Assembly. In 100 days.") with flat monochrome feature cards and no purple/amber/red numbers; Dashboard renamed "Command Center"→"Dashboard", "Mission Timeline"→"Your Days", stats toned to cyan/white, done-states switched from matrix-green to cyan; Navbar XP cyan + streak white; ASM language badges now gray instead of purple everywhere; lesson page success states green→cyan (red kept for errors only), hints/points/purple glow cleaned; CodePlayground Run button now solid cyan (`btn`-style), output text white, "Live/Simulated" badges cyan/gray; curriculum/achievements/not-found/error/loading pages toned to match. Only `cyber-red` remains (error states, semantically correct). Prod build green (~88.8 kB shared).
