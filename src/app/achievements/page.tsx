"use client";

import { useState } from "react";
import {
  Trophy,
  Lock,
  Star,
  Zap,
  Flame,
  Pointer,
  Layers,
  Package,
  Mountain,
  Cog,
  Cpu,
  Signal,
  Rocket,
  Gem,
  Crown,
  ClipboardList,
  Braces,
  FlaskConical,
} from "lucide-react";
import CyberPanel from "@/components/CyberPanel";
import { useProgressStore, usePythonStore, useCppStore, useJsStore } from "@/lib/store";
import type { ProgressState } from "@/lib/store";
import { PROFICIENCY_TIERS } from "@/lib/types";
import type { TrackKey } from "@/lib/types";
import { cn } from "@/lib/utils";

type Snapshot = ProgressState;

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  condition: (state: Snapshot) => boolean;
  xp: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const C_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-boot",
    title: "First Boot",
    description: "Complete Day 1",
    icon: Zap,
    condition: (s) => s.completedDays.includes(1),
    xp: 50,
    rarity: "common",
  },
  {
    id: "week-one",
    title: "Week One Survivor",
    description: "Complete 7 days",
    icon: Flame,
    condition: (s) => s.completedDays.length >= 7,
    xp: 100,
    rarity: "common",
  },
  {
    id: "pointer-fearless",
    title: "Pointer Fearless",
    description: "Reach Day 10 (Pointer Arithmetic)",
    icon: Pointer,
    condition: (s) => s.completedDays.includes(10),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "stack-apprentice",
    title: "Stack Apprentice",
    description: "Reach the Apprentice tier (Day 21)",
    icon: Layers,
    condition: (s) => s.completedDays.some((d) => d >= 21),
    xp: 200,
    rarity: "rare",
  },
  {
    id: "malloc-master",
    title: "Heap Walker",
    description: "Complete Day 13 (Dynamic Memory)",
    icon: Package,
    condition: (s) => s.completedDays.includes(13),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "halfway",
    title: "Halfway There",
    description: "Complete 50 days",
    icon: Mountain,
    condition: (s) => s.completedDays.length >= 50,
    xp: 500,
    rarity: "epic",
  },
  {
    id: "asm-genesis",
    title: "Assembly Genesis",
    description: "Start the Assembly track (Day 51)",
    icon: Cog,
    condition: (s) => s.completedDays.includes(51),
    xp: 200,
    rarity: "rare",
  },
  {
    id: "register-expert",
    title: "Register Expert",
    description: "Reach the Expert tier (Day 61)",
    icon: Cpu,
    condition: (s) => s.completedDays.some((d) => d >= 61),
    xp: 300,
    rarity: "epic",
  },
  {
    id: "streak-7",
    title: "Consistent Operator",
    description: "Maintain a 7-day streak",
    icon: Signal,
    condition: (s) => s.streak >= 7,
    xp: 200,
    rarity: "rare",
  },
  {
    id: "streak-30",
    title: "Daily Driver",
    description: "Maintain a 30-day streak",
    icon: Rocket,
    condition: (s) => s.streak >= 30,
    xp: 500,
    rarity: "legendary",
  },
  {
    id: "xp-1000",
    title: "XP Collector",
    description: "Earn 1,000 total XP",
    icon: Gem,
    condition: (s) => s.totalXp >= 1000,
    xp: 100,
    rarity: "common",
  },
  {
    id: "xp-5000",
    title: "XP Hoarder",
    description: "Earn 5,000 total XP",
    icon: Crown,
    condition: (s) => s.totalXp >= 5000,
    xp: 300,
    rarity: "epic",
  },
  {
    id: "silicon-master",
    title: "Silicon Master",
    description: "Complete all 100 days",
    icon: Star,
    condition: (s) => s.completedDays.length >= 100,
    xp: 1000,
    rarity: "legendary",
  },
  {
    id: "assignment-10",
    title: "Assignment Grinder",
    description: "Complete 10 assignments",
    icon: ClipboardList,
    condition: (s) => s.completedAssignments.length >= 10,
    xp: 200,
    rarity: "rare",
  },
];

