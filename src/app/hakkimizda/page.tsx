import type { Metadata } from "next";
import { AboutPage } from "../_components/AboutPage";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "SEREN Travel'ın Fethiye merkezli tur organizasyonu yaklaşımı ve misafir deneyimi.",
};

export default function Page() {
  return <AboutPage />;
}
