import type { SiteSettings } from "@/lib/schemas/content";
import { env } from "@/lib/env";

/** Organisation structured data built only from configured values — nothing invented. */
export function JsonLd({ settings }: { settings: SiteSettings }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.name,
    slogan: settings.tagline,
    description: settings.description,
    url: env.siteUrl,
    logo: `${env.siteUrl}/brand/logo.png`,
    image: `${env.siteUrl}/opengraph-image`,
    knowsAbout: ["Wedding photography", "Pre-wedding photography", "Portrait photography", "Fashion photography", "Event photography"],
  };
  const sameAs = settings.social.map((s) => s.url).filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  if (settings.contact.email) data.email = settings.contact.email;
  if (settings.contact.phone) data.telephone = settings.contact.phone;
  if (settings.contact.location) data.areaServed = settings.contact.location;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
