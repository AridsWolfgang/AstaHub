import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canModerate } from "@/lib/community";
import {
  deriveLiveStatus,
  isCurrentlyLive,
  LIVE_TYPE_LABELS,
  youtubeEmbedUrl,
  googleCalendarUrl,
} from "@/lib/live";
import { getTrack } from "@/lib/tracks";
import { Radio, User, Clock, Calendar, ExternalLink, MessageSquare, ArrowLeft } from "lucide-react";
import Countdown from "@/components/live/Countdown";
import EventModControls from "@/components/live/EventModControls";
import YouTubeExportButton from "@/components/live/YouTubeExportButton";

export default async function LiveEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  const isMod = canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "");

  const event = await prisma.liveEvent.findUnique({ where: { slug } });
  if (!event) notFound();

  const now = new Date();
  const status = deriveLiveStatus(event.status, event.startAt, event.durationMinutes, now);
  const live = status === "live";
  const scheduled = status === "scheduled";
  const typeLabel = (LIVE_TYPE_LABELS as Record<string, string>)[event.type] ?? event.type;
  const track = event.track ? getTrack(event.track) : undefined;
  const embedUrl = live || scheduled ? youtubeEmbedUrl(event.youtubeUrl ?? "") : youtubeEmbedUrl(event.recordingUrl ?? "");
  const messageCount = await prisma.liveEventMessage.count({ where: { eventId: event.id } });

  const calendarUrl = googleCalendarUrl({
    title: event.title,
    description: event.description,
    startAt: event.startAt.toISOString(),
    durationMinutes: event.durationMinutes,
  });

  const lessonHref =
    event.track && event.lessonDay ? `/lesson/${event.track}/${event.lessonDay}` : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Link
        href="/live"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All live sessions
      </Link>

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-400">
            {typeLabel}
          </span>
          {live && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              LIVE
            </span>
          )}
          {scheduled && <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-500">Scheduled</span>}
          {status === "finished" && <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-500">Recorded</span>}
          {status === "cancelled" && <span className="rounded-full border border-red-500/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-red-400">Cancelled</span>}
        </div>

        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white">{event.title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400">{event.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono text-gray-400">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> {event.hostName}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />{" "}
            {new Date(event.startAt).toLocaleString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Radio className="h-4 w-4" /> {event.durationMinutes} minutes
          </span>
          {track && (
            <span className="flex items-center gap-1.5">
              <ExternalLink className="h-4 w-4" />
              {lessonHref ? (
                <Link href={lessonHref} className="text-white underline-offset-4 hover:underline">
                  {track.name} · Day {event.lessonDay}
                </Link>
              ) : (
                <span className="text-white">{track.name}</span>
              )}
            </span>
          )}
          {scheduled && (
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white underline-offset-4 hover:underline"
            >
              <Calendar className="h-4 w-4" /> Add to calendar
            </a>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <Countdown target={event.startAt.toISOString()} live={live} />
        <div className="flex flex-1 flex-wrap justify-end gap-2">
          <Link
            href={`/live/${event.slug}/room`}
            className={live ? "btn-primary !px-5 !py-2 text-xs" : "btn !px-5 !py-2 text-xs"}
          >
            {live ? "Join the live room" : "View the live room"}
          </Link>
          {isMod && <EventModControls eventId={event.id} />}
        </div>
      </div>

      {embedUrl && (
        <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
          <iframe
            src={embedUrl}
            title={event.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}

      {isMod && (
        <div className="mt-8">
          <YouTubeExportButton eventId={event.id} />
        </div>
      )}

      <Link
        href={`/live/${event.slug}/room`}
        className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
      >
        <span className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-white" strokeWidth={1.5} />
          <span>
            <span className="block font-display text-sm font-bold text-white">Live room</span>
            <span className="block text-xs text-gray-500">
              Watch the stream and talk with everyone else watching.
            </span>
          </span>
        </span>
        <span className="font-mono text-xs text-gray-500">{messageCount} messages</span>
      </Link>
    </div>
  );
}