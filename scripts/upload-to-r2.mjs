import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { readdir, readFile } from "fs/promises";
import { join, relative, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = join(__dirname, "..");
const publicDir = join(rootDir, "public");

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function getR2Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

async function fileExists(client, bucket, key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const required = [
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME",
    "R2_PUBLIC_URL",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error("Eksik env değişkenleri:", missing.join(", "));
    process.exit(1);
  }

  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL.replace(/\/$/, "");
  const client = getR2Client();

  const allFiles = await getAllFiles(join(publicDir, "images"));
  const imageFiles = allFiles.filter(
    (f) => CONTENT_TYPES[extname(f).toLowerCase()],
  );

  console.log(`\n${imageFiles.length} görsel bulundu. Yükleniyor...\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const filePath of imageFiles) {
    const key = relative(publicDir, filePath).replace(/\\/g, "/");
    const contentType = CONTENT_TYPES[extname(filePath).toLowerCase()];

    const exists = await fileExists(client, bucket, key);
    if (exists) {
      console.log(`⏭  Atlandı (zaten var): ${key}`);
      skipped++;
      continue;
    }

    try {
      const body = await readFile(filePath);
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: contentType,
          CacheControl: "public, max-age=31536000, immutable",
        }),
      );
      console.log(`✓  Yüklendi: ${publicUrl}/${key}`);
      uploaded++;
    } catch (err) {
      console.error(`✗  Hata: ${key} —`, err.message);
      failed++;
    }
  }

  console.log(`\n--- Tamamlandı ---`);
  console.log(`Yüklenen : ${uploaded}`);
  console.log(`Atlanan  : ${skipped}`);
  console.log(`Hatalı   : ${failed}`);
}

main();
