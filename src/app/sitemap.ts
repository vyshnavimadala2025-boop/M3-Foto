import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/** Only live pages are listed. Milestone 2 adds portfolio, services and packages. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${env.siteUrl}/`, changeFrequency: "weekly", priority: 1 }];
}
