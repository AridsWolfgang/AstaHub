import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canModerate } from "@/lib/community";
import { deriveLiveStatus, LIVE_TYPE_LABELS } from "@/lib/live";
import { getTrack } from "@/lib/tracks";
import { Radio, Clock, User, ArrowRight } from "lucide-react";
import Countdown from "@/components/live/Countdown";
import CreateEventForm from "@/components/live/CreateEventForm";

interface SerializedEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  track: string | null;
  lessonDay: number | null;
  startAt: string;
  durationMinutes: number;
  hostName: string;
  youtubeUrl: string | null;
  recordingUrl: string | null;
  status: string;
}

function EventCard({ event }: { event: SerializedEvent }) {
  const typeLabel = (LIVE_TYPE_LABELS as Record<string, string>)[event.type] ?? event.type;
  const track = event.track ? getTrack(event.track) : undefined;
  const live = event.status === "live";

  return (
    <Link
      href={`/live/${event.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
    >
      <div>
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
          {track && (
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-500">
              {track.name}
            </span>
          )}
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-white">{event.title}</h3>
        {event.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">{event.description}</p>}
        <div className="mt-4 space-y-1.5 text-xs font-mono text-gray-500">
          <p className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" /> {event.hostName}
          </p>
          <p className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />{" "}
            {new Date(event.startAt).toLocaleString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" · "}
            {event.durationMinutes}m
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <Countdown target={event.startAt} live={live} />
        <span className="inline-flex items-center gap-1 font-mono text-xs text-gray-500 transition-colors group-hover:text-white">
          Details <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default async function LivePage() {
  const session = await getServerSession(authOptions);
  const isMod = canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "");
  const now = new Date();

  const rows = await prisma.liveEvent.findMany({ orderBy: { startAt: "asc" }, take: 300 });

  const events: SerializedEvent[] = rows.map((e) => ({
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
  }));

  const upcoming = events.filter((e) => e.status === "scheduled" || e.status === "live");
  const past = events.filter((e) => e.status === "finished" || e.status === "cancelled");

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">The live layer</p>
      <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
        Learn with real people, live.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
        Live classes, office hours, and live coding streams — real humans typing real
        code, with no AI assistance. Every session is recorded and published to YouTube
        so nothing is ever lost.
      </p>

      {isMod && (
        <div className="mt-8">
          <CreateEventForm />
        </div>
      )}

      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
          <Radio className="h-3.5 w-3.5" /> Upcoming & live
        </h2>
        {upcoming.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <p className="text-sm text-gray-500">No sessions scheduled yet.</p>
            {isMod && <p className="mt-1 text-xs text-gray-600">Schedule the first one above.</p>}
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Past sessions
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {past.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
