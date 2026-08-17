"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowLeft, Loader2, Send, Radio } from "lucide-react";
import { Avatar } from "@/components/community/Avatar";
import { relativeTime } from "@/lib/time";
import { isRealtimeConfigured, subscribeToInserts, REALTIME_TABLES } from "@/lib/realtime";
import { youtubeEmbedUrl, isCurrentlyLive } from "@/lib/live";

interface ChatMessage {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
}

interface RoomEvent {
  id: string;
  slug: string;
  title: string;
  status: string;
  startAt: string;
  durationMinutes: number;
  youtubeUrl: string | null;
  recordingUrl: string | null;
}

const POLL_MS = 4000;

export default function LiveRoomClient({ event }: { event: RoomEvent }) {
  const { data: session, status: authStatus } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [live, setLive] = useState(false);
  const lastSeenRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const liveNow = isCurrentlyLive(event.status, event.startAt, event.durationMinutes, new Date());
  const streamEmbed = liveNow
    ? youtubeEmbedUrl(event.youtubeUrl ?? "")
    : youtubeEmbedUrl(event.recordingUrl ?? "");

  const appendMessages = useCallback((incoming: ChatMessage[]) => {
    if (incoming.length === 0) return;
    setMessages((prev) => {
      const seen = new Set(prev.map((m) => m.id));
      const fresh = incoming.filter((m) => !seen.has(m.id));
      if (fresh.length === 0) return prev;
      return [...prev, ...fresh];
    });
    lastSeenRef.current = incoming[incoming.length - 1].createdAt;
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/live/${event.id}/messages`, { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (cancelled) return;
        setMessages(data.messages);
        if (data.messages.length > 0) lastSeenRef.current = data.messages[data.messages.length - 1].createdAt;
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [event.id]);

  useEffect(() => {
    const realtime = isRealtimeConfigured();
    setLive(realtime);

    if (realtime) {
      const unsub = subscribeToInserts(
        REALTIME_TABLES.liveMessages,
        (row) => {
          const id = row.id as string | undefined;
          const body = row.body as string | undefined;
          if (!id || !body) return;
          appendMessages([
            {
              id,
              body,
              createdAt: new Date().toISOString(),
              author: { id: (row.userId as string) ?? "", name: "Member", image: null },
            },
          ]);
        },
        { column: "eventId", value: event.id }
      );
      return () => unsub();
    }

    const timer = setInterval(async () => {
      try {
        const qs = lastSeenRef.current ? `?after=${encodeURIComponent(lastSeenRef.current)}` : "";
        const res = await fetch(`/api/live/${event.id}/messages${qs}`, { cache: "no-store" });
        const data = await res.json();
        appendMessages(data.messages);
      } catch {
        // silent
      }
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [event.id, appendMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const send = async () => {
    if (!draft.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/live/${event.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: draft.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        appendMessages([data.message]);
        setDraft("");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/live/${event.slug}`}
        className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {event.title}
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
            {streamEmbed ? (
              <iframe
                src={streamEmbed}
                title={event.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <Radio className="h-8 w-8 text-gray-600" strokeWidth={1.5} />
                <p className="font-display text-lg font-bold text-white">{event.title}</p>
                <p className="max-w-sm text-sm text-gray-500">
                  {liveNow
                    ? "The stream link hasn't been attached yet. It will appear here as soon as it goes live."
                    : "This session hasn't started yet — and when it ends, the recording will play right here."}
                </p>
              </div>
            )}
          </div>
          <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
            {live && <span className="text-white">· live chat</span>}
            {!live && <span>· syncing</span>}
          </p>
        </div>

        <div className="flex h-[420px] flex-col rounded-2xl border border-white/10 bg-black/20">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
              Live chat
            </span>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {loading ? (
              <div className="flex justify-center pt-16 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <p className="pt-16 text-center text-sm text-gray-600">
                No messages yet. Say hello.
              </p>
            ) : (
              messages.map((m) => {
                const mine = m.author.id === session?.user?.id;
                return (
                  <div key={m.id} className={`flex items-start gap-2.5 ${mine ? "flex-row-reverse" : ""}`}>
                    <Avatar name={m.author.name} image={m.author.image} size={26} />
                    <div className={`max-w-[75%] rounded-xl px-3.5 py-2 ${mine ? "bg-white text-black" : "border border-white/10 bg-white/[0.02]"}`}>
                      {!mine && (
                        <p className="mb-0.5 text-[10px] font-mono text-gray-500">{m.author.name}</p>
                      )}
                      <p className={`text-sm leading-relaxed ${mine ? "text-black" : "text-gray-200"}`}>{m.body}</p>
                      <p className={`mt-1 text-[9px] font-mono ${mine ? "text-black/50" : "text-gray-600"}`}>
                        {relativeTime(m.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            {authStatus === "authenticated" ? (
              <>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                  placeholder="Join the conversation…"
                  className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-gray-300 placeholder:text-gray-600 focus:border-white/25 focus:outline-none"
                />
                <button
                  onClick={send}
                  disabled={sending || !draft.trim()}
                  className="flex items-center gap-1.5 rounded-lg bg-cyber-cyan px-4 py-2 text-xs font-mono font-semibold text-cyber-dark transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send
                </button>
              </>
            ) : (
              <Link href="/signin" className="btn-primary w-full !px-4 !py-2 text-center text-xs">
                Sign in to join the conversation
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}