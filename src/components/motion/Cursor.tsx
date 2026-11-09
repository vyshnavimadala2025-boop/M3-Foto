"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MQ } from "@/lib/gsap";

/**
 * Desktop cursor: a precise dot plus a trailing ring. Elements opt in to a label with
 * data-cursor="view" (or any short word). Never rendered for touch or reduced motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MQ.finePointer);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const d = dot.current;
    const r = ring.current;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });

    let visible = false;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        gsap.set([d, r], { x: e.clientX, y: e.clientY });
        gsap.to([d, r], { autoAlpha: 1, duration: 0.3 });
        visible = true;
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button, [role='button']");
      const next = t?.dataset.cursor ?? (t ? "link" : "");
      setLabel(next);
    };
    const leave = () => {
      gsap.to([d, r], { autoAlpha: 0, duration: 0.3 });
      visible = false;
    };
    const down = () => gsap.to(r, { scale: 0.82, duration: 0.25 });
    const up = () => gsap.to(r, { scale: 1, duration: 0.4 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  const hasText = label !== "" && label !== "link";
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.55))]">
      <div ref={dot} className="fixed left-0 top-0 size-1.5 rounded-full bg-paper" />
      <div
        ref={ring}
        className="fixed left-0 top-0 grid place-items-center rounded-full border border-paper/70 transition-[width,height,background-color,border-color] duration-500 ease-(--ease-expo)"
        style={{
          width: hasText ? 88 : label === "link" ? 52 : 34,
          height: hasText ? 88 : label === "link" ? 52 : 34,
          backgroundColor: hasText ? "#fff" : "transparent",
        }}
      >
        <span
          className="eyebrow text-[0.625rem] text-ink transition-opacity duration-300"
          style={{ opacity: hasText ? 1 : 0 }}
        >
          {hasText ? label : ""}
        </span>
      </div>
    </div>
  );
}
