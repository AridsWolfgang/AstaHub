import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canModerate } from "@/lib/community";
import { validateLiveEvent, isLiveEventStatus, deriveLiveStatus } from "@/lib/live";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) {
    return NextResponse.json({ error: "Moderator access required." }, { status: 403 });
  }

  const existing = await prisma.liveEvent.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Event not found." }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Status can be set directly (scheduled | live | finished | cancelled).
  const status = body.status;
  if (status !== undefined && !isLiveEventStatus(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  // Validate the merged result so a partial update can never produce an invalid event.
  const merged = {
    title: body.title ?? existing.title,
    description: body.description ?? existing.description,
    type: body.type ?? existing.type,
    track: body.track ?? existing.track,
    lessonDay: body.lessonDay ?? existing.lessonDay,
    startAt: body.startAt ?? existing.startAt.toISOString(),
    durationMinutes: body.durationMinutes ?? existing.durationMinutes,
    hostName: body.hostName ?? existing.hostName,
    youtubeUrl: body.youtubeUrl ?? existing.youtubeUrl,
    recordingUrl: body.recordingUrl ?? existing.recordingUrl,
  };
  const result = validateLiveEvent(merged);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const event = await prisma.liveEvent.update({
    where: { id },
    data: {
      title: result.value.title,
      description: result.value.description,
      type: result.value.type,
      track: result.value.track,
      lessonDay: result.value.lessonDay,
      startAt: result.value.startAt,
      durationMinutes: result.value.durationMinutes,
      hostName: result.value.hostName,
      youtubeUrl: result.value.youtubeUrl,
      recordingUrl: result.value.recordingUrl,
      ...(status !== undefined ? { status } : {}),
    },
  });

  return NextResponse.json({
    event: {
      id: event.id,
      slug: event.slug,
      title: event.title,
      status: deriveLiveStatus(event.status, event.startAt, event.durationMinutes, new Date()),
    },
  });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) {
    return NextResponse.json({ error: "Moderator access required." }, { status: 403 });
  }

  const existing = await prisma.liveEvent.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Event not found." }, { status: 404 });

  await prisma.liveEvent.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}