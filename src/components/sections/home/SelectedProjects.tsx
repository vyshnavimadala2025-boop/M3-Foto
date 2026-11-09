import type { ProjectCard } from "@/lib/data/content";
import type { Cta } from "@/lib/schemas/content";
import { Frame } from "@/components/media/Frame";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccentText } from "@/components/ui/AccentText";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { cn, pad } from "@/lib/utils";

type Props = { index: string; label: string; title: string; cta: Cta; items: ProjectCard[] };

/**
 * Four-frame editorial spread. Each slot has its own format and position so the page reads
 * like a printed layout, not a grid: wide → offset portrait pair → full-bleed cinema.
 */
const SLOTS = [
  { wrap: "md:col-span-12 lg:col-span-8", frame: "aspect-[3/2]", caption: "lg:col-span-3 lg:col-start-10 lg:self-end", sizes: "(min-width: 768px) 66vw, 100vw", from: "bottom" as const },
  { wrap: "md:col-span-6 lg:col-span-5 lg:col-start-2", frame: "aspect-[4/5]", caption: "", sizes: "(min-width: 768px) 42vw, 100vw", from: "bottom" as const },
  { wrap: "md:col-span-5 md:col-start-8 md:mt-[24vh] lg:col-span-4 lg:mt-[34vh]", frame: "aspect-[3/4]", caption: "", sizes: "(min-width: 768px) 34vw, 100vw", from: "top" as const },
  { wrap: "md:col-span-12 md:-mx-gutter", frame: "aspect-[4/5] md:aspect-[2.39/1]", caption: "", sizes: "100vw", from: "left" as const },
];

export function SelectedProjects({ index, label, title, cta, items }: Props) {
  return (
    <section aria-labelledby="projects-title" className="px-gutter relative py-28 md:py-40">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <SectionLabel index={index} label={label} />
          <RevealText as="h2" id="projects-title" className="display-l mt-6">
            <AccentText text={title} />
          </RevealText>
        </div>
      </div>

      <ul className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-12 md:gap-y-32">
        {items.slice(0, 4).map((p, i) => {
          const slot = SLOTS[i] ?? SLOTS[0]!;
          const caption = (
            <div className={cn("flex items-start justify-between gap-6", i === 3 && "md:px-gutter")}>
              <div>
                <p className="eyebrow text-steel">
                  P—{pad(i + 1)} · {p.category}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.9rem,3vw,3rem)] leading-none">{p.title}</h3>
                <p className="mt-3 max-w-[36ch] text-[0.875rem] leading-relaxed text-mist">{p.summary}</p>
              </div>
              {p.placeholder ? <span className="eyebrow shrink-0 text-steel">Sample</span> : null}
            </div>
          );
          return (
            <li key={p.id} className={cn("contents")}>
              <TransitionLink href={`/portfolio/${p.slug}`} data-cursor="view" className={cn("group block", slot.wrap)}>
                <RevealImage from={slot.from} className={cn("relative", slot.frame)}>
                  <Frame
                    media={p.cover}
                    sizes={slot.sizes}
                    revealInner
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.8s] ease-(--ease-expo) group-hover:scale-[1.035]"
                  />
                </RevealImage>
                {i === 0 ? <div className="mt-5 lg:hidden">{caption}</div> : <div className="mt-5">{caption}</div>}
              </TransitionLink>
              {i === 0 ? <div className={cn("hidden lg:block", slot.caption)}>{caption}</div> : null}
            </li>
          );
        })}
      </ul>

      <div className="mt-20 flex justify-center md:mt-28">
        <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
      </div>
    </section>
  );
}
