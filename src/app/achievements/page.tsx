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
  Database,
  Terminal,
  Workflow,
  Box,
  Shield,
  Server,
  Table2,
  Binary,
  HardDrive,
  FileTerminal,
  FileCode2,
  GitBranch,
} from "lucide-react";
import CyberPanel from "@/components/CyberPanel";
import {
  useProgressStore,
  usePythonStore,
  useCppStore,
  useJsStore,
  useSqlStore,
  useBashStore,
} from "@/lib/store";
import type { ProgressState } from "@/lib/store";
import { PROFICIENCY_TIERS } from "@/lib/types";
import type { TrackKey } from "@/lib/types";
import { buildAchievements } from "@/lib/achievements";
import type { AchievementDef } from "@/lib/achievements";
import { cn } from "@/lib/utils";

type Snapshot = ProgressState;

const STORES: Record<TrackKey, () => Snapshot> = {
  c: useProgressStore,
  python: usePythonStore,
  cpp: useCppStore,
  js: useJsStore,
  sql: useSqlStore,
  bash: useBashStore,
};

const ICON_MAP: Record<string, React.ElementType> = {
  zap: Zap,
  flame: Flame,
  pointer: Pointer,
  layers: Layers,
  package: Package,
  mountain: Mountain,
  cog: Cog,
  cpu: Cpu,
  signal: Signal,
  rocket: Rocket,
  gem: Gem,
  crown: Crown,
  star: Star,
  clipboard: ClipboardList,
  trophy: Trophy,
  braces: Braces,
  flask: FlaskConical,
  database: Database,
  terminal: Terminal,
  workflow: Workflow,
  box: Box,
  shield: Shield,
  server: Server,
  table: Table2,
  binary: Binary,
  harddrive: HardDrive,
  fileterminal: FileTerminal,
  filecode: FileCode2,
  gitbranch: GitBranch,
};

const rarityColors: Record<AchievementDef["rarity"], string> = {
  common: "border-gray-500/20 text-gray-400",
  rare: "border-cyber-cyan/20 text-cyber-cyan",
  epic: "border-white/20 text-gray-200",
  legendary: "border-white/40 text-white",
};

const rarityBg: Record<AchievementDef["rarity"], string> = {
  common: "bg-gray-500/5",
  rare: "bg-cyber-cyan/5",
  epic: "bg-white/5",
  legendary: "bg-white/10",
};

export default function AchievementsPage() {
  const [track, setTrack] = useState<TrackKey>("c");
  const state = STORES[track]();
  // Engine is authoritative — achievements react to real progress (track-aware)
  const achievements = buildAchievements(track, state as unknown as Parameters<typeof buildAchievements>[1]);
  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Achievements</h1>
            <p className="text-sm text-gray-500 font-mono">
              {unlocked.length}/{achievements.length} unlocked
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 p-1">
            {(["c", "python", "cpp", "js", "sql", "bash"] as TrackKey[]).map((t) => (
              <button
                key={t}
                onClick={() => setTrack(t)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-mono transition-colors",
                  track === t ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                {t === "c"
                  ? "C"
                  : t === "python"
                    ? "Python"
                    : t === "cpp"
                      ? "C++"
                        : t === "js"
                          ? "JS/TS"
                          : t === "sql"
                            ? "SQL"
                            : "Bash"}
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
            {unlocked.map((a) => {
              const Icon = ICON_MAP[a.icon] ?? Star;
              return (
                <div
                  key={a.id}
                  className={cn("rounded-xl border p-5", rarityColors[a.rarity], rarityBg[a.rarity])}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                    <Star className="h-4 w-4 text-cyber-cyan" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-white mb-1">{a.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{a.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                      {a.rarity}
                    </span>
                    {a.target > 1 && (
                      <span className="text-[10px] font-mono text-gray-500">
                        {a.current}/{a.target}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
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
            {locked.map((a) => {
              const progressPct = Math.round(a.progress * 100);
              return (
                <div
                  key={a.id}
                  className="rounded-xl border border-white/5 bg-white/[0.01] p-5 opacity-40"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Lock className="h-8 w-8 text-gray-600" strokeWidth={1.5} />
                    {a.target > 1 && (
                      <span className="text-[10px] font-mono text-gray-600">
                        {a.current}/{a.target} · {progressPct}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-sm font-bold text-gray-500 mb-1">{a.title}</h3>
                  <p className="text-xs text-gray-600">{a.description}</p>
                  {a.target > 1 && (
                    <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-white/20"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
