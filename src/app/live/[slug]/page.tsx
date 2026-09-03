"use client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Radio, Clock } from "lucide-react";

type LiveEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  hostName: string;
  startAt: string;
  durationMinutes: number;
  status: string;
  youtubeUrl?: string;
  recordingUrl?: string;
  track?: string;
  lessonDay?: number;
};

export default function LiveEventPage() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/live/${slug}`).then(r=>r.json()).then(j=> setEvent(j.event ?? j)).catch(()=>{}).finally(()=> setLoading(false));
  }, [slug]);

  if (loading) return <div className="mx-auto max-w-4xl px-4 py-14 text-center font-mono text-sm text-gray-500">Loading…</div>;
  if (!event) return <div className="mx-auto max-w-4xl px-4 py-14 text-center text-gray-500">Live event not found. <Link to="/live" className="text-white underline">Back to live</Link></div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Link to="/live" className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> All live sessions</Link>
      <h1 className="mt-6 font-display text-4xl font-bold text-white">{event.title}</h1>
      <p className="mt-3 text-gray-400">{event.description}</p>
      <div className="mt-4 flex gap-4 text-sm font-mono text-gray-500"><span className="flex items-center gap-1.5"><Radio className="h-4 w-4"/>{event.hostName}</span><span className="flex items-center gap-1.5"><Clock className="h-4 w-4"/>{event.durationMinutes}m</span></div>
      <Link to={`/live/${event.slug}/room`} className="btn-primary mt-8 inline-flex">Join the live room</Link>
    </div>
  );
}