const PY_ACHIEVEMENTS: Achievement[] = [
  {
    id: "hello-python",
    title: "Hello, Python",
    description: "Complete Day 1",
    icon: Braces,
    condition: (s) => s.completedDays.includes(1),
    xp: 50,
    rarity: "common",
  },
  {
    id: "py-week-one",
    title: "Script Apprentice",
    description: "Complete 7 days",
    icon: Flame,
    condition: (s) => s.completedDays.length >= 7,
    xp: 100,
    rarity: "common",
  },
  {
    id: "list-lord",
    title: "List Lord",
    description: "Complete Day 10 (Lists)",
    icon: Layers,
    condition: (s) => s.completedDays.includes(10),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "dict-whisperer",
    title: "Dict Whisperer",
    description: "Complete Day 12 (Dictionaries)",
    icon: Pointer,
    condition: (s) => s.completedDays.includes(12),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "comprehension",
    title: "One-Liner",
    description: "Complete Day 14 (Comprehensions)",
    icon: Zap,
    condition: (s) => s.completedDays.includes(14),
    xp: 200,
    rarity: "rare",
  },
  {
    id: "function-master",
    title: "Function Builder",
    description: "Reach Day 15 (Functions)",
    icon: Package,
    condition: (s) => s.completedDays.some((d) => d >= 15),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "py-halfway",
    title: "Halfway Through",
    description: "Complete 20 days",
    icon: Mountain,
    condition: (s) => s.completedDays.length >= 20,
    xp: 300,
    rarity: "epic",
  },
  {
    id: "exception-handler",
    title: "Calm Under Errors",
    description: "Complete Day 21 (Exceptions)",
    icon: Cog,
    condition: (s) => s.completedDays.includes(21),
    xp: 200,
    rarity: "rare",
  },
  {
    id: "recursion-hero",
    title: "Recursion Hero",
    description: "Complete Day 30 (Recursion)",
    icon: Cpu,
    condition: (s) => s.completedDays.includes(30),
    xp: 300,
    rarity: "epic",
  },
  {
    id: "oop-artisan",
    title: "OOP Artisan",
    description: "Reach Day 34 (Classes)",
    icon: FlaskConical,
    condition: (s) => s.completedDays.some((d) => d >= 34),
    xp: 300,
    rarity: "epic",
  },
  {
    id: "py-streak-7",
    title: "Consistent Coder",
    description: "Maintain a 7-day streak",
    icon: Signal,
    condition: (s) => s.streak >= 7,
    xp: 200,
    rarity: "rare",
  },
  {
    id: "py-streak-30",
    title: "Daily Driver",
    description: "Maintain a 30-day streak",
    icon: Rocket,
    condition: (s) => s.streak >= 30,
    xp: 500,
    rarity: "legendary",
  },
  {
    id: "py-xp-1000",
    title: "XP Collector",
    description: "Earn 1,000 total XP",
    icon: Gem,
    condition: (s) => s.totalXp >= 1000,
    xp: 100,
    rarity: "common",
  },
  {
    id: "py-xp-5000",
    title: "XP Hoarder",
    description: "Earn 5,000 total XP",
    icon: Crown,
    condition: (s) => s.totalXp >= 5000,
    xp: 300,
    rarity: "epic",
  },
  {
    id: "py-capstone",
    title: "Python Graduate",
    description: "Complete all 40 days",
    icon: Star,
    condition: (s) => s.completedDays.length >= 40,
    xp: 1000,
    rarity: "legendary",
  },
  {
    id: "py-assignment-10",
    title: "Assignment Grinder",
    description: "Complete 10 assignments",
    icon: ClipboardList,
    condition: (s) => s.completedAssignments.length >= 10,
    xp: 200,
    rarity: "rare",
  },
];

