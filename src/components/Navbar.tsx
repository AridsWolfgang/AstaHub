"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Code2,
  Map,
  Menu,
  X,
  Trophy,
  Medal,
  User,
  LogOut,
  Flame,
  ChevronDown,
  Atom,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/lib/store";
import { TRACK_GROUPS } from "@/lib/tracks";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Compass, label: "My journey" },
  { href: "/playground", icon: Code2, label: "Practice" },
];

const ACCOUNT_ITEMS = [
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/leaderboard", icon: Medal, label: "Leaderboard" },
  { href: "/achievements", icon: Trophy, label: "Achievements" },
];

const LEARN_ICONS = { languages: Code2, sciences: Atom, dream: Sparkles } as const;

export default function Navbar() {
  const pathname = usePathname();
  const { totalXp, streak } = useProgressStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const authed = status === "authenticated";
  const close = () => setMobileOpen(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    setLearnOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo
          tagline="Free technical education"
          taglineClassName="hidden lg:inline"
        />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <div className="relative" ref={learnRef}>
            <button
              type="button"
              onClick={() => setLearnOpen((v) => !v)}
              aria-expanded={learnOpen}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname.startsWith("/tracks")
                  ? "bg-white/5 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Map className="h-4 w-4" />
              Learn
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  learnOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {learnOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-xl"
                >
                  <Link
                    href="/tracks"
                    onClick={() => setLearnOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <span className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      All tracks
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <div className="my-1 h-px bg-white/5" />
                  {TRACK_GROUPS.map((group) => {
                    const Icon = LEARN_ICONS[group.id];
                    return (
                      <Link
                        key={group.id}
                        href={`/tracks#${group.id}`}
                        onClick={() => setLearnOpen(false)}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                      >
                        <Icon
                          className="mt-0.5 h-4 w-4 shrink-0 text-gray-400"
                          strokeWidth={1.5}
                        />
                        <span className="min-w-0">
                          <span className="block text-sm text-white">
                            {group.title}
                          </span>
                          <span className="block truncate text-xs text-gray-500">
                            {group.tagline}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === href
                  ? "bg-white/5 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {authed ? (
            <>
              <div className="hidden items-center gap-3 text-xs font-mono lg:flex">
                <span className="text-white">{totalXp} XP</span>
                {streak > 0 && (
                  <span className="flex items-center gap-1 text-gray-400">
                    <Flame className="h-3.5 w-3.5" />
                    {streak}
                  </span>
                )}
              </div>
              <Link
                href="/profile"
                className="hidden h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/25 hover:text-white md:flex"
                aria-label="Profile"
              >
                <User className="h-4 w-4" />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white lg:flex"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </>
          ) : (
            <Link href="/signin" className="btn-primary !px-4 !py-2 text-sm">
              Sign in
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition-colors hover:border-white/25 hover:text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 flex w-[86%] max-w-sm flex-col overflow-hidden border-l border-white/10 bg-black md:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                <Logo onClick={close} />
                <button
                  onClick={close}
                  className="rounded-lg border border-white/10 p-2 text-gray-400 transition-colors hover:border-white/25 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-4 pt-3">
                <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  Learn
                </p>
                <Link
                  href="/tracks"
                  onClick={close}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  <Map className="h-4 w-4" />
                  All tracks
                </Link>
                {TRACK_GROUPS.map((group) => {
                  const Icon = LEARN_ICONS[group.id];
                  return (
                    <Link
                      key={group.id}
                      href={`/tracks#${group.id}`}
                      onClick={close}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                      {group.title}
                    </Link>
                  );
                })}

                <p className="px-3 pb-2 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  Explore
                </p>
                {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      pathname === href
                        ? "bg-white/5 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}

                {authed ? (
                  <>
                    {session?.user?.name && (
                      <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-sm font-semibold text-white">
                          {session.user.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-white">
                            {session.user.name}
                          </span>
                          {session.user.email && (
                            <span className="block truncate font-mono text-[11px] text-gray-500">
                              {session.user.email}
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                    <p className="px-3 pb-2 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      Account
                    </p>
                    {ACCOUNT_ITEMS.map(({ href, icon: Icon, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={close}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Link>
                    ))}
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <p className="px-3 pb-2 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      Getting started
                    </p>
                    <div className="mx-1 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                      <p className="text-sm text-gray-400">
                        Sign in to sync your progress, keep your streak, and climb
                        the leaderboard.
                      </p>
                      <Link
                        href="/signin"
                        onClick={close}
                        className="btn-primary mt-3 flex w-full items-center justify-center !px-4 !py-2 text-sm"
                      >
                        Sign in
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3 border-t border-white/5 px-5 py-3 text-xs font-mono text-gray-500">
                <span className="text-white">{totalXp} XP</span>
                {streak > 0 && (
                  <span className="flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5" /> {streak}
                  </span>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
