import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canModerate } from "@/lib/community";
import {
  parseLiveQuery,
  validateLiveEvent,
  liveEventSlugify,
  deriveLiveStatus,
} from "@/lib/live";

function serializeEvent(
  e: {
    id: string;
    slug: string;
    title: string;
    description: string;
    type: string;
    track: string | null;
    lessonDay: number | null;
    startAt: Date;
    durationMinutes: number;
    hostName: string;
    youtubeUrl: string | null;
    recordingUrl: string | null;
    status: string;
    createdAt: Date;
  },
  now: Date
) {
  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    description: e.description,
    type: e.type,
    track: e.track,
    lessonDay: e.lessonDay,
    startAt: e.startAt.toISOString(),
    durationMinutes: e.durationMinutes,
    hostName: e.hostName,
    youtubeUrl: e.youtubeUrl,
    recordingUrl: e.recordingUrl,
    status: deriveLiveStatus(e.status, e.startAt, e.durationMinutes, now),
  };
}

export async function GET(req: Request) {
  const { scope, limit } = parseLiveQuery(req.url);
  const now = new Date();

  const storedStatuses =
    scope === "past" ? ["finished", "cancelled"] : ["scheduled", "live"];
  const rows = await prisma.liveEvent.findMany({
    where: { status: { in: storedStatuses } },
    orderBy: { startAt: scope === "past" ? "desc" : "asc" },
    take: limit * 3,
  });

  const derived = rows
    .map((e) => serializeEvent(e, now))
    .filter((e) =>
      scope === "past"
        ? e.status === "finished" || e.status === "cancelled"
        : e.status === "scheduled" || e.status === "live"
    )
    .slice(0, limit);

  return NextResponse.json({ events: derived });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) {
    return NextResponse.json({ error: "Moderator access required." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = validateLiveEvent(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const baseSlug = liveEventSlugify(result.value.title);
  let slug = baseSlug;
  for (let i = 2; i <= 10; i++) {
    const taken = await prisma.liveEvent.findUnique({ where: { slug }, select: { id: true } });
    if (!taken) break;
    slug = `${baseSlug}-${i}`;
  }

  const event = await prisma.liveEvent.create({
    data: {
      slug,
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
      status: "scheduled",
      createdById: session!.user.id!,
    },
  });

  return NextResponse.json({ event: serializeEvent(event, new Date()) }, { status: 201 });
}