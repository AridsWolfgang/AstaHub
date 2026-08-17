import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deriveLiveStatus } from "@/lib/live";
import LiveRoomClient from "@/components/live/LiveRoomClient";

export default async function LiveRoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await prisma.liveEvent.findUnique({ where: { slug } });
  if (!event) notFound();

  const status = deriveLiveStatus(event.status, event.startAt, event.durationMinutes, new Date());

  return (
    <LiveRoomClient
      event={{
        id: event.id,
        slug: event.slug,
        title: event.title,
        status,
        startAt: event.startAt.toISOString(),
        durationMinutes: event.durationMinutes,
        youtubeUrl: event.youtubeUrl,
        recordingUrl: event.recordingUrl,
      }}
    />
  );
}