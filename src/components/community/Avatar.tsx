// Image -> img (migrated from next/image)
import { cn } from "@/lib/utils";

export function Avatar({
  name,
  image,
  size = 36,
  className,
}: {
  name: string;
  image: string | null;
  size?: number;
  className?: string;
}) {
  const initials = (name || "?")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full border border-white/10 object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono font-semibold text-gray-400",
        className
      )}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.36) }}
    >
      {initials}
    </div>
  );
}