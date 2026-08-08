import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TRACKS = new Set(["c", "python", "cpp"]);

const TRACK_TOTAL_DAYS: Record<string, number> = { c: 100, python: 40, cpp: 40 };
const TRACK_CERT_TITLES: Record<string, string> = {
  c: "C / x86-64 Assembly",
  python: "Python",
  cpp: "C++",
};

async function issueCertificateIfComplete(
  userId: string,
  track: string,
  completedDays: unknown,
  totalXp: unknown
): Promise<void> {
  const total = TRACK_TOTAL_DAYS[track];
  if (!total || !Array.isArray(completedDays)) return;
  const daySet = new Set(completedDays.filter((d) => typeof d === "number" && d >= 1 && d <= total));
  if (daySet.size < total) return;
  const existing = await prisma.certificate.findFirst({ where: { userId, track } });
  if (existing) return;
  await prisma.certificate.create({
    data: {
      userId,
      track,
      title: `Certificate of Completion — ${TRACK_CERT_TITLES[track]}`,
      day: total,
      xp: typeof totalXp === "number" ? totalXp : total,
    },
  });
}

function pickProgress(body: Record<string, unknown>): Record<string, unknown> {
  const data: Record<string, unknown> = {};
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
  if (typeof currentDay === "number") data.currentDay = currentDay;
  if (typeof totalXp === "number") data.totalXp = totalXp;
  if (typeof level === "string") data.level = level;
  if (typeof streak === "number") data.streak = streak;
  if (typeof lastActiveDate === "string" || lastActiveDate === null) data.lastActiveDate = lastActiveDate;
  if (Array.isArray(completedDays)) data.completedDays = completedDays;
  if (completedExercises && typeof completedExercises === "object") data.completedExercises = completedExercises;
  if (Array.isArray(completedAssignments)) data.completedAssignments = completedAssignments;
  if (notes && typeof notes === "object") data.notes = notes;
  return data;
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  try {
    const body = await req.json();
    const track = typeof body.track === "string" && TRACKS.has(body.track) ? body.track : "c";
    const data = pickProgress(body);

    let user;
    if (track === "c") {
      user = await prisma.user.update({
        where: { id: session.user.id },
        data,
        select: { id: true, name: true, email: true, image: true },
      });
    } else {
      user = await prisma.userTrackProgress.upsert({
        where: { userId_track: { userId: session.user.id, track } },
        update: data,
        create: { userId: session.user.id, track, ...data },
        select: { id: true, track: true, totalXp: true },
      });
    }

    await issueCertificateIfComplete(
      session.user.id,
      track,
      data.completedDays,
      data.totalXp
    );

    return NextResponse.json({ user });
  } catch (err) {
    console.error("progress sync error", err);
    return NextResponse.json({ error: "Failed to sync progress." }, { status: 500 });
  }
}
