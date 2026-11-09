"use client";

import type Lenis from "lenis";

/** Tiny module store for the single Lenis instance. */
let instance: Lenis | null = null;

export const scrollStore = {
  set(l: Lenis | null) {
    instance = l;
  },
  get() {
    return instance;
  },
  stop() {
    instance?.stop();
  },
  start() {
    instance?.start();
  },
  toTop(immediate = true) {
    if (instance) instance.scrollTo(0, { immediate, force: true });
    else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
  },
};
