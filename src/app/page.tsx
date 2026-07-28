"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Target,
  Zap,
  BookOpen,
  Terminal,
} from "lucide-react";
import { PROFICIENCY_TIERS } from "@/lib/types";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

const FEATURES = [
  {
    icon: BookOpen,
    title: "Deep Theory",
    desc: "Memory layouts, calling conventions, and silicon-level concepts explained clearly.",
    color: "#00f0ff",
  },
  {
    icon: Terminal,
    title: "Live Playground",
    desc: "Write and run C and Assembly code in-browser with instant feedback.",
    color: "#00e673",
  },
  {
    icon: Target,
    title: "Exercises & Assignments",
    desc: "Quizzes, code challenges, and capstone projects to cement every concept.",
    color: "#ffb000",
  },
  {
    icon: Layers,
    title: "5 Proficiency Tiers",
    desc: "From Memory Initiate to Silicon Master — track your evolution.",
    color: "#bf00ff",
  },
  {
    icon: Zap,
    title: "XP & Streaks",
    desc: "Earn XP, maintain daily streaks, and unlock achievements.",
    color: "#ff0040",
  },
  {
    icon: Cpu,
    title: "C → Assembly Bridge",
    desc: "Days 1–50 in C, Days 51–100 in x86-64 ASM. See how high-level becomes machine code.",
    color: "#00f0ff",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Scene3D className="h-full w-full opacity-60" interactive />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-cyber-cyan/5 px-4 py-1.5">
              <Code2 className="h-4 w-4 text-cyber-cyan" />
              <span className="text-xs font-mono text-cyber-cyan tracking-wider">
                100-DAY SYSTEMS PROGRAMMING BOOTCAMP
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
              <span className="text-white">MASTER </span>
              <span className="text-glow-cyan text-cyber-cyan">C</span>
              <span className="text-white"> & </span>
              <span className="text-glow-purple text-cyber-purple">ASM</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl mb-8 leading-relaxed">
              100 days. Two languages that run the world. From your first{" "}
              <code className="text-cyber-cyan">printf</code> to bare-metal{" "}
              <code className="text-cyber-purple">syscall</code> — become a
              systems programmer the interactive way.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard" className="btn-cyber-solid">
                Start Day 001
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/curriculum" className="btn-cyber">
                View Curriculum
              </Link>
            </div>

            <div className="mt-12 flex gap-8 text-sm font-mono">
              <div>
                <span className="text-2xl font-display font-bold text-white">100</span>
                <p className="text-gray-500">Days</p>
              </div>
              <div>
                <span className="text-2xl font-display font-bold text-cyber-cyan">50</span>
                <p className="text-gray-500">C Lessons</p>
              </div>
              <div>
                <span className="text-2xl font-display font-bold text-cyber-purple">50</span>
                <p className="text-gray-500">ASM Lessons</p>
              </div>
              <div>
                <span className="text-2xl font-display font-bold text-cyber-amber">5</span>
                <p className="text-gray-500">Tiers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proficiency Tiers */}
      <section className="relative py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Proficiency Progression
            </h2>
            <p className="text-gray-500 font-mono text-sm">
              Five tiers. One journey from initiate to master.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-5">
            {PROFICIENCY_TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-xl border border-white/5 bg-cyber-panel/40 p-6 hover:border-white/10 transition-all"
                style={{ borderColor: `${tier.color}15` }}
              >
                <div
                  className="text-3xl mb-3"
                  style={{ color: tier.color }}
                >
                  {tier.icon}
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-1">
                  {tier.title}
                </h3>
                <p className="text-[10px] font-mono text-gray-500 mb-3">
                  DAYS {tier.dayRange[0]}–{tier.dayRange[1]}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {tier.description}
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: tier.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-16">
            Built for Serious Learners
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-white/5 bg-cyber-panel/30 p-6 hover:bg-cyber-panel/50 transition-all"
              >
                <f.icon className="h-8 w-8 mb-4" style={{ color: f.color }} />
                <h3 className="font-display text-sm font-bold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to speak to the machine?
          </h2>
          <p className="text-gray-400 mb-8 font-mono text-sm">
            No frameworks. No abstractions. Just you, the compiler, and the silicon.
          </p>
          <Link href="/dashboard" className="btn-cyber-solid text-base px-8 py-4">
            Initialize Boot Sequence
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
