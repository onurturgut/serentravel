import { NextResponse } from "next/server";
import { setAdminSession, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    password?: string;
  };
  const isValid = await verifyAdminPassword(body.password || "");

  if (!isValid) {
    return NextResponse.json(
      { error: "Admin sifresi hatali veya ADMIN_PASSWORD ayarlanmamis." },
      { status: 401 },
    );
  }

  await setAdminSession();

  return NextResponse.json({ ok: true });
}
