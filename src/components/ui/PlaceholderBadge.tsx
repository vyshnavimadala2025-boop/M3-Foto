import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

/** Marks content that must be replaced before launch. Controlled by NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGES. */
export function PlaceholderBadge({ label = "Placeholder", className }: { label?: string; className?: string }) {
  if (!env.showPlaceholderBadges) return null;
  return (
    <span
      className={cn(
        "pointer-events-none z-10 inline-flex items-center gap-1.5 border border-paper/25 bg-ink/70 px-1.5 py-1 font-mono text-[0.5625rem] uppercase leading-none tracking-[0.16em] text-paper/80 backdrop-blur-[2px]",
        className,
      )}
    >
      <span aria-hidden className="size-1 rounded-full bg-paper/70" />
      {label}
    </span>
  );
}
