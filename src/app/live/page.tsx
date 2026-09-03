"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deriveLiveStatus, LIVE_TYPE_LABELS } from "@/lib/live";
import { getTrack } from "@/lib/tracks";
import { Radio, Clock, User, ArrowRight } from "lucide-react";
import Countdown from "@/components/live/Countdown";
import CreateEventForm from "@/components/live/CreateEventForm";

type SerializedEvent = {
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
};

function EventCard({ event }: { event: SerializedEvent }) {
  const typeLabel = (LIVE_TYPE_LABELS as Record<string, string>)[event.type] ?? event.type;
  const track = event.track ? getTrack(event.track) : undefined;
  const live = event.status === "live";
  return (
    <Link to={`/live/${event.slug}`} className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.04]">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-400">{typeLabel}</span>
          {live && <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> LIVE</span>}
          {track && <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-500">{track.name}</span>}
        </div>
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-white">{event.title}</h3>
        {event.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">{event.description}</p>}
        <div className="mt-4 space-y-1.5 text-xs font-mono text-gray-500">
          <p className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {event.hostName}</p>
          <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {new Date(event.startAt).toLocaleString()} · {event.durationMinutes}m</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <Countdown target={event.startAt} live={live} />
        <span className="inline-flex items-center gap-1 font-mono text-xs text-gray-500 group-hover:text-white">Details <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  );
}

export default function LivePage() {
  const [events, setEvents] = useState<SerializedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    Promise.all([fetch("/api/live?scope=upcoming").then(r=>r.json()), fetch("/api/live?scope=past").then(r=>r.json())]).then(([up,past])=>{
      const all=[...(up.events||[]), ...(past.events||[])].map((e:any)=> ({...e, status: deriveLiveStatus(e.status,e.startAt,e.durationMinutes,new Date())}));
      setEvents(all);
    }).finally(()=> setLoading(false));
  },[]);
  const upcoming = events.filter(e=> e.status==="scheduled"||e.status==="live");
  const past = events.filter(e=> e.status==="finished"||e.status==="cancelled");
  if(loading) return <div className="mx-auto max-w-4xl px-4 py-14 text-center font-mono text-sm text-gray-500">Loading…</div>;
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">The live layer</p>
      <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">Learn with real people, live.</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">Live classes, office hours, and live coding streams — real humans typing real code.</p>
      <div className="mt-8"><CreateEventForm /></div>
      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500"><Radio className="h-3.5 w-3.5" /> Upcoming & live</h2>
        {upcoming.length===0? <div className="mt-4 rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-gray-500">No sessions scheduled yet.</div> : <div className="mt-4 grid gap-4 md:grid-cols-2">{upcoming.map(e=> <EventCard key={e.id} event={e} />)}</div>}
      </section>
      {past.length>0 && <section className="mt-12"><h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">Past sessions</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{past.map(e=> <EventCard key={e.id} event={e} />)}</div></section>}
    </div>
  );
}
