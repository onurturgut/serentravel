import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { hasMongoUri } from "@/lib/db";
import {
  getSiteContent,
  getSiteSettings,
  saveSiteContent,
  saveSiteSettings,
  seedSiteContent,
} from "@/lib/site-content";
import type { SiteContent, SiteSettings } from "@/lib/site-defaults";

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/turlar");
  revalidatePath("/hakkimizda");
  revalidatePath("/iletisim");
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  const [content, settings] = await Promise.all([
    getSiteContent(),
    getSiteSettings(),
  ]);

  return NextResponse.json({
    content,
    settings,
    mongoConfigured: hasMongoUri(),
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorized();
  }

  if (!hasMongoUri()) {
    return NextResponse.json(
      { error: "MONGODB_URI ayarlanmadan site icerigi kaydedilemez." },
      { status: 400 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    content?: SiteContent;
    settings?: SiteSettings;
  };

  if (!body.content || !body.settings) {
    return NextResponse.json(
      { error: "Icerik ve site ayarlari zorunludur." },
      { status: 400 },
    );
  }

  await seedSiteContent();
  await Promise.all([
    saveSiteContent(body.content),
    saveSiteSettings(body.settings),
  ]);
  revalidateSite();

  return NextResponse.json({ ok: true });
}
