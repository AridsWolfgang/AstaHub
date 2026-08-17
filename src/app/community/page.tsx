import Link from "next/link";
import { Newspaper, HelpCircle, Users, ShieldCheck, ArrowRight } from "lucide-react";

const SECTIONS = [
  {
    href: "/community/feed",
    icon: Newspaper,
    title: "Learnings",
    tagline: "Publish what you learned — code walkthroughs, projects, and field notes. Teaching is the highest form of mastery.",
  },
  {
    href: "/community/questions",
    icon: HelpCircle,
    title: "Questions",
    tagline: "A StackOverflow-style space where help comes from humans, and every question demands evidence of effort.",
  },
  {
    href: "/community/groups",
    icon: Users,
    title: "Groups",
    tagline: "Study groups by course, city, or project. Real people, real chat — the feel of a university and a club.",
  },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">The human layer</p>
      <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">Learn with people.</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
        AI is everywhere here — but it will never be the whole story. Learning is social and human.
        Publish your progress, ask real people real questions, and study in groups with people who
        know your name. Moderation is built in from day one.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {SECTIONS.map(({ href, icon: Icon, title, tagline }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            <div>
              <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              <h2 className="mt-4 font-display text-lg font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{tagline}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-gray-400 transition-colors group-hover:text-white">
              Open <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={1.5} />
        <div>
          <h3 className="font-display text-sm font-bold text-white">Moderation from day one</h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-400">
            Every post, question, answer, and message can be reported. Reports flow to a moderation
            queue and are actioned by real humans — never by the crowd alone.
          </p>
        </div>
      </div>
    </div>
  );
}