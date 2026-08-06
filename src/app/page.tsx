"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Hammer,
  Infinity as InfinityIcon,
  Lightbulb,
} from "lucide-react";
import HeroTerminal from "@/components/HeroTerminal";
import { TRACK_GROUPS } from "@/lib/tracks";
import { cn } from "@/lib/utils";

const PRINCIPLES = [
  {
    icon: BookOpen,
    title: "Learn by doing",
    line: "You write it, break it, and fix it until it's yours — every concept is a working program in your hands.",
  },
  {
    icon: Lightbulb,
    title: "A coach, never an oracle",
    line: "When you're stuck you're guided, never handed the answer. The struggle is where the skill lives.",
  },
  {
    icon: Hammer,
    title: "Prove it by building",
    line: "Mastery is a portfolio of things you built from a blank page — not a row of click-through checkmarks.",
  },
  {
    icon: InfinityIcon,
    title: "Free, forever",
    line: "No paywalls, no trials, no credit card. Knowledge is a right, not a product — for everyone, anywhere.",
  },
];

function Stat({ to, prefix = "", label }: { to: number; prefix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, mv, to]);

  useEffect(() => mv.on("change", (v) => setDisplay(String(Math.round(v)))), [mv]);

  return (
    <div ref={ref}>
      <p className="font-display text-2xl font-bold text-white">
        {prefix}
        {display}
      </p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-400">
                AstaHub — free technical education
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Learn to build.
              <br />
              Free. Forever.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
              Hands-on courses that take you from first command to real skill — no
              paywalls, no lectures, no credit card. Start on the phone in your
              pocket. The knowledge stays yours.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/dashboard" className="btn-primary text-base">
                Start learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/tracks" className="btn text-base">
                Explore the tracks
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
              <Stat to={100} label="days" />
              <Stat to={2} label="languages" />
              <Stat to={0} prefix="$" label="forever" />
              <Stat to={1} label="builder — you" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <HeroTerminal />
            <p className="mt-4 text-center font-mono text-xs text-gray-500">
              A live look at how learning works — click to advance
            </p>
          </motion.div>
        </div>

        {/* Principles */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/5 py-16 sm:py-20"
        >
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl font-bold text-white">
              How you learn here
            </h2>
            <p className="text-sm text-gray-500">
              No lectures to watch. No paywall to pass. Just a method that works.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-white/25"
              >
                <p.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{p.line}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The tracks */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/5 py-16 sm:py-20"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-white">
                One school. Every skill.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-gray-500">
                A living body of technical knowledge, built so a beginner climbs it
                like a staircase and a professional uses it like a library. Each
                track runs the same engine — day-by-day lessons, XP, playground,
                capstone.
              </p>
            </div>
            <Link href="/tracks" className="btn text-sm">
              Explore all tracks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-8">
            {TRACK_GROUPS.map((group) => (
              <div key={group.id}>
                <div className="mb-3 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-bold text-white">
                    {group.title}
                  </h3>
                  <p className="hidden text-sm text-gray-500 sm:block">{group.tagline}</p>
                </div>
                <ul className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  {group.tracks.map((track) => {
                    const inner = (
                      <>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-base font-bold text-white">
                            {track.name}
                          </p>
                          <p className="mt-0.5 text-sm text-gray-400">{track.outcome}</p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 font-mono text-[10px] uppercase tracking-widest",
                            track.status === "live"
                              ? "text-white"
                              : track.status === "coming"
                                ? "text-gray-300"
                                : "text-gray-500"
                          )}
                        >
                          {track.status === "live"
                            ? "Live"
                            : track.status === "coming"
                              ? "Coming soon"
                              : "Planned"}
                        </span>
                      </>
                    );
                    return (
                      <li
                        key={track.slug}
                        className="border-t border-white/5 first:border-t-0"
                      >
                        <Link
                          href={`/tracks/${track.slug}`}
                          className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                        >
                          {inner}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/5 py-20 text-center sm:py-28"
        >
          <p className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Learning should be fun.
            <br />
            And it should be for everyone.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/dashboard" className="btn-primary text-base">
              Begin your journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Free forever · Every person on Earth
          </p>
        </motion.div>
      </div>
    </section>
  );
}
