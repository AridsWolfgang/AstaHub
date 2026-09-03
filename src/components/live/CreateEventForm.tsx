"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarPlus, Loader2 } from "lucide-react";
import { LIVE_TYPE_LABELS } from "@/lib/live";
import { TRACKS } from "@/lib/tracks";

const TYPES = Object.entries(LIVE_TYPE_LABELS) as [string, string][];

export default function CreateEventForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    type: "live_class",
    hostName: "",
    startAt: "",
    durationMinutes: "60",
    track: "",
    lessonDay: "",
    youtubeUrl: "",
    recordingUrl: "",
    description: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.startAt) {
      setError("Pick a start time.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          type: form.type,
          hostName: form.hostName,
          startAt: new Date(form.startAt).toISOString(),
          durationMinutes: Number(form.durationMinutes),
          track: form.track || null,
          lessonDay: form.lessonDay ? Number(form.lessonDay) : null,
          youtubeUrl: form.youtubeUrl || null,
          recordingUrl: form.recordingUrl || null,
          description: form.description,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not create the event.");
        return;
      }
      setOpen(false);
      navigate(`/live/${data.event.slug}`);
      window.location.reload();
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-gray-300 placeholder:text-gray-600 focus:border-white/25 focus:outline-none";

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-primary !px-4 !py-2 text-xs">
        <CalendarPlus className="h-3.5 w-3.5" />
        New event
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-white">Schedule a live event</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-gray-500 transition-colors hover:text-white"
        >
          Cancel
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Title</span>
          <input value={form.title} onChange={set("title")} required maxLength={200} placeholder="Pointers under the hood" className={inputCls} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Type</span>
          <select value={form.type} onChange={set("type")} className={inputCls}>
            {TYPES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Host</span>
          <input value={form.hostName} onChange={set("hostName")} required maxLength={80} placeholder="Ada Lovelace" className={inputCls} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Start time (local)</span>
          <input type="datetime-local" value={form.startAt} onChange={set("startAt")} className={inputCls} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Duration (minutes)</span>
          <input type="number" min={5} max={480} value={form.durationMinutes} onChange={set("durationMinutes")} className={inputCls} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Track (optional)</span>
          <select value={form.track} onChange={set("track")} className={inputCls}>
            <option value="">None</option>
            {TRACKS.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Lesson day (optional)</span>
          <input type="number" min={1} max={365} value={form.lessonDay} onChange={set("lessonDay")} placeholder="e.g. 12" className={inputCls} />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Live stream link (YouTube)</span>
          <input value={form.youtubeUrl} onChange={set("youtubeUrl")} placeholder="https://www.youtube.com/watch?v=…" className={inputCls} />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Recording link (after the event)</span>
          <input value={form.recordingUrl} onChange={set("recordingUrl")} placeholder="https://youtu.be/…" className={inputCls} />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[11px] font-mono uppercase tracking-wider text-gray-500">Description</span>
          <textarea value={form.description} onChange={set("description")} rows={4} maxLength={5000} placeholder="What will happen, who is it for, what should people prepare?" className={inputCls} />
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={saving} className="btn-primary mt-5 !px-5 !py-2 text-xs">
        {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CalendarPlus className="h-3.5 w-3.5" />}
        Schedule event
      </button>
    </form>
  );
}