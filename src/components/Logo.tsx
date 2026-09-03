import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const FONT_STACK =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black shadow-sm ring-1 ring-white/20",
        className
      )}
    >
      <svg viewBox="0 0 32 32" className="h-full w-full">
        <rect width="32" height="32" rx="4" fill="#000000" />
        <text
          x="16"
          y="22.5"
          textAnchor="middle"
          fontFamily={FONT_STACK}
          fontSize="20"
          fontWeight="700"
          fill="#ffffff"
        >
          A
        </text>
      </svg>
    </span>
  );
}

type LogoProps = {
  tagline?: string;
  taglineClassName?: string;
  className?: string;
  onClick?: () => void;
};

export default function Logo({
  tagline,
  taglineClassName,
  className,
  onClick,
}: LogoProps) {
  return (
    <Link to="/"
      onClick={onClick}
      className={cn("group flex shrink-0 items-center gap-3", className)}
    >
      <LogoMark className="transition-transform duration-200 group-hover:scale-[1.05]" />
      <span className="flex items-baseline gap-2">
        <span className="font-display text-base font-bold tracking-tight text-white">
          AstaHub
        </span>
        {tagline && (
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500",
              taglineClassName
            )}
          >
            {tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
