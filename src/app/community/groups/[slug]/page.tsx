"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, Send, Users } from "lucide-react";
import { Avatar } from "@/components/community/Avatar";
import { relativeTime } from "@/lib/time";
import { isRealtimeConfigured, subscribeToInserts, subscribeToPresence, REALTIME_TABLES } from "@/lib/realtime";

interface ChatMessage {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
}

interface GroupDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  owner: { id: string; name: string; image: string | null };
  isMember: boolean;
  members: { id: string; name: string; image: string | null; role: string }[];
}

const POLL_MS = 4000;

export default function GroupChatPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [online, setOnline] = useState<string[]>([]);
  const [live, setLive] = useState(false);
  const lastSeenRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
    Promise.all([
      fetch(`/api/groups/${slug}`, { cache: "no-store" }),
      fetch(`/api/groups/${slug}/messages`, { cache: "no-store" }),
    ])
      .then(async ([gRes, mRes]) => {
        const gData = await gRes.json();
        const mData = await mRes.json();
        if (cancelled) return;
        setGroup(gData.group);
        setMessages(mData.messages);
        if (mData.messages.length > 0) lastSeenRef.current = mData.messages[mData.messages.length - 1].createdAt;
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Realtime or polling
  useEffect(() => {
    if (!group || !group.isMember) return;
    const realtime = isRealtimeConfigured();
    setLive(realtime);

    if (realtime) {
      const unsubMessages = subscribeToInserts(REALTIME_TABLES.messages, (row) => {
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
      }, { column: "groupId", value: group.id });

      const unsubPresence = subscribeToPresence(
        `group-${group.slug}`,
        (users) => setOnline(users),
        session?.user?.name ?? "Someone"
      );

      return () => {
        unsubMessages();
        unsubPresence();
      };
    }

    const timer = setInterval(async () => {
      try {
        const qs = lastSeenRef.current ? `?after=${encodeURIComponent(lastSeenRef.current)}` : "";
        const res = await fetch(`/api/groups/${slug}/messages${qs}`, { cache: "no-store" });
        const data = await res.json();
        appendMessages(data.messages);
      } catch {
        // silent
      }
    }, POLL_MS);
    return () => clearInterval(timer);
  }, [group, slug, session?.user?.name, appendMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const join = async () => {
    setJoining(true);
    const res = await fetch(`/api/groups/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "join" }),
    });
    if (res.ok) setGroup((g) => (g ? { ...g, isMember: true } : g));
    setJoining(false);
  };

  const send = async () => {
    if (!draft.trim() || !group) return;
    setSending(true);
    try {
      const res = await fetch(`/api/groups/${group.slug}/messages`, {
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

  if (loading) {
    return (
      <div className="mx-auto flex max-w-3xl justify-center px-4 py-24 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }
  if (!group) {
    return <p className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-gray-500">Group not found.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{group.name}</h1>
          {group.description && <p className="mt-1 text-sm text-gray-500">{group.description}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-mono text-gray-500">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> {group.members.length} members
            </span>
            {live && <span className="text-white">· live</span>}
            {!live && <span>· syncing</span>}
            {online.length > 0 && <span>· {online.length} online</span>}
          </div>
        </div>
      </div>

      {!group.isMember ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-sm text-gray-400">You need to join this group to read and send messages.</p>
          <button onClick={join} disabled={joining} className="btn-primary mt-4 !px-5 !py-2 text-xs">
            {joining ? "Joining…" : "Join group"}
          </button>
        </div>
      ) : (
        <>
          <div className="flex h-[420px] flex-col rounded-2xl border border-white/10 bg-black/20">
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <p className="pt-16 text-center text-sm text-gray-600">
                  No messages yet. Start the conversation.
                </p>
              )}
              {messages.map((m) => {
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
              })}
              <div ref={bottomRef} />
            </div>
            <div className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Message the group…"
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
            </div>
          </div>
        </>
      )}
    </div>
  );
}