import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTierByLevel, type ProficiencyLevel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";

const MEDALS = [
  { icon: Medal, fill: "#ffffff", opacity: "1" },
  { icon: Medal, fill: "#a3a3a3", opacity: "1" },
  { icon: Medal, fill: "#6e6e6e", opacity: "1" },
];

function Avatar({ name, image, rank }: { name: string; image: string | null; rank: number }) {
  const initials = (name || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  if (image) {
    return (
      <img
        src={image}
        alt={name}
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

export default async function LeaderboardPage() {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany({
    orderBy: [{ totalXp: "desc" }, { updatedAt: "asc" }],
    take: 100,
    select: {
      id: true,
      name: true,
      image: true,
      totalXp: true,
      level: true,
      streak: true,
      currentDay: true,
    },
  });

  const ranked = users.map((u, i) => ({
    ...u,
    rank: i + 1,
    tier: getTierByLevel(u.level as ProficiencyLevel),
    isMe: session?.user?.id === u.id,
  }));

  const top3 = ranked.filter((u) => u.rank <= 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Leaderboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Ranked by total XP. Earn XP by completing theory, exercises, and assignments.
        </p>
      </div>

      {top3.length > 0 && (
        <div className="mb-8 grid grid-cols-3 gap-3">
          {top3.map((u) => (
            <div
              key={u.id}
              className={cn(
                "rounded-xl border p-4 text-center",
                u.rank === 1 ? "border-cyber-cyan/30 bg-cyber-cyan/5" : "border-white/5 bg-cyber-panel/50"
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
              <p className="text-[10px] font-mono text-gray-500">XP · {u.tier.title}</p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-white/5 overflow-hidden">
        {ranked.map((u) => (
          <div
            key={u.id}
            className={cn(
              "flex items-center gap-4 border-b border-white/5 px-4 py-3 last:border-b-0",
              u.isMe && "bg-cyber-cyan/5"
            )}
          >
            <span className="w-8 text-center font-mono text-sm text-gray-500">{u.rank}</span>
            <Avatar name={u.name} image={u.image} rank={u.rank} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {u.name}
                {u.isMe && <span className="ml-2 text-[10px] font-mono text-cyber-cyan">(you)</span>}
              </p>
              <p className="text-[10px] font-mono text-gray-500">
                {u.tier.icon} {u.tier.title} · Day {u.currentDay}
              </p>
            </div>
            {u.streak > 0 && (
              <span className="hidden sm:inline font-mono text-xs text-gray-400">
                {u.streak}d streak
              </span>
            )}
            <span className="font-mono text-sm font-bold text-cyber-cyan">{u.totalXp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
