import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function VoteButtons({
  score,
  myVote,
  onVote,
  disabled,
  size = "md",
}: {
  score: number;
  myVote: number | null;
  onVote: (incoming: 1 | -1) => void;
  disabled?: boolean;
  size?: "md" | "sm";
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={() => onVote(1)}
        disabled={disabled}
        aria-label="Upvote"
        className={cn(
          "rounded p-1 transition-colors disabled:opacity-40",
          myVote === 1 ? "text-white" : "text-gray-500 hover:text-white"
        )}
      >
        <ChevronUp className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} strokeWidth={1.75} />
      </button>
      <span className={cn("font-mono font-semibold text-gray-300", size === "sm" ? "text-xs" : "text-sm")}>
        {score}
      </span>
      <button
        onClick={() => onVote(-1)}
        disabled={disabled}
        aria-label="Downvote"
        className={cn(
          "rounded p-1 transition-colors disabled:opacity-40",
          myVote === -1 ? "text-white" : "text-gray-500 hover:text-white"
        )}
      >
        <ChevronDown className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} strokeWidth={1.75} />
      </button>
    </div>
  );
}