import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { connectDb, hasMongoUri } from "@/lib/db";
import { getBundledGalleryImages } from "@/lib/gallery";
import { GalleryImageModel } from "@/models/GalleryImage";

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

  const images = await getBundledGalleryImages();

  await connectDb();
  await Promise.all(
    images.map((image, index) =>
      GalleryImageModel.updateOne(
        { src: image.src },
        { $setOnInsert: { ...image, order: index, isActive: true } },
        { upsert: true },
      ),
    ),
  );

  return NextResponse.json({ ok: true, imported: images.length });
}
