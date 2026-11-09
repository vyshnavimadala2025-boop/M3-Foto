"use client";

import { useRef, useState } from "react";
import type { ServiceCard } from "@/lib/data/content";
import type { Cta } from "@/lib/schemas/content";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Frame } from "@/components/media/Frame";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccentText } from "@/components/ui/AccentText";
import { ArrowLink, Arrow } from "@/components/ui/ArrowLink";
import { cn, pad } from "@/lib/utils";

type Props = { index: string; label: string; title: string; cta: Cta; items: ServiceCard[] };

/**
 * Editorial index. On desktop a single floating frame follows the pointer and cross-cuts
 * between service images; on touch every row carries its own thumbnail.
 */
export function Services({ index, label, title, cta, items }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const float = el?.querySelector<HTMLElement>("[data-float]");
      const list = el?.querySelector<HTMLElement>("[data-list]");
      if (!el || !float || !list) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.finePointer, () => {
        gsap.set(float, { xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(float, "x", { duration: 0.7, ease: "power3" });
        const yTo = gsap.quickTo(float, "y", { duration: 0.7, ease: "power3" });
        const rTo = gsap.quickTo(float, "rotation", { duration: 0.9, ease: "power3" });
        let lastX = 0;
        const move = (e: PointerEvent) => {
          const r = list.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
          rTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4));
          lastX = e.clientX;
        };
        list.addEventListener("pointermove", move);
        return () => list.removeEventListener("pointermove", move);
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el.querySelectorAll("[data-row]"), {
          yPercent: 30,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.06,
          ease: "expo",
          scrollTrigger: { trigger: list, start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="services-title" className="px-gutter relative bg-ink py-28 md:py-40">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel index={index} label={label} />
          <RevealText as="h2" id="services-title" className="display-l mt-6">
            <AccentText text={title} />
          </RevealText>
        </div>
        <div className="flex items-end md:col-span-4 md:justify-end">
          <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
        </div>
      </div>

      <div data-list className="relative mt-16 md:mt-24" onPointerLeave={() => setHovered(null)}>
        <ul className="border-t border-line">
          {items.map((s, i) => (
            <li key={s.id} data-row className="border-b border-line">
              <TransitionLink
                href={`/services/${s.slug}`}
                onPointerEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 py-5 transition-opacity duration-500 md:grid-cols-12 md:gap-x-8 md:py-7",
                  hovered !== null && hovered !== i && "md:opacity-35",
                )}
              >
                <div className="relative aspect-[4/5] w-14 overflow-hidden md:hidden">
                  <Frame media={s.media} sizes="56px" className="h-full w-full" badge={false} />
                </div>
                <span className="hidden font-mono text-[0.6875rem] text-steel md:col-span-1 md:block">{pad(i + 1)}</span>
                <h3 className="font-display text-[clamp(1.85rem,5.2vw,4.75rem)] leading-[0.95] transition-transform duration-700 ease-(--ease-expo) md:col-span-6 md:group-hover:translate-x-4">
                  {s.title}
                </h3>
                <p className="col-span-3 mt-2 max-w-[40ch] text-[0.875rem] leading-relaxed text-mist md:col-span-4 md:mt-0">
                  {s.short}
                </p>
                <span className="row-start-1 col-start-3 flex justify-end md:col-span-1 md:col-start-12 md:row-start-auto">
                  <span className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                    <Arrow className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                  </span>
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>

        {/* Floating preview (desktop, fine pointer) */}
        <div
          data-float
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden aspect-[4/5] w-[19vw] max-w-[22rem] [@media(hover:hover)_and_(pointer:fine)]:md:block"
          style={{
            clipPath: hovered === null ? "inset(50% 50% 50% 50%)" : "inset(0% 0% 0% 0%)",
            transition: "clip-path 0.8s var(--ease-expo)",
          }}
        >
          {items.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-0 transition-[opacity,transform] duration-700 ease-(--ease-expo)"
              style={{ opacity: hovered === i ? 1 : 0, transform: hovered === i ? "scale(1)" : "scale(1.12)" }}
            >
              <Frame media={s.media} sizes="22vw" className="h-full w-full" badge="bl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
