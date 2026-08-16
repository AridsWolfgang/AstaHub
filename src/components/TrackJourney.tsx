"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Flame, Lock, Trophy } from "lucide-react";
import { getTrackLessons } from "@/lib/curriculum";
import { usePythonStore, useCppStore, isDayUnlocked } from "@/lib/store";
import { getTierByLevel } from "@/lib/types";
import type { Lesson, TrackKey } from "@/lib/types";
import { formatDay, cn } from "@/lib/utils";

type JourneyTrack = "python" | "cpp";

const TRACK_NAMES: Record<JourneyTrack, string> = {
  python: "Python",
  cpp: "C++",
};

export default function TrackJourney({ track }: { track: JourneyTrack }) {
  const store = track === "python" ? usePythonStore : useCppStore;
  const { completedDays, completedExercises, completedAssignments, totalXp, streak, currentDay, level } = store();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getTrackLessons(track as TrackKey).then((list) => {
      if (cancelled) return;
      setLessons(list);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [track]);

  const tier = getTierByLevel(level ?? "initiate");

  const nextLesson = useMemo(() => {
    const firstIncomplete = lessons.find((l) => {
      const unlocked = isDayUnlocked(l.day, completedDays);
      const done = completedDays.includes(l.day);
      return unlocked && !done;
    });
    return firstIncomplete ?? lessons[lessons.length - 1];
  }, [lessons, completedDays]);

  const exerciseCount = useMemo(
    () => Object.values(completedExercises).reduce<number>((acc, ids) => acc + ids.length, 0),
    [completedExercises]
  );

  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Your {TRACK_NAMES[track]} journey
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-400">
            {lessons.length > 0 && nextLesson ? (
              <>
                You&apos;re on day {Math.min(currentDay, lessons.length)} of {lessons.length}.
                {" "}
                {completedDays.length > 0
                  ? `${completedDays.length} days done. Keep going.`
                  : "Not started yet — your first day is waiting."}
              </>
            ) : (
              "Loading your progress…"
            )}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {completedDays.length}
              <span className="text-gray-500">/{lessons.length}</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">days</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-lg font-bold text-white">{totalXp}</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">xp</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-white">
              <Flame className="h-4 w-4" />
              {streak}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">streak</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: tier.color }}>
              {tier.icon}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">{tier.name}</div>
          </div>
        </div>
      </div>

      {nextLesson && (
        <Link
          href={`/lesson/${track}/${nextLesson.day}`}
          className="btn-primary mt-6 inline-flex"
        >
          {completedDays.length === 0 ? "Start the track" : "Continue learning"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}

      <div className="mt-8 grid gap-2">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg border border-white/5 bg-white/[0.02]" />
            ))
          : lessons.map((lesson) => {
              const unlocked = isDayUnlocked(lesson.day, completedDays);
              const done = completedDays.includes(lesson.day);
              const exDone = (completedExercises[lesson.day] ?? []).length;
              const assignmentDone = completedAssignments.includes(lesson.day);

              return (
                  <Link
                    key={lesson.day}
                    href={unlocked ? `/lesson/${track}/${lesson.day}` : "#"}
                    className={cn(
                      "flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors",
                      done
                        ? "border-white/15 bg-white/[0.04]"
                        : unlocked
                        ? "border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
                        : "border-white/5 opacity-30 cursor-not-allowed"
                    )}
                  >
                    <span className="w-16 shrink-0 font-mono text-[10px] text-gray-500">
                      {formatDay(lesson.day)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-white">{lesson.title}</h3>
                      <p className="truncate text-[11px] text-gray-500">{lesson.subtitle}</p>
                    </div>
                    <span className="hidden shrink-0 font-mono text-[10px] text-gray-600 sm:block">
                      {lesson.durationMinutes}m
                    </span>
                    <span className="hidden shrink-0 font-mono text-[10px] text-gray-600 md:block">
                      {exDone}/{lesson.exercises.length} ex
                      {lesson.assignment ? ` · ${assignmentDone ? "done" : "open"}` : ""}
                    </span>
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-white" />
                    ) : !unlocked ? (
                      <Lock className="h-4 w-4 shrink-0 text-gray-600" />
                    ) : (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                        <Trophy className="h-3.5 w-3.5 text-gray-500" />
                      </span>
                    )}
                  </Link>
              );
            })}
      </div>
    </div>
  );
}
