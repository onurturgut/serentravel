import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { getCategories } from "@/lib/content";
import { connectDb, hasMongoUri } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { CategoryModel } from "@/models/Category";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  return NextResponse.json({
    categories: await getCategories(),
    mongoConfigured: hasMongoUri(),
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan kategori kaydedilemez." },
      { status: 400 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    slug?: string;
    order?: number;
    isActive?: boolean;
  };
  const name = String(body.name || "").trim();

  if (!name) {
    return NextResponse.json(
      { error: "Kategori adi zorunludur." },
      { status: 400 },
    );
  }

  await connectDb();
  const category = await CategoryModel.create({
    name,
    slug: body.slug || slugify(name),
    order: Number(body.order || 0),
    isActive: body.isActive !== false,
  });

  return NextResponse.json({ category }, { status: 201 });
}
