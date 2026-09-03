"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type SessionUser = { id: string; name: string | null; email: string; image: string | null };
type Session = { user: SessionUser } | null;

type AuthCtx = {
  data: Session;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  data: null,
  status: "unauthenticated",
  signIn: async () => ({ error: "not implemented" }),
  signOut: async () => {},
  refresh: async () => {},
});

export function useSession() {
  const ctx = useContext(Ctx);
  return { data: ctx.data, status: ctx.status, update: ctx.refresh };
}

export function useAuth() {
  return useContext(Ctx);
}

export async function signIn(email: string, password: string) {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { error: data.error || "Sign in failed" };
  // token stored via httpOnly cookie by server; refresh in place
  window.location.reload();
  return {};
}

export async function signOut() {
  await fetch("/api/auth/signout", { method: "POST" });
  window.location.href = "/";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Session>(null);
  const [status, setStatus] = useState<AuthCtx["status"]>("loading");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      if (!res.ok) {
        setData(null);
        setStatus("unauthenticated");
        return;
      }
      const json = await res.json();
      if (json?.user) {
        setData({ user: json.user });
        setStatus("authenticated");
      } else {
        setData(null);
        setStatus("unauthenticated");
      }
    } catch {
      setData(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const ctx: AuthCtx = {
    data,
    status,
    signIn: async (email, password) => {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) return { error: j.error || "Sign in failed" };
      await refresh();
      return {};
    },
    signOut: async () => {
      await fetch("/api/auth/signout", { method: "POST" });
      setData(null);
      setStatus("unauthenticated");
      window.location.href = "/";
    },
    refresh,
  };

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}

// Keep SessionProvider alias for migrated files that import { SessionProvider } from "@/lib/auth-client"
export const SessionProvider = AuthProvider;
