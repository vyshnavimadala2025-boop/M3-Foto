"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Testimonial } from "@/lib/schemas/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { Arrow } from "@/components/ui/ArrowLink";
import { pad } from "@/lib/utils";

const ease = [0.19, 1, 0.22, 1] as const;

/** One voice at a time, set large. Manual controls only — nothing moves unless asked. */
export function Testimonials({ index, label, items }: { index: string; label: string; items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const item = items[i];
  if (!item) return null;
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <section aria-labelledby="testimonials-title" aria-roledescription="carousel" className="px-gutter relative py-28 md:py-40">
      <h2 id="testimonials-title" className="sr-only">
        {label}
      </h2>
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel index={index} label={label} />
          {item.sample ? <PlaceholderBadge label="Sample testimonial" className="mt-6" /> : null}
        </div>

        <div className="md:col-span-8 md:col-start-5">
          <span aria-hidden className="block font-display text-[6rem] leading-[0.5] text-steel">
            “
          </span>
          <div className="relative min-h-[16rem] md:min-h-[18rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={item.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.8, ease }}
              >
                <blockquote className="font-display text-[clamp(1.75rem,3.4vw,3.5rem)] leading-[1.08] tracking-[-0.01em] text-balance">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4 text-[0.875rem]">
                  <span aria-hidden className="h-px w-10 bg-paper/40" />
                  <span>{item.attribution}</span>
                  <span className="eyebrow text-steel">{item.context}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {items.length > 1 ? (
            <div className="mt-12 flex items-center gap-6">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid size-12 place-items-center rounded-full border border-line transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink">
                <Arrow className="size-4 rotate-180" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid size-12 place-items-center rounded-full border border-line transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink">
                <Arrow className="size-4" />
              </button>
              <p className="eyebrow text-steel">
                <span className="text-paper">{pad(i + 1)}</span> / {pad(items.length)}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
