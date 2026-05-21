import type { Metadata } from "next";
import { getFeaturedTours } from "@/lib/content";
import { getSiteContent, getSiteSettings } from "@/lib/site-content";
import { HomePage } from "./_components/HomePage";

export const metadata: Metadata = {
  title: "Seren Travel · Fethiye Tur ve Aktivite Ajansı",
  description:
    "SEREN Travel ile Fethiye, Ölüdeniz, Saklıkent, Dalyan, Pamukkale ve Rodos turlarını keşfedin.",
};

export default async function Page() {
  const [featuredTours, content, settings] = await Promise.all([
    getFeaturedTours(8),
    getSiteContent(),
    getSiteSettings(),
  ]);

  return (
    <HomePage
      featuredTours={featuredTours}
      content={content.home}
      settings={settings}
    />
  );
}
