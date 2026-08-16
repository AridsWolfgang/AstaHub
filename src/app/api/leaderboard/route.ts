import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseLeaderboardQuery } from "@/lib/leaderboard";

export async function GET(req: Request) {
  const { limit, track } = parseLeaderboardQuery(req.url);

  if (track === "c") {
    const users = await prisma.user.findMany({
      orderBy: [{ totalXp: "desc" }, { updatedAt: "asc" }],
      take: limit,
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
    return NextResponse.json({ users });
  }

  const rows = await prisma.userTrackProgress.findMany({
    where: { track },
    orderBy: [{ totalXp: "desc" }, { updatedAt: "asc" }],
    take: limit,
    select: {
      userId: true,
      totalXp: true,
      level: true,
      streak: true,
      currentDay: true,
      user: { select: { name: true, image: true } },
    },
  });

  const users = rows.map((r) => ({
    id: r.userId,
    name: r.user.name ?? "Anonymous",
    image: r.user.image,
    totalXp: r.totalXp,
    level: r.level,
    streak: r.streak,
    currentDay: r.currentDay,
  }));

  return NextResponse.json({ users });
}
