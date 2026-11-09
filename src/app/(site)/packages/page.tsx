import type { Metadata } from "next";
import { getMedia } from "@/lib/data/content";
import { InProduction } from "@/components/layout/InProduction";

export const metadata: Metadata = { title: "Packages", robots: { index: false } };

export default function Page() {
  return <InProduction index="04" title="Packages" media={getMedia("proj-bench")} note="Package presentation and comparison arrive in Milestone 2. Prices appear only once configured by the studio." />;
}
