"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { SiteSettings } from "@/lib/schemas/content";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { scrollStore } from "@/lib/scroll";

const ease = [0.76, 0, 0.24, 1] as const;

/** Full-screen navigation for tablet and mobile. Focus-trapped, Escape closes. */
export function MenuOverlay({ settings, onClose }: { settings: SiteSettings; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollStore.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = ref.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>("a[href], button"));
      const a = items[0];
      const b = items[items.length - 1];
      if (!a || !b) return;
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        b.focus();
      } else if (!e.shiftKey && document.activeElement === b) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      scrollStore.start();
    };
  }, [onClose]);

  const socials = settings.social.filter((s) => s.url);

  return (
    <motion.div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[75] flex flex-col bg-ink px-gutter pb-8 pt-[calc(var(--header-h)+3rem)]"
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.6, ease, delay: 0.1 } }}
      transition={{ duration: 0.8, ease }}
    >
      <nav aria-label="Menu" className="flex-1">
        <ul className="flex flex-col gap-1">
          {settings.navigation.map((item, i) => (
            <li key={item.href} className="overflow-hidden border-b border-line">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                exit={{ y: "110%", transition: { duration: 0.35, ease } }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.06 }}
              >
                <TransitionLink href={item.href} onClick={onClose} className="flex items-baseline justify-between py-3">
                  <span className="font-display text-[clamp(2.75rem,11vw,5.5rem)] leading-[1] tracking-[-0.01em]">{item.label}</span>
                  <span className="font-mono text-xs text-mist">{item.index}</span>
                </TransitionLink>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
      <motion.div
        className="flex flex-wrap items-end justify-between gap-6 text-sm text-mist"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.6 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <p className="eyebrow">{settings.tagline}</p>
        {settings.contact.email ? (
          <a className="link-underline text-paper" href={`mailto:${settings.contact.email}`}>
            {settings.contact.email}
          </a>
        ) : null}
        {socials.length ? (
          <ul className="flex gap-5">
            {socials.map((s) => (
              <li key={s.platform}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-underline text-paper">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
