import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Flame,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  useBashStore,
  useCppStore,
  useJsStore,
  useProgressStore,
  usePythonStore,
  useSqlStore,
} from "@/lib/store";
import type { ProgressState } from "@/lib/store";
import { getTrackLesson } from "@/lib/curriculum";
import type { Lesson, TrackKey } from "@/lib/types";
import { levelFromXp, xpForLevel } from "@/lib/types";
import { reviewSchedule } from "@/lib/adaptiveReview";
import { TRACKS } from "@/lib/tracks";
import { TRACK_DOT, trackColorKey } from "@/lib/trackColors";
import {
  getPrimaryTrack,
  setPrimaryTrack,
  hasAnyProgress,
  trackSlugToKey,
  dayOneHref,
} from "@/lib/onboarding";
import { Eyebrow } from "@/components/editorial";
import { cn, formatDay } from "@/lib/utils";

const STORES: Record<TrackKey, () => ProgressState> = {
  c: useProgressStore,
  python: usePythonStore,
  cpp: useCppStore,
  js: useJsStore,
  sql: useSqlStore,
  bash: useBashStore,
};

const TRACK_NAMES: Record<TrackKey, string> = {
  c: "C / Assembly",
  python: "Python",
  cpp: "C++",
  js: "JavaScript / TypeScript",
  sql: "SQL & Databases",
  bash: "Bash / Linux / Git",
};

function lessonHref(track: TrackKey, day: number): string {
  if (track === "c") return `/lesson/${day}`;
  if (track === "js") return `/lesson/js/${day}`;
  return `/lesson/${track}/${day}`;
}

const LEVEL_ORDER = ["initiate", "apprentice", "adept", "expert", "master"] as const;
function xpToNextLevel(totalXp: number): { next: string | null; remaining: number; progress: number } {
  const thresholds = LEVEL_ORDER.map((l) => xpForLevel(l));
  for (let i = 0; i < thresholds.length; i++) {
    if (totalXp < thresholds[i]!) {
      const prev = i === 0 ? 0 : thresholds[i - 1]!;
      const span = thresholds[i]! - prev;
      return {
        next: LEVEL_ORDER[i]!,
        remaining: thresholds[i]! - totalXp,
        progress: Math.min(1, Math.max(0, (totalXp - prev) / span)),
      };
    }
  }
  return { next: null, remaining: 0, progress: 1 };
}

/**
 * Home — the learning command center.
 * Answers one question: what should I do right now?
 * Everything here is local-first (stores + curriculum), so it renders
 * instantly and works offline.
 */
