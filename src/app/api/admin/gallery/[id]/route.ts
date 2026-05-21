import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { connectDb, hasMongoUri } from "@/lib/db";
import { GalleryImageModel } from "@/models/GalleryImage";

type Props = {
  params: Promise<{ id: string }>;
};

function normalize(body: Record<string, unknown>) {
  return {
    src: String(body.src || "").trim(),
    alt: String(body.alt || "").trim(),
    order: Number(body.order || 0),
    isActive: body.isActive !== false,
  };
}

export async function PUT(request: NextRequest, { params }: Props) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan galeri kaydedilemez." },
      { status: 400 },
    );
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  await connectDb();
  const updated = await GalleryImageModel.findByIdAndUpdate(
    id,
    normalize(body),
    { new: true, runValidators: true },
  );

  if (!updated) {
    return NextResponse.json({ error: "Gorsel bulunamadi." }, { status: 404 });
  }

  return NextResponse.json({ image: updated });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan galeri silinemez." },
      { status: 400 },
    );
  }

  const { id } = await params;

  await connectDb();
  await GalleryImageModel.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
}
