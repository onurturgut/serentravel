"use client";

import { motion } from "framer-motion";
import { Instagram, MapPin, MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/905431999411?text=Merhaba%2C%20Seren%20Travel%20turlari%20hakkinda%20bilgi%20almak%20istiyorum.";

export function ContactPage() {
  return (
    <>
      <section className="bg-navy-deep pb-14 pt-32 text-white md:pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-gold"
          >
            Iletisim
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-4xl font-display text-5xl leading-[1.04] md:text-7xl"
          >
            Tur detaylari icin WhatsApp'tan yazin.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-white/65"
          >
            Seren Travel ekibi uygunluk, fiyat, seans ve transfer bilgilerini
            size dogrudan WhatsApp uzerinden iletir.
          </motion.p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[280px] flex-col justify-between rounded-lg bg-navy-deep p-8 text-white shadow-xl transition-transform duration-500 hover:-translate-y-1 md:p-10"
          >
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gold text-navy-deep ring-2 ring-brand-red/70">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h2 className="mt-8 font-display text-4xl leading-[1.08] md:text-5xl">
                WhatsApp ile hizli bilgi alin.
              </h2>
              <p className="mt-4 max-w-xl text-white/65">
                Form doldurmadan, beklemeden, dogrudan ekip ile konusun.
              </p>
            </div>
            <span className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft sm:self-start">
              WhatsApp'tan Yaz
            </span>
          </motion.a>

          <div className="grid gap-5">
            <a
              href="https://www.instagram.com/serentravelagency/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-5 rounded-lg border border-foreground/10 bg-card p-7 shadow-sm transition-colors hover:border-gold/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-navy text-gold">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                  Instagram
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  @serentravelagency
                </div>
              </div>
            </a>
            <div className="flex items-center gap-5 rounded-lg border border-foreground/10 bg-card p-7 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-navy text-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                  Lokasyon
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  Fethiye / Mugla
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="aspect-[16/9] overflow-hidden rounded-lg border border-foreground/10 md:aspect-[21/9]">
            <iframe
              title="Seren Travel Lokasyon"
              src="https://www.google.com/maps?q=Fethiye+Mu%C4%9Fla&output=embed"
              loading="lazy"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
