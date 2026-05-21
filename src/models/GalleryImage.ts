import { model, models, Schema } from "mongoose";

export type GalleryImageDocument = {
  src: string;
  alt: string;
  order: number;
  isActive: boolean;
};

const GalleryImageSchema = new Schema<GalleryImageDocument>(
  {
    src: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const GalleryImageModel =
  models.GalleryImage ||
  model<GalleryImageDocument>("GalleryImage", GalleryImageSchema);
