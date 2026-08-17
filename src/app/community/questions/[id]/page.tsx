"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/community/Avatar";
import { VoteButtons } from "@/components/community/VoteButtons";
import { ReportButton } from "@/components/community/ReportButton";
import { relativeTime } from "@/lib/time";

interface CommunityComment {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
}

interface Answer {
  id: string;
  body: string;
  accepted: boolean;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
  score: number;
  myVote: number | null;
  comments: CommunityComment[];
}

interface QuestionDetail {
  id: string;
  title: string;
  body: string;
  evidence: string | null;
  status: string;
  tags: string[];
  createdAt: string;
  author: { id: string; name: string; image: string | null };
  isAuthor: boolean;
  comments: CommunityComment[];
  answers: Answer[];
}

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session, status: authStatus } = useSession();
  const [question, setQuestion] = useState<QuestionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [sending, setSending] = useState(false);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [sendingComment, setSendingComment] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch(`/api/questions/${id}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setQuestion(data.question);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const answer = async () => {
    if (!answerText.trim() || !question) return;
    setSending(true);
    try {
      const res = await fetch(`/api/questions/${question.id}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: answerText.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setQuestion((q) => (q ? { ...q, answers: [...q.answers, data.answer], status: "answered" } : q));
        setAnswerText("");
      }
    } finally {
      setSending(false);
    }
  };

  const voteAnswer = async (answerId: string, value: 1 | -1) => {
    const res = await fetch(`/api/questions/${id}/answers/${answerId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    if (res.ok) {
      const data = await res.json();
      setQuestion((q) =>
        q
          ? {
              ...q,
              answers: q.answers.map((a) => (a.id === answerId ? { ...a, score: data.score, myVote: data.myVote } : a)),
            }
          : q
      );
    }
  };

  const acceptAnswer = async (answerId: string) => {
    const res = await fetch(`/api/questions/${id}/answers/${answerId}/accept`, { method: "PATCH" });
    if (res.ok) {
      setQuestion((q) =>
        q
          ? {
              ...q,
              answers: q.answers.map((a) => (a.id === answerId ? { ...a, accepted: true } : a)),
            }
          : q
      );
    }
  };

  const addComment = async (targetType: "question" | "answer", targetId: string) => {
    const text = (comments[`${targetType}:${targetId}`] ?? "").trim();
    if (!text) return;
    setSendingComment(`${targetType}:${targetId}`);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetId, body: text }),
      });
      if (res.ok) {
        const data = await res.json();
        if (targetType === "question") {
          setQuestion((q) => (q ? { ...q, comments: [...q.comments, data.comment] } : q));
        } else {
          setQuestion((q) =>
            q
              ? {
                  ...q,
                  answers: q.answers.map((a) => (a.id === targetId ? { ...a, comments: [...a.comments, data.comment] } : a)),
                }
              : q
          );
        }
        setComments((c) => ({ ...c, [`${targetType}:${targetId}`]: "" }));
      }
    } finally {
      setSendingComment(null);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto flex max-w-3xl justify-center px-4 py-24 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (notFound || !question) {
    return <p className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-gray-500">Question not found.</p>;
  }

  const canAnswer = authStatus === "authenticated";
  const isClosed = question.status === "closed";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
        <span
          className={
            question.status === "answered"
              ? "rounded bg-white/5 px-2 py-0.5 text-white"
              : question.status === "closed"
              ? "rounded bg-white/5 px-2 py-0.5 text-gray-500"
              : "rounded bg-white/5 px-2 py-0.5 text-gray-300"
          }
        >
          {question.status}
        </span>
        {question.tags.map((t) => (
          <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-gray-500">
            #{t}
          </span>
        ))}
      </div>

      <h1 className="mt-3 font-display text-2xl font-bold leading-snug text-white">{question.title}</h1>
      <div className="mt-2 flex items-center gap-3 text-xs font-mono text-gray-500">
        <span className="flex items-center gap-2">
          <Avatar name={question.author.name} image={question.author.image} size={22} />
          {question.author.name}
        </span>
        <span>{relativeTime(question.createdAt)}</span>
        <ReportButton targetType="question" targetId={question.id} />
      </div>

      <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{question.body}</p>

      {question.evidence && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500">What they tried</p>
          <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{question.evidence}</p>
        </div>
      )}

      <CommentBlock
        comments={question.comments}
        draft={comments["question:" + question.id] ?? ""}
        onDraftChange={(v) => setComments((c) => ({ ...c, ["question:" + question.id]: v }))}
        onAdd={() => addComment("question", question.id)}
        sending={sendingComment === `question:${question.id}`}
        canComment={canAnswer}
      />

      <div className="mt-12">
        <h2 className="font-display text-lg font-bold text-white">
          {question.answers.length} {question.answers.length === 1 ? "answer" : "answers"}
        </h2>

        <div className="mt-6 space-y-6">
          {question.answers.map((a) => (
            <div
              key={a.id}
              className={`rounded-2xl border p-5 ${
                a.accepted ? "border-white/30 bg-white/[0.04]" : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <div className="flex gap-4">
                <div className="hidden sm:block">
                  <VoteButtons score={a.score} myVote={a.myVote} onVote={(v) => voteAnswer(a.id, v)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-2">
                        <Avatar name={a.author.name} image={a.author.image} size={22} />
                        {a.author.name}
                      </span>
                      <span>{relativeTime(a.createdAt)}</span>
                      <ReportButton targetType="answer" targetId={a.id} />
                    </div>
                    <div className="flex items-center gap-2">
                      {a.accepted && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-white">
                          <Check className="h-3.5 w-3.5" /> Accepted
                        </span>
                      )}
                      {question.isAuthor && !a.accepted && !isClosed && (
                        <button
                          onClick={() => acceptAnswer(a.id)}
                          className="flex items-center gap-1 text-[11px] font-mono text-gray-500 transition-colors hover:text-white"
                        >
                          <ShieldCheck className="h-3.5 w-3.5" /> Accept
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{a.body}</p>
                  <div className="mt-3 sm:hidden">
                    <VoteButtons score={a.score} myVote={a.myVote} onVote={(v) => voteAnswer(a.id, v)} size="sm" />
                  </div>
                  <CommentBlock
                    comments={a.comments}
                    draft={comments[`answer:${a.id}`] ?? ""}
                    onDraftChange={(v) => setComments((c) => ({ ...c, [`answer:${a.id}`]: v }))}
                    onAdd={() => addComment("answer", a.id)}
                    sending={sendingComment === `answer:${a.id}`}
                    canComment={canAnswer}
                    compact
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {canAnswer && !isClosed ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Your answer</p>
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              rows={4}
              placeholder="Explain, show code, point to the concept that applies."
              className="mt-3 w-full resize-y rounded-lg border border-white/10 bg-white/[0.02] p-3 text-sm text-gray-300 placeholder:text-gray-600 focus:border-white/25 focus:outline-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={answer}
                disabled={sending || !answerText.trim()}
                className="btn-primary !px-4 !py-2 text-xs disabled:opacity-40"
              >
                {sending ? "Posting…" : "Post answer"}
              </button>
            </div>
          </div>
        ) : !canAnswer ? (
          <p className="mt-8 text-sm text-gray-500">
            Sign in to answer and help a fellow learner.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function CommentBlock({
  comments,
  draft,
  onDraftChange,
  onAdd,
  sending,
  canComment,
  compact,
}: {
  comments: CommunityComment[];
  draft: string;
  onDraftChange: (v: string) => void;
  onAdd: () => void;
  sending: boolean;
  canComment: boolean;
  compact?: boolean;
}) {
  return (
    <div className="mt-4">
      {comments.length > 0 && (
        <div className={`space-y-2 ${compact ? "mt-2" : "mt-4"}`}>
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2.5">
              <Avatar name={c.author.name} image={c.author.image} size={22} />
              <div className="min-w-0 flex-1 rounded-lg border border-white/5 bg-white/[0.01] px-3 py-2">
                <p className="text-[10px] font-mono text-gray-500">
                  {c.author.name} · {relativeTime(c.createdAt)}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-400">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {canComment && (
        <div className="mt-3 flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder="Add a comment…"
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-gray-300 placeholder:text-gray-600 focus:border-white/25 focus:outline-none"
          />
          <button
            onClick={onAdd}
            disabled={sending || !draft.trim()}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-mono text-gray-400 transition-colors hover:text-white disabled:opacity-40"
          >
            {sending ? "…" : "Comment"}
          </button>
        </div>
      )}
    </div>
  );
}