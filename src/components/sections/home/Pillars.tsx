import type { MediaAsset } from "@/lib/schemas/content";
import { Frame } from "@/components/media/Frame";
import { Parallax } from "@/components/motion/Parallax";
import { RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pad } from "@/lib/utils";

type Props = { index: string; label: string; media: MediaAsset; items: { word: string; text: string }[] };

/** The tagline, unpacked: Muse · Moment · Makers as the studio's three beliefs. */
export function Pillars({ index, label, media, items }: Props) {
  return (
    <section aria-labelledby="pillars-title" className="px-gutter relative py-28 md:py-40">
      <h2 id="pillars-title" className="sr-only">
        {label}
      </h2>
      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
            <SectionLabel index={index} label={label} />
            <Parallax amount={16} className="mt-10 aspect-[4/5] w-full">
              <Frame media={media} sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full" />
            </Parallax>
            <p className="eyebrow mt-4 flex justify-between text-steel">
              <span>Behind the frame</span>
              <span>FR. 027</span>
            </p>
          </div>
        </div>

        <ol className="flex flex-col md:col-span-6 md:col-start-7 md:pt-[18vh]">
          {items.map((item, i) => (
            <li key={item.word} className="border-t border-line py-10 first:border-t-0 first:pt-0 md:py-16">
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[0.6875rem] text-steel">{pad(i + 1)}</span>
                <RevealText as="p" className="display-l leading-[0.95]">
                  {i === 1 ? <em className="italic">{item.word}</em> : item.word}
                  <span className="text-steel">.</span>
                </RevealText>
              </div>
              <p className="mt-6 max-w-[40ch] pl-9 text-pretty text-[1rem] leading-relaxed text-mist md:text-[1.0625rem]">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
