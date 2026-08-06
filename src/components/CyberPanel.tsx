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
  cyan: "border-white/10 hover:border-cyber-cyan/40",
  purple: "border-white/10 hover:border-cyber-cyan/40",
  amber: "border-white/10 hover:border-cyber-cyan/40",
  red: "border-white/10 hover:border-cyber-cyan/40",
  green: "border-white/10 hover:border-cyber-cyan/40",
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
        "relative rounded-xl border bg-white/[0.02] transition-colors duration-300",
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
    </div>
  );
}
