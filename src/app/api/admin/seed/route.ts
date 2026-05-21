import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { connectDb, hasMongoUri } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { seedSiteContent } from "@/lib/site-content";
import { tours } from "@/lib/tours";
import { CategoryModel } from "@/models/Category";
import { TourModel } from "@/models/Tour";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan aktarim yapilamaz." },
      { status: 400 },
    );
  }

  await connectDb();

  const categories = Array.from(new Set(tours.map((tour) => tour.category)));

  await Promise.all(
    categories.map((name, index) =>
      CategoryModel.updateOne(
        { slug: slugify(name) },
        { $setOnInsert: { name, slug: slugify(name), order: index } },
        { upsert: true },
      ),
    ),
  );

  await Promise.all(
    tours.map((tour, index) =>
      TourModel.updateOne(
        { slug: tour.slug },
        {
          $setOnInsert: {
            ...tour,
            order: index,
            isFeatured: index < 8,
            isActive: true,
          },
        },
        { upsert: true },
      ),
    ),
  );

  await seedSiteContent();

  return NextResponse.json({
    ok: true,
    importedTours: tours.length,
    importedCategories: categories.length,
  });
}
