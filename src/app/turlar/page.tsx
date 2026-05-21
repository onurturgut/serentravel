import type { Metadata } from "next";
import { ToursPage } from "../_components/ToursPage";

export const metadata: Metadata = {
  title: "Turlar",
  description:
    "SEREN Travel'ın Fethiye ve Ölüdeniz çıkışlı tur ve aktivite seçeneklerini keşfedin.",
};

export default function Page() {
  return <ToursPage />;
}
