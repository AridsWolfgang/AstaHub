import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Compass, Hammer } from "lucide-react";
import { getTrack } from "@/lib/tracks";
import type { TrackStatus } from "@/lib/tracks";
import TrackJourney from "@/components/TrackJourney";
import { cn } from "@/lib/utils";

const STATUS_META: Record<TrackStatus, { label: string; icon: typeof CheckCircle2 }> = {
  live: { label: "Live now", icon: CheckCircle2 },
  coming: { label: "Coming soon", icon: Clock3 },
  planned: { label: "Planned", icon: Compass },
};

const ENGINE = [
  "Day-by-day lessons",
  "Hands-on exercises",
  "A code playground",
  "XP and streaks",
  "A capstone to prove it",
];

export default function TrackPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <div className="p-10 text-gray-500">Track not found</div>;
  const track = getTrack(slug);
  if (!track) return <div className="p-10 text-center text-gray-500">Track not found — <Link to="/tracks" className="text-white underline">see all tracks</Link></div>;

  const meta = STATUS_META[track.status];
  const isLive = track.status === "live";

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Link to="/tracks" className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        All tracks
      </Link>

      <div className="mt-8 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2.5">
            <span className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest",
              track.status === "live" ? "border-white/30 text-white" : "border-white/10 text-gray-400"
            )}>
              <meta.icon className="h-3 w-3" />
              {meta.label}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">{track.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-400">{track.description}</p>
          <p className="mt-4 font-display text-lg font-bold text-white">{track.outcome}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">Built on the same engine</h2>
          <ul className="mt-4 space-y-2.5">
            {ENGINE.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                <Hammer className="h-4 w-4 shrink-0 text-white" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {isLive ? (
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">This track is live</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">You can start today. {track.days ?? "A hundred"} days of hands-on lessons, exercises, and a working playground — free, forever.</p>
            </div>
            <Link to={track.href ?? "/curriculum"} className="btn-primary">
              Start this track <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">On the roadmap</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">This track is being built on the same engine that powers C, Assembly, Python, and C++ today.</p>
            </div>
            <Link to="/tracks" className="btn whitespace-nowrap">
              See what&apos;s live <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {(slug === "python" || slug === "cpp" || slug === "javascript" || slug === "rust" || slug === "sql" || slug === "toolkit") && (
        <TrackJourney track={slug === "javascript" ? "js" : slug === "toolkit" ? "bash" : slug} />
      )}
    </div>
  );
}
