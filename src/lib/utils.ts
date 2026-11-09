import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Zero-padded index, e.g. 3 → "03". */
export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}

export type AccentPart = { text: string; accent: boolean };

/** Parses `*word*` into accent segments for the italic display voice. */
export function parseAccent(input: string): AccentPart[] {
  const parts: AccentPart[] = [];
  const re = /\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) {
    if (m.index > last) parts.push({ text: input.slice(last, m.index), accent: false });
    parts.push({ text: m[1] ?? "", accent: true });
    last = m.index + m[0].length;
  }
  if (last < input.length) parts.push({ text: input.slice(last), accent: false });
  return parts;
}

export function stripAccent(input: string) {
  return input.replace(/\*/g, "");
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}
