import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      certificates: { orderBy: { issuedAt: "asc" } },
      trackProgress: true,
    },
  });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  const exported = {
    exportedAt: new Date().toISOString(),
    profile: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      joinedAt: user.createdAt,
    },
    tracks: user.trackProgress.map((t) => ({
      track: t.track,
      currentDay: t.currentDay,
      totalXp: t.totalXp,
      level: t.level,
      streak: t.streak,
      lastActiveDate: t.lastActiveDate,
      completedDays: t.completedDays,
      completedExercises: t.completedExercises,
      completedAssignments: t.completedAssignments,
      notes: t.notes,
    })),
    certificates: user.certificates.map((c) => ({
      id: c.id,
      track: c.track,
      title: c.title,
      issuedAt: c.issuedAt,
    })),
  };

  return NextResponse.json(exported);
}
