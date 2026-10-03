import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type LogoProps = {
  tagline?: string;
  taglineClassName?: string;
  className?: string;
  onClick?: () => void;
  /** sm = footer/cert cards, md = navbar default, lg = page headers */
  size?: "sm" | "md" | "lg";
};

const SIZE_TEXT: Record<"sm" | "md" | "lg", string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-3xl",
};

/**
 * AstaHub wordmark — no icon. Space Grotesk, split weight (Asta bold /
 * Hub regular) with a terminal block cursor as the single distinctive cut.
 * Monochrome and theme-safe (currentColor-driven).
 */
export default function Logo({
  tagline,
  taglineClassName,
  className,
  onClick,
  size = "md",
}: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="AstaHub — home"
      className={cn("group flex shrink-0 items-center gap-3", className)}
    >
      <span
        className={cn(
          "flex items-center font-display font-bold tracking-tight text-white",
          SIZE_TEXT[size]
        )}
      >
        Asta<span className="font-normal">Hub</span>
        <span className="logo-cursor" aria-hidden="true" />
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
    </Link>
  );
}
