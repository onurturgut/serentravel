import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

let client: S3Client | null = null;

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

export function getR2Client() {
  if (!client) {
    const accountId = requiredEnv("R2_ACCOUNT_ID");

    client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: requiredEnv("R2_ACCESS_KEY_ID"),
        secretAccessKey: requiredEnv("R2_SECRET_ACCESS_KEY"),
      },
    });
  }

  return client;
}

export function hasR2Config() {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME &&
    process.env.R2_PUBLIC_URL,
  );
}

export function getPublicR2Url(key: string) {
  const publicUrl = requiredEnv("R2_PUBLIC_URL").replace(/\/$/, "");

  if (publicUrl.includes(".r2.cloudflarestorage.com")) {
    throw new Error(
      "R2_PUBLIC_URL public gorsel adresi olmali. r2.cloudflarestorage.com S3 API endpoint'idir; r2.dev public URL veya custom domain kullanin.",
    );
  }

  return `${publicUrl}/${key}`;
}

export async function uploadToR2({
  key,
  body,
  contentType,
}: {
  key: string;
  body: Buffer;
  contentType: string;
}) {
  await getR2Client().send(
    new PutObjectCommand({
      Bucket: requiredEnv("R2_BUCKET_NAME"),
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  return getPublicR2Url(key);
}
