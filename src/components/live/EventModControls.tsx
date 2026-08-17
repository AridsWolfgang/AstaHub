"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Trash2, Loader2 } from "lucide-react";

export default function EventModControls({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const setStatus = async (status: string) => {
    setBusy(true);
    try {
      await fetch(`/api/live/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this event? This cannot be undone.")) return;
    setBusy(true);
    try {
      await fetch(`/api/live/${eventId}`, { method: "DELETE" });
      router.push("/live");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={() => setStatus("live")} disabled={busy} className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-white/40 hover:text-white">
        <CheckCircle2 className="h-3.5 w-3.5" /> Mark live
      </button>
      <button onClick={() => setStatus("finished")} disabled={busy} className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-white/40 hover:text-white">
        Mark finished
      </button>
      <button onClick={() => setStatus("cancelled")} disabled={busy} className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-white/40 hover:text-white">
        <XCircle className="h-3.5 w-3.5" /> Cancel
      </button>
      <button onClick={remove} disabled={busy} className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 transition-colors hover:border-red-400/60 hover:text-red-300">
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        Delete
      </button>
    </div>
  );
}