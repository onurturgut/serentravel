import fs from "node:fs/promises";
import path from "node:path";
import { connectDb, hasMongoUri } from "@/lib/db";
import { normalizeR2MediaUrl } from "@/lib/r2";
import { GalleryImageModel } from "@/models/GalleryImage";

const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export async function getGalleryImages() {
  if (hasMongoUri()) {
    try {
      await connectDb();
      const docs = await GalleryImageModel.find({ isActive: { $ne: false } })
        .sort({ order: 1, createdAt: -1 })
        .lean();

      if (docs.length) {
        return docs.map((doc) => ({
          id: String(doc._id),
          src: normalizeR2MediaUrl(String(doc.src)),
          alt: String(doc.alt),
          order: Number(doc.order || 0),
          isActive: doc.isActive !== false,
        }));
      }
    } catch {
      // Fall back to bundled images below.
    }
  }

  return getBundledGalleryImages();
}

export async function getBundledGalleryImages() {
  const dir = path.join(process.cwd(), "public", "images", "tours");
  const files = await fs.readdir(dir);

  return files
    .filter((file) => allowedExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const localPath = `/images/tours/${file}`;
      return {
        src: localPath,
        alt: file
          .replace(/\.[^.]+$/, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase()),
        order: 0,
        isActive: true,
      };
    });
}
