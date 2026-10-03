import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Real-time layer for community features (group chat, presence, live activity).
 *
 * Uses Supabase Realtime when a Supabase project is configured
 * (`VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` — Vite only exposes
 * `VITE_*` vars to the browser). The app's source of truth is Postgres
 * via Prisma; Supabase Realtime reads that same database through logical
 * replication. When it is not configured (or the database is not a
 * Supabase Postgres), every consumer falls back to polling —
 * never a fake "live" state.
 */

/** Browser-safe env read. Vite exposes import.meta.env (never process.env). */
function browserEnv(): Record<string, string | undefined> {
  const env =
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  return {
    url: env.VITE_SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL,
    key: env.VITE_SUPABASE_ANON_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

export function isRealtimeConfigured(): boolean {
  if (typeof window === "undefined") return false;
  const { url, key } = browserEnv();
  return Boolean(url && key);
}

let client: SupabaseClient | null | undefined;

export function getRealtime(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  if (client !== undefined) return client;
  const { url, key } = browserEnv();
  if (!url || !key) {
    client = null;
    return null;
  }
  client = createClient(url, key);
  return client;
}

/** The Postgres table names Supabase Realtime publishes (must match Prisma models). */
export const REALTIME_TABLES = {
  messages: "Message",
  posts: "Post",
  votes: "Vote",
  comments: "Comment",
  answers: "Answer",
  liveMessages: "LiveEventMessage",
} as const;

/**
 * Subscribe to row inserts on a table, filtered by an optional `eq` column.
 * Returns an unsubscribe function. Never throws when realtime is unavailable.
 */
export function subscribeToInserts(
  table: string,
  onInsert: (row: Record<string, unknown>) => void,
  eq?: { column: string; value: string }
): () => void {
  const supabase = getRealtime();
  if (!supabase) return () => {};

  let filter = `table=${table}`;
  if (eq) filter += `:${eq.column}=eq.${eq.value}`;

  const channel = supabase
    .channel(`rt-${table}-${eq?.value ?? "all"}-${Math.random().toString(36).slice(2)}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table, filter },
      (payload) => {
        if (payload.new) onInsert(payload.new as Record<string, unknown>);
      }
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to presence on a channel. Returns an unsubscribe function.
 * Presence is only meaningful when realtime is configured.
 */
export function subscribeToPresence(
  channelKey: string,
  onPresence: (users: string[]) => void,
  selfKey: string
): () => void {
  const supabase = getRealtime();
  if (!supabase) return () => {};

  const channel = supabase
    .channel(`presence-${channelKey}`)
    .on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      const users = Object.values(state).map((p) => {
        const entry = p as { userKey?: string }[];
        return entry[0]?.userKey ?? "unknown";
      });
      onPresence(Array.from(new Set(users)));
    })
    .subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;
      await channel.track({ userKey: selfKey });
    });

  return () => {
    void supabase.removeChannel(channel);
  };
}