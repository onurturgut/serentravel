import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "seren_admin";

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD_HASH ||
    process.env.ADMIN_PASSWORD ||
    "seren-travel-local-admin"
  );
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function createToken() {
  return `admin.${sign("admin")}`;
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

export async function verifyAdminPassword(password: string) {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  }

  if (process.env.ADMIN_PASSWORD) {
    return safeEqual(password, process.env.ADMIN_PASSWORD);
  }

  return false;
}

export async function setAdminSession() {
  const store = await cookies();

  store.set(cookieName, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(cookieName)?.value;

  return Boolean(token && safeEqual(token, createToken()));
}

export function isAdminRequest(request: NextRequest) {
  const token = request.cookies.get(cookieName)?.value;

  return Boolean(token && safeEqual(token, createToken()));
}

export function unauthorized() {
  return NextResponse.json({ error: "Yetkisiz istek." }, { status: 401 });
}
