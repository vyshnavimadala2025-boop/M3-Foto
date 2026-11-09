"use client";

import { scrollStore } from "@/lib/scroll";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const lenis = scrollStore.get();
        if (lenis) lenis.scrollTo(0, { duration: 2.2 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group eyebrow inline-flex items-center gap-3 text-paper"
    >
      <span className="link-underline pb-0.5">Back to top</span>
      <span aria-hidden className="inline-block transition-transform duration-500 ease-(--ease-expo) group-hover:-translate-y-1">
        ↑
      </span>
    </button>
  );
}
