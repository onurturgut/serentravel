import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse, type NextRequest } from "next/server";
import { getR2Client } from "@/lib/r2";

type Props = {
  params: Promise<{ key: string[] }>;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

export async function GET(_request: NextRequest, { params }: Props) {
  const { key: keyParts } = await params;
  const key = keyParts.map(decodeURIComponent).join("/");

  if (!key || key.includes("..")) {
    return NextResponse.json(
      { error: "Gecersiz medya yolu." },
      { status: 400 },
    );
  }

  try {
    const object = await getR2Client().send(
      new GetObjectCommand({
        Bucket: requiredEnv("R2_BUCKET_NAME"),
        Key: key,
      }),
    );

    if (!object.Body) {
      return NextResponse.json({ error: "Medya bulunamadi." }, { status: 404 });
    }

    const body = await object.Body.transformToByteArray();
    const arrayBuffer = new ArrayBuffer(body.byteLength);
    new Uint8Array(arrayBuffer).set(body);

    return new Response(arrayBuffer, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": object.ContentType || "application/octet-stream",
      },
    });
  } catch {
    return NextResponse.json({ error: "Medya bulunamadi." }, { status: 404 });
  }
}
