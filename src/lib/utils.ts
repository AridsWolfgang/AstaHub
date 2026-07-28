import clsx from "clsx";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return clsx(inputs);
}

export function formatDay(day: number): string {
  return `DAY ${String(day).padStart(3, "0")}`;
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
