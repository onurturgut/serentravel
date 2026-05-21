import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { connectDb, hasMongoUri } from "@/lib/db";
import { getBundledGalleryImages, getGalleryImages } from "@/lib/gallery";
import { GalleryImageModel } from "@/models/GalleryImage";

function normalize(body: Record<string, unknown>) {
  return {
    src: String(body.src || "").trim(),
    alt: String(body.alt || "").trim(),
    order: Number(body.order || 0),
    isActive: body.isActive !== false,
  };
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  return NextResponse.json({
    images: await getGalleryImages(),
    bundledImages: await getBundledGalleryImages(),
    mongoConfigured: hasMongoUri(),
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan galeri kaydedilemez." },
      { status: 400 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  const image = normalize(body);

  if (!image.src) {
    return NextResponse.json(
      { error: "Gorsel URL zorunludur." },
      { status: 400 },
    );
  }

  await connectDb();
  const created = await GalleryImageModel.create({
    ...image,
    alt: image.alt || "Seren Travel galeri",
  });

  return NextResponse.json({ image: created }, { status: 201 });
}
