"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import type { Tour } from "@/lib/tours";

export function TourCard({
  tour,
  index = 0,
  variant = "default",
}: {
  tour: Tour;
  index?: number;
  variant?: "default" | "featured";
}) {
  const isFeatured = variant === "featured";

  if (isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
        className="h-full"
      >
        <Link
          href={`/tur/${tour.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-lg border border-foreground/10 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-b-none rounded-t-lg bg-navy sm:aspect-[5/4]">
            <img
              src={tour.image}
              alt={tour.title}
              loading="lazy"
              width={1024}
              height={820}
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent" />
            <div className="absolute left-5 top-5">
              <span className="glass inline-flex items-center rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white">
                {tour.category}
              </span>
            </div>
            <div className="glass absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6 md:p-7">
            <div className="mb-5 flex flex-wrap gap-2 text-xs text-foreground/62">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 text-gold" />
                {tour.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1.5">
                <Users className="h-3.5 w-3.5 text-gold" />
                {tour.type}
              </span>
            </div>
            <h3 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
              {tour.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-base leading-relaxed text-foreground/62">
              {tour.short}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
              Detaylari incele
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        href={`/tur/${tour.slug}`}
        className={`group relative block overflow-hidden rounded-lg bg-navy shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
          isFeatured
            ? "min-h-[460px] aspect-[0.82] sm:min-h-[500px] lg:min-h-[560px]"
            : "aspect-[3/4]"
        }`}
      >
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          width={1024}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 ${
            isFeatured
              ? "bg-gradient-to-t from-navy-deep via-navy-deep/45 to-navy-deep/5"
              : "bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent"
          }`}
        />

        <div
          className={
            isFeatured ? "absolute left-6 top-6" : "absolute left-5 top-5"
          }
        >
          <span className="glass inline-flex items-center rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white">
            {tour.category}
          </span>
        </div>

        <div
          className={`glass absolute flex items-center justify-center rounded-full text-white transition-opacity group-hover:opacity-100 ${
            isFeatured
              ? "right-6 top-6 h-12 w-12 opacity-100 md:opacity-0"
              : "right-5 top-5 h-10 w-10 opacity-0"
          }`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>

        <div
          className={
            isFeatured
              ? "absolute inset-x-0 bottom-0 p-6 md:p-7"
              : "absolute inset-x-0 bottom-0 p-5 md:p-6"
          }
        >
          <div
            className={`mb-4 flex flex-wrap gap-2 text-white/82 ${
              isFeatured ? "text-xs" : "text-[11px]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 backdrop-blur-md">
              <Clock className="h-3.5 w-3.5 text-gold" />
              {tour.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 backdrop-blur-md">
              <Users className="h-3.5 w-3.5 text-gold" />
              {tour.type}
            </span>
          </div>
          <h3
            className={`font-display leading-tight text-white ${
              isFeatured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
            }`}
          >
            {tour.title}
          </h3>
          <p
            className={`mt-3 text-white/72 ${
              isFeatured
                ? "line-clamp-3 text-base leading-relaxed"
                : "line-clamp-2 text-sm"
            }`}
          >
            {tour.short}
          </p>
          {isFeatured && (
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
              Detaylari incele
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
