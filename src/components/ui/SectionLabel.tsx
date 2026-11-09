import { cn } from "@/lib/utils";

/** "(02) — Featured collections" — the recurring film-edge label. */
export function SectionLabel({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-mist", className)}>
      <span className="text-paper">({index})</span>
      <span aria-hidden className="h-px w-8 bg-line" />
      <span>{label}</span>
    </p>
  );
}