const CPP_ACHIEVEMENTS: Achievement[] = [
  {
    id: "cpp-hello",
    title: "Hello, C++",
    description: "Complete Day 1",
    icon: Braces,
    condition: (s) => s.completedDays.includes(1),
    xp: 50,
    rarity: "common",
  },
  {
    id: "cpp-week-one",
    title: "Compiler Apprentice",
    description: "Complete 7 days",
    icon: Flame,
    condition: (s) => s.completedDays.length >= 7,
    xp: 100,
    rarity: "common",
  },
  {
    id: "cpp-types",
    title: "Type Tamer",
    description: "Reach Day 10",
    icon: Layers,
    condition: (s) => s.completedDays.some((d) => d >= 10),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "cpp-functions",
    title: "Function Smith",
    description: "Reach Day 15",
    icon: Package,
    condition: (s) => s.completedDays.some((d) => d >= 15),
    xp: 200,
    rarity: "rare",
  },
  {
    id: "cpp-classes",
    title: "Class Architect",
    description: "Reach Day 21",
    icon: Pointer,
    condition: (s) => s.completedDays.some((d) => d >= 21),
    xp: 250,
    rarity: "rare",
  },
  {
    id: "cpp-halfway",
    title: "Halfway Through",
    description: "Complete 20 days",
    icon: Mountain,
    condition: (s) => s.completedDays.length >= 20,
    xp: 300,
    rarity: "epic",
  },
  {
    id: "cpp-stl",
    title: "STL Explorer",
    description: "Reach Day 30",
    icon: Cog,
    condition: (s) => s.completedDays.some((d) => d >= 30),
    xp: 300,
    rarity: "epic",
  },
  {
    id: "cpp-streak-7",
    title: "Consistent Coder",
    description: "Maintain a 7-day streak",
    icon: Signal,
    condition: (s) => s.streak >= 7,
    xp: 200,
    rarity: "rare",
  },
  {
    id: "cpp-streak-30",
    title: "Daily Driver",
    description: "Maintain a 30-day streak",
    icon: Rocket,
    condition: (s) => s.streak >= 30,
    xp: 500,
    rarity: "legendary",
  },
  {
    id: "cpp-xp-1000",
    title: "XP Collector",
    description: "Earn 1,000 total XP",
    icon: Gem,
    condition: (s) => s.totalXp >= 1000,
    xp: 100,
    rarity: "common",
  },
  {
    id: "cpp-xp-5000",
    title: "XP Hoarder",
    description: "Earn 5,000 total XP",
    icon: Crown,
    condition: (s) => s.totalXp >= 5000,
    xp: 300,
    rarity: "epic",
  },
  {
    id: "cpp-graduate",
    title: "C++ Graduate",
    description: "Complete all 40 days",
    icon: Star,
    condition: (s) => s.completedDays.length >= 40,
    xp: 1000,
    rarity: "legendary",
  },
  {
    id: "cpp-assignment-10",
    title: "Assignment Grinder",
    description: "Complete 10 assignments",
    icon: ClipboardList,
    condition: (s) => s.completedAssignments.length >= 10,
    xp: 200,
    rarity: "rare",
  },
];

const JS_ACHIEVEMENTS: Achievement[] = [
  {
    id: "js-hello",
    title: "Hello, JavaScript",
    description: "Complete Day 1",
    icon: Zap,
    condition: (s) => s.completedDays.includes(1),
    xp: 50,
    rarity: "common",
  },
  {
    id: "js-week-one",
    title: "Console Explorer",
    description: "Complete 7 days",
    icon: Flame,
    condition: (s) => s.completedDays.length >= 7,
    xp: 100,
    rarity: "common",
  },
  {
    id: "js-functions",
    title: "Function Fan",
    description: "Reach Day 12 (Functions)",
    icon: Pointer,
    condition: (s) => s.completedDays.some((d) => d >= 12),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "js-arrays",
    title: "Array Artist",
    description: "Complete Day 10 (Array Methods)",
    icon: Layers,
    condition: (s) => s.completedDays.includes(10),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "js-closures",
    title: "Closure Crafter",
    description: "Complete Day 15 (Scope & Closures)",
    icon: Package,
    condition: (s) => s.completedDays.includes(15),
    xp: 200,
    rarity: "rare",
  },
  {
    id: "js-halfway",
    title: "Halfway Through",
    description: "Complete 20 days",
    icon: Mountain,
    condition: (s) => s.completedDays.length >= 20,
    xp: 300,
    rarity: "epic",
  },
  {
    id: "js-promises",
    title: "Promise Keeper",
    description: "Reach Day 28 (Promises)",
    icon: Cog,
    condition: (s) => s.completedDays.some((d) => d >= 28),
    xp: 250,
    rarity: "rare",
  },
  {
    id: "js-ts",
    title: "Typed Up",
    description: "Reach Day 34 (TypeScript)",
    icon: Cpu,
    condition: (s) => s.completedDays.some((d) => d >= 34),
    xp: 300,
    rarity: "epic",
  },
  {
    id: "js-streak-7",
    title: "Consistent Coder",
    description: "Maintain a 7-day streak",
    icon: Signal,
    condition: (s) => s.streak >= 7,
    xp: 200,
    rarity: "rare",
  },
  {
    id: "js-streak-30",
    title: "Daily Driver",
    description: "Maintain a 30-day streak",
    icon: Rocket,
    condition: (s) => s.streak >= 30,
    xp: 500,
    rarity: "legendary",
  },
  {
    id: "js-xp-1000",
    title: "XP Collector",
    description: "Earn 1,000 total XP",
    icon: Gem,
    condition: (s) => s.totalXp >= 1000,
    xp: 100,
    rarity: "common",
  },
  {
    id: "js-xp-5000",
    title: "XP Hoarder",
    description: "Earn 5,000 total XP",
    icon: Crown,
    condition: (s) => s.totalXp >= 5000,
    xp: 300,
    rarity: "epic",
  },
  {
    id: "js-graduate",
    title: "JavaScript Graduate",
    description: "Complete all 40 days",
    icon: Star,
    condition: (s) => s.completedDays.length >= 40,
    xp: 1000,
    rarity: "legendary",
  },
  {
    id: "js-assignment-10",
    title: "Assignment Grinder",
    description: "Complete 10 assignments",
    icon: ClipboardList,
    condition: (s) => s.completedAssignments.length >= 10,
    xp: 200,
    rarity: "rare",
  },
];

