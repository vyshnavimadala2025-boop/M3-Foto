import { TransitionLink } from "@/components/motion/TransitionLink";
import { cn } from "@/lib/utils";
import { Arrow } from "./ArrowLink";

type Props = { href: string; children: React.ReactNode; variant?: "solid" | "outline"; className?: string; cursor?: string };

/**
 * Rectangular, hairline-precise button. On hover a fill rises from below and the label
 * rolls to a duplicate, so the text never changes position.
 */
export function Button({ href, children, variant = "outline", className, cursor }: Props) {
  const solid = variant === "solid";
  return (
    <TransitionLink
      href={href}
      data-cursor={cursor}
      className={cn(
        "group relative inline-flex h-12 items-center gap-4 overflow-hidden border px-6 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500 ease-(--ease-expo)",
        solid
          ? "border-paper bg-paper text-ink hover:text-paper"
          : "border-paper/35 text-paper hover:border-paper hover:text-ink",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-(--ease-expo) group-hover:scale-y-100",
          solid ? "bg-ink" : "bg-paper",
        )}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-(--ease-expo) group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-(--ease-expo) group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <Arrow className="relative size-4" />
    </TransitionLink>
  );
}
