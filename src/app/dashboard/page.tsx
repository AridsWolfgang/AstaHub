"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Trophy,
  Calendar,
  BookOpen,
  CheckCircle2,
  Lock,
} from "lucide-react";
import ProgressRing from "@/components/ProgressRing";
import CyberPanel from "@/components/CyberPanel";
import { useProgressStore, getOverallProgress, isDayUnlocked } from "@/lib/store";
import { getTierByLevel, PROFICIENCY_TIERS } from "@/lib/types";
import { getLessonRange } from "@/lib/curriculum";
import type { Lesson } from "@/lib/types";
import { formatDay, cn } from "@/lib/utils";

export default function DashboardPage() {
  const {
    currentDay,
    completedDays,
    totalXp,
    streak,
    level,
    completedExercises,
    completedAssignments,
  } = useProgressStore();

  const [recentLessons, setRecentLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getLessonRange(currentDay - 2, currentDay + 4).then((list) => {
      if (cancelled) return;
      setRecentLessons(list);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [currentDay]);

  const tier = getTierByLevel(level);
  const overallPercent = getOverallProgress(completedDays);
  const todayLesson = recentLessons.find((l) => l.day === currentDay);
  const nextTier = PROFICIENCY_TIERS.find((t) => t.dayRange[0] > currentDay);

  const recentDays = recentLessons.filter(
    (l) => l.day >= currentDay - 2 && l.day <= currentDay + 4
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 font-mono">
          Welcome back. Today is your next day.
        </p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4 mb-8">
        <CyberPanel glow="cyan">
          <ProgressRing
            percent={overallPercent}
            size={100}
            color={tier.color}
            label="Complete"
          />
          <p className="text-center text-xs text-gray-500 mt-3 font-mono">
            {completedDays.length}/100 days
          </p>
        </CyberPanel>

        <CyberPanel title="Total XP">
          <div className="text-center py-4">
            <span className="font-display text-4xl font-bold text-cyber-cyan">
              {totalXp}
            </span>
            <p className="text-xs text-gray-500 mt-2 font-mono">EXPERIENCE POINTS</p>
          </div>
        </CyberPanel>

        <CyberPanel title="Streak">
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2">
              <Flame className="h-8 w-8 text-white/70" />
              <span className="font-display text-4xl font-bold text-white">
                {streak}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-mono">DAY STREAK</p>
          </div>
        </CyberPanel>

        <CyberPanel title="Current Tier">
          <div className="text-center py-4">
            <span className="text-3xl" style={{ color: tier.color }}>
              {tier.icon}
            </span>
            <p className="font-display text-lg font-bold text-white mt-2">
              {tier.title}
            </p>
            <p className="text-xs text-gray-500 font-mono">{tier.name}</p>
          </div>
        </CyberPanel>
      </div>

      {/* Current Day CTA */}
      {todayLesson && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <CyberPanel glow="cyan">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded bg-cyber-cyan/10 border border-cyber-cyan/20 px-2 py-0.5 text-[10px] font-mono text-cyber-cyan">
                    {formatDay(currentDay)}
                  </span>
                  <span className={cn(
                    "rounded px-2 py-0.5 text-[10px] font-mono uppercase",
                    todayLesson.language === "c"
                      ? "bg-cyber-cyan/10 text-cyber-cyan"
                      : "bg-white/5 text-gray-300"
                  )}>
                    {todayLesson.language}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-1">
                  {todayLesson.title}
                </h2>
                <p className="text-sm text-gray-400">{todayLesson.subtitle}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    ~{todayLesson.durationMinutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    {todayLesson.xpTotal} XP
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {todayLesson.exercises.length} exercises
                  </span>
                </div>
              </div>
              <Link
                href={`/lesson/${currentDay}`}
                className="btn-cyber-solid whitespace-nowrap"
              >
                Continue your journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CyberPanel>
        </motion.div>
      )}

      {/* Day Grid */}
      <CyberPanel title="Your Days" className="mb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-lg border border-white/5 bg-white/[0.02]"
                />
              ))
            : recentDays.map((lesson) => {
            const unlocked = isDayUnlocked(lesson.day, completedDays);
            const done = completedDays.includes(lesson.day);
            const exCount = (completedExercises[lesson.day] ?? []).length;
            const assignDone = completedAssignments.includes(lesson.day);

            return (
              <Link
                key={lesson.day}
                href={unlocked ? `/lesson/${lesson.day}` : "#"}
                className={cn(
                  "group relative rounded-lg border p-4 transition-colors",
                  done
                    ? "border-cyber-cyan/20 bg-cyber-cyan/5"
                    : unlocked
                    ? "border-white/5 bg-white/[0.02] hover:border-cyber-cyan/20 hover:bg-cyber-cyan/5"
                    : "border-white/5 bg-white/[0.01] opacity-40 cursor-not-allowed"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-mono text-gray-500">
                    {formatDay(lesson.day)}
                  </span>
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-cyber-cyan" />
                  ) : !unlocked ? (
                    <Lock className="h-4 w-4 text-gray-600" />
                  ) : null}
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-cyber-cyan transition-colors mb-1">
                  {lesson.title}
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-1">
                  {lesson.subtitle}
                </p>
                {unlocked && !done && (
                  <div className="mt-2 flex gap-2 text-[10px] font-mono text-gray-600">
                    <span>{exCount}/{lesson.exercises.length} ex</span>
                    {lesson.assignment && (
                      <span>{assignDone ? "✓" : "○"} assign</span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
        <div className="mt-4 text-center">
          <Link href="/curriculum" className="text-xs font-mono text-cyber-cyan hover:underline">
            View full 100-day curriculum →
          </Link>
        </div>
      </CyberPanel>

      {/* Next Tier Preview */}
      {nextTier && (
        <CyberPanel title="Next Tier">
          <div className="flex items-center gap-4">
            <span className="text-2xl" style={{ color: nextTier.color }}>
              {nextTier.icon}
            </span>
            <div>
              <p className="font-display text-sm font-bold text-white">
                {nextTier.title}
              </p>
              <p className="text-xs text-gray-500">
                Unlocks at Day {nextTier.dayRange[0]} — {nextTier.description}
              </p>
            </div>
          </div>
        </CyberPanel>
      )}
    </div>
  );
}
