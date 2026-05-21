import type { Metadata } from "next";
import { ContactPage } from "../_components/ContactPage";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "SEREN Travel ile telefon, Instagram veya iletişim formu üzerinden bağlantı kurun.",
};

export default function Page() {
  return <ContactPage />;
}
