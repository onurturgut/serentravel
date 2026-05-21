"use client";

import { motion } from "framer-motion";
import { Compass, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import parallaxImg from "@/assets/parallax.jpg";
import type { AboutContent } from "@/lib/site-defaults";
import { defaultContent } from "@/lib/site-defaults";

const icons = [Compass, HeartHandshake, Sparkles, ShieldCheck];

export function AboutPage({
  content = defaultContent.about,
}: {
  content?: AboutContent;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-sand-light pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              {content.heroEyebrow}
            </span>
            <h1 className="mt-5 text-balance font-display text-5xl leading-[1.04] md:text-7xl">
              {content.heroTitle}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 lg:pt-12"
          >
            <p className="text-lg leading-relaxed text-foreground/70">
              {content.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative h-[58vh] overflow-hidden md:h-[72vh]">
        <img
          src={parallaxImg.src}
          alt="Fethiye dogasi"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/30" />
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">
            {content.valuesEyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] md:text-6xl">
            {content.valuesTitle}
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.values.map((value, index) => {
              const Icon = icons[index] || Compass;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-lg border border-foreground/10 bg-card p-7 shadow-sm transition-colors hover:border-gold/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                    {value.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
