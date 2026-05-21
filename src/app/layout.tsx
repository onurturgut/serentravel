import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Seren Travel · Fethiye Tur ve Aktivite Ajansı",
    template: "%s · Seren Travel",
  },
  description:
    "Seren Travel ile Fethiye ve Ölüdeniz turlarını keşfedin. Yamaç paraşütü, tekne turu, jeep safari, dalış, rafting, Pamukkale, Dalyan ve Rodos.",
  openGraph: {
    title: "Seren Travel · Fethiye Tur ve Aktivite Ajansı",
    description:
      "Fethiye'nin en popüler tur ve aktivite rotaları Seren Travel ile.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
