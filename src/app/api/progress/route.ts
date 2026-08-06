import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  try {
    const body = await req.json();
    const {
      currentDay,
      totalXp,
      level,
      streak,
      lastActiveDate,
      completedDays,
      completedExercises,
      completedAssignments,
      notes,
    } = body;

    const data: Record<string, unknown> = {};
    if (typeof currentDay === "number") data.currentDay = currentDay;
    if (typeof totalXp === "number") data.totalXp = totalXp;
    if (typeof level === "string") data.level = level;
    if (typeof streak === "number") data.streak = streak;
    if (typeof lastActiveDate === "string" || lastActiveDate === null) data.lastActiveDate = lastActiveDate;
    if (Array.isArray(completedDays)) data.completedDays = completedDays;
    if (completedExercises && typeof completedExercises === "object") data.completedExercises = completedExercises;
    if (Array.isArray(completedAssignments)) data.completedAssignments = completedAssignments;
    if (notes && typeof notes === "object") data.notes = notes;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
      select: { id: true, name: true, email: true, image: true },
    });
    return NextResponse.json({ user });
  } catch (err) {
    console.error("progress sync error", err);
    return NextResponse.json({ error: "Failed to sync progress." }, { status: 500 });
  }
}
