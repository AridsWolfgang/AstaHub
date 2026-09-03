"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
      const result = await signIn(email, password);
      if ((result as { error?: string })?.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      navigate(callbackUrl);
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

          <div className="space-y-3">
            <a
              href="/api/auth/google"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-100"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09A6.97 6.97 0 0 1 5.48 12s0-.74.36-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.42 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </a>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-mono text-[11px] text-gray-500">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
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
          <Link to="/curriculum" className="text-cyber-cyan hover:underline">
            Browse the curriculum
          </Link>
        </p>
      </div>
    </div>
  );
}
