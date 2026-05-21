import type { Metadata } from "next";
import { getSiteContent, getSiteSettings } from "@/lib/site-content";
import { ContactPage } from "../_components/ContactPage";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "SEREN Travel ile telefon, Instagram veya iletişim formu üzerinden bağlantı kurun.",
};

export default async function Page() {
  const [content, settings] = await Promise.all([
    getSiteContent(),
    getSiteSettings(),
  ]);

  return <ContactPage content={content.contact} settings={settings} />;
}
