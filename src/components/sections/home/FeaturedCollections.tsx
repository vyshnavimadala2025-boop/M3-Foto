"use client";

import { useRef } from "react";
import type { CollectionCard } from "@/lib/data/content";
import type { Cta } from "@/lib/schemas/content";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Frame } from "@/components/media/Frame";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { RevealText } from "@/components/motion/RevealText";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccentText } from "@/components/ui/AccentText";
import { ArrowLink, Arrow } from "@/components/ui/ArrowLink";
import { cn, pad } from "@/lib/utils";

type Props = { index: string; label: string; title: string; intro: string; cta: Cta; items: CollectionCard[] };

/** Panel rhythm: the filmstrip alternates formats so no two neighbours share a shape. */
const SHAPES = [
  "lg:h-[48vh] lg:aspect-[4/5]",
  "lg:h-[34vh] lg:aspect-[3/2]",
  "lg:h-[44vh] lg:aspect-[3/4]",
  "lg:h-[32vh] lg:aspect-square",
  "lg:h-[50vh] lg:aspect-[2/3]",
  "lg:h-[34vh] lg:aspect-[16/10]",
  "lg:h-[46vh] lg:aspect-[4/5]",
];
/** Vertical offsets applied to the whole panel (image + caption) for an uneven, editorial rhythm. */
const OFFSETS = [
  "lg:-translate-y-[3vh]",
  "lg:translate-y-[7vh]",
  "lg:-translate-y-[5vh]",
  "lg:translate-y-[8vh]",
  "lg:-translate-y-[2vh]",
  "lg:-translate-y-[6vh]",
  "lg:translate-y-[4vh]",
];

/**
 * Desktop: the section pins and the filmstrip travels horizontally with scroll, each photograph
 * drifting inside its frame. Touch: a native swipe carousel with scroll-snap, no pinning.
 */
export function FeaturedCollections({ index, label, title, intro, cta, items }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const track = el?.querySelector<HTMLElement>("[data-track]");
      const viewport = el?.querySelector<HTMLElement>("[data-pin]");
      if (!el || !track || !viewport) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            pinType: "transform",
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        track.querySelectorAll<HTMLElement>("[data-drift]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
        const progress = el.querySelector<HTMLElement>("[data-progress]");
        if (progress) {
          gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: viewport, start: "top top", end: () => `+=${distance()}`, scrub: true } });
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="collections-title" className="relative bg-ink">
      <div data-pin className="relative flex flex-col justify-center overflow-hidden py-24 lg:h-svh lg:py-0">
        <div className="px-gutter grid gap-8 md:grid-cols-12 lg:absolute lg:inset-x-0 lg:top-[calc(var(--header-h)+1.5rem)]">
          <div className="md:col-span-7">
            <SectionLabel index={index} label={label} />
            <RevealText as="h2" id="collections-title" className="display-l mt-6 lg:text-[clamp(2.5rem,5vw,5.5rem)]">
              <AccentText text={title} />
            </RevealText>
          </div>
          <div className="flex flex-col justify-end gap-6 md:col-span-4 md:col-start-9">
            <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-mist">{intro}</p>
            <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
          </div>
        </div>

        {/* Filmstrip */}
        <div
          className="mt-14 overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:mt-0 lg:overflow-visible lg:pt-[16vh] [&::-webkit-scrollbar]:hidden"
          data-lenis-prevent-horizontal
        >
          <ul
            data-track
            className="flex w-max snap-x snap-mandatory items-center gap-5 px-gutter will-change-transform lg:snap-none lg:gap-[4vw] lg:pr-[12vw]"
          >
            {items.map((c, i) => (
              <li key={c.id} className={cn("relative flex shrink-0 snap-start flex-col w-[78vw] sm:w-[52vw] lg:w-auto", OFFSETS[i % OFFSETS.length])}>
                <TransitionLink href={`/portfolio/${c.slug}`} data-cursor="view" className="group block">
                  <div className={cn("relative aspect-[4/5] overflow-hidden", SHAPES[i % SHAPES.length])}>
                    <div data-drift className="absolute inset-y-0 -left-[8%] -right-[8%]">
                      <Frame
                        media={c.cover}
                        sizes="(min-width: 1024px) 40vw, 80vw"
                        className="h-full w-full"
                        imgClassName="transition-transform duration-[1.6s] ease-(--ease-expo) group-hover:scale-[1.04]"
                        badge={false}
                      />
                    </div>
                    {c.placeholder ? <PlaceholderBadge className="absolute right-3 top-3" /> : null}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-6">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.6875rem] text-steel">{pad(i + 1)}</span>
                      <h3 className="font-display text-[1.75rem] leading-none md:text-[2.125rem]">{c.title}</h3>
                    </div>
                    <span className="eyebrow hidden text-mist sm:inline">{c.category}</span>
                  </div>
                  <p className="mt-2 pl-8 text-[0.8125rem] text-steel">
                    {c.description}
                  </p>
                </TransitionLink>
              </li>
            ))}
            <li className="flex w-[60vw] shrink-0 snap-start items-center justify-center sm:w-[40vw] lg:h-[50vh] lg:w-[28vw]">
              <TransitionLink href={cta.href} data-cursor="open" className="group flex flex-col items-center gap-6 text-center">
                <span className="grid size-28 place-items-center rounded-full border border-paper/30 transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                  <Arrow className="size-6" />
                </span>
                <span className="font-display text-3xl">
                  All <em>collections</em>
                </span>
              </TransitionLink>
            </li>
          </ul>
        </div>

        <div className="px-gutter mt-10 lg:absolute lg:inset-x-0 lg:bottom-8 lg:mt-0" aria-hidden>
          <div className="relative hidden h-px bg-line lg:block">
            <span data-progress className="absolute inset-0 origin-left scale-x-0 bg-paper" />
          </div>
          <p className="eyebrow mt-3 hidden justify-between text-steel lg:flex">
            <span>Scroll to advance</span>
            <span>{pad(items.length)} collections</span>
          </p>
        </div>
      </div>
    </section>
  );
}
