"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getTierByLevel, type ProficiencyLevel } from "@/lib/types";
import type { TrackKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Medal, Loader2 } from "lucide-react";

const MEDALS = [
  { fill: "#ffffff", opacity: "1" },
  { fill: "#a3a3a3", opacity: "1" },
  { fill: "#6e6e6e", opacity: "1" },
];

interface RankedUser {
  id: string;
  name: string;
  image: string | null;
  totalXp: number;
  level: string;
  streak: number;
  currentDay: number;
  rank: number;
}

function Avatar({ name, image, rank }: { name: string; image: string | null; rank: number }) {
  const initials = (name || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        unoptimized
        width={40}
        height={40}
        className="h-10 w-10 rounded-xl object-cover border border-white/10"
      />
    );
  }
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl border font-mono text-xs font-bold",
        rank <= 3
          ? "border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan"
          : "border-white/10 bg-white/5 text-gray-400"
      )}
    >
      {initials}
    </div>
  );
}

export default function LeaderboardPage() {
  const [track, setTrack] = useState<TrackKey>("c");
  const [ranked, setRanked] = useState<RankedUser[]>([]);
  const [meId, setMeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetch(`/api/leaderboard?track=${track}&limit=100`, { cache: "no-store" }),
      fetch("/api/me", { cache: "no-store" }),
    ])
      .then(async ([lbRes, meRes]) => {
        const [lb, me] = await Promise.all([lbRes.json(), meRes.json().catch(() => null)]);
        if (cancelled) return;
        setRanked(
          lb.users.map((u: RankedUser, i: number) => ({ ...u, rank: i + 1 }))
        );
        setMeId(me?.user?.id ?? null);
      })
      .catch(() => {
        if (!cancelled) setRanked([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [track]);

  const top3 = ranked.filter((u) => u.rank <= 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Leaderboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Ranked by track XP. Earn XP by completing theory, exercises, and assignments.
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1">
            {(["c", "python", "cpp"] as TrackKey[]).map((t) => (
              <button
                key={t}
                onClick={() => setTrack(t)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-mono transition-colors",
                  track === t ? "bg-white text-black" : "text-gray-400 hover:text-white"
                )}
              >
                {t === "c" ? "C" : t === "python" ? "Python" : "C++"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : ranked.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          No learners yet on this track. Be the first.
        </p>
      ) : (
        <>
          {top3.length > 0 && (
            <div className="mb-8 grid grid-cols-3 gap-3">
              {top3.map((u) => {
                const tier = getTierByLevel(u.level as ProficiencyLevel);
                return (
                  <div
                    key={u.id}
                    className={cn(
                      "rounded-xl border p-4 text-center",
                      u.rank === 1
                        ? "border-cyber-cyan/30 bg-cyber-cyan/5"
                        : "border-white/5 bg-cyber-panel/50"
                    )}
                  >
                    <div className="flex items-center justify-center">
                      <Medal
                        className="h-6 w-6"
                        style={{ color: "#ffffff", fill: MEDALS[u.rank - 1].fill }}
                      />
                    </div>
                    <p className="mt-2 truncate text-sm font-semibold text-white">{u.name}</p>
                    <p className="text-lg font-display font-bold text-cyber-cyan">{u.totalXp}</p>
                    <p className="text-[10px] font-mono text-gray-500">XP · {tier.title}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="rounded-xl border border-white/5 overflow-hidden">
            {ranked.map((u) => {
              const tier = getTierByLevel(u.level as ProficiencyLevel);
              const isMe = meId === u.id;
              return (
                <div
                  key={u.id}
                  className={cn(
                    "flex items-center gap-4 border-b border-white/5 px-4 py-3 last:border-b-0",
                    isMe && "bg-cyber-cyan/5"
                  )}
                >
                  <span className="w-8 text-center font-mono text-sm text-gray-500">{u.rank}</span>
                  <Avatar name={u.name} image={u.image} rank={u.rank} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {u.name}
                      {isMe && (
                        <span className="ml-2 text-[10px] font-mono text-cyber-cyan">(you)</span>
                      )}
                    </p>
                    <p className="text-[10px] font-mono text-gray-500">
                      {tier.icon} {tier.title} · Day {u.currentDay}
                    </p>
                  </div>
                  {u.streak > 0 && (
                    <span className="hidden sm:inline font-mono text-xs text-gray-400">
                      {u.streak}d streak
                    </span>
                  )}
                  <span className="font-mono text-sm font-bold text-cyber-cyan">
                    {u.totalXp} XP
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
