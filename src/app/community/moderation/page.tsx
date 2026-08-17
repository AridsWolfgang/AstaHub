"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Ban, Check } from "lucide-react";
import { Avatar } from "@/components/community/Avatar";
import { relativeTime } from "@/lib/time";

interface Report {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  status: string;
  createdAt: string;
  reporter: { id: string; name: string; image: string | null };
}

export default function ModerationPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/reports", { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 403) {
          setDenied(true);
          return;
        }
        const data = await res.json();
        setReports(data.reports);
      })
      .catch(() => setDenied(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const resolve = async (id: string, status: "actioned" | "dismissed") => {
    const res = await fetch(`/api/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = await res.json();
      setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: data.status } : r)).filter((r) => r.status === "open"));
    }
  };

  if (denied) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-gray-600" strokeWidth={1} />
        <p className="mt-4 text-sm text-gray-500">
          Moderator access required. Only listed moderators can view and action the queue.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Moderation queue</h1>
        <p className="mt-1 text-sm text-gray-500">
          Open reports, oldest first. Action removes/addresses the content; dismiss clears the report.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : reports.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500">Queue clear. The community is behaving.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500">
                  <Avatar name={r.reporter.name} image={r.reporter.image} size={22} />
                  <span>{r.reporter.name}</span>
                  <span>·</span>
                  <span>{relativeTime(r.createdAt)}</span>
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-white">{r.targetType}</span>
                  <span className="text-gray-600">{r.targetId.slice(0, 12)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => resolve(r.id, "actioned")}
                    className="flex items-center gap-1 rounded-lg bg-cyber-cyan px-3 py-1.5 text-[11px] font-mono font-semibold text-cyber-dark hover:opacity-90"
                  >
                    <Ban className="h-3 w-3" /> Action
                  </button>
                  <button
                    onClick={() => resolve(r.id, "dismissed")}
                    className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-mono text-gray-400 transition-colors hover:text-white"
                  >
                    <Check className="h-3 w-3" /> Dismiss
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{r.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}