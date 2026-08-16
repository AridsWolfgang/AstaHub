import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TRACKS, TRACK_TOTAL_DAYS, TRACK_CERT_TITLES, sanitizeProgress } from "@/lib/progressValidation";

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

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  try {
    const body = await req.json();
    const track = typeof body.track === "string" && TRACKS.has(body.track) ? body.track : "c";
    const data = sanitizeProgress(body, track);

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
