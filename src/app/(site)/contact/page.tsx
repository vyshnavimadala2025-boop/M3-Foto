import type { Metadata } from "next";
import { getMedia } from "@/lib/data/content";
import { InProduction } from "@/components/layout/InProduction";

export const metadata: Metadata = { title: "Contact", robots: { index: false } };

export default function Page() {
  return <InProduction index="05" title="Contact" media={getMedia("hero-couple-arch")} note="The enquiry and booking experience arrives in Milestone 2, with secure submission in Milestone 5." />;
}
