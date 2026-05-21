"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Languages,
  MapPinned,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { TourCard } from "@/components/site/TourCard";
import { Parallax } from "@/components/site/Parallax";
import { tours } from "@/lib/tours";

const whatsappUrl =
  "https://wa.me/905431999411?text=Merhaba%2C%20Seren%20Travel%20turlari%20hakkinda%20bilgi%20almak%20istiyorum.";

const features = [
  {
    icon: ShieldCheck,
    title: "Guvenli Tur Deneyimi",
    text: "Profesyonel ekipler, sigortali programlar ve aktiviteye uygun guvenlik prosedurleriyle planlama yapilir.",
  },
  {
    icon: MapPinned,
    title: "Bolgeyi Bilen Yerel Ekip",
    text: "Oludeniz, Fethiye, Saklikent, Dalyan ve cevre rotalarda dogru zamanlama ve pratik oneriler sunulur.",
  },
  {
    icon: Languages,
    title: "WhatsApp ile Hizli Bilgi",
    text: "Uygunluk, fiyat, transfer ve program detaylarini form doldurmadan dogrudan ogrenebilirsiniz.",
  },
];

export function HomePage() {
  const featuredTours = tours.slice(0, 8);

  return (
    <>
      <section className="relative h-[78svh] min-h-[520px] w-full overflow-hidden bg-navy-deep md:h-[82svh] md:min-h-[600px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src="/images/seren-travel.webp"
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
              Fethiye · Oludeniz · Babadag
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.4 }}
            className="mt-5 max-w-5xl text-balance font-display text-[40px] leading-[1.02] text-white sm:text-5xl md:text-7xl"
          >
            Fethiye ve Oludeniz'de secilmis tur deneyimleri.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.58 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg"
          >
            Yamac parasutu, tekne turlari, safari ve ozel rotalar icin yerel
            ekipten hizli WhatsApp destegi alin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.72 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/turlar"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-gold pl-6 pr-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft md:h-14"
            >
              Turlari Incele
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-deep text-white transition-transform group-hover:translate-x-0.5 md:h-10 md:w-10">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-sea hover:text-sea md:h-14"
            >
              <MessageCircle className="h-4 w-4 text-sea" />
              WhatsApp ile Bilgi Al
            </a>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              Neden Seren Travel?
            </span>
            <h2 className="mt-5 text-balance font-display text-4xl leading-[1.08] md:text-6xl">
              Yerel ekipten net bilgi, guvenli tur planlamasi.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/70">
              Fethiye ve Oludeniz cevresindeki turlar icin uygun saat, rota,
              transfer ve fiyat bilgilerini hizlica ogrenin. Seren Travel ekibi
              size en uygun deneyimi WhatsApp uzerinden net sekilde iletir.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-navy-deep"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp'tan Bilgi Al
            </a>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
              <span>Turkce & Ingilizce destek</span>
              <span className="text-brand-red">•</span>
              <span>Otel transferli turlar</span>
              <span className="text-brand-red">•</span>
              <span>Guncel uygunluk bilgisi</span>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group grid gap-5 rounded-lg border border-foreground/10 bg-card p-6 shadow-sm transition-colors hover:border-gold/50 sm:grid-cols-[auto_1fr]"
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

      <section className="bg-sand-light py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                One Cikan Deneyimler
              </span>
              <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl leading-[1.08] md:text-6xl">
                Fethiye tatilini netlestiren turlar.
              </h2>
            </div>
            <Link
              href="/turlar"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground"
            >
              Tum turlari gor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {featuredTours.map((tour, index) => (
              <TourCard key={tour.slug} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Parallax />

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 rounded-lg bg-navy-deep p-8 text-white shadow-xl md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                WhatsApp Destek
              </span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] md:text-5xl">
                Uygunluk ve fiyat bilgisi icin dogrudan yazin.
              </h2>
              <p className="mt-4 max-w-xl text-white/65">
                Gunluk programlar, hava kosullari ve sezon yogunluguna gore
                degisebilir. Seren Travel ekibi size en uygun secenegi WhatsApp
                uzerinden hizlica iletir.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href="/iletisim"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold transition-colors hover:bg-white hover:text-navy-deep"
              >
                Iletisim
                <Compass className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
