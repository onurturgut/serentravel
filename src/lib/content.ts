import { connectDb, hasMongoUri } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { tours as fallbackTours, type Tour } from "@/lib/tours";
import { CategoryModel } from "@/models/Category";
import { TourModel } from "@/models/Tour";

export type Category = {
  id?: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
};

type MongoTour = Tour & {
  _id: { toString(): string };
};

type MongoCategory = Category & {
  _id: { toString(): string };
};

function serializeTour(tour: MongoTour): Tour {
  return {
    id: tour._id.toString(),
    slug: tour.slug,
    title: tour.title,
    category: tour.category,
    short: tour.short,
    description: tour.description,
    image: tour.image,
    duration: tour.duration,
    type: tour.type,
    booking: tour.booking,
    included: tour.included || [],
    stops: tour.stops || [],
    notes: tour.notes || [],
    gallery: tour.gallery || [],
    order: tour.order || 0,
    isFeatured: tour.isFeatured || false,
    isActive: tour.isActive !== false,
  };
}

function serializeCategory(category: MongoCategory): Category {
  return {
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    order: category.order || 0,
    isActive: category.isActive !== false,
  };
}

async function getMongoTours(includeInactive = false) {
  await connectDb();
  const query = includeInactive ? {} : { isActive: { $ne: false } };
  const docs = await TourModel.find(query).sort({ order: 1, title: 1 }).lean();
  return docs.map((doc) => serializeTour(doc as unknown as MongoTour));
}

export async function getTours(options: { includeInactive?: boolean } = {}) {
  if (!hasMongoUri()) {
    return fallbackTours;
  }

  try {
    const dbTours = await getMongoTours(options.includeInactive);
    return dbTours.length ? dbTours : fallbackTours;
  } catch {
    return fallbackTours;
  }
}

export async function getFeaturedTours(limit = 8) {
  const allTours = await getTours();
  const featured = allTours.filter((tour) => tour.isFeatured);
  return (featured.length ? featured : allTours).slice(0, limit);
}

export async function getTour(slug: string) {
  const allTours = await getTours();
  return allTours.find((tour) => tour.slug === slug);
}

export async function getRelatedTours(slug: string, limit = 3) {
  const allTours = await getTours();
  return allTours.filter((tour) => tour.slug !== slug).slice(0, limit);
}

export async function getCategories() {
  const fallbackCategories = Array.from(
    new Set(fallbackTours.map((tour) => tour.category)),
  ).map((name, index) => ({
    name,
    slug: slugify(name),
    order: index,
    isActive: true,
  }));

  if (!hasMongoUri()) {
    return fallbackCategories;
  }

  try {
    await connectDb();
    const docs = await CategoryModel.find({ isActive: { $ne: false } })
      .sort({ order: 1, name: 1 })
      .lean();

    if (docs.length) {
      return docs.map((doc) =>
        serializeCategory(doc as unknown as MongoCategory),
      );
    }
  } catch {
    return fallbackCategories;
  }

  return fallbackCategories;
}
