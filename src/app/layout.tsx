import type { Metadata, Viewport } from "next";
import { fontDisplay, fontMono, fontSans } from "./fonts";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "M3 FOTO — Muse Moment Makers",
    template: "%s — M3 FOTO",
  },
  description:
    "M3 FOTO is a premium photography studio crafting cinematic wedding, pre-wedding, portrait, fashion and event photography. Every frame has a story.",
  applicationName: "M3 FOTO",
  openGraph: {
    type: "website",
    siteName: "M3 FOTO",
    locale: "en_IN",
    title: "M3 FOTO — Muse Moment Makers",
    description: "Every frame has a story. Cinematic wedding, portrait, fashion and event photography.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint: enables motion-only styles (so nothing flashes before GSAP takes
 * over) and remembers whether the full opening sequence has played this session.
 * Phones skip the logo moment and open directly on the cinemascope reveal (lighter motion, faster LCP).
 */
const bootScript = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion')}if(sessionStorage.getItem('m3-intro')||window.innerWidth<768){d.classList.add('intro-seen')}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="bg-graphite text-paper">{children}</body>
    </html>
  );
}
