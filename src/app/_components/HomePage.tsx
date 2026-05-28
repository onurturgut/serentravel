"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  MapPinned,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Parallax } from "@/components/site/Parallax";
import type { HomeContent, SiteSettings } from "@/lib/site-defaults";
import {
  defaultContent,
  defaultSettings,
  whatsappUrl,
} from "@/lib/site-defaults";
import { siteImage } from "@/lib/utils";
import type { Tour } from "@/lib/tours";

const features = [
  {
    icon: MapPinned,
    title: "Yerinden Tavsiye",
    text: "Bolgeyi bilen ekipten rota, hava durumu ve zamanlama icin gercekci oneriler alin.",
  },
  {
    icon: MessageCircle,
    title: "Kolay Rezervasyon",
    text: "WhatsApp uzerinden hizli bilgi, kolay karar ve pratik rezervasyon sureci.",
  },
  {
    icon: ShieldCheck,
    title: "Rahat Katilim",
    text: "Transfer, saat ve program detaylari onceden netlesir; siz sadece gune hazirlanin.",
  },
];

export function HomePage({
  featuredTours,
  content = defaultContent.home,
  settings = defaultSettings,
}: {
  featuredTours: Tour[];
  content?: HomeContent;
  settings?: SiteSettings;
}) {
  const whatsAppHref = whatsappUrl(settings);
  const primaryFeaturedTour = featuredTours[0];
  const previewTours = featuredTours.slice(0, 3);

  return (
    <>
      <section className="relative h-[78svh] min-h-[520px] w-full overflow-hidden bg-navy-deep md:h-[82svh] md:min-h-[600px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src={siteImage("/images/seren-travel.webp")}
          alt="Seren Travel"
          width={1366}
          height={800}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/58 via-navy-deep/20 to-navy-deep/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-navy-deep/25 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 md:px-8 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-brand-red" />
            <span className="text-[10px] uppercase tracking-[0.36em] text-gold md:text-xs">
              {content.heroEyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.4 }}
            className="mt-5 max-w-5xl text-balance font-display text-[40px] leading-[1.02] text-white sm:text-5xl md:text-7xl"
          >
            {content.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.58 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg"
          >
            {content.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.72 }}
            className="mt-8 flex max-w-full flex-wrap items-center gap-3"
          >
            <Link
              href={content.primaryButtonHref}
              className="group inline-flex h-12 w-full items-center justify-between gap-2 rounded-full bg-gold pl-6 pr-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft sm:w-auto md:h-14"
            >
              {content.primaryButtonText}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-deep text-white transition-transform group-hover:translate-x-0.5 md:h-10 md:w-10">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-sea hover:text-sea sm:w-auto md:h-14"
            >
              <MessageCircle className="h-4 w-4 text-sea" />
              {content.secondaryButtonText}
            </a>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-deep py-16 md:py-24">
        <img
          src={siteImage("/images/tours/gun-batimi-tekne-turu.jpg")}
          alt="Seren Travel Fethiye"
          loading="lazy"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/58" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/82 via-navy-deep/54 to-navy-deep/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/86 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              {content.whyEyebrow}
            </span>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-4xl leading-[1.08] text-white md:text-6xl">
              {content.whyTitle}
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">
              {content.whyDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy pl-6 pr-3 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-navy-deep"
              >
                <MessageCircle className="h-4 w-4" />
                {content.whyButtonText}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-0.5 group-hover:bg-navy-deep group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/72 shadow-sm backdrop-blur-md">
                Yerel ekip
              </span>
              <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/72 shadow-sm backdrop-blur-md">
                Guncel uygunluk
              </span>
              <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/72 shadow-sm backdrop-blur-md">
                Transfer destegi
              </span>
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group grid gap-5 rounded-lg border border-foreground/10 bg-card p-6 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-md lg:grid-cols-[auto_1fr] lg:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {primaryFeaturedTour && (
        <section className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24">
          <img
            src={primaryFeaturedTour.image}
            alt={primaryFeaturedTour.title}
            loading="lazy"
            width={1600}
            height={900}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/78 to-navy-deep/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/35" />

          <div className="relative z-10 mx-auto max-w-[92rem] px-5 md:px-8">
            <div className="flex min-h-[720px] flex-col justify-between gap-12 py-6 md:py-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-gold">
                  {content.featuredEyebrow}
                </span>
                <h2 className="mt-5 max-w-3xl text-balance font-display text-5xl leading-[1.02] md:text-7xl">
                  {content.featuredTitle}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  Fethiye'de en cok tercih edilen deneyimleri tek bakista
                  inceleyin; rota, sure ve rezervasyon detaylarina hizlica
                  ulasin.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/tur/${primaryFeaturedTour.slug}`}
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-gold pl-6 pr-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
                  >
                    {primaryFeaturedTour.title}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                  <Link
                    href={content.primaryButtonHref}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-gold hover:text-gold"
                  >
                    {content.featuredLinkText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              <div className="-mx-5 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
                <div className="grid min-w-[1110px] grid-cols-3 gap-6 md:min-w-0 md:gap-7">
                  {previewTours.map((tour, index) => (
                    <motion.div
                      key={tour.slug}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.55, delay: index * 0.08 }}
                    >
                      <Link
                        href={`/tur/${tour.slug}`}
                        className="group relative flex aspect-[16/10] min-h-[340px] w-full overflow-hidden rounded-lg border border-white/14 bg-white/10 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 lg:min-h-[390px]"
                      >
                        <img
                          src={tour.image}
                          alt={tour.title}
                          loading="lazy"
                          width={360}
                          height={260}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/52 to-navy-deep/8" />
                        <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-end p-5 md:p-6">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                            {tour.category}
                          </span>
                          <h3 className="mt-3 line-clamp-2 font-display text-3xl leading-tight text-white md:text-4xl">
                            {tour.title}
                          </h3>
                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/70">
                            {tour.short}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/78 transition-colors group-hover:text-gold">
                            Detaylari incele
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Parallax />

      <section className="relative overflow-hidden bg-navy-deep py-16 md:py-24">
        <img
          src={siteImage("/images/tours/fethiye-12-adalar-tekne-turu-3.jpg")}
          alt="Seren Travel galeri"
          loading="lazy"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/68" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 rounded-lg bg-navy-deep p-8 text-white shadow-xl md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                {content.ctaEyebrow}
              </span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] md:text-5xl">
                {content.ctaTitle}
              </h2>
              <p className="mt-4 max-w-xl text-white/65">
                {content.ctaDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
              >
                <MessageCircle className="h-4 w-4" />
                {content.ctaPrimaryText}
              </a>
              <Link
                href="/iletisim"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold transition-colors hover:bg-white hover:text-navy-deep"
              >
                {content.ctaSecondaryText}
                <Compass className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
