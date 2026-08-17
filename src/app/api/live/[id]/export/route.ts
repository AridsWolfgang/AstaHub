import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canModerate } from "@/lib/community";
import { publishRecordingToYouTube } from "@/lib/youtube";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) {
    return NextResponse.json({ error: "Moderator access required." }, { status: 403 });
  }

  const event = await prisma.liveEvent.findUnique({ where: { id } });
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });

  const result = await publishRecordingToYouTube({
    title: event.title,
    description: event.description,
    trackSlug: event.track,
    lessonDay: event.lessonDay,
    sourceUrl: event.recordingUrl ?? event.youtubeUrl ?? null,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ message: result.message, metadata: result.metadata });
}