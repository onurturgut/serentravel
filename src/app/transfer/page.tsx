import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getTours } from "@/lib/content";
import { getSiteSettings } from "@/lib/site-content";
import { whatsappUrl } from "@/lib/site-defaults";
import { TourDetailPage } from "../_components/TourDetailPage";

export const metadata: Metadata = {
  title: "Transfer",
  description: "Seren Travel transfer hizmeti ve rezervasyon bilgileri.",
};

export default async function Page() {
  const [tours, settings] = await Promise.all([
    getTours({ includeInactive: true }),
    getSiteSettings(),
  ]);
  const transferTour =
    tours.find((tour) => tour.category.toLowerCase() === "transfer") ||
    tours.find((tour) => tour.title.toLowerCase().includes("transfer")) ||
    tours.find((tour) => tour.slug === "transfer");

  if (!transferTour) {
    return (
      <section className="safe-x bg-navy-deep px-5 pb-20 pt-36 text-white md:px-8 md:pt-44">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">
            Transfer
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.04] md:text-7xl">
            Transfer hizmeti yakinda.
          </h1>
          <p className="mt-6 max-w-2xl text-white/65">
            Transfer detaylari icin Seren Travel ekibine WhatsApp uzerinden
            yazabilirsiniz.
          </p>
          <a
            href={whatsappUrl(settings)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-navy-deep"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </section>
    );
  }

  if (!transferTour.isActive) {
    notFound();
  }

  const relatedTours = tours
    .filter(
      (tour) => tour.slug !== transferTour.slug && tour.isActive !== false,
    )
    .slice(0, 3);

  return <TourDetailPage tour={transferTour} relatedTours={relatedTours} />;
}
