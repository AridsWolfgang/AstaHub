"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Loader2, Printer, ChevronRight } from "lucide-react";
import CyberPanel from "@/components/CyberPanel";
import { LogoMark } from "@/components/Logo";

interface Certificate {
  id: string;
  track: string;
  title: string;
  day: number;
  xp: number;
  issuedAt: string;
}

const TRACK_HOME: Record<string, string> = {
  c: "/dashboard",
  python: "/tracks/python",
  cpp: "/tracks/cpp",
  js: "/tracks/javascript",
  rust: "/tracks/rust",
  sql: "/tracks/sql",
  bash: "/tracks/toolkit",
};

const TRACK_LABEL: Record<string, string> = {
  c: "C / Assembly",
  python: "Python",
  cpp: "C++",
  js: "JavaScript / TypeScript",
  rust: "Rust",
  sql: "SQL & Databases",
  bash: "Bash / Linux / Git",
};

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me", { cache: "no-store" })
      .then((r) => r.json())
      .then(({ user }) => {
        setCertificates(user?.certificates ?? []);
        setName(user?.name ?? "");
      })
      .catch(() => setCertificates([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">Certificates</h1>
        <p className="text-sm text-gray-500 font-mono">
          Earned automatically when you complete every day of a track.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : certificates.length === 0 ? (
        <CyberPanel title="Nothing here yet">
          <div className="py-10 text-center">
            <Award className="mx-auto h-12 w-12 text-gray-600" strokeWidth={1} />
            <p className="mt-4 text-sm text-gray-400">
              Finish all days of a track and your certificate will appear here.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {Object.entries(TRACK_HOME).map(([track, href]) => (
                <Link key={track} to={href} className="btn-cyber text-xs">
                  {TRACK_LABEL[track] ?? track}
                  <ChevronRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </CyberPanel>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-transparent p-6"
            >
              <div className="flex items-start justify-between">
                <LogoMark className="h-10 w-10" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  {c.track === "c" ? "C / Assembly" : c.track}
                </span>
              </div>
              <p className="mt-6 text-[11px] font-mono uppercase tracking-widest text-gray-500">
                AstaHub presents this certificate to
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{name}</p>
              <p className="mt-4 text-sm text-gray-400">{c.title}</p>
              <p className="mt-1 text-xs text-gray-500">
                Completed all {c.day} days · {c.xp} XP earned
              </p>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-[10px] font-mono text-gray-500">
                  Issued {new Date(c.issuedAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 text-xs font-mono text-cyber-cyan hover:underline"
                >
                  <Printer className="h-3 w-3" />
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
