import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { hasR2Config, uploadToR2 } from "@/lib/r2";
import { slugify } from "@/lib/slug";

const maxFileSize = 8 * 1024 * 1024;

function extensionFromType(type: string) {
  if (type === "image/png") {
    return "png";
  }
  if (type === "image/webp") {
    return "webp";
  }
  return "jpg";
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasR2Config()) {
    return NextResponse.json(
      {
        error:
          "R2 ayarlari eksik. .env.local icindeki R2 alanlarini kontrol edin.",
      },
      { status: 400 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "tours");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadi." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Sadece gorsel dosyasi yuklenebilir." },
      { status: 400 },
    );
  }

  if (file.size > maxFileSize) {
    return NextResponse.json(
      { error: "Dosya cok buyuk. En fazla 8 MB yukleyin." },
      { status: 400 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const extension = extensionFromType(file.type);
  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "gorsel";
  const key = `${folder}/${Date.now()}-${baseName}.${extension}`;
  let url;
  try {
    url = await uploadToR2({
      key,
      body: buffer,
      contentType: file.type,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Gorsel R2'ye yuklenemedi. R2 anahtarlari, bucket adi ve internet baglantisini kontrol edin.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ key, url });
}
