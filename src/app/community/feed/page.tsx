"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Newspaper, Loader2, ArrowRight } from "lucide-react";
import { Avatar } from "@/components/community/Avatar";
import { relativeTime } from "@/lib/time";
import { isRealtimeConfigured, subscribeToInserts, REALTIME_TABLES } from "@/lib/realtime";

interface FeedPost {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
  score: number;
  commentCount: number;
}

export default function CommunityFeedPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [nextBefore, setNextBefore] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [composer, setComposer] = useState<"idle" | "busy" | "error">("idle");

  const loadPage = useCallback(async (before?: string) => {
    const qs = before ? `?before=${encodeURIComponent(before)}` : "";
    const res = await fetch(`/api/posts${qs}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load posts");
    return res.json();
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadPage()
      .then((data) => {
        if (cancelled) return;
        setPosts(data.posts);
        setNextBefore(data.nextBefore);
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [loadPage]);

  useEffect(() => {
    if (!isRealtimeConfigured()) return;
    const unsubscribe = subscribeToInserts(REALTIME_TABLES.posts, (row) => {
      const id = row.id as string | undefined;
      const title = row.title as string | undefined;
      if (!id || !title) return;
      setPosts((prev) => [
        {
          id,
          title,
          body: (row.body as string) ?? "",
          createdAt: new Date().toISOString(),
          author: { id: "", name: "New post", image: null },
          score: 0,
          commentCount: 0,
        },
        ...prev,
      ]);
    });
    return unsubscribe;
  }, []);

  const loadMore = async () => {
    if (!nextBefore || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await loadPage(nextBefore);
      setPosts((prev) => [...prev, ...data.posts]);
      setNextBefore(data.nextBefore);
    } catch {
    } finally {
      setLoadingMore(false);
    }
  };

  const submit = async () => {
    if (title.trim().length < 4 || !body.trim()) return;
    setComposer("busy");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), postBody: body.trim() }),
      });
      if (!res.ok) throw new Error();
      const { post } = await res.json();
      window.location.href = `/community/feed/${post.id}`;
    } catch {
      setComposer("error");
    }
  };

  const canPost = status === "authenticated";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Learnings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Publish what you learned. Teaching is the highest form of mastery.
        </p>
      </div>

      {canPost ? (
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title — what did you build or learn?"
            className="w-full border-b border-white/10 bg-transparent pb-2 text-sm font-semibold text-white placeholder:text-gray-600 focus:border-white/30 focus:outline-none"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share the journey: what you tried, what broke, what clicked."
            rows={4}
            className="mt-3 w-full resize-y bg-transparent text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between">
            {composer === "error" ? (
              <span className="text-xs font-mono text-cyber-red">Could not publish. Try again.</span>
            ) : (
              <span />
            )}
            <button
              onClick={submit}
              disabled={composer === "busy" || title.trim().length < 4 || !body.trim()}
              className="btn-primary !px-4 !py-2 text-xs disabled:opacity-40"
            >
              {composer === "busy" ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-gray-400">
          <Link href="/signin" className="text-white underline underline-offset-4">
            Sign in
          </Link>{" "}
          to publish your own learnings. The feed is open to everyone.
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500">
          Nothing here yet. Be the first to publish a learning.
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/community/feed/${post.id}`}
                className="block rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={post.author.name} image={post.author.image} size={30} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{post.title}</p>
                    <p className="text-[11px] font-mono text-gray-500">
                      {post.author.name} · {relativeTime(post.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] text-gray-500">
                    <span>{post.score} votes</span>
                    <span>{post.commentCount} comments</span>
                  </div>
                </div>
                {post.body && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-400">{post.body}</p>}
              </Link>
            ))}
          </div>

          {nextBefore && (
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="mx-auto mt-8 flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs font-mono text-gray-400 transition-colors hover:text-white disabled:opacity-40"
            >
              {loadingMore ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowRight className="h-3.5 w-3.5" />}
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
}