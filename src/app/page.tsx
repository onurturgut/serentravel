import type { Metadata } from "next";
import { HomePage } from "./_components/HomePage";

export const metadata: Metadata = {
  title: "Seren Travel · Fethiye Tur ve Aktivite Ajansı",
  description:
    "SEREN Travel ile Fethiye, Ölüdeniz, Saklıkent, Dalyan, Pamukkale ve Rodos turlarını keşfedin.",
};

export default function Page() {
  return <HomePage />;
}
