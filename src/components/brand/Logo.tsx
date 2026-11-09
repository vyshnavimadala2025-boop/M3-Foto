import Image from "next/image";
import type { BrandLogo, LogoAsset } from "@/lib/data/brand";
import { cn } from "@/lib/utils";

type Props = {
  logo: BrandLogo;
  /** lockup = mark + tagline · mark = M3 FOTO · tagline = MUSE MOMENT MAKERS */
  variant?: "lockup" | "mark" | "tagline";
  /** Sets the height; width always follows the artwork's own proportions */
  className?: string;
  preload?: boolean;
  /** Decorative when the brand name is already announced nearby */
  decorative?: boolean;
  /** Largest rendered height in CSS px — drives the responsive 1x/2x source set */
  size?: number;
};

/**
 * Renders the client's ORIGINAL logo artwork at its native proportions. It is never redrawn,
 * recoloured or re-proportioned. If a file is missing, a dashed, clearly temporary slot is shown.
 */
export function Logo({ logo, variant = "lockup", className, preload, decorative, size = 40 }: Props) {
  const asset: LogoAsset | null = logo[variant] ?? (variant === "mark" ? logo.lockup : null);
  const alt = decorative ? "" : variant === "tagline" ? "Muse Moment Makers" : logo.alt;

  if (!asset) {
    return (
      <span
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : alt}
        aria-hidden={decorative || undefined}
        title="Logo slot — place the original logo file in /public/brand"
        className={cn(
          "inline-flex h-8 items-center justify-center whitespace-nowrap border border-dashed border-paper/45 px-3 text-[0.625rem] uppercase tracking-[0.2em] text-paper/80",
          className,
        )}
      >
        M3 FOTO
      </span>
    );
  }

  const svg = asset.src.endsWith(".svg");
  const h = Math.min(size, asset.height);
  const w = Math.round((asset.width / asset.height) * h);
  return (
    <Image
      src={asset.src}
      alt={alt}
      width={w}
      height={h}
      quality={85}
      preload={preload}
      unoptimized={svg}
      draggable={false}
      className={cn("h-8 w-auto select-none", logo.invert && "invert", className)}
    />
  );
}
