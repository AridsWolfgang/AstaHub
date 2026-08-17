"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Trash2, Loader2 } from "lucide-react";
import { Avatar } from "@/components/community/Avatar";
import { VoteButtons } from "@/components/community/VoteButtons";
import { ReportButton } from "@/components/community/ReportButton";
import { relativeTime } from "@/lib/time";

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
}

interface PostDetail {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
  score: number;
  myVote: number | null;
  canDelete: boolean;
  comments: Comment[];
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session, status } = useSession();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);

  const load = () => {
    setLoading(true);
    fetch(`/api/posts/${id}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setPost(data.post);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const vote = async (value: 1 | -1) => {
    if (!post) return;
    const res = await fetch(`/api/posts/${post.id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    if (res.ok) {
      const data = await res.json();
      setPost((p) => (p ? { ...p, score: data.score, myVote: data.myVote } : p));
    }
  };

  const addComment = async () => {
    if (!commentText.trim() || !post) return;
    setSending(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: commentText.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setPost((p) => (p ? { ...p, comments: [...p.comments, data.comment] } : p));
        setCommentText("");
      }
    } finally {
      setSending(false);
    }
  };

  const remove = async () => {
    if (!post || !window.confirm("Delete this post permanently?")) return;
    const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) window.location.href = "/community/feed";
  };

  if (loading) {
    return (
      <div className="mx-auto flex max-w-3xl justify-center px-4 py-24 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (notFound || !post) {
    return <p className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-gray-500">Post not found.</p>;
  }

  const canComment = status === "authenticated";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex gap-4">
        <div className="hidden sm:block">
          <VoteButtons score={post.score} myVote={post.myVote} onVote={vote} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-bold leading-snug text-white">{post.title}</h1>
              <div className="mt-2 flex items-center gap-3 text-xs font-mono text-gray-500">
                <span className="flex items-center gap-2">
                  <Avatar name={post.author.name} image={post.author.image} size={22} />
                  {post.author.name}
                </span>
                <span>{relativeTime(post.createdAt)}</span>
                <ReportButton targetType="post" targetId={post.id} />
              </div>
            </div>
            <div className="sm:hidden">
              <VoteButtons score={post.score} myVote={post.myVote} onVote={vote} size="sm" />
            </div>
            {post.canDelete && (
              <button
                onClick={remove}
                className="rounded p-1.5 text-gray-600 transition-colors hover:text-cyber-red"
                title="Delete post"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{post.body}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-lg font-bold text-white">
          {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
        </h2>

        {canComment && (
          <div className="mt-4 flex items-start gap-3">
            <Avatar name={session?.user?.name ?? "You"} image={session?.user?.image ?? null} size={30} />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
                placeholder="Add a constructive comment…"
                className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.02] p-3 text-sm text-gray-300 placeholder:text-gray-600 focus:border-white/25 focus:outline-none"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={addComment}
                  disabled={sending || !commentText.trim()}
                  className="btn-primary !px-4 !py-1.5 text-xs disabled:opacity-40"
                >
                  {sending ? "Posting…" : "Comment"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-5">
          {post.comments.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <Avatar name={c.author.name} image={c.author.image} size={28} />
              <div className="min-w-0 flex-1 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-[11px] font-mono text-gray-500">
                  {c.author.name} · {relativeTime(c.createdAt)}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-300">{c.body}</p>
              </div>
            </div>
          ))}
          {post.comments.length === 0 && (
            <p className="text-sm text-gray-600">No comments yet — be the first to engage.</p>
          )}
        </div>
      </div>
    </div>
  );
}