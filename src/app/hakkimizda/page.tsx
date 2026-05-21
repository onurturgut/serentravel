import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";
import { AboutPage } from "../_components/AboutPage";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "SEREN Travel'ın Fethiye merkezli tur organizasyonu yaklaşımı ve misafir deneyimi.",
};

export default async function Page() {
  const content = await getSiteContent();

  return <AboutPage content={content.about} />;
}
