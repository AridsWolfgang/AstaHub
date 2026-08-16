"use client";

import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Award,
  Flame,
  LogOut,
  Pencil,
  Save,
  X,
  Star,
  Calendar,
} from "lucide-react";
import { formatDay, cn } from "@/lib/utils";

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  bio: string | null;
  currentDay: number;
  totalXp: number;
  level: string;
  streak: number;
  completedDays: number[];
  certificates: { id: string; title: string; day: number; xp: number; issuedAt: string | Date }[];
}

interface TierInfo {
  name: string;
  title: string;
  color: string;
  icon: string;
}

function Avatar({ name, image, size = "md" }: { name: string; image: string | null; size?: "md" | "lg" }) {
  const initials = (name || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  const cls =
    size === "lg"
      ? "h-24 w-24 text-2xl rounded-2xl"
      : "h-12 w-12 text-sm rounded-xl";
  if (image) {
    const dims = size === "lg" ? { width: 96, height: 96 } : { width: 48, height: 48 };
    return (
      <Image
        src={image}
        alt={name}
        unoptimized
        {...dims}
        className={cn("object-cover border border-white/10", cls)}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center border border-cyber-cyan/30 bg-cyber-cyan/10 font-display font-bold text-cyber-cyan",
        cls
      )}
    >
      {initials}
    </div>
  );
}

export default function ProfileClient({ user, tier }: { user: ProfileUser; tier: TierInfo }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completedCount = user.completedDays.length;
  const overallPercent = Math.round((completedCount / 100) * 100);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), bio: bio.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to save.");
        setSaving(false);
        return;
      }
      setEditing(false);
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setSaving(false);
    }
  }

  async function handleSignOut() {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar name={user.name} image={user.image} size="lg" />
          <div>
            {editing ? (
              <form onSubmit={handleSave} className="space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input max-w-xs"
                  placeholder="Your name"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="input max-w-sm min-h-[80px] resize-y"
                  placeholder="A short bio — who are you, what are you learning toward?"
                />
                {error && (
                  <p className="text-xs text-cyber-red">{error}</p>
                )}
                <div className="flex gap-2">
                  <button type="submit" disabled={saving} className="btn-primary text-xs">
                    {saving ? "Saving..." : <><Save className="h-3 w-3" /> Save</>}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditing(false); setName(user.name); setBio(user.bio ?? ""); }}
                    className="btn text-xs"
                  >
                    <X className="h-3 w-3" /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-2xl font-bold text-white">{user.name}</h1>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="Edit profile"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
                {user.bio && <p className="mt-1 text-sm text-gray-400 max-w-md">{user.bio}</p>}
                <div className="mt-2 flex items-center gap-2 text-xs font-mono">
                  <span style={{ color: tier.color }}>{tier.icon} {tier.title}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <button onClick={handleSignOut} className="btn text-xs">
          <LogOut className="h-3 w-3" /> Sign out
        </button>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Days Completed", value: `${completedCount}/100`, icon: Star },
          { label: "Total XP", value: user.totalXp.toLocaleString(), icon: Award },
          { label: "Current Streak", value: `${user.streak} days`, icon: Flame },
          { label: "Current Day", value: formatDay(user.currentDay), icon: Calendar },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-white/5 bg-cyber-panel/50 p-4">
            <Icon className="mb-2 h-4 w-4 text-cyber-cyan" />
            <p className="font-display text-xl font-bold text-white">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-lg font-bold text-white">Course Completion</h2>
          <span className="text-xs font-mono text-gray-500">{overallPercent}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-cyber-cyan transition-all"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-white mb-4">Certificates</h2>
        {user.certificates.length === 0 ? (
          <p className="rounded-xl border border-white/5 bg-cyber-panel/50 p-6 text-sm text-gray-500">
            No certificates yet. Complete a capstone day to earn your first one.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {user.certificates.map((cert) => (
              <div key={cert.id} className="rounded-xl border border-white/5 bg-cyber-panel/50 p-5">
                <Award className="mb-3 h-6 w-6 text-cyber-cyan" />
                <h3 className="font-display text-sm font-bold text-white">{cert.title}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Day {cert.day} · {cert.xp} XP
                </p>
                <p className="mt-1 text-[10px] font-mono text-gray-600">
                  Issued {new Date(cert.issuedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
