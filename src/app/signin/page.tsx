"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams?.get("callbackUrl") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Registration failed.");
          setLoading(false);
          return;
        }
      }
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <LogoMark className="mx-auto mb-4 h-12 w-12" />
          <h1 className="font-display text-2xl font-bold text-white">
            Welcome to AstaHub
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Your progress, certificates, and community — in one place.
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-cyber-panel/60 p-6">
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg border border-white/5 p-1">
            <button
              onClick={() => { setMode("signin"); setError(null); }}
              className={`rounded-md py-2 text-sm font-medium transition-colors ${
                mode === "signin" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => { setMode("register"); setError(null); }}
              className={`rounded-md py-2 text-sm font-medium transition-colors ${
                mode === "register" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="input"
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "register" ? "At least 6 characters" : "Your password"}
                className="input"
              />
            </div>

            {error && (
              <p className="rounded-md border border-cyber-red/30 bg-cyber-red/10 px-3 py-2 text-xs text-cyber-red">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            Free forever. No credit card. Your knowledge is yours.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Prefer to explore first?{" "}
          <Link href="/curriculum" className="text-cyber-cyan hover:underline">
            Browse the curriculum
          </Link>
        </p>
      </div>
    </div>
  );
}
