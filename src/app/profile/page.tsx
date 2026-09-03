"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTierByLevel, type ProficiencyLevel } from "@/lib/types";
import ProfileClient from "@/components/ProfileClient";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(async (r) => {
        if (!r.ok) throw new Error("unauthenticated");
        const j = await r.json();
        setUser(j.user);
      })
      .catch(() => navigate("/signin"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center font-mono text-sm text-gray-500">Loading…</div>;
  if (!user) return null;

  const tier = getTierByLevel(user.level as ProficiencyLevel);
  return <ProfileClient user={user} tier={tier} />;
}
