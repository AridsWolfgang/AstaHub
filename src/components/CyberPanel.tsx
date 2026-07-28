"use client";

import { cn } from "@/lib/utils";

interface CyberPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "purple" | "amber" | "red" | "green";
  title?: string;
  icon?: React.ReactNode;
}

const glowColors = {
  cyan: "border-cyber-cyan/20 hover:border-cyber-cyan/40 shadow-[0_0_30px_rgba(0,240,255,0.05)]",
  purple: "border-cyber-purple/20 hover:border-cyber-purple/40 shadow-[0_0_30px_rgba(191,0,255,0.05)]",
  amber: "border-cyber-amber/20 hover:border-cyber-amber/40 shadow-[0_0_30px_rgba(255,176,0,0.05)]",
  red: "border-cyber-red/20 hover:border-cyber-red/40 shadow-[0_0_30px_rgba(255,0,64,0.05)]",
  green: "border-matrix-500/20 hover:border-matrix-500/40 shadow-[0_0_30px_rgba(0,230,115,0.05)]",
};

export default function CyberPanel({
  children,
  className,
  glow = "cyan",
  title,
  icon,
}: CyberPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-cyber-panel/60 backdrop-blur-sm transition-all duration-300",
        glowColors[glow],
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
          {icon && <span className="text-cyber-cyan">{icon}</span>}
          {title && (
            <h3 className="font-mono text-sm font-semibold text-gray-300 uppercase tracking-wider">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="p-5">{children}</div>
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent" />
    </div>
  );
}
