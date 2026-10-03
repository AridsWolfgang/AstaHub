import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TOTAL_TRACKS } from "@/lib/curriculum";
import { TRACKS, TRACK_GROUPS } from "@/lib/tracks";
import { TRACK_DOT, TRACK_SELECTED, TRACK_TEXT, TRACK_TEXT_GROUP_HOVER, trackColorKey } from "@/lib/trackColors";
import { cn } from "@/lib/utils";

/* Real curriculum data — proof, never invented. */
const TOTAL_LESSONS = Object.values(TOTAL_TRACKS).reduce((a, b) => a + b, 0);
const LIVE_TRACKS = TRACKS.filter((t) => t.status === "live");
const ROADMAP_NAMES = TRACK_GROUPS.slice(1)
  .flatMap((g) => g.tracks.map((t) => t.name))
  .join(" · ");

const TRACK_DAYS: Record<string, number> = {
  c: TOTAL_TRACKS.c,
  assembly: TOTAL_TRACKS.c,
  python: TOTAL_TRACKS.python,
  cpp: TOTAL_TRACKS.cpp,
  javascript: TOTAL_TRACKS.js,
  sql: TOTAL_TRACKS.sql,
  toolkit: TOTAL_TRACKS.bash,
};

const DAY_BEATS = [
  {
    time: "Morning",
    title: "Read a little, understand a lot",
    body: "Each day opens with a short lesson — one idea, explained plainly, with live code you can touch. Fifteen minutes with coffee, and the idea is yours.",
  },
  {
    time: "Afternoon",
    title: "Build it with your own hands",
    body: "Then the keyboard is yours. Quizzes check your thinking, code challenges make you prove it, and the assignment asks for something real. Stuck? The coach nudges — never tells.",
  },
  {
    time: "Evening",
    title: "Keep what you earned",
    body: "Reviews arrive exactly when you'd forget. Streaks forgive bad days. The capstone at the end of the road turns a hundred small wins into something you can show anyone.",
  },
];

const PROMISES = [
  {
    title: "Free means free.",
    body: "No paywall, no trial, no card. If money ever decides who learns, we've failed — so it never will.",
  },
  {
    title: "You'll never be handed the answer.",
    body: "Hints, questions, direction — that's the deal. The struggle is where the skill lives, and we protect it.",
  },
  {
    title: "You'll never learn alone.",
    body: "A feed of fellow learners, questions with real effort behind them, study groups, live classes. People, not content.",
  },
];

