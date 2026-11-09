import type { MediaAsset } from "@/lib/schemas/content";
import { Frame } from "@/components/media/Frame";
import { RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccentText } from "@/components/ui/AccentText";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { cn } from "@/lib/utils";

type Props = { index: string; label: string; title: string; media: MediaAsset[]; instagram?: { label: string; url: string } };

const FORMATS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[5/4]", "aspect-[3/4]", "aspect-square"];

function Row({ items, reverse, duration, height }: { items: MediaAsset[]; reverse?: boolean; duration: number; height: string }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee overflow-hidden">
      <ul
        className="marquee-track flex w-max gap-3 md:gap-5"
        style={{ ["--marquee-duration" as string]: `${duration}s`, ["--marquee-direction" as string]: reverse ? "reverse" : "normal" }}
      >
        {loop.map((m, i) => (
          <li key={`${m.id}-${i}`} aria-hidden={i >= items.length} className={cn("relative shrink-0", height, FORMATS[i % FORMATS.length])}>
            <Frame media={m} sizes="(min-width: 768px) 22vw, 45vw" quality={60} className="h-full w-full" badge={i < items.length ? "bl" : false} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two drifting rows in opposite directions — a living contact sheet. Pauses on hover. */
export function SocialWall({ index, label, title, media, instagram }: Props) {
  const half = Math.ceil(media.length / 2);
  return (
    <section aria-labelledby="social-title" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="px-gutter grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel index={index} label={label} />
          <RevealText as="h2" id="social-title" className="display-l mt-6">
            <AccentText text={title} />
          </RevealText>
        </div>
        <div className="flex items-end md:col-span-4 md:justify-end">
          {instagram?.url ? (
            <ArrowLink href={instagram.url}>{instagram.label}</ArrowLink>
          ) : (
            <p className="eyebrow text-steel">Instagram link pending</p>
          )}
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-3 md:mt-24 md:gap-5">
        <Row items={media.slice(0, half)} duration={70} height="h-[38vh] md:h-[44vh]" />
        <Row items={media.slice(half)} reverse duration={85} height="h-[28vh] md:h-[32vh]" />
      </div>
    </section>
  );
}
