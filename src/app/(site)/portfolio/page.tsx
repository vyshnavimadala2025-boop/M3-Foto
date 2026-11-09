import type { Metadata } from "next";
import { getMedia } from "@/lib/data/content";
import { InProduction } from "@/components/layout/InProduction";

export const metadata: Metadata = { title: "Work", robots: { index: false } };

export default function Page() {
  return <InProduction index="01" title="Work" media={getMedia("col-weddings")} note="The full portfolio, with a distinct composition for every category, is being crafted in Milestone 2." />;
}
