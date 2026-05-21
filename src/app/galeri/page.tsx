import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Seren Travel turlarindan fotoğraflar ve rota kareleri.",
};

export default async function Page() {
  const images = await getGalleryImages();

  return (
    <>
      <section className="safe-x bg-navy-deep pb-14 pt-32 text-white md:pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">
            Galeri
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.04] md:text-7xl">
            Seren Travel tur kareleri.
          </h1>
          <p className="mt-6 max-w-2xl text-white/65">
            Fethiye, Oludeniz ve cevre rotalardan secilmis tur fotograflarini
            inceleyin.
          </p>
        </div>
      </section>

      <section className="safe-x bg-background py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {images.map((image, index) => (
              <figure
                key={image.src}
                className="mb-5 break-inside-avoid overflow-hidden rounded-lg border border-foreground/10 bg-card shadow-sm"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index < 8 ? "eager" : "lazy"}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
