import type { Metadata } from "next";
import { getMedia } from "@/lib/data/content";
import { InProduction } from "@/components/layout/InProduction";

export const metadata: Metadata = { title: "Services", robots: { index: false } };

export default function Page() {
  return <InProduction index="03" title="Services" media={getMedia("svc-weddings")} note="Dedicated service pages arrive in Milestone 2." />;
}
