import "server-only";
import fs from "node:fs";
import path from "node:path";
import { getSiteSettings } from "./content";

export type LogoAsset = { src: string; width: number; height: number };

export type BrandLogo = {
  /** Mark + tagline */
  lockup: LogoAsset | null;
  /** M3 FOTO only */
  mark: LogoAsset | null;
  /** MUSE MOMENT MAKERS only */
  tagline: LogoAsset | null;
  alt: string;
  invert: boolean;
};

function svgSize(file: string): { width: number; height: number } {
  const svg = fs.readFileSync(file, "utf8").slice(0, 4000);
  const vb = svg.match(/viewBox=["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (vb) return { width: Number(vb[1]), height: Number(vb[2]) };
  const w = svg.match(/\bwidth=["']([\d.]+)/i);
  const h = svg.match(/\bheight=["']([\d.]+)/i);
  return { width: Number(w?.[1] ?? 400), height: Number(h?.[1] ?? 120) };
}

function rasterSize(file: string): { width: number; height: number } {
  const buf = fs.readFileSync(file);
  if (buf.subarray(1, 4).toString() === "PNG") return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf.subarray(8, 12).toString() === "WEBP" && buf.subarray(12, 16).toString() === "VP8X") {
    return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  }
  return { width: 400, height: 120 };
}

function resolve(candidates: string[]): LogoAsset | null {
  for (const candidate of candidates) {
    const file = path.join(process.cwd(), "public", candidate);
    if (!fs.existsSync(file)) continue;
    return { src: candidate, ...(candidate.endsWith(".svg") ? svgSize(file) : rasterSize(file)) };
  }
  return null;
}

/** Resolves the client's original logo files from /public/brand. Never redrawn or substituted. */
export async function getBrandLogo(): Promise<BrandLogo> {
  const { logo } = await getSiteSettings();
  return {
    lockup: resolve(logo.lockup),
    mark: resolve(logo.mark),
    tagline: resolve(logo.tagline),
    alt: logo.alt,
    invert: logo.invertOnDark,
  };
}
