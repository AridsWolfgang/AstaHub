"use client";

import { useEffect, useState } from "react";

interface Parts {
  d: number;
  h: number;
  m: number;
  s: number;
}

function parts(ms: number): Parts | null {
  if (ms < 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

export default function Countdown({ target, live }: { target: string; live: boolean }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const p = parts(new Date(target).getTime() - now);
  if (live || (p && p.d === 0 && p.h === 0 && p.m === 0 && p.s === 0)) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] font-semibold text-white">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        Live now
      </span>
    );
  }
  if (!p) {
    return <span className="font-mono text-[11px] text-gray-500">Ended</span>;
  }
  const seg = (v: number, label: string) => (
    <span className="inline-flex min-w-[42px] flex-col items-center rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5">
      <span className="font-display text-lg font-bold leading-none text-white tabular-nums">
        {String(v).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] font-mono uppercase tracking-wider text-gray-500">{label}</span>
    </span>
  );
  return (
    <div className="inline-flex gap-1.5">
      {seg(p.d, "days")}
      {seg(p.h, "hrs")}
      {seg(p.m, "min")}
      {seg(p.s, "sec")}
    </div>
  );
}