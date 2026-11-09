import type { Cta, MediaAsset } from "@/lib/schemas/content";
import { Frame } from "@/components/media/Frame";
import { Parallax } from "@/components/motion/Parallax";
import { RevealText } from "@/components/motion/RevealText";
import { Magnetic } from "@/components/motion/Magnetic";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccentText } from "@/components/ui/AccentText";

type Props = { index: string; label: string; headline: string[]; supporting: string; button: Cta; media: MediaAsset };

/** The invitation. A darkened frame, one sentence, one magnetic action. */
export function InquiryCta({ index, label, headline, supporting, button, media }: Props) {
  return (
    <section aria-labelledby="cta-title" className="relative flex min-h-svh items-center overflow-hidden bg-ink">
      <Parallax amount={20} className="absolute! inset-0">
        <Frame media={media} sizes="100vw" quality={60} className="h-full w-full opacity-40" badge="br" />
      </Parallax>
      <div aria-hidden className="absolute inset-0 bg-ink/40" />

      <div className="px-gutter relative z-10 w-full py-32">
        <SectionLabel index={index} label={label} />
        <RevealText as="h2" id="cta-title" className="display-xl mt-8 uppercase">
          {headline.map((l, i) => (
            <span key={i} className="block">
              <AccentText text={l} />
            </span>
          ))}
        </RevealText>
        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[36ch] text-pretty text-[1.0625rem] leading-relaxed text-paper/80">{supporting}</p>
          <Magnetic strength={0.4}>
            <TransitionLink
              href={button.href}
              data-cursor="begin"
              className="group relative grid size-40 place-items-center overflow-hidden rounded-full border border-paper/50 text-center md:size-48"
            >
              <span aria-hidden className="absolute inset-0 scale-0 rounded-full bg-paper transition-transform duration-700 ease-(--ease-expo) group-hover:scale-100" />
              <span className="relative px-6 text-[0.8125rem] font-medium uppercase leading-snug tracking-[0.14em] transition-colors duration-500 group-hover:text-ink">
                {button.label}
              </span>
            </TransitionLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
