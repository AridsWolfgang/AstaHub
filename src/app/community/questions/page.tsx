"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "@/lib/auth-client";
import { HelpCircle, Loader2 } from "lucide-react";
import { Avatar } from "@/components/community/Avatar";
import { relativeTime } from "@/lib/time";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  title: string;
  body: string;
  status: string;
  tags: string[];
  createdAt: string;
  author: { id: string; name: string; image: string | null };
  answerCount: number;
}

type Status = "open" | "answered" | "closed";

export default function QuestionsPage() {
  const { data: session, status: authStatus } = useSession();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<Status>("open");
  const [loading, setLoading] = useState(true);
  const [askOpen, setAskOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [evidence, setEvidence] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (status: Status) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/questions?status=${status}`, { cache: "no-store" });
      const data = await res.json();
      setQuestions(data.questions);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  const ask = async () => {
    setError("");
    if (title.trim().length < 8 || !body.trim() || !evidence.trim()) {
      setError("Title (8+ chars), body, and evidence of effort are required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          evidence: evidence.trim(),
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not ask.");
        return;
      }
      window.location.href = `/community/questions/${data.question.id}`;
    } catch {
      setError("Could not ask. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const canAsk = authStatus === "authenticated";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Questions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Human help, StackOverflow-style. Every question shows what you tried.
          </p>
        </div>
        {canAsk && (
          <button onClick={() => setAskOpen((v) => !v)} className="btn-primary !px-4 !py-2 text-xs">
            {askOpen ? "Cancel" : "Ask a question"}
          </button>
        )}
      </div>

      {canAsk && askOpen && (
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title — a specific question, not a story"
            className="w-full border-b border-white/10 bg-transparent pb-2 text-sm font-semibold text-white placeholder:text-gray-600 focus:border-white/30 focus:outline-none"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="The full question, with context."
            rows={3}
            className="mt-3 w-full resize-y bg-transparent text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none"
          />
          <textarea
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder="Evidence of effort — what did you try, and what happened?"
            rows={2}
            className="mt-2 w-full resize-y bg-transparent text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags, comma separated (c, pointers, day-13)"
            className="mt-3 w-full border-b border-white/10 bg-transparent pb-2 text-sm text-gray-300 placeholder:text-gray-600 focus:border-white/30 focus:outline-none"
          />
          <div className="mt-4 flex items-center justify-between">
            {error && <span className="text-xs font-mono text-cyber-red">{error}</span>}
            <button
              onClick={ask}
              disabled={busy}
              className="btn-primary !px-4 !py-2 text-xs disabled:opacity-40"
            >
              {busy ? "Asking…" : "Ask"}
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 flex gap-1">
        {(["open", "answered", "closed"] as Status[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-mono transition-colors",
              filter === s ? "bg-white text-black" : "text-gray-500 hover:text-white"
            )}
          >
            {s === "open" ? "Open" : s === "answered" ? "Answered" : "Closed"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500">
          No {filter} questions yet. Be the first to ask.
        </p>
      ) : (
        <div className="space-y-3">
          {questions.map((q) => (
            <Link
              key={q.id}
              to={`/community/questions/${q.id}`}
              className="block rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-white">{q.title}</h2>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] font-mono text-gray-500">
                    <span>{q.author.name}</span>
                    <span>{relativeTime(q.createdAt)}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-gray-500">
                  <HelpCircle className="h-3.5 w-3.5" />
                  {q.answerCount}
                </div>
              </div>
              {q.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {q.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-500">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}