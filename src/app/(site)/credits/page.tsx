import type { Metadata } from "next";
import { getAllMedia } from "@/lib/data/content";
import { Frame } from "@/components/media/Frame";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Image credits",
  description: "Credits and licences for placeholder photography used during the design of the M3 FOTO website.",
  robots: { index: false },
};

export default async function CreditsPage() {
  const media = (await getAllMedia()).filter((m) => m.credit);
  return (
    <div className="px-gutter pb-32 pt-[calc(var(--header-h)+6rem)]">
      <SectionLabel index="©" label="Image credits" />
      <h1 className="display-l mt-6 max-w-[16ch]">
        Placeholder <em>photography</em>
      </h1>
      <p className="mt-8 max-w-[60ch] text-[0.9375rem] leading-relaxed text-mist">
        While M3 FOTO&apos;s own work is being prepared, this site uses openly licensed photographs as clearly marked
        placeholders. They are credited below as their licences require and will be replaced by the studio&apos;s photography.
      </p>
      <ul className="mt-16 divide-y divide-line border-y border-line">
        {media.map((m) => (
          <li key={m.id} className="grid grid-cols-[4rem_1fr] items-center gap-5 py-4 md:grid-cols-[5rem_1.2fr_1fr_1fr] md:gap-8">
            <div className="relative aspect-square overflow-hidden">
              <Frame media={m} sizes="80px" quality={60} className="h-full w-full" badge={false} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[0.875rem]">{m.credit?.title ?? m.alt}</p>
              <p className="eyebrow mt-1 text-steel">ph-{m.id}</p>
            </div>
            <p className="col-start-2 text-[0.8125rem] text-mist md:col-start-auto">Photo: {m.credit?.author}</p>
            <p className="col-start-2 flex flex-wrap gap-x-4 text-[0.8125rem] md:col-start-auto">
              {m.credit?.licenseUrl ? (
                <a href={m.credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="link-underline pb-0.5">
                  {m.credit.license}
                </a>
              ) : (
                <span>{m.credit?.license}</span>
              )}
              {m.credit?.sourceUrl ? (
                <a href={m.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-underline pb-0.5 text-mist">
                  Source
                </a>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-[60ch] text-[0.8125rem] leading-relaxed text-steel">
        Images under CC BY-SA have been resized and compressed for the web; no other changes were made.
      </p>
    </div>
  );
}
