import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10) || 50, 100);

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