export default function HomePage() {
  const [picked, setPicked] = useState(LIVE_TRACKS[0]!.slug);
  const current = LIVE_TRACKS.find((t) => t.slug === picked) ?? LIVE_TRACKS[0]!;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* The picker — choose first, read later */}
        <div className="pb-16 pt-16 sm:pb-20 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
              AstaHub — a free school for builders
            </p>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Pick a path.
              <br />
              Build real things.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
              Seven paths, one way of learning: a little reading, a lot of
              building, every single day. Choose yours to begin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:grid-cols-[1fr_1.1fr]"
          >
            {/* Path list */}
            <div className="bg-black p-2" role="listbox" aria-label="Choose your path">
              {LIVE_TRACKS.map((t) => {
                const active = t.slug === picked;
                const key = trackColorKey(t.slug);
                return (
                  <button
                    key={t.slug}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => setPicked(t.slug)}
                    className={cn(
                      "group flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left transition-colors",
                      active
                        ? cn(TRACK_SELECTED[key], "hover:text-black focus-visible:text-black active:text-black")
                        : "text-gray-300 hover:bg-white/5"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {!active && (
                        <span className={cn("h-2 w-2 shrink-0 rounded-full", TRACK_DOT[key])} />
                      )}
                      <span>
                        <span
                          className={cn(
                            "block font-serif text-xl leading-tight transition-colors",
                            active ? "text-black" : TRACK_TEXT_GROUP_HOVER[key]
                          )}
                        >
                          {t.name}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block text-sm",
                            active ? "text-black/60" : "text-gray-500"
                          )}
                        >
                          {TRACK_DAYS[t.slug]} days · from zero
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 shrink-0 transition-transform",
                        active ? "translate-x-0.5 -translate-y-0.5" : "opacity-40"
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Chosen path */}
            <div className="flex flex-col justify-between bg-white/[0.02] p-8 sm:p-10">
              <div key={current.slug}>
                <p className={cn("font-mono text-[11px] uppercase tracking-[0.25em]", TRACK_TEXT[trackColorKey(current.slug)])}>
                  Your path · {TRACK_DAYS[current.slug]} days
                </p>
                <p className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl">
                  {current.outcome}
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-gray-400">
                  {current.description}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={current.href ?? `/tracks/${current.slug}`}
                  className="btn-primary text-base"
                >
                  Start day one
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/tracks" className="btn text-base">
                  Compare all paths
                </Link>
              </div>
              <p className="mt-5 text-sm text-gray-500">
                Not ready to join?{" "}
                <Link
                  to="/playground"
                  className="text-gray-200 underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  Warm up in the Workshop
                </Link>{" "}
                — no account needed.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Proof — quiet numbers, all real */}
        <div className="border-t border-white/5 py-14 sm:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
            The school so far
          </p>
          <dl className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: String(TOTAL_LESSONS), label: "lessons, each ending with something you built" },
              { value: String(LIVE_TRACKS.length), label: "live paths you can start tonight" },
              { value: "100", label: "hand-written days in the flagship C path" },
              { value: "$0", label: "the price, today and always" },
            ].map((s) => (
              <div key={s.label}>
                <dd className="font-serif text-5xl tracking-tight text-white">
                  {s.value}
                </dd>
                <dt className="mt-3 max-w-[22ch] text-sm leading-relaxed text-gray-500">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* A day at the school — story, not features */}
        <div className="border-t border-white/5 py-16 sm:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
            A day at the school
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-white sm:text-5xl">
            Small days, honestly kept, become a skill.
          </h2>
          <div className="mt-12 space-y-0">
            {DAY_BEATS.map((b, i) => (
              <div
                key={b.time}
                className="grid gap-2 border-t border-white/5 py-8 sm:grid-cols-[140px_1fr_1.4fr] sm:gap-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                  {b.time}
                </p>
                <h3 className="font-serif text-2xl leading-snug text-white">
                  <span className="mr-3 text-gray-600">0{i + 1}</span>
                  {b.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-gray-400">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Promises — what the school swears */}
        <div className="border-t border-white/5 py-16 sm:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Three promises
          </p>
          <div className="mt-10 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {PROMISES.map((p) => (
              <div key={p.title}>
                <h3 className="font-serif text-2xl leading-snug text-white sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-gray-400">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond — honest about what's next */}
        <div className="border-t border-white/5 py-16 sm:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Beyond the paths
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-white sm:text-5xl">
            A school that grows into everything.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            The method works, so the school keeps growing — mathematics,
            physics, engineering, and one day the humanities too. They
            aren&apos;t here yet, and we won&apos;t pretend otherwise.
          </p>
          <p className="mt-8 max-w-3xl font-serif text-xl italic leading-relaxed text-gray-300 sm:text-2xl">
            {ROADMAP_NAMES}
          </p>
          <Link to="/tracks" className="btn mt-10 text-base">
            See the whole map
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Closing — come inside */}
        <div className="border-t border-white/5 py-20 text-center sm:py-28">
          <p className="mx-auto max-w-3xl font-serif text-4xl leading-tight tracking-tight text-white sm:text-6xl">
            Come build
            <br />
            with us.
          </p>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-gray-400">
            Tonight, not someday. Day one takes twenty minutes — and it&apos;s
            free, like everything here.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/home" className="btn-primary text-base">
              Take your first day
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Free forever · For every person on Earth
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Stewarded by{" "}
            <a
              href="https://ps-hub.org"
              target="_blank"
              rel="noreferrer"
              className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
            >
              Prosperity Systems Hub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
