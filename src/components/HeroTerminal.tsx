"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DEMOS = [
  {
    tag: "lesson",
    title: "lesson 014",
    code: `You: I've tried this loop three ways. It never stops.
Coach: What is the problem really asking?
You: Hmm... a condition that never changes.
Coach: Right. Now build the smallest version that proves it.`,
    output: `✓ You fixed it yourself · +50 XP`,
  },
  {
    tag: "review",
    title: "the review",
    code: `Due today — spaced repetition.
You: A function changed a variable it never returned. How?
You: A pointer. It edited memory in place.`,
    output: `✓ Retained · next review in 7 days`,
  },
  {
    tag: "capstone",
    title: "day 100 · capstone",
    code: `You: Building it from a blank page.
You: A program that parses input, transforms it,
You: writes output. Every test passes. I can
You: explain each line.`,
    output: `✓ Capstone verified
✓ Certificate issued · verifiable, forever`,
  },
  {
    tag: "streak",
    title: "your rhythm",
    code: `You: Day 37. Life happened — I got a grace day.
You: So the streak lives, on my own clock.`,
    output: `✓ Streak kept · +1 day`,
  },
];

type Phase = "typing" | "output" | "hold";

export default function HeroTerminal() {
  const [demoIdx, setDemoIdx] = useState(0);
  const [codeLen, setCodeLen] = useState(0);
  const [outLines, setOutLines] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const demo = DEMOS[demoIdx];
  const output = demo.output.split("\n");

  useEffect(() => {
    setCodeLen(0);
    setOutLines(0);
    setPhase("typing");
    const typing = setInterval(() => {
      setCodeLen((n) => {
        if (n >= demo.code.length) {
          clearInterval(typing);
          setPhase("output");
          return n;
        }
        return n + 1;
      });
    }, 26);
    return () => clearInterval(typing);
  }, [demoIdx, demo.code]);

  useEffect(() => {
    if (phase !== "output") return;
    const out = setInterval(() => {
      setOutLines((n) => {
        if (n >= output.length) {
          clearInterval(out);
          setPhase("hold");
          return n;
        }
        return n + 1;
      });
    }, 500);
    return () => clearInterval(out);
  }, [phase, demoIdx, output.length]);

  useEffect(() => {
    if (phase !== "hold") return;
    const t = setTimeout(() => setDemoIdx((i) => (i + 1) % DEMOS.length), 3800);
    return () => clearTimeout(t);
  }, [phase, demoIdx]);

  const typingDone = codeLen >= demo.code.length;

  return (
    <button
      type="button"
      onClick={() => setDemoIdx((i) => (i + 1) % DEMOS.length)}
      className="group w-full text-left"
      aria-label="A learning session — click to advance"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors group-hover:border-white/25">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
            <span className="ml-3 font-mono text-[11px] text-gray-500">
              asta://learn — {demo.title}
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
            <span className="rounded border border-white/20 px-1.5 py-0.5 text-gray-300">
              {demo.tag}
            </span>
            <span className="hidden text-gray-600 sm:inline">click to advance</span>
          </div>
        </div>

        <div className="relative min-h-[240px] px-5 py-4">
          <div className="mb-4 flex items-center gap-2 font-mono text-[11px] text-gray-600">
            <span className="text-gray-400">$</span>
            <span>asta --session</span>
          </div>

          <pre className="overflow-hidden font-mono text-[13px] leading-relaxed">
            <code className="whitespace-pre-wrap text-gray-200">
              {demo.code.slice(0, codeLen)}
              {!typingDone && <span className="animate-pulse text-white">▌</span>}
            </code>
          </pre>

          {phase !== "typing" && (
            <div className="mt-4 border-t border-white/5 pt-3 font-mono text-[13px] leading-relaxed">
              {output.slice(0, outLines).map((line, i) => (
                <p
                  key={i}
                  className={cn(
                    "whitespace-pre-wrap",
                    line.startsWith("✓") ? "text-white" : "text-gray-200"
                  )}
                >
                  {line}
                </p>
              ))}
              {phase === "output" && <span className="animate-pulse text-white">▌</span>}
            </div>
          )}

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {DEMOS.map((d, i) => (
              <span
                key={d.title}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === demoIdx ? "w-6 bg-white" : "w-2 bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
