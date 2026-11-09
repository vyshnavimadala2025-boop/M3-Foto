/** Public, non-secret configuration. Secrets never live in NEXT_PUBLIC_* variables. */
export const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  showPlaceholderBadges: process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_BADGES !== "false",
  isProduction: process.env.NODE_ENV === "production",
} as const;
