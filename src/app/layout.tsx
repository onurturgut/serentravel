import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PwaRegister } from "@/components/site/PwaRegister";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { getSiteSettings } from "@/lib/site-content";

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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Seren Travel",
  },
  icons: {
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#071a3d",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="tr">
      <body>
        <ScrollToTop />
        <PwaRegister />
        <Header settings={settings} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
