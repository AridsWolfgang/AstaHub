"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Users, Loader2, ArrowRight } from "lucide-react";
import { Avatar } from "@/components/community/Avatar";
import { relativeTime } from "@/lib/time";

interface Group {
  id: string;
  slug: string;
  name: string;
  description: string;
  createdAt: string;
  owner: { name: string; image: string | null };
  memberCount: number;
}

export default function GroupsPage() {
  const { status: authStatus } = useSession();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/groups", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setGroups(data.groups))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const create = async () => {
    setError("");
    if (!name.trim()) {
      setError("A group name is required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not create group.");
        return;
      }
      window.location.href = `/community/groups/${data.group.slug}`;
    } catch {
      setError("Could not create group. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const canCreate = authStatus === "authenticated";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Study groups</h1>
          <p className="mt-1 text-sm text-gray-500">
            By course, city, or project — people who know your name.
          </p>
        </div>
        {canCreate && (
          <button onClick={() => setCreateOpen((v) => !v)} className="btn-primary !px-4 !py-2 text-xs">
            {createOpen ? "Cancel" : "Create a group"}
          </button>
        )}
      </div>

      {canCreate && createOpen && (
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Group name (e.g. 'C Cohort', 'Lagos Devs', 'Rust Book Club')"
            className="w-full border-b border-white/10 bg-transparent pb-2 text-sm font-semibold text-white placeholder:text-gray-600 focus:border-white/30 focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this group about?"
            rows={2}
            className="mt-3 w-full resize-y bg-transparent text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none"
          />
          <div className="mt-4 flex items-center justify-between">
            {error && <span className="text-xs font-mono text-cyber-red">{error}</span>}
            <button
              onClick={create}
              disabled={busy || !name.trim()}
              className="btn-primary !px-4 !py-2 text-xs disabled:opacity-40"
            >
              {busy ? "Creating…" : "Create"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500">
          No groups yet. Start one — that&apos;s how a club begins.
        </p>
      ) : (
        <div className="space-y-3">
          {groups.map((g) => (
            <Link
              key={g.id}
              href={`/community/groups/${g.slug}`}
              className="group block rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-lg font-bold text-white">{g.name}</h2>
                  {g.description && <p className="mt-1 truncate text-sm text-gray-400">{g.description}</p>}
                  <p className="mt-2 text-[11px] font-mono text-gray-500">
                    {g.owner.name} · started {relativeTime(g.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="flex items-center gap-1.5 font-mono text-xs text-gray-500">
                    <Users className="h-4 w-4" />
                    {g.memberCount}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-600 transition-colors group-hover:text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}