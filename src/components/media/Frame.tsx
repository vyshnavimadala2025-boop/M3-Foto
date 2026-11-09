import Image from "next/image";
import type { MediaAsset } from "@/lib/schemas/content";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { cn } from "@/lib/utils";

type Props = {
  media: MediaAsset;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Hero / LCP images only */
  preload?: boolean;
  quality?: 60 | 75 | 85;
  badge?: "tl" | "tr" | "bl" | "br" | false;
  /** Wrap the image in an inner element used by reveal/parallax animations */
  revealInner?: boolean;
  alt?: string;
};

const BADGE_POS = {
  tl: "absolute left-3 top-3",
  tr: "absolute right-3 top-3",
  bl: "absolute bottom-3 left-3",
  br: "absolute bottom-3 right-3",
} as const;

/**
 * The single image primitive. Always fills its parent (the parent owns the aspect ratio,
 * so layout never shifts), serves AVIF/WebP at responsive sizes, and blurs up from a
 * 16px preview embedded in the HTML.
 */
export function Frame({ media, sizes, className, imgClassName, preload, quality = 75, badge = "tr", revealInner = false, alt }: Props) {
  const img = (
    <Image
      src={media.src}
      alt={alt ?? media.alt}
      fill
      sizes={sizes}
      quality={quality}
      placeholder="blur"
      blurDataURL={media.blurDataURL}
      preload={preload}
      fetchPriority={preload ? "high" : undefined}
      className={cn("object-cover", imgClassName)}
      style={{ objectPosition: media.focal }}
    />
  );
  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      {revealInner ? (
        <div data-reveal-inner className="absolute inset-0 will-change-transform">
          {img}
        </div>
      ) : (
        img
      )}
      {media.placeholder && badge ? <PlaceholderBadge className={BADGE_POS[badge]} /> : null}
    </div>
  );
}
