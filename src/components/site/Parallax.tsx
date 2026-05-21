"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Parallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[80vh] md:h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[15%] -bottom-[15%]"
      >
        <img
          src="/images/tours/fethiye-12-adalar-tekne-turu.jpg"
          alt="Fethiye 12 Adalar Tekne Turu"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/80" />
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="text-xs tracking-[0.4em] uppercase text-gold">
          Seren Travel
        </span>
        <h2 className="mt-6 font-display text-4xl md:text-7xl text-white max-w-4xl text-balance leading-[1.05]">
          Fethiye'nin en güçlü rotalarını tek merkezden yönetin.
        </h2>
        <div className="mt-10 h-px w-16 bg-gold/60" />
      </motion.div>
    </section>
  );
}
