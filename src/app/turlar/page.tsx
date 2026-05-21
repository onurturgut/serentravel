import type { Metadata } from "next";
import { getTours } from "@/lib/content";
import { getSiteContent, getSiteSettings } from "@/lib/site-content";
import { ToursPage } from "../_components/ToursPage";

export const metadata: Metadata = {
  title: "Turlar",
  description:
    "SEREN Travel'ın Fethiye ve Ölüdeniz çıkışlı tur ve aktivite seçeneklerini keşfedin.",
};

export default async function Page() {
  const [tours, content, settings] = await Promise.all([
    getTours(),
    getSiteContent(),
    getSiteSettings(),
  ]);

  return (
    <ToursPage tours={tours} content={content.tours} settings={settings} />
  );
}
