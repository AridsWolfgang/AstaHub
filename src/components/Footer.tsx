import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { TOTAL_TRACKS } from "@/lib/curriculum";
import { TRACK_DOT, trackColorKey } from "@/lib/trackColors";
import { TRACKS, TRACK_GROUPS } from "@/lib/tracks";
import { cn } from "@/lib/utils";

const LIVE_TRACKS = TRACKS.filter((t) => t.status === "live");
const ROADMAP = TRACK_GROUPS.slice(1).flatMap((g) => g.tracks);

const TRACK_DAYS: Record<string, number> = {
  c: TOTAL_TRACKS.c,
  assembly: TOTAL_TRACKS.c,
  python: TOTAL_TRACKS.python,
  cpp: TOTAL_TRACKS.cpp,
  javascript: TOTAL_TRACKS.js,
  sql: TOTAL_TRACKS.sql,
  toolkit: TOTAL_TRACKS.bash,
};

const COLUMNS = [
  {
    title: "The school",
    links: [
      { href: "/tracks", label: "All paths" },
      { href: "/playground", label: "Workshop" },
      { href: "/live", label: "Classes" },
      { href: "/home", label: "Your journey" },
    ],
  },
  {
    title: "Yours",
    links: [
      { href: "/signin", label: "Start free" },
      { href: "/profile", label: "Profile" },
      { href: "/certificates", label: "Certificates" },
      { href: "/certificates/verify", label: "Verify a credential" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        {/* Second homepage — the whole school, restated */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-6 font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl">
              Learning should be fun. And for everyone.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-400">
              A free school for builders — seven hands-on paths today, the
              sciences tomorrow, everything honest along the way.
            </p>
            <Link to="/signin" className="btn-primary mt-7 text-base">
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <nav aria-label="Every path">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
              Every path
            </p>
            <ul className="mt-4 divide-y divide-white/5 border-y border-white/5">
              {LIVE_TRACKS.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={t.href ?? `/tracks/${t.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <span className="flex items-baseline gap-2.5 font-serif text-lg text-gray-200 transition-colors group-hover:text-white">
                      <span className={cn("h-2 w-2 shrink-0 self-center rounded-full", TRACK_DOT[trackColorKey(t.slug)])} />
                      {t.name}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-gray-500">
                      {TRACK_DAYS[t.slug]} days · live
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Still being written:{" "}
              {ROADMAP.map((t) => t.name).join(" · ")}
            </p>
          </nav>
        </div>

        {/* Compact doors */}
        <div className="mt-14 grid max-w-2xl gap-10 border-t border-white/5 pt-10 sm:grid-cols-2">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-gray-500">
            © {year} AstaHub · Stewarded by{" "}
            <a
              href="https://ps-hub.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
            >
              Prosperity Systems Hub
            </a>
          </p>
          <p className="font-serif text-sm italic text-gray-500">
            Write it, break it, fix it until it&apos;s yours.
          </p>
        </div>
      </div>
    </footer>
  );
}
