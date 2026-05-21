"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { TourCard } from "@/components/site/TourCard";
import type { SiteSettings, ToursContent } from "@/lib/site-defaults";
import {
  defaultContent,
  defaultSettings,
  whatsappUrl,
} from "@/lib/site-defaults";
import type { Tour } from "@/lib/tours";

export function ToursPage({
  tours,
  content = defaultContent.tours,
  settings = defaultSettings,
}: {
  tours: Tour[];
  content?: ToursContent;
  settings?: SiteSettings;
}) {
  const whatsAppHref = whatsappUrl(settings);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/16 via-transparent to-navy/35" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.3em] text-gold"
            >
              {content.heroEyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-4xl font-display text-5xl leading-[1.04] md:text-7xl"
            >
              {content.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-white/65"
            >
              {content.heroDescription}
            </motion.p>
          </div>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold-soft lg:mb-1"
          >
            <MessageCircle className="h-4 w-4" />
            {content.whatsappButtonText}
          </a>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 md:gap-6 md:px-8 lg:grid-cols-4">
          {tours.map((tour, index) => (
            <TourCard key={tour.slug} tour={tour} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
