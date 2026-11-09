import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";

/**
 * Typography system. To switch to licensed faces later (e.g. Canela / Neue Montreal),
 * replace these with next/font/local definitions that keep the same CSS variables.
 */
export const fontDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const fontSans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jetbrains-mono",
  display: "swap",
});
