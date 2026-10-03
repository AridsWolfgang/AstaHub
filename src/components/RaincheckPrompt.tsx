import { useState } from "react";
import type { RaincheckProgress, RaincheckInput } from "@/lib/raincheck";
import { shouldShowRaincheck } from "@/lib/raincheck";

export interface RaincheckPromptProps {
  progress: RaincheckProgress;
  onResponse: (response: RaincheckInput) => void;
  onDismiss?: () => void;
  /** Force show even if shouldShowRaincheck() is false (useful for previews). */
  forceShow?: boolean;
  /** Override "now" for deterministic rendering in tests. */
  now?: Date | string;
}

/**
 * Minimal, honest raincheck prompt.
 * Asks "Are you still engaged? Rate 1-5, what blocked you?"
 * Never penalizes, never fakes — just records what the learner says.
 */
export default function RaincheckPrompt({
  progress,
  onResponse,
  onDismiss,
  forceShow = false,
  now,
}: RaincheckPromptProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [blocker, setBlocker] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const visible = forceShow || shouldShowRaincheck(progress, now as unknown as Date);
  if (!visible) return null;

  if (submitted) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <p className="text-sm font-medium text-white">Thanks — noted. No penalty, just a pause to reset.</p>
        <p className="mt-1 text-xs text-gray-500">Pick up where you left off when you&apos;re ready. Your streak will wait.</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-xs font-mono text-gray-300 hover:bg-white hover:text-black transition-colors"
          >
            Dismiss
          </button>
        )}
      </div>
    );
  }

  const handleSubmit = () => {
    if (rating === null || rating < 1 || rating > 5) {
      setError("Pick a rating 1–5 so we know where you stand.");
      return;
    }
    setError(null);
    try {
      onResponse({ rating, blocker, day: progress.currentDay });
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-black p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">Quick check-in — are you still engaged?</h3>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">
          No judgment, no penalty. Your answer just helps you self-correct and helps us keep the pace humane.
        </p>
      </div>

      <div className="mb-4">
        <p className="text-xs font-mono text-gray-400 mb-2">How engaged do you feel right now? (1 = checked out, 5 = fully in)</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => {
                setRating(n);
                setError(null);
              }}
              aria-label={`Rate ${n} out of 5`}
              aria-pressed={rating === n}
              className={
                "h-9 w-9 rounded-lg border text-sm font-mono transition-colors " +
                (rating === n
                  ? "border-white bg-white text-black"
                  : "border-white/15 text-gray-300 hover:border-white hover:text-white")
              }
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="raincheck-blocker" className="block text-xs font-mono text-gray-400 mb-2">
          What blocked you? <span className="text-gray-600">(optional, max 500 chars)</span>
        </label>
        <textarea
          id="raincheck-blocker"
          value={blocker}
          onChange={(e) => setBlocker(e.target.value.slice(0, 500))}
          placeholder="e.g. stuck on pointers, no time this week, unclear instructions…"
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-white/20 focus:outline-none"
        />
        <p className="mt-1 text-[11px] font-mono text-gray-600">{blocker.length}/500</p>
      </div>

      {error && <p className="mb-3 text-xs text-red-400">{error}</p>}

      <div className="flex items-center gap-2">
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-white px-4 py-2 text-xs font-mono font-medium text-black hover:bg-gray-100 transition-colors"
        >
          Save check-in
        </button>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="rounded-lg border border-white/10 px-4 py-2 text-xs font-mono text-gray-400 hover:text-white hover:border-white/20 transition-colors"
          >
            Not now
          </button>
        )}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-gray-600">
        Honest note: this is a self-check, not a grade. Nothing here affects XP or streak.
      </p>
    </div>
  );
}
