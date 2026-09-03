"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut  } from "@/lib/auth-client";
import { Download, KeyRound, Trash2, Mail, Loader2, Check } from "lucide-react";
import CyberPanel from "@/components/CyberPanel";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState<"password" | "export" | "delete" | null>(null);

  useEffect(() => {
    fetch("/api/me", { cache: "no-store" })
      .then((r) => r.json())
      .then(({ user }) => setEmail(user?.email ?? ""));
  }, []);

  const handlePassword = async () => {
    setMsg(null);
    if (newPassword.length < 8) {
      setMsg({ ok: false, text: "New password must be at least 8 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg({ ok: false, text: "Passwords don't match." });
      return;
    }
    setBusy("password");
    try {
      const res = await fetch("/api/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to change password.");
      setMsg({ ok: true, text: "Password updated." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Failed to change password." });
    } finally {
      setBusy(null);
    }
  };

  const handleExport = async () => {
    setBusy("export");
    try {
      const res = await fetch("/api/export", { cache: "no-store" });
      if (!res.ok) throw new Error("Export failed.");
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asta-export.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Export failed." });
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete your account and all progress permanently? This cannot be undone.")) return;
    setBusy("delete");
    try {
      const res = await fetch("/api/me", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete account.");
      await signOut();
      navigate("/signin");
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Failed to delete account." });
      setBusy(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-sm text-gray-500 font-mono">Account, data, and security.</p>
      </div>

      <div className="space-y-6">
        <CyberPanel title="Account">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Mail className="h-4 w-4 text-gray-500" />
              {email}
            </div>
            <div className="border-t border-white/5 pt-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                <KeyRound className="h-4 w-4 text-gray-500" />
                Change password
              </h3>
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input w-full"
                />
                <input
                  type="password"
                  placeholder="New password (min 8 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input w-full"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input w-full"
                />
                <button
                  onClick={handlePassword}
                  disabled={busy !== null}
                  className="btn-cyber text-xs disabled:opacity-40"
                >
                  {busy === "password" ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    "Update password"
                  )}
                </button>
              </div>
            </div>
          </div>
        </CyberPanel>

        <CyberPanel title="Your data">
          <p className="text-sm text-gray-400 mb-4">
            Download everything — profile, all track progress, notes, and certificates — as JSON.
          </p>
          <button
            onClick={handleExport}
            disabled={busy !== null}
            className="btn-cyber text-xs disabled:opacity-40"
          >
            {busy === "export" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <>
                <Download className="h-3 w-3" />
                Export my journey
              </>
            )}
          </button>
        </CyberPanel>

        <CyberPanel title="Danger zone" className="border-cyber-red/20">
          <p className="text-sm text-gray-400 mb-4">
            Permanently delete your account and all associated data. There is no undo.
          </p>
          <button
            onClick={handleDelete}
            disabled={busy !== null}
            className="rounded-lg border border-cyber-red/30 px-4 py-2 text-xs font-mono text-cyber-red transition-colors hover:bg-cyber-red/10 disabled:opacity-40"
          >
            {busy === "delete" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <>
                <Trash2 className="h-3 w-3" />
                Delete account
              </>
            )}
          </button>
        </CyberPanel>

        {msg && (
          <p
            className={`flex items-center gap-2 text-sm font-mono ${
              msg.ok ? "text-cyber-cyan" : "text-cyber-red"
            }`}
          >
            {msg.ok && <Check className="h-4 w-4" />}
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
}