const ACHIEVEMENT_SETS: Record<TrackKey, Achievement[]> = {
  c: C_ACHIEVEMENTS,
  python: PY_ACHIEVEMENTS,
  cpp: CPP_ACHIEVEMENTS,
  js: JS_ACHIEVEMENTS,
};

const STORES: Record<TrackKey, () => Snapshot> = {
  c: useProgressStore,
  python: usePythonStore,
  cpp: useCppStore,
  js: useJsStore,
};

const rarityColors = {
  common: "border-gray-500/20 text-gray-400",
  rare: "border-cyber-cyan/20 text-cyber-cyan",
  epic: "border-white/20 text-gray-200",
  legendary: "border-white/40 text-white",
};

const rarityBg = {
  common: "bg-gray-500/5",
  rare: "bg-cyber-cyan/5",
  epic: "bg-white/5",
  legendary: "bg-white/10",
};

export default function AchievementsPage() {
  const [track, setTrack] = useState<TrackKey>("c");
  const state = STORES[track]();
  const achievements = ACHIEVEMENT_SETS[track];
  const unlocked = achievements.filter((a) => a.condition(state));
  const locked = achievements.filter((a) => !a.condition(state));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">
              Achievements
            </h1>
            <p className="text-sm text-gray-500 font-mono">
              {unlocked.length}/{achievements.length} unlocked
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1">
            {(["c", "python", "cpp", "js"] as TrackKey[]).map((t) => (
              <button
                key={t}
                onClick={() => setTrack(t)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-mono transition-colors",
                  track === t ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                {t === "c" ? "C" : t === "python" ? "Python" : t === "cpp" ? "C++" : "JS/TS"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tier Progress */}
      <CyberPanel glow="cyan" title="Tier Progress" className="mb-8">
        <div className="grid gap-3 md:grid-cols-5">
          {PROFICIENCY_TIERS.map((tier) => {
            const daysInTier = state.completedDays.filter(
              (d) => d >= tier.dayRange[0] && d <= tier.dayRange[1]
            ).length;
            const totalDays = tier.dayRange[1] - tier.dayRange[0] + 1;
            const pct = Math.round((daysInTier / totalDays) * 100);

            return (
              <div key={tier.id} className="text-center">
                <span className="text-2xl" style={{ color: tier.color }}>
                  {tier.icon}
                </span>
                <p className="text-xs font-mono text-white mt-1">{tier.name}</p>
                <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${pct}%`, background: tier.color }}
                  />
                </div>
                <p className="text-[10px] font-mono text-gray-500 mt-1">
                  {daysInTier}/{totalDays}
                </p>
              </div>
            );
          })}
        </div>
      </CyberPanel>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-cyber-cyan" />
            Unlocked
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unlocked.map((a) => (
              <div
                key={a.id}
                className={cn(
                  "rounded-xl border p-5",
                  rarityColors[a.rarity],
                  rarityBg[a.rarity]
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <a.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                  <Star className="h-4 w-4 text-cyber-cyan" />
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-1">
                  {a.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{a.description}</p>
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                  {a.rarity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-bold text-gray-500 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Locked
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locked.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-white/5 bg-white/[0.01] p-5 opacity-40"
              >
                <div className="flex items-start justify-between mb-3">
                  <Lock className="h-8 w-8 text-gray-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm font-bold text-gray-500 mb-1">
                  {a.title}
                </h3>
                <p className="text-xs text-gray-600">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
