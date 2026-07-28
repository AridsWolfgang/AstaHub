# ASTA.100 — 100 Days of C & Assembly

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An interactive, cyberpunk-themed bootcamp for mastering low-level systems programming. From `printf` to bare-metal `syscall`.

> **🧠 100 days. 2 languages. One journey from memory initiate to silicon master.**

## Features

- **100-Day Curriculum** — 50 days of C + 50 days of x86-64 Assembly
- **5 Proficiency Tiers** — Initiate → Apprentice → Adept → Expert → Master
- **Interactive Theory** — Deep explanations with live code examples
- **Code Playground** — Monaco editor (C & NASM syntax) with simulated execution
- **Exercises** — Quizzes, code challenges, and XP rewards
- **Assignments** — Capstone tasks with grading rubrics
- **Progress Tracking** — XP, streaks, day completion, achievements
- **3D UI** — React Three Fiber powered cyberpunk aesthetic
- **Persistent State** — All progress saved locally via Zustand

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + custom cyber theme |
| 3D | React Three Fiber + Drei |
| Editor | Monaco Editor |
| State | Zustand (localStorage persisted) |
| Animation | Framer Motion |
| Icons | Lucide React |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page with 3D hero
│   ├── layout.tsx         # Root layout with Navbar
│   ├── not-found.tsx      # Custom 404
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading state
│   ├── dashboard/         # Progress dashboard
│   ├── curriculum/        # Full 100-day map
│   ├── lesson/[day]/      # Individual lesson view (4 tabs)
│   ├── playground/        # Free code playground
│   └── achievements/      # Badges & milestones
├── components/            # Shared UI components
│   ├── Navbar.tsx         # Navigation with XP/streak/tier display
│   ├── CyberPanel.tsx     # Reusable glow panel
│   ├── ProgressRing.tsx   # Animated SVG ring
│   ├── Scene3D.tsx        # Three.js 3D background
│   └── CodePlayground.tsx # Monaco editor wrapper
└── lib/                   # Application logic
    ├── types.ts           # TypeScript interfaces
    ├── store.ts           # Zustand progress store
    ├── curriculum.ts      # 100-day lesson data (5373 lines)
    └── utils.ts           # cn(), formatDay(), hexToRgba()
```

## Curriculum

| Days | Track | Tier |
|------|-------|------|
| 1–20 | C Fundamentals | Initiate |
| 21–40 | C Intermediate | Apprentice |
| 41–50 | C Advanced + ASM Bridge | Adept |
| 51–60 | ASM Fundamentals | Adept |
| 61–80 | ASM Intermediate | Expert |
| 81–100 | ASM Advanced + Capstone | Master |

### Core Topics Covered

**C (Days 1–50)**: Pointers, memory management, structs, file I/O, recursion, linked lists, hash tables, binary trees, sockets, threads, Makefile, GDB, Valgrind

**Assembly (Days 51–100)**: Registers, MOV/ADD/SUB, conditional jumps, stack, calling conventions (System V AMD64), SIMD, syscalls, inline ASM, bootloaders, paging, GDB for ASM, shellcode, VMX virtualization, ARM64 comparison

## Extending to More Languages

This platform is designed to grow beyond C and Assembly. To add a new language:

1. Extend the `Language` type in `src/lib/types.ts`
2. Add a `DayBlueprint[]` array in `src/lib/curriculum.ts`
3. Add Monaco syntax highlighting config in `CodePlayground.tsx`
4. Add playground templates in `src/app/playground/page.tsx`

## Roadmap

- [x] Full 100-day curriculum (C + ASM)
- [x] Interactive code playground (simulated)
- [x] XP, streaks, achievements system
- [x] 3D cyberpunk UI
- [x] Persistent progress (localStorage)
- [ ] Backend code execution (WASM gcc / NASM)
- [ ] User authentication & cloud sync
- [ ] Community solutions & discussions
- [ ] Spaced repetition review system
- [ ] Mobile-responsive PWA
- [ ] Leaderboards
- [ ] Additional language tracks (Rust, Zig, Go)

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE)
