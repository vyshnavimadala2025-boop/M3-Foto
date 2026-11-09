import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getHomeContent, getMedia } from "@/lib/data/content";

export const alt = "M3 FOTO — Muse Moment Makers. Every frame has a story.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Open Graph card: the lead hero photograph with the headline set over a black base. */
export default async function OpengraphImage() {
  const home = await getHomeContent();
  const media = getMedia(home.hero.slides[0]!.mediaId);
  const file = await fs.readFile(path.join(process.cwd(), "public", media.src));
  const jpg = await sharp(file).resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 78 }).toBuffer();
  const src = `data:image/jpeg;base64,${jpg.toString("base64")}`;
  const logoFile = await fs.readFile(path.join(process.cwd(), "public/brand/logo.png")).catch(() => null);
  const logoPng = logoFile ? await sharp(logoFile).resize({ height: 150 }).png().toBuffer({ resolveWithObject: true }) : null;
  const logo = logoPng ? { src: `data:image/png;base64,${logoPng.data.toString("base64")}`, width: logoPng.info.width } : null;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#000" }}>
        <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, opacity: 0.5, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 64,
            color: "#fff",
          }}
        >
          {logo ? (
            <img src={logo.src} alt="" width={logo.width} height={150} style={{ width: logo.width, height: 150 }} />
          ) : (
            <div style={{ fontSize: 22, letterSpacing: 6, opacity: 0.8 }}>M3 FOTO — MUSE MOMENT MAKERS</div>
          )}
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1, marginTop: 36, letterSpacing: -1 }}>
            <span>EVERY FRAME</span>
            <span>HAS A STORY.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
