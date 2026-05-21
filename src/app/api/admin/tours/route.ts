import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";
import { connectDb, hasMongoUri } from "@/lib/db";
import { getTours } from "@/lib/content";
import { TourModel } from "@/models/Tour";

function cleanArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => String(item).trim()).filter(Boolean)
    : [];
}

function normalizeTour(body: Record<string, unknown>) {
  const title = String(body.title || "").trim();

  return {
    slug: String(body.slug || slugify(title)).trim(),
    title,
    category: String(body.category || "").trim(),
    short: String(body.short || "").trim(),
    description: String(body.description || "").trim(),
    image: String(body.image || "").trim(),
    duration: String(body.duration || "").trim(),
    type: String(body.type || "").trim(),
    booking: String(body.booking || "").trim(),
    included: cleanArray(body.included),
    stops: cleanArray(body.stops),
    notes: cleanArray(body.notes),
    gallery: cleanArray(body.gallery),
    order: Number(body.order || 0),
    isFeatured: Boolean(body.isFeatured),
    isActive: body.isActive !== false,
  };
}

function validateTour(tour: ReturnType<typeof normalizeTour>) {
  const required = [
    "slug",
    "title",
    "category",
    "short",
    "description",
    "image",
    "duration",
    "type",
    "booking",
  ] as const;

  return required.filter((field) => !tour[field]);
}

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/turlar");
  revalidatePath("/tur/[slug]", "page");
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const tours = await getTours({ includeInactive: true });

  return NextResponse.json({
    tours,
    mongoConfigured: hasMongoUri(),
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan kayit yapilamaz." },
      { status: 400 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  const tour = normalizeTour(body);
  const missing = validateTour(tour);

  if (missing.length) {
    return NextResponse.json(
      { error: `Eksik alanlar: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  await connectDb();
  const created = await TourModel.create(tour);
  revalidateSite();

  return NextResponse.json({ tour: created }, { status: 201 });
}
