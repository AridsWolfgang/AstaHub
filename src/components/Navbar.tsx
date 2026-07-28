"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Map,
  Trophy,
  Terminal,
  Cpu,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/lib/store";
import { getTierByLevel } from "@/lib/types";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/curriculum", icon: Map, label: "Curriculum" },
  { href: "/playground", icon: Terminal, label: "Playground" },
  { href: "/achievements", icon: Trophy, label: "Achievements" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalXp, level, streak } = useProgressStore();
  const tier = getTierByLevel(level);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyber-border/50 bg-cyber-dark/95 md:bg-cyber-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-cyber-cyan/30 bg-cyber-cyan/5 group-hover:border-cyber-cyan/60 transition-colors">
            <Cpu className="h-5 w-5 text-cyber-cyan" />
            <div className="absolute inset-0 rounded-lg animate-pulse-glow opacity-0 group-hover:opacity-100" />
          </div>
          <div>
            <span className="font-display text-sm font-bold tracking-wider text-white">
              ASTA
            </span>
            <span className="font-display text-sm font-bold tracking-wider text-cyber-cyan">
              .100
            </span>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest hidden sm:block">
              C + ASM BOOTCAMP
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-mono transition-all",
                pathname === href
                  ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span style={{ color: tier.color }}>{tier.icon}</span>
              <span className="text-gray-400 hidden lg:inline">{tier.name}</span>
            </div>
            <div className="h-4 w-px bg-cyber-border" />
            <span className="text-cyber-amber">{totalXp} XP</span>
            {streak > 0 && (
              <>
                <div className="h-4 w-px bg-cyber-border" />
                <span className="text-cyber-red">🔥 {streak}</span>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-cyber-border/50 bg-cyber-dark/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-mono transition-all",
                  pathname === href
                    ? "bg-cyber-cyan/10 text-cyber-cyan"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <div className="border-t border-white/5 my-2 pt-2 flex items-center gap-3 text-xs font-mono text-gray-500 px-3">
              <span style={{ color: tier.color }}>{tier.icon} {tier.name}</span>
              <span className="text-cyber-amber">{totalXp} XP</span>
              {streak > 0 && <span className="text-cyber-red">🔥 {streak}</span>}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
