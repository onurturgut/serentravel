import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { connectDb, hasMongoUri } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { CategoryModel } from "@/models/Category";

type Props = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, { params }: Props) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan kategori kaydedilemez." },
      { status: 400 },
    );
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    slug?: string;
    order?: number;
    isActive?: boolean;
  };
  const name = String(body.name || "").trim();

  await connectDb();
  const category = await CategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: body.slug || slugify(name),
      order: Number(body.order || 0),
      isActive: body.isActive !== false,
    },
    { new: true, runValidators: true },
  );

  if (!category) {
    return NextResponse.json(
      { error: "Kategori bulunamadi." },
      { status: 404 },
    );
  }

  return NextResponse.json({ category });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan kategori silinemez." },
      { status: 400 },
    );
  }

  const { id } = await params;

  await connectDb();
  await CategoryModel.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
}
