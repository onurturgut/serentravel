"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function Gallery({ images }: { images: string[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const w = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        onScroll={(e) => {
          const el = e.currentTarget;
          setActive(Math.round(el.scrollLeft / (el.clientWidth * 0.85)));
        }}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="snap-start shrink-0 w-[85%] md:w-[70%] aspect-[16/10] rounded-3xl overflow-hidden bg-navy"
          >
            <img
              src={img}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === active ? "w-8 bg-gold" : "w-4 bg-foreground/20"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Önceki"
            className="h-11 w-11 rounded-full border border-foreground/15 hover:bg-navy hover:text-white transition-colors inline-flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Sonraki"
            className="h-11 w-11 rounded-full border border-foreground/15 hover:bg-navy hover:text-white transition-colors inline-flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
