"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollStore } from "@/lib/scroll";

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx | null>(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

/**
 * Film-cut page transition: a black curtain rises to cover, the route changes underneath,
 * then the curtain continues upward to reveal the new page. Back/forward navigation is never
 * delayed; reduced-motion users get instant navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const label = useRef<HTMLSpanElement>(null);
  const firstRender = useRef(true);

  const navigate = useCallback(
    (href: string) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !curtain.current || covering.current) {
        router.push(href);
        return;
      }
      covering.current = true;
      scrollStore.stop();
      gsap
        .timeline()
        .set(curtain.current, { display: "block", yPercent: 100 })
        .to(curtain.current, { yPercent: 0, duration: 0.6, ease: "film" })
        .fromTo(label.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "expo" }, 0.25)
        .add(() => router.push(href));
    },
    [router],
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollStore.toTop(true);
    if (!covering.current || !curtain.current) {
      ScrollTrigger.refresh();
      return;
    }
    const el = curtain.current;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      gsap
        .timeline({
          onComplete: () => {
            covering.current = false;
            gsap.set(el, { display: "none" });
            scrollStore.start();
          },
        })
        .to(label.current, { autoAlpha: 0, y: -12, duration: 0.3, ease: "power2.in" })
        .to(el, { yPercent: -100, duration: 0.85, ease: "film" }, 0.1);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtain}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[110] hidden bg-ink"
      >
        <span ref={label} className="eyebrow absolute bottom-8 left-[var(--spacing-gutter)] text-mist opacity-0">
          M3 FOTO — Loading frame
        </span>
      </div>
    </TransitionContext.Provider>
  );
}
