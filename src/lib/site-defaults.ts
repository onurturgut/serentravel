export type LinkItem = {
  label: string;
  href: string;
};

export type ValueCard = {
  title: string;
  text: string;
};

export type SiteSettings = {
  brandInitials: string;
  brandTop: string;
  brandBottom: string;
  whatsappNumber: string;
  whatsappMessage: string;
  instagramUrl: string;
  instagramLabel: string;
  location: string;
  footerDescription: string;
  footerBottomText: string;
  navLinks: LinkItem[];
};

export type HomeContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  whyEyebrow: string;
  whyTitle: string;
  whyDescription: string;
  whyButtonText: string;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredLinkText: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
};

export type ToursContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  whatsappButtonText: string;
};

export type AboutContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  valuesEyebrow: string;
  valuesTitle: string;
  values: ValueCard[];
};

export type ContactContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  whatsappCardTitle: string;
  whatsappCardDescription: string;
  whatsappButtonText: string;
  instagramTitle: string;
  locationTitle: string;
  mapQuery: string;
};

export type SiteContent = {
  home: HomeContent;
  tours: ToursContent;
  about: AboutContent;
  contact: ContactContent;
};

export const defaultSettings: SiteSettings = {
  brandInitials: "ST",
  brandTop: "SEREN",
  brandBottom: "TRAVEL",
  whatsappNumber: "905431999411",
  whatsappMessage:
    "Merhaba, Seren Travel turlari hakkinda bilgi almak istiyorum.",
  instagramUrl: "https://www.instagram.com/serentravelagency/",
  instagramLabel: "@serentravelagency",
  location: "Fethiye / Mugla, Turkiye",
  footerDescription:
    "Fethiye merkezli tur ve aktivite organizasyonu. Oludeniz, Babadag, Saklikent, Dalyan, Pamukkale ve Rodos rotalarinda profesyonel hizmet.",
  footerBottomText: "Fethiye · Mugla · Turkiye",
  navLinks: [
    { href: "/", label: "Anasayfa" },
    { href: "/hakkimizda", label: "Hakkimizda" },
    { href: "/turlar", label: "Turlar" },
    { href: "/transfer", label: "Transfer" },
    { href: "/galeri", label: "Galeri" },
    { href: "/iletisim", label: "Iletisim" },
  ],
};

export const defaultContent: SiteContent = {
  home: {
    heroEyebrow: "Fethiye · Oludeniz · Babadag",
    heroTitle: "Fethiye ve Oludeniz'de secilmis tur deneyimleri.",
    heroDescription:
      "Yamac parasutu, tekne turlari, safari ve ozel rotalar icin yerel ekipten hizli WhatsApp destegi alin.",
    primaryButtonText: "Turlari Incele",
    primaryButtonHref: "/turlar",
    secondaryButtonText: "WhatsApp ile Bilgi Al",
    whyEyebrow: "Neden Seren Travel?",
    whyTitle: "Fethiye'yi bilen birine sorun.",
    whyDescription:
      "Hangi tur hangi gun daha iyi, nereden alinacaksiniz, cocukla uygun mu, hava nasil etkiler? Seren Travel ekibi size sade ve net bilgi verir.",
    whyButtonText: "WhatsApp'tan Bilgi Al",
    featuredEyebrow: "One Cikan Deneyimler",
    featuredTitle: "Fethiye tatilini netlestiren turlar.",
    featuredLinkText: "Tum turlari gor",
    ctaEyebrow: "WhatsApp Destek",
    ctaTitle: "Uygunluk ve fiyat bilgisi icin dogrudan yazin.",
    ctaDescription:
      "Gunluk programlar, hava kosullari ve sezon yogunluguna gore degisebilir. Seren Travel ekibi size en uygun secenegi WhatsApp uzerinden hizlica iletir.",
    ctaPrimaryText: "WhatsApp",
    ctaSecondaryText: "Iletisim",
  },
  tours: {
    heroEyebrow: "Tum Turlar",
    heroTitle: "Fethiye ve Oludeniz tur secenekleri.",
    heroDescription:
      "Yamac parasutu, tekne, safari, dalis, kultur ve ozel tur deneyimlerini inceleyin; detaylar icin WhatsApp'tan yazin.",
    whatsappButtonText: "WhatsApp",
  },
  about: {
    heroEyebrow: "Hakkimizda",
    heroTitle:
      "Fethiye'nin en sevilen deneyimlerini profesyonelce planliyoruz.",
    heroDescription:
      "SEREN Travel, Fethiye ve Oludeniz merkezli tur ve aktivite organizasyonlarinda misafire guven veren, anlasilir ve hizli bir WhatsApp odakli bilgi alma deneyimi sunar.",
    valuesEyebrow: "Degerlerimiz",
    valuesTitle: "Net bilgi, guclu operasyon, iyi misafir deneyimi.",
    values: [
      {
        title: "Yerel uzmanlik",
        text: "Fethiye, Oludeniz ve cevre rotalarda dogru zamanlama ve pratik saha bilgisi.",
      },
      {
        title: "Misafir odagi",
        text: "Aileler, ciftler, gruplar ve bireysel misafirler icin net, anlasilir planlama.",
      },
      {
        title: "Temiz sunum",
        text: "Tur icerigi, dahil olan hizmetler ve rota bilgileri satisa hazir sekilde sunulur.",
      },
      {
        title: "Guven",
        text: "Profesyonel ekipler, guvenlik prosedurleri ve hizli iletisim sureci.",
      },
    ],
  },
  contact: {
    heroEyebrow: "Iletisim",
    heroTitle: "Tur detaylari icin WhatsApp'tan yazin.",
    heroDescription:
      "Seren Travel ekibi uygunluk, fiyat, seans ve transfer bilgilerini size dogrudan WhatsApp uzerinden iletir.",
    whatsappCardTitle: "WhatsApp ile hizli bilgi alin.",
    whatsappCardDescription:
      "Form doldurmadan, beklemeden, dogrudan ekip ile konusun.",
    whatsappButtonText: "WhatsApp'tan Yaz",
    instagramTitle: "Instagram",
    locationTitle: "Lokasyon",
    mapQuery: "Fethiye Mugla",
  },
};

export function whatsappUrl(settings: SiteSettings) {
  return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    settings.whatsappMessage,
  )}`;
}
