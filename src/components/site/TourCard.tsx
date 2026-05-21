"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import type { Tour } from "@/lib/tours";

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        href={`/tur/${tour.slug}`}
        className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-navy shadow-sm transition-transform duration-500 hover:-translate-y-1"
      >
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          width={1024}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />

        <div className="absolute left-5 top-5">
          <span className="glass inline-flex items-center rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white">
            {tour.category}
          </span>
        </div>

        <div className="glass absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div className="mb-4 flex flex-wrap gap-2 text-[11px] text-white/82">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 backdrop-blur-md">
              <Clock className="h-3.5 w-3.5 text-gold" />
              {tour.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 backdrop-blur-md">
              <Users className="h-3.5 w-3.5 text-gold" />
              {tour.type}
            </span>
          </div>
          <h3 className="font-display text-2xl leading-tight text-white md:text-3xl">
            {tour.title}
          </h3>
          <p className="mt-2 text-sm text-white/70 line-clamp-2">
            {tour.short}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
