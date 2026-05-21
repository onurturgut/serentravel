import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { connectDb, hasMongoUri } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { TourModel } from "@/models/Tour";

type Props = {
  params: Promise<{ id: string }>;
};

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

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/turlar");
  revalidatePath("/tur/[slug]", "page");
}

export async function PUT(request: NextRequest, { params }: Props) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan kayit yapilamaz." },
      { status: 400 },
    );
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  await connectDb();
  const updated = await TourModel.findByIdAndUpdate(id, normalizeTour(body), {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return NextResponse.json({ error: "Tur bulunamadi." }, { status: 404 });
  }

  revalidateSite();

  return NextResponse.json({ tour: updated });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan silme yapilamaz." },
      { status: 400 },
    );
  }

  const { id } = await params;

  await connectDb();
  await TourModel.findByIdAndDelete(id);
  revalidateSite();

  return NextResponse.json({ ok: true });
}
