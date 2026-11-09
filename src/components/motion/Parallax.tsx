"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Percentage of the inner element's height to travel. Inner is oversized to avoid gaps. */
  amount?: number;
};

/** Depth parallax: the photograph drifts inside its frame as the frame passes through the viewport. */
export function Parallax({ children, className, innerClassName, amount = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.firstElementChild;
      if (!el || !inner) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          inner,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className={cn("absolute inset-x-0", innerClassName)} style={{ top: `-${amount / 2}%`, bottom: `-${amount / 2}%` }}>
        {children}
      </div>
    </div>
  );
}
