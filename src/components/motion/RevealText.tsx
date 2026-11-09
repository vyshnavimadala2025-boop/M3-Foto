"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MQ } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Delay in seconds after the trigger fires */
  delay?: number;
  /** ScrollTrigger start, e.g. "top 85%" */
  start?: string;
  stagger?: number;
  /** Fire immediately on mount instead of on scroll */
  immediate?: boolean;
  id?: string;
};

/** Line-by-line mask reveal. Text is fully readable without JS and with reduced motion. */
export function RevealText({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  start = "top 88%",
  stagger = 0.08,
  immediate = false,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.reduce, () => {
        gsap.set(el, { autoAlpha: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | null = null;
        document.fonts.ready.then(() => {
          if (!ref.current) return;
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            aria: "none",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { autoAlpha: 1 });
              self.masks.forEach((m) => m.classList.add("line-mask"));
              return gsap.from(self.lines, {
                yPercent: 112,
                duration: 1.25,
                ease: "expo",
                stagger,
                delay,
                scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
              });
            },
          });
        });
        return () => split?.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-reveal className={cn(className)}>
      {children}
    </Tag>
  );
}
