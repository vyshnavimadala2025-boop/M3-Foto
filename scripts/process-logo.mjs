/**
 * Extracts the ORIGINAL M3 FOTO logo artwork (white on black) from the client-supplied image
 * into transparent PNGs. Nothing is redrawn: pixel luminance becomes alpha, colour becomes white.
 *
 * Source: public/brand/source/m3-foto-logo-original.jpg (client screenshot, 1179×726)
 * Output: public/brand/logo.png        full lockup (mark + tagline)
 *         public/brand/logo-mark.png   mark only (M3 FOTO) — header, favicon
 *         public/brand/logo-tagline.png tagline only — used for the staged intro reveal
 *         src/app/icon.png, src/app/apple-icon.png
 *
 * Replace the source with a vector (SVG/AI/PDF) export when available; logo.svg takes priority.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public/brand/source/m3-foto-logo-original.jpg");
const SCALE = 3;

// Regions measured from the source (artwork bbox 358,260 → 820,489; gap between mark and tagline 439–457).
const regions = {
  "logo.png": { left: 344, top: 248, width: 490, height: 254 },
  "logo-mark.png": { left: 344, top: 248, width: 490, height: 200 },
  "logo-tagline.png": { left: 344, top: 448, width: 490, height: 54 },
};

async function extract(region) {
  const grey = await sharp(src)
    .extract(region)
    .greyscale()
    .resize({ width: region.width * SCALE, kernel: "lanczos3" })
    // Levels: crush JPEG noise in the black, keep hairlines crisp.
    .linear(255 / (232 - 22), (-22 * 255) / (232 - 22))
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = grey.info;
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = 255;
    rgba[i * 4 + 1] = 255;
    rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = grey.data[i];
  }
  return sharp(rgba, { raw: { width, height, channels: 4 } }).trim({ threshold: 1 }).png({ compressionLevel: 9 });
}

for (const [name, region] of Object.entries(regions)) {
  const img = await extract(region);
  const info = await img.toFile(path.join(root, "public/brand", name));
  console.log(`✓ ${name} ${info.width}×${info.height}`);
}

// App icons: the original mark centred on black, echoing the circular badge the brand uses.
const mark = await sharp(path.join(root, "public/brand/logo-mark.png")).toBuffer();
for (const [file, size] of [["src/app/icon.png", 512], ["src/app/apple-icon.png", 180]]) {
  const inner = await sharp(mark).resize({ width: Math.round(size * 0.8), fit: "inside" }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#000000" } })
    .composite([{ input: inner, gravity: "center" }])
    .png()
    .toFile(path.join(root, file));
  console.log(`✓ ${file}`);
}
