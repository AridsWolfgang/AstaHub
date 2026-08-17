"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Loader2, Lightbulb, Send } from "lucide-react";
import { HINT_LADDER } from "@/lib/coach";

interface CoachEntry {
  id: string;
  kind: "hint" | "question";
  label: string;
  text: string;
}

interface CoachPanelProps {
  track: string;
  day: number;
  topic: string;
  prompt: string;
  code: string;
}

export default function CoachPanel({ track, day, topic, prompt, code }: CoachPanelProps) {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<CoachEntry[]>([]);
  const [loadingLevel, setLoadingLevel] = useState<number | null>(null);
  const [asking, setAsking] = useState(false);
  const [qDraft, setQDraft] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);

  const ask = async (kind: "hint" | "question", label: string, body: Record<string, unknown>) => {
    if (kind === "hint") setLoadingLevel(body.hintLevel as number);
    else setAsking(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track, day, topic, prompt, code, ...body }),
      });
      const data = await res.json();
      if (res.status === 503 && data.code === "NOT_CONFIGURED") {
        setNotConfigured(true);
        setEntries((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).slice(2),
            kind,
            label,
            text: data.error,
          },
        ]);
        return;
      }
      if (!res.ok) {
        setEntries((prev) => [
          ...prev,
          { id: Math.random().toString(36).slice(2), kind, label, text: data.error ?? "The coach couldn't answer right now." },
        ]);
        return;
      }
      setEntries((prev) => [
        ...prev,
        { id: Math.random().toString(36).slice(2), kind, label, text: data.hint },
      ]);
    } catch {
      setEntries((prev) => [
        ...prev,
        { id: Math.random().toString(36).slice(2), kind, label, text: "Could not reach the coach. Try again in a moment." },
      ]);
    } finally {
      setLoadingLevel(null);
      setAsking(false);
    }
  };

  const askHint = (level: number) =>
    ask("hint", HINT_LADDER[level].title, { hintLevel: level });

  const askQuestion = () => {
    if (!qDraft.trim()) return;
    const q = qDraft.trim();
    setQDraft("");
    void ask("question", "Your question", { question: q });
  };

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-black/20">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-xs font-mono uppercase tracking-wider text-gray-400 transition-colors hover:text-white"
      >
        <Sparkles className="h-3.5 w-3.5" />
        AI coach
        <span className="ml-auto text-gray-600 normal-case tracking-normal">
          {open ? "hide" : "need a hint? ask the coach"}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-white/10 p-4">
          {notConfigured && (
            <p className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs leading-relaxed text-gray-400">
              The AI coach is not connected on this server yet — it answers honestly rather
              than pretending. Try the built-in hints in this lesson, or ask in the{" "}
              <Link href="/community/questions" className="text-white underline underline-offset-2">
                community
              </Link>{" "}
              where real humans help.
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {HINT_LADDER.map((rung) => (
              <button
                key={rung.level}
                onClick={() => askHint(rung.level)}
                disabled={loadingLevel !== null || asking}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-white/30 hover:text-white disabled:opacity-40"
              >
                {loadingLevel === rung.level ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Lightbulb className="h-3 w-3" />
                )}
                {rung.title}
              </button>
            ))}
          </div>

          {entries.length > 0 && (
            <ul className="space-y-2">
              {entries.map((e) => (
                <li key={e.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                  <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-gray-500">
                    {e.label}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200">{e.text}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-2">
            <input
              value={qDraft}
              onChange={(e) => setQDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  askQuestion();
                }
              }}
              placeholder="Ask a concept question — the coach guides, never answers outright…"
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-gray-300 placeholder:text-gray-600 focus:border-white/25 focus:outline-none"
            />
            <button
              onClick={askQuestion}
              disabled={asking || !qDraft.trim()}
              className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs text-gray-300 transition-colors hover:border-white/40 hover:text-white disabled:opacity-40"
            >
              {asking ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              Ask
            </button>
          </div>
        </div>
      )}
    </div>
  );
}