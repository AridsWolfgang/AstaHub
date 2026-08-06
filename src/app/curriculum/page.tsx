"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Filter, Search, BookOpen, Cpu } from "lucide-react";
import CyberPanel from "@/components/CyberPanel";
import { getLessons } from "@/lib/curriculum";
import { useProgressStore, isDayUnlocked } from "@/lib/store";
import { PROFICIENCY_TIERS } from "@/lib/types";
import type { Lesson } from "@/lib/types";
import { formatDay, cn } from "@/lib/utils";

type FilterLang = "all" | "c" | "asm";

export default function CurriculumPage() {
  const { completedDays } = useProgressStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterLang>("all");
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getLessons().then((list) => {
      if (cancelled) return;
      setLessons(list);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = lessons;
    if (filter !== "all") list = list.filter((l) => l.language === filter);
    if (activeTier) list = list.filter((l) => l.level === activeTier);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.subtitle.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [lessons, filter, activeTier, searchQuery]);

  const stats = useMemo(() => {
    const total = lessons.length;
    const completed = completedDays.length;
    const cDone = lessons.filter((l) => l.language === "c" && completedDays.includes(l.day)).length;
    const asmDone = lessons.filter((l) => l.language === "asm" && completedDays.includes(l.day)).length;
    const cTotal = lessons.filter((l) => l.language === "c").length;
    const asmTotal = lessons.filter((l) => l.language === "asm").length;
    return { total, completed, cDone, asmDone, cTotal, asmTotal };
  }, [lessons, completedDays]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          The tracks
        </h1>
        <p className="text-sm text-gray-500 font-mono">
          Where it starts — one honest road to the metal.
        </p>
      </motion.div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 mb-6 text-xs font-mono">
        <span className="text-gray-400">
          <span className="text-white font-semibold">{stats.completed}</span>/{stats.total} days
        </span>
        <span className="text-cyber-cyan">
          C: {stats.cDone}/{stats.cTotal}
        </span>
        <span className="text-white/80">
          ASM: {stats.asmDone}/{stats.asmTotal}
        </span>
        <span className="text-gray-300">
          {Math.round((stats.completed / stats.total) * 100)}% complete
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search lessons by title, description, or tag..."
          className="w-full rounded-lg border border-white/5 bg-cyber-panel/40 pl-10 pr-4 py-2.5 text-sm font-mono text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/30 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <Filter className="h-4 w-4 text-gray-500 shrink-0" />
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
            <span className="flex items-center gap-1.5">
              {f === "c" ? <BookOpen className="h-3 w-3" /> : f === "asm" ? <Cpu className="h-3 w-3" /> : null}
              {f === "all" ? "All" : f === "c" ? "C Language" : "Assembly"}
            </span>
          </button>
        ))}
        <div className="h-4 w-px bg-cyber-border mx-2 shrink-0" />
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
                ? {
                    color: tier.color,
                    borderColor: `color-mix(in srgb, ${tier.color} 40%, transparent)`,
                    background: `color-mix(in srgb, ${tier.color} 10%, transparent)`,
                  }
                : undefined
            }
          >
            {tier.icon} {tier.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-xs font-mono text-gray-500 mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
        </p>
      )}

      {/* Tier Headers + Lessons */}
      {loading ? (
        <div className="grid gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-lg border border-white/5 bg-white/[0.02]"
            />
          ))}
        </div>
      ) : (
        PROFICIENCY_TIERS.map((tier) => {
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
              <div className="flex-1 h-px" style={{ background: `color-mix(in srgb, ${tier.color} 20%, transparent)` }} />
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
                        "flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors",
                        done
                          ? "border-cyber-cyan/15 bg-cyber-cyan/5"
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
                            : "text-gray-300 bg-white/5"
                        )}
                      >
                        {lesson.language}
                      </span>
                      <span className="text-[10px] font-mono text-gray-600 shrink-0 w-16 text-right">
                        {lesson.durationMinutes}m
                      </span>
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 text-cyber-cyan shrink-0" />
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
      }))}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 font-mono text-sm">
            No lessons match your search criteria.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setFilter("all"); setActiveTier(null); }}
            className="btn-cyber text-xs mt-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
