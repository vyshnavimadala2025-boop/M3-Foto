"use client";

import { useRef, useState } from "react";
import type { MediaAsset } from "@/lib/schemas/content";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { Frame } from "@/components/media/Frame";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccentText } from "@/components/ui/AccentText";
import { cn, pad } from "@/lib/utils";

type Step = { title: string; text: string; media: MediaAsset };
type Props = { index: string; label: string; title: string; steps: Step[] };

/**
 * Desktop: the section pins and scroll advances through the steps. A large numeral rolls,
 * the active step lifts to full contrast, and photographs wipe upward one over the next.
 * Touch / reduced motion: a simple stacked sequence.
 */
export function Approach({ index, label, title, steps }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const el = ref.current;
      const pin = el?.querySelector<HTMLElement>("[data-pin]");
      if (!el || !pin) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-step-frame]", el);
        const inners = gsap.utils.toArray<HTMLElement>("[data-step-frame] [data-step-inner]", el);
        const numeral = el.querySelector("[data-numeral]");
        frames.forEach((f, i) => gsap.set(f, { clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }));
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${window.innerHeight * (steps.length - 1) * 0.9}`,
            pin: true,
            pinType: "transform",
            scrub: 0.6,
            snap: { snapTo: 1 / (steps.length - 1), duration: { min: 0.3, max: 0.8 }, ease: "power2.inOut", delay: 0.05 },
            onUpdate: (self) => setActive(Math.round(self.progress * (steps.length - 1))),
          },
        });
        for (let i = 1; i < steps.length; i++) {
          tl.fromTo(frames[i]!, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none", immediateRender: false }, i - 1)
            .fromTo(inners[i]!, { scale: 1.25 }, { scale: 1, duration: 1, ease: "none" }, i - 1)
            .to(inners[i - 1]!, { yPercent: -8, duration: 1, ease: "none" }, i - 1)
            .to(numeral, { yPercent: -100 * i, duration: 1, ease: "none" }, i - 1);
        }
        return () => ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="approach-title" className="relative bg-ink">
      <div data-pin className="px-gutter relative py-28 lg:flex lg:h-svh lg:items-center lg:py-0">
        <div className="grid w-full gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: title, rolling numeral, step list */}
          <div className="flex flex-col justify-between lg:col-span-6 lg:h-[72vh]">
            <div>
              <SectionLabel index={index} label={label} />
              <h2 id="approach-title" className="display-m mt-6 max-w-[14ch]">
                <AccentText text={title} />
              </h2>
            </div>

            <div aria-hidden className="hidden h-[0.9em] overflow-hidden font-display text-[clamp(6rem,14vw,14rem)] leading-[0.9] lg:block">
              <div data-numeral className="flex flex-col">
                {steps.map((_, i) => (
                  <span key={i} className="block h-[0.9em]">
                    {pad(i + 1)}
                  </span>
                ))}
              </div>
            </div>

            <ol className="hidden gap-6 lg:grid lg:grid-cols-4">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  aria-current={active === i ? "step" : undefined}
                  className={cn("border-t pt-4 transition-[border-color] duration-700", active === i ? "border-paper" : "border-line")}
                >
                  <p className={cn("eyebrow transition-colors duration-700", active === i ? "text-paper" : "text-steel")}>{pad(i + 1)}</p>
                  <h3 className={cn("mt-2 font-display text-2xl transition-opacity duration-700", active === i ? "opacity-100" : "opacity-60")}>{s.title}</h3>
                  <p
                    aria-hidden={active !== i}
                    className={cn(
                      "mt-2 text-[0.8125rem] leading-relaxed text-mist transition-[opacity,transform] duration-700 ease-(--ease-expo)",
                      active === i ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    )}
                  >
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: image stack (desktop) */}
          <div className="relative hidden aspect-[4/5] max-h-[72vh] w-full justify-self-end lg:col-span-5 lg:col-start-8 lg:block lg:h-[72vh] lg:w-auto">
            {steps.map((s, i) => (
              <div key={s.title} data-step-frame className="absolute inset-0 overflow-hidden" style={{ zIndex: i + 1 }}>
                <div data-step-inner className="absolute inset-0 will-change-transform">
                  <Frame media={s.media} sizes="(min-width: 1024px) 36vw, 100vw" className="h-full w-full" />
                </div>
              </div>
            ))}
            <p className="eyebrow absolute -bottom-8 left-0 text-steel">
              Step {pad(active + 1)} — {steps[active]?.title}
            </p>
          </div>

          {/* Stacked (touch) */}
          <ol className="grid gap-14 sm:grid-cols-2 lg:hidden">
            {steps.map((s, i) => (
              <li key={s.title}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Frame media={s.media} sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full" />
                </div>
                <p className="eyebrow mt-5 text-steel">{pad(i + 1)}</p>
                <h3 className="mt-2 font-display text-3xl">{s.title}</h3>
                <p className="mt-2 max-w-[40ch] text-[0.9375rem] leading-relaxed text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
