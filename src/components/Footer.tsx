import { Link } from "react-router-dom";
import { LogoMark } from "@/components/Logo";
import { TRACK_GROUPS } from "@/lib/tracks";

const LEARN_LINKS = [
  { href: "/dashboard", label: "My journey" },
  { href: "/tracks", label: "All tracks" },
  { href: "/playground", label: "Practice" },
  { href: "/live", label: "Live" },
  { href: "/community", label: "Community" },
  { href: "/community/questions", label: "Questions" },
  { href: "/community/groups", label: "Study groups" },
];

const ACCOUNT_LINKS = [
  { href: "/signin", label: "Sign in" },
  { href: "/profile", label: "Profile" },
  { href: "/certificates", label: "Certificates" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/achievements", label: "Achievements" },
  { href: "/settings", label: "Settings" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark />
              <span className="font-display text-base font-bold tracking-wider text-white">
                AstaHub
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              World-class technical education for every person on Earth. Hands-on,
              human, and free — forever.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Learn
            </h3>
            <ul className="mt-4 space-y-2.5">
              {LEARN_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Knowledge bank
            </h3>
            <ul className="mt-4 space-y-2.5">
              {TRACK_GROUPS.map((g) => (
                <li key={g.id}>
                  <Link to={`/tracks#${g.id}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Account
            </h3>
            <ul className="mt-4 space-y-2.5">
              {ACCOUNT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-gray-500">
            © {year} AstaHub · Free technical education, forever · Powered by{" "}
            <a
              href="https://ps-hub.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
            >
              Prosperity Systems Hub
            </a>
          </p>
          <p className="font-mono text-[11px] text-gray-500">
            Learning should be fun. And it should be for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
