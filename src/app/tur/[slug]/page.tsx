import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTour, tours } from "@/lib/tours";
import { TourDetailPage } from "../../_components/TourDetailPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);

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
  const tour = getTour(slug);

  if (!tour) {
    notFound();
  }

  return <TourDetailPage tour={tour} />;
}
