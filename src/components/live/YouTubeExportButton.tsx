"use client";

import { useState } from "react";
import { Youtube, Loader2 } from "lucide-react";

export default function YouTubeExportButton({ eventId }: { eventId: string }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message?: string; error?: string } | null>(null);

  const exportIt = async () => {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch(`/api/live/${eventId}/export`, { method: "POST" });
      const data = await res.json();
      setResult({ ok: res.ok, message: data.message, error: data.error });
    } catch {
      setResult({ ok: false, error: "Could not reach the export endpoint." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-sm font-bold text-white">Publish to YouTube</p>
          <p className="mt-0.5 text-xs text-gray-500">
            Attach lesson-linked metadata and push the recording to the channel.
          </p>
        </div>
        <button
          onClick={exportIt}
          disabled={busy}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-white/40 hover:text-white"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Youtube className="h-3.5 w-3.5" />}
          Export
        </button>
      </div>
      {result && (
        <p className={`mt-3 text-xs leading-relaxed ${result.ok ? "text-white" : "text-red-400"}`}>
          {result.ok ? result.message : result.error}
        </p>
      )}
    </div>
  );
}