export default function HomePage() {
  // Primary track = the one with the most progress; C by default.
  const snapshots = {
    c: useProgressStore(),
    python: usePythonStore(),
    cpp: useCppStore(),
    js: useJsStore(),
    sql: useSqlStore(),
    bash: useBashStore(),
  };
  const primary: TrackKey = useMemo(() => {
    const stored = getPrimaryTrack();
    if (stored) return stored;
    let best: TrackKey = "c";
    let bestDays = -1;
    (Object.keys(STORES) as TrackKey[]).forEach((t) => {
      const n = snapshots[t].completedDays.length;
      if (n > bestDays) {
        bestDays = n;
        best = t;
      }
    });
    return best;
  }, []);

  const brandNew = useMemo(
    () =>
      !getPrimaryTrack() &&
      !hasAnyProgress([
        snapshots.c,
        snapshots.python,
        snapshots.cpp,
        snapshots.js,
        snapshots.sql,
        snapshots.bash,
      ]),
    []
  );

  const progress = snapshots[primary];
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    let cancelled = false;
    getTrackLesson(primary, progress.currentDay).then((l) => {
      if (!cancelled) setLesson(l ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [primary, progress.currentDay]);

  const due = useMemo(
    () => reviewSchedule(progress, { limit: 3 }),
    [progress]
  );
  const level = levelFromXp(progress.totalXp);
  const { next, remaining, progress: levelProgress } = xpToNextLevel(progress.totalXp);

  // Brand-new learner: no days done anywhere and no track ever picked.
  // Onboard inline — pick a path, remember it, start day one.
  if (brandNew) {
    return <FirstRunOnboarding />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Eyebrow>Home — {TRACK_NAMES[primary]}</Eyebrow>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        What should you do right now?
      </h1>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Continue learning */}
        <Link
          to={lesson ? lessonHref(primary, lesson.day) : "/tracks"}
          className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-white/25 sm:p-10"
        >
          <div className="flex items-center justify-between gap-4">
            <Eyebrow>Continue learning</Eyebrow>
            <ArrowRight className="h-5 w-5 text-gray-500 transition-all group-hover:translate-x-1 group-hover:text-white" />
          </div>
          {lesson ? (
            <>
              <p className="mt-4 font-mono text-xs text-gray-500">
                {formatDay(lesson.day)} · {lesson.durationMinutes} min · {progress.completedDays.length} days done
              </p>
              <p className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                {lesson.title}
              </p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-400">
                {lesson.subtitle}
              </p>
              <span className="btn-primary mt-6 inline-flex text-sm">
                Continue
                <ArrowRight className="h-4 w-4" />
              </span>
            </>
          ) : (
            <>
              <p className="mt-4 font-display text-2xl font-bold text-white">
                Choose your track
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Seven live tracks, one engine. Start wherever you are.
              </p>
            </>
          )}
        </Link>

        {/* Level + streak */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center justify-between">
              <Eyebrow>Level — {level}</Eyebrow>
              <Trophy className="h-4 w-4 text-gray-500" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-white">
              {progress.totalXp.toLocaleString()}{" "}
              <span className="text-base font-medium text-gray-500">XP</span>
            </p>
            {next ? (
              <>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all"
                    style={{ width: `${Math.round(levelProgress * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {remaining.toLocaleString()} XP to {next}
                </p>
              </>
            ) : (
              <p className="mt-2 text-xs text-gray-500">Master — the summit. Keep building.</p>
            )}
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <Flame className={cn("h-6 w-6", progress.streak > 0 ? "text-white" : "text-gray-600")} />
            <div>
              <p className="font-display text-2xl font-bold text-white">
                {progress.streak}{" "}
                <span className="text-sm font-medium text-gray-500">
                  day streak
                </span>
              </p>
              <p className="text-xs text-gray-500">
                {progress.streak === 0
                  ? "Complete a day to light it."
                  : "Consistency compounds. One day at a time."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <RotateCcw className="h-4 w-4 text-gray-400" />
            <h2 className="font-display text-lg font-bold text-white">
              Recommended review
            </h2>
          </div>
          <Eyebrow>{due.length === 0 ? "All clear" : `${due.length} due`}</Eyebrow>
        </div>
        {due.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">
            Nothing due. As you complete exercises, spaced repetition will
            surface concepts here before you forget them.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-white/5">
            {due.map((item) => (
              <li key={item.day}>
                <Link
                  to={lessonHref(primary, item.day)}
                  className="group flex items-center gap-4 py-3"
                >
                  <span className="font-mono text-xs text-gray-500">
                    {formatDay(item.day)}
                  </span>
                  <span className="flex-1 text-sm text-gray-300 group-hover:text-white">
                    {item.missed} exercise{item.missed === 1 ? "" : "s"} still open
                    {item.overdue ? " — overdue" : ""}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Elsewhere */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          { href: "/playground", icon: BookOpen, title: "Practice", body: "The workbench — experiment outside the curriculum." },
          { href: "/community", icon: Sparkles, title: "Community", body: "Learnings, questions, and study groups." },
          { href: "/dashboard", icon: Trophy, title: "My journey", body: "Full track stats, days grid, and tiers." },
        ].map((c) => (
          <Link
            key={c.href}
            to={c.href}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25"
          >
            <c.icon className="h-5 w-5 text-white" strokeWidth={1.5} />
            <h3 className="mt-3 font-display text-base font-bold text-white">{c.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{c.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const LIVE_TRACKS = TRACKS.filter((t) => t.status === "live");

/**
 * First-run onboarding — shown on /home when the learner has zero progress
 * everywhere and never picked a track. One decision (which path), one
 * button (start day one). The choice is remembered so "Continue" keeps
 * pointing at their track from then on.
 */
function FirstRunOnboarding() {
  const [picked, setPicked] = useState(LIVE_TRACKS[0]!.slug);
  const key = trackSlugToKey(picked);
  const current = LIVE_TRACKS.find((t) => t.slug === picked) ?? LIVE_TRACKS[0]!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Eyebrow>Welcome to AstaHub</Eyebrow>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Pick your path.
        <br />
        Day one takes twenty minutes.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-400">
        Seven live tracks, one way of learning: a little reading, a lot of
        building, every single day. Choose yours — you can switch any time,
        and everything here is free forever.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-2" role="listbox" aria-label="Choose your path">
        {LIVE_TRACKS.map((t) => {
          const active = t.slug === picked;
          return (
            <button
              key={t.slug}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => setPicked(t.slug)}
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-xl px-5 py-3.5 text-left transition-colors",
                active ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5"
              )}
            >
              <span className="flex items-center gap-3">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", TRACK_DOT[trackColorKey(t.slug)])} />
                <span>
                  <span className="block font-display text-base font-bold leading-tight">
                    {t.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {t.days ?? 100} days · from zero
                  </span>
                </span>
              </span>
              <ArrowRight
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform",
                  active ? "translate-x-0.5" : "opacity-40"
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          to={dayOneHref(key)}
          onClick={() => setPrimaryTrack(key)}
          className="btn-primary text-base"
        >
          Start day one — {current.name}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/tracks" className="btn text-base">
          Compare all paths
        </Link>
      </div>
      <p className="mt-5 text-sm text-gray-500">
        One lesson a day keeps the streak alive. Miss a day? The streak
        forgives — just come back.
      </p>
    </div>
  );
}
