import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock3, Compass } from "lucide-react";
import { TRACK_GROUPS, TRACKS } from "@/lib/tracks";
import type { Track, TrackStatus } from "@/lib/tracks";
import { cn } from "@/lib/utils";

const STATUS_META: Record<TrackStatus, { label: string; icon: typeof CheckCircle2; dot: string }> = {
  live: { label: "Live now", icon: CheckCircle2, dot: "bg-white" },
  coming: { label: "Coming soon", icon: Clock3, dot: "bg-white/50" },
  planned: { label: "Planned", icon: Compass, dot: "bg-white/20" },
};

function TrackRow({ track }: { track: Track }) {
  const meta = STATUS_META[track.status];
  const inner = (
    <>
      <span className={cn("h-2 w-2 shrink-0 rounded-full", meta.dot)} />
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-bold text-white">{track.name}</p>
        <p className="mt-0.5 text-sm text-gray-400">{track.outcome}</p>
      </div>
      <span
        className={cn(
          "flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest",
          track.status === "live" ? "text-white" : track.status === "coming" ? "text-gray-300" : "text-gray-500"
        )}
      >
        <meta.icon className="h-3.5 w-3.5" />
        {meta.label}
      </span>
    </>
  );

  return (
    <li className="border-t border-white/5 first:border-t-0">
      <Link to={`/tracks/${track.slug}`}
        className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
      >
        {inner}
      </Link>
    </li>
  );
}

export default function TracksPage() {
  const live = TRACKS.filter((t) => t.status === "live").length;
  const coming = TRACKS.filter((t) => t.status === "coming").length;
  const planned = TRACKS.filter((t) => t.status === "planned").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
          The knowledge bank
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          One school. Every skill.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
          A living body of technical knowledge, organized so a beginner climbs it like a
          staircase and a professional uses it like a library. Every track runs the same
          engine: day-by-day lessons, XP, exercises, a playground, and a capstone.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs">
          <span className="text-gray-400">
            <span className="text-white">{live}</span> live now
          </span>
          <span className="text-gray-400">
            <span className="text-white">{coming}</span> coming soon
          </span>
          <span className="text-gray-400">
            <span className="text-white">{planned}</span> planned
          </span>
        </div>
      </div>

      <div className="space-y-14">
        {TRACK_GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-20">
            <div className="mb-5">
              <h2 className="font-display text-2xl font-bold text-white">{group.title}</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{group.tagline}</p>
            </div>
            <ul className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              {group.tracks.map((t) => (
                <TrackRow key={t.slug} track={t} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-white">
            Not sure where to start?
          </h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-gray-400">
            C, Assembly, Python, C++, JavaScript, Rust, SQL, and Bash are live today. Start
            wherever you are — every track is free, and every track builds on the same
            hands-on engine.
          </p>
        </div>
        <Link to="/curriculum" className="btn-primary whitespace-nowrap">
          Start a live track
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
