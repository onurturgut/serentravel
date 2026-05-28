import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { getR2MediaUrl } from "@/lib/r2";
import { TourModel } from "@/models/Tour";
import { GalleryImageModel } from "@/models/GalleryImage";

export async function POST() {
  const r2BaseEnv = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
  if (!r2BaseEnv) {
    return NextResponse.json(
      { error: "R2_PUBLIC_URL tanımlı değil" },
      { status: 500 },
    );
  }

  const r2Base = r2BaseEnv;

  await connectDb();

  function toR2(url: string): string {
    if (!url) return url;
    if (url.startsWith("/api/media/")) return url;
    if (url.startsWith(r2Base)) {
      return getR2MediaUrl(url.slice(r2Base.length + 1));
    }
    if (url.startsWith("http")) return url;
    return getR2MediaUrl(url.replace(/^\//, ""));
  }

  const tours = await TourModel.find({}).lean();
  let updatedTours = 0;

  for (const tour of tours) {
    const newImage = toR2(tour.image);
    const currentGallery = (tour.gallery || []) as string[];
    const newGallery = currentGallery.map(toR2);

    const imageChanged = newImage !== tour.image;
    const galleryChanged = newGallery.some((g, i) => g !== currentGallery[i]);

    if (imageChanged || galleryChanged) {
      await TourModel.updateOne(
        { _id: tour._id },
        { $set: { image: newImage, gallery: newGallery } },
      );
      updatedTours++;
    }
  }

  const galleryDocs = await GalleryImageModel.find({}).lean();
  let updatedGallery = 0;

  for (const doc of galleryDocs) {
    const newSrc = toR2(doc.src);
    if (newSrc !== doc.src) {
      await GalleryImageModel.updateOne(
        { _id: doc._id },
        { $set: { src: newSrc } },
      );
      updatedGallery++;
    }
  }

  return NextResponse.json({
    ok: true,
    updatedTours,
    updatedGallery,
    r2Base,
  });
}
