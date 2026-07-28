"use client";

import { motion } from "framer-motion";
import { Trophy, Lock, Star } from "lucide-react";
import CyberPanel from "@/components/CyberPanel";
import { useProgressStore } from "@/lib/store";
import { PROFICIENCY_TIERS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: ReturnType<typeof useProgressStore.getState>) => boolean;
  xp: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-boot",
    title: "First Boot",
    description: "Complete Day 1",
    icon: "⚡",
    condition: (s) => s.completedDays.includes(1),
    xp: 50,
    rarity: "common",
  },
  {
    id: "week-one",
    title: "Week One Survivor",
    description: "Complete 7 days",
    icon: "🔥",
    condition: (s) => s.completedDays.length >= 7,
    xp: 100,
    rarity: "common",
  },
  {
    id: "pointer-fearless",
    title: "Pointer Fearless",
    description: "Reach Day 10 (Pointer Arithmetic)",
    icon: "👉",
    condition: (s) => s.completedDays.includes(10),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "stack-apprentice",
    title: "Stack Apprentice",
    description: "Reach the Apprentice tier (Day 21)",
    icon: "◆",
    condition: (s) => s.completedDays.some((d) => d >= 21),
    xp: 200,
    rarity: "rare",
  },
  {
    id: "malloc-master",
    title: "Heap Walker",
    description: "Complete Day 13 (Dynamic Memory)",
    icon: "🧱",
    condition: (s) => s.completedDays.includes(13),
    xp: 150,
    rarity: "rare",
  },
  {
    id: "halfway",
    title: "Halfway There",
    description: "Complete 50 days",
    icon: "🏔️",
    condition: (s) => s.completedDays.length >= 50,
    xp: 500,
    rarity: "epic",
  },
  {
    id: "asm-genesis",
    title: "Assembly Genesis",
    description: "Start the Assembly track (Day 51)",
    icon: "⚙️",
    condition: (s) => s.completedDays.includes(51),
    xp: 200,
    rarity: "rare",
  },
  {
    id: "register-expert",
    title: "Register Expert",
    description: "Reach the Expert tier (Day 61)",
    icon: "◉",
    condition: (s) => s.completedDays.some((d) => d >= 61),
    xp: 300,
    rarity: "epic",
  },
  {
    id: "streak-7",
    title: "Consistent Operator",
    description: "Maintain a 7-day streak",
    icon: "📡",
    condition: (s) => s.streak >= 7,
    xp: 200,
    rarity: "rare",
  },
  {
    id: "streak-30",
    title: "Daily Driver",
    description: "Maintain a 30-day streak",
    icon: "🚀",
    condition: (s) => s.streak >= 30,
    xp: 500,
    rarity: "legendary",
  },
  {
    id: "xp-1000",
    title: "XP Collector",
    description: "Earn 1,000 total XP",
    icon: "💎",
    condition: (s) => s.totalXp >= 1000,
    xp: 100,
    rarity: "common",
  },
  {
    id: "xp-5000",
    title: "XP Hoarder",
    description: "Earn 5,000 total XP",
    icon: "👑",
    condition: (s) => s.totalXp >= 5000,
    xp: 300,
    rarity: "epic",
  },
  {
    id: "silicon-master",
    title: "Silicon Master",
    description: "Complete all 100 days",
    icon: "★",
    condition: (s) => s.completedDays.length >= 100,
    xp: 1000,
    rarity: "legendary",
  },
  {
    id: "assignment-10",
    title: "Assignment Grinder",
    description: "Complete 10 assignments",
    icon: "📝",
    condition: (s) => s.completedAssignments.length >= 10,
    xp: 200,
    rarity: "rare",
  },
];

const rarityColors = {
  common: "border-gray-500/20 text-gray-400",
  rare: "border-cyber-cyan/20 text-cyber-cyan",
  epic: "border-cyber-purple/20 text-cyber-purple",
  legendary: "border-cyber-amber/20 text-cyber-amber",
};

const rarityBg = {
  common: "bg-gray-500/5",
  rare: "bg-cyber-cyan/5",
  epic: "bg-cyber-purple/5",
  legendary: "bg-cyber-amber/5",
};

export default function AchievementsPage() {
  const state = useProgressStore();
  const unlocked = ACHIEVEMENTS.filter((a) => a.condition(state));
  const locked = ACHIEVEMENTS.filter((a) => !a.condition(state));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Achievements
        </h1>
        <p className="text-sm text-gray-500 font-mono">
          {unlocked.length}/{ACHIEVEMENTS.length} unlocked
        </p>
      </motion.div>

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
            <Trophy className="h-5 w-5 text-cyber-amber" />
            Unlocked
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unlocked.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "rounded-xl border p-5",
                  rarityColors[a.rarity],
                  rarityBg[a.rarity]
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{a.icon}</span>
                  <Star className="h-4 w-4 text-cyber-amber" />
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-1">
                  {a.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{a.description}</p>
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                  {a.rarity}
                </span>
              </motion.div>
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
                  <span className="text-3xl grayscale">🔒</span>
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
