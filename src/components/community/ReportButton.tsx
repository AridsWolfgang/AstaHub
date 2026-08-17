import { Flag } from "lucide-react";
import { useState } from "react";

export function ReportButton({ targetType, targetId }: { targetType: string; targetId: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  const report = async () => {
    const reason = window.prompt("Why are you reporting this? (be specific)", "");
    if (reason === null) return;
    if (!reason.trim()) {
      setState("error");
      return;
    }
    setState("busy");
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetId, reason: reason.trim() }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <button
      onClick={report}
      disabled={state === "busy" || state === "done"}
      className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-600 transition-colors hover:text-cyber-red disabled:opacity-50"
      title="Report this content"
    >
      <Flag className="h-3 w-3" />
      {state === "done" ? "Reported" : state === "error" ? "Try again" : "Report"}
    </button>
  );
}