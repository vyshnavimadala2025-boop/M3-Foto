import type { MediaAsset } from "@/lib/schemas/content";
import { Frame } from "@/components/media/Frame";
import { RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";

/** Honest holding page for routes scheduled in later milestones. */
export function InProduction({ index, title, note, media }: { index: string; title: string; note: string; media: MediaAsset }) {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Frame media={media} sizes="100vw" quality={60} className="h-full w-full opacity-45" preload badge="br" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/45" />
      <div className="px-gutter relative z-10 w-full pb-16 pt-40">
        <SectionLabel index={index} label="In production" />
        <RevealText as="h1" immediate className="display-xl mt-8 uppercase">
          {title}
        </RevealText>
        <div className="mt-10 flex flex-col gap-8 border-t border-paper/20 pt-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-paper/75">{note}</p>
          <ArrowLink href="/">Return to the homepage</ArrowLink>
        </div>
      </div>
    </section>
  );
}
