import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Editorial rhythm — learned from Tessera Labs (tesseralabs.ai).
 *
 * Tessera's language: eyebrow trust bar → thesis headline → capability grid →
 * proof wall → mission/story → numbered process → stewardship → closing CTA.
 * Every section: hairline separator, generous whitespace, one idea.
 *
 * AstaHub translation: monochrome tokens only (theme-safe), proof is always
 * real curriculum data (never invented testimonials or user counts).
 */

/** Small-caps section label — the Tessera eyebrow. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500", className)}>
      {children}
    </p>
  );
}

/** Standard section head: eyebrow → display headline → lede. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-12 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {lede && <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-400">{lede}</p>}
      </div>
      {action && (
        <Link to={action.href} className="btn shrink-0 text-sm">
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** Hairline section wrapper with Tessera spacing. */
export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-white/5 py-16 sm:py-24", className)}>
      {children}
    </div>
  );
}

/** Proof band: big real numbers on hairlines — no cards. */
export function StatBand({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-black px-6 py-8 sm:px-8">
          <dt className="order-2 mt-2 block text-sm text-gray-500">{s.label}</dt>
          <dd className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Tessera "How it works" — numbered plain-language steps. */
export function Steps({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="bg-black p-8">
          <p className="font-mono text-xs text-gray-500">0{i + 1}</p>
          <h3 className="mt-4 font-display text-xl font-bold text-white">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Capability grid — Tessera's 4-up, dividers instead of cards. */
export function CapabilityGrid({
  items,
}: {
  items: { icon: React.ElementType; title: string; body: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="group bg-black p-8 transition-colors hover:bg-white/[0.02]">
          <item.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
          <h3 className="mt-5 font-display text-lg font-bold text-white">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

/** The integration-wall pattern: quiet wordmarks, hairline rows. */
export function TrackWall({
  tracks,
}: {
  tracks: { name: string; outcome: string; href: string; live: boolean }[];
}) {
  return (
    <ul className="overflow-hidden rounded-2xl border border-white/10">
      {tracks.map((t) => (
        <li key={t.name} className="border-t border-white/5 bg-black first:border-t-0">
          <Link
            to={t.href}
            className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03] sm:px-8"
          >
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                {t.name}
              </p>
              <p className="mt-0.5 truncate text-sm text-gray-500">{t.outcome}</p>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 sm:block">
              {t.live ? "Live now" : "On the roadmap"}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-white" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Closing thesis — Tessera's confident sign-off. */
export function Closing({
  title,
  action,
  footnote,
}: {
  title: React.ReactNode;
  action: { href: string; label: string };
  footnote?: string;
}) {
  return (
    <div className="border-t border-white/5 py-20 text-center sm:py-28">
      <p className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </p>
      <div className="mt-10 flex justify-center">
        <Link to={action.href} className="btn-primary text-base">
          {action.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {footnote && (
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500">
          {footnote}
        </p>
      )}
    </div>
  );
}
