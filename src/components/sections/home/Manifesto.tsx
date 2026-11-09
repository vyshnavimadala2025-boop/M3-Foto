"use client";

import { useRef } from "react";
import type { MediaAsset } from "@/lib/schemas/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Frame } from "@/components/media/Frame";
import { RevealImage } from "@/components/motion/RevealImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccentText } from "@/components/ui/AccentText";

type Props = { index: string; label: string; statement: string; note: string; media: MediaAsset };

/** One oversized statement whose words develop like a print as you read down the page. */
export function Manifesto({ index, label, statement, note, media }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const text = ref.current?.querySelector<HTMLElement>("[data-statement]");
      if (!text) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(text, { type: "words", wordsClass: "will-change-[opacity]", aria: "none" });
        gsap.fromTo(
          split.words,
          { opacity: 0.4 }, // ≥ 3:1 contrast for large text even before it "develops"
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: text, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="manifesto-title" className="px-gutter relative py-28 md:py-44">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8 lg:col-span-9">
          <SectionLabel index={index} label={label} />
          <h2 id="manifesto-title" className="sr-only">
            {label}
          </h2>
          <p data-statement className="display-m mt-10 max-w-[22ch] text-balance md:mt-14 lg:text-[clamp(2.4rem,4.6vw,5.4rem)]">
            <AccentText text={statement} />
          </p>
        </div>

        <figure className="md:col-span-4 md:mt-[36vh] lg:col-span-3">
          <RevealImage className="aspect-[4/5] w-2/3 md:w-full">
            <Frame media={media} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 66vw" revealInner className="h-full" />
          </RevealImage>
          <figcaption className="mt-4 flex items-start justify-between gap-6 text-[0.8125rem] leading-relaxed text-mist">
            <span className="max-w-[28ch]">{note}</span>
            <span className="eyebrow shrink-0 text-steel">FR. 014</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
