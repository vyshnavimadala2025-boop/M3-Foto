import { TransitionLink } from "@/components/motion/TransitionLink";
import { cn } from "@/lib/utils";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className={cn("size-[1em]", className)}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
    </svg>
  );
}

/** Text link with a sliding underline and an arrow that travels on hover. */
export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <TransitionLink
      href={href}
      className={cn("group inline-flex items-center gap-3 text-sm tracking-wide text-paper", className)}
    >
      <span className="link-underline pb-1">{children}</span>
      <span className="relative inline-flex size-4 overflow-hidden">
        <Arrow className="absolute inset-0 size-4 transition-transform duration-500 ease-(--ease-expo) group-hover:translate-x-full" />
        <Arrow className="absolute inset-0 size-4 -translate-x-full transition-transform duration-500 ease-(--ease-expo) group-hover:translate-x-0" />
      </span>
    </TransitionLink>
  );
}
