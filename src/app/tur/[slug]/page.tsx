import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRelatedTours, getTour, getTours } from "@/lib/content";
import { TourDetailPage } from "../../_components/TourDetailPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const tours = await getTours();

  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return {};
  }

  return {
    title: tour.title,
    description: tour.short,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    notFound();
  }

  const relatedTours = await getRelatedTours(slug, 3);

  return <TourDetailPage tour={tour} relatedTours={relatedTours} />;
}
