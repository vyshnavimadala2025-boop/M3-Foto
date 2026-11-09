"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Direction the mask opens from */
  from?: "bottom" | "top" | "left" | "right";
  delay?: number;
  start?: string;
};

const START_CLIP = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

/** Cinematic mask reveal: the frame opens while the photograph settles from a slight zoom. */
export function RevealImage({ children, className, from = "bottom", delay = 0, start = "top 85%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.querySelector<HTMLElement>("[data-reveal-inner]") ?? el.firstElementChild;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start, once: true }, delay });
        tl.fromTo(el, { clipPath: START_CLIP[from] }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "film" });
        if (inner) tl.fromTo(inner, { scale: 1.28 }, { scale: 1, duration: 2, ease: "expo" }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
