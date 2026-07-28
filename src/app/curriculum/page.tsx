"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Filter } from "lucide-react";
import CyberPanel from "@/components/CyberPanel";
import { CURRICULUM } from "@/lib/curriculum";
import { useProgressStore, isDayUnlocked } from "@/lib/store";
import { PROFICIENCY_TIERS } from "@/lib/types";
import { formatDay, cn } from "@/lib/utils";

type FilterLang = "all" | "c" | "asm";

export default function CurriculumPage() {
  const { completedDays } = useProgressStore();
  const [filter, setFilter] = useState<FilterLang>("all");
  const [activeTier, setActiveTier] = useState<string | null>(null);

  const filtered = CURRICULUM.filter((l) => {
    if (filter !== "all" && l.language !== filter) return false;
    if (activeTier && l.level !== activeTier) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          100-Day Curriculum
        </h1>
        <p className="text-sm text-gray-500 font-mono">
          50 days of C mastery → 50 days of Assembly domination
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <Filter className="h-4 w-4 text-gray-500" />
        {(["all", "c", "asm"] as FilterLang[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all",
              filter === f
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                : "text-gray-500 hover:text-white border border-transparent"
            )}
          >
            {f === "all" ? "All" : f === "c" ? "C Language" : "Assembly"}
          </button>
        ))}
        <div className="h-4 w-px bg-cyber-border mx-2" />
        {PROFICIENCY_TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setActiveTier(activeTier === tier.id ? null : tier.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-mono transition-all",
              activeTier === tier.id
                ? "border"
                : "text-gray-500 hover:text-white border border-transparent"
            )}
            style={
              activeTier === tier.id
                ? { color: tier.color, borderColor: `${tier.color}40`, background: `${tier.color}10` }
                : undefined
            }
          >
            {tier.icon} {tier.name}
          </button>
        ))}
      </div>

      {/* Tier Headers + Lessons */}
      {PROFICIENCY_TIERS.map((tier) => {
        const tierLessons = filtered.filter(
          (l) => l.day >= tier.dayRange[0] && l.day <= tier.dayRange[1]
        );
        if (tierLessons.length === 0) return null;

        return (
          <div key={tier.id} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl" style={{ color: tier.color }}>
                {tier.icon}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-white">
                  {tier.title}
                </h2>
                <p className="text-[10px] font-mono text-gray-500">
                  DAYS {tier.dayRange[0]}–{tier.dayRange[1]} · {tier.name}
                </p>
              </div>
              <div className="flex-1 h-px" style={{ background: `${tier.color}20` }} />
            </div>

            <div className="grid gap-2">
              {tierLessons.map((lesson, i) => {
                const unlocked = isDayUnlocked(lesson.day, completedDays);
                const done = completedDays.includes(lesson.day);

                return (
                  <motion.div
                    key={lesson.day}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <Link
                      href={unlocked ? `/lesson/${lesson.day}` : "#"}
                      className={cn(
                        "flex items-center gap-4 rounded-lg border px-4 py-3 transition-all",
                        done
                          ? "border-matrix-500/15 bg-matrix-500/5"
                          : unlocked
                          ? "border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                          : "border-white/5 opacity-30 cursor-not-allowed"
                      )}
                    >
                      <span className="w-20 text-[10px] font-mono text-gray-500 shrink-0">
                        {formatDay(lesson.day)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {lesson.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 truncate">
                          {lesson.subtitle}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-mono uppercase shrink-0",
                          lesson.language === "c"
                            ? "text-cyber-cyan bg-cyber-cyan/5"
                            : "text-cyber-purple bg-cyber-purple/5"
                        )}
                      >
                        {lesson.language}
                      </span>
                      <span className="text-[10px] font-mono text-gray-600 shrink-0 w-16 text-right">
                        {lesson.durationMinutes}m
                      </span>
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 text-matrix-500 shrink-0" />
                      ) : !unlocked ? (
                        <Lock className="h-4 w-4 text-gray-600 shrink-0" />
                      ) : (
                        <div className="h-4 w-4 shrink-0" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
