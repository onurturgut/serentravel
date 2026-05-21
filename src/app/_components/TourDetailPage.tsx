"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";
import { Gallery } from "@/components/site/Gallery";
import { TourCard } from "@/components/site/TourCard";
import type { Tour } from "@/lib/tours";
import { tours } from "@/lib/tours";

const whatsappUrl =
  "https://wa.me/905431999411?text=Merhaba%2C%20Seren%20Travel%20turu%20hakkinda%20bilgi%20almak%20istiyorum.";

export function TourDetailPage({ tour }: { tour: Tour }) {
  const related = tours.filter((item) => item.slug !== tour.slug).slice(0, 3);

  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-navy-deep md:h-[76vh]">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          src={tour.image}
          alt={tour.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/18" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 md:px-8 md:pb-20">
          <Link
            href="/turlar"
            className="inline-flex h-10 items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white backdrop-blur-md transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Turlara Don
          </Link>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 text-xs uppercase tracking-[0.3em] text-gold"
          >
            {tour.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-7xl"
          >
            {tour.title}
          </motion.h1>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-12 lg:col-span-2">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                Deneyim
              </span>
              <p className="mt-5 font-display text-xl leading-relaxed text-foreground/85 md:text-2xl">
                {tour.short}
              </p>
              <p className="mt-6 leading-relaxed text-foreground/70">
                {tour.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Clock, label: "Sure", value: tour.duration },
                { icon: Users, label: "Katilim", value: tour.type },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: tour.booking,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-foreground/10 bg-card p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-gold">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                    {item.label}
                  </div>
                  <div className="mt-1 text-base font-semibold leading-tight">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-foreground/10 bg-white p-7 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                  Fiyata Dahil
                </h2>
                <ul className="mt-6 space-y-3">
                  {tour.included.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-foreground/75"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tour.stops && (
                <div className="rounded-lg border border-foreground/10 bg-white p-7 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                    Rota ve Duraklar
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {tour.stops.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm text-foreground/75"
                      >
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {tour.notes && (
              <div className="rounded-lg border border-gold/25 bg-gold/10 p-5 text-sm leading-relaxed text-foreground/70">
                {tour.notes.join(" ")}
              </div>
            )}

            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                Galeri
              </span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">
                Turdan ilham veren kareler.
              </h3>
              <div className="mt-8">
                <Gallery images={tour.gallery} />
              </div>
            </div>
          </div>

          <aside>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-lg bg-navy-deep p-8 text-white shadow-xl">
                <span className="text-xs uppercase tracking-[0.3em] text-gold">
                  WhatsApp Bilgi
                </span>
                <h3 className="mt-4 font-display text-3xl">Hemen bilgi alin</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  Uygunluk, seans bilgisi ve grup planlamasi icin SEREN Travel
                  ekibine WhatsApp uzerinden dogrudan ulasabilirsiniz.
                </p>
                <div className="mt-6 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center gap-3 rounded-full bg-gold px-5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp ile Yaz
                  </a>
                  <a
                    href="https://www.instagram.com/serentravelagency/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center gap-3 rounded-full border border-white/15 px-5 text-sm transition-colors hover:bg-white/10"
                  >
                    <Instagram className="h-4 w-4 text-sea" />
                    @serentravelagency
                  </a>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50">
                  Fethiye / Mugla · Turkce & Ingilizce destek
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-sand-light py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">
            Onerilen
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Benzer deneyimler
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {related.map((item, index) => (
              <TourCard key={item.slug} tour={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
