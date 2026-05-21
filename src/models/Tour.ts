import { model, models, Schema } from "mongoose";

export type TourDocument = {
  slug: string;
  title: string;
  category: string;
  short: string;
  description: string;
  image: string;
  duration: string;
  type: string;
  booking: string;
  included: string[];
  stops: string[];
  notes: string[];
  gallery: string[];
  order: number;
  isFeatured: boolean;
  isActive: boolean;
};

const TourSchema = new Schema<TourDocument>(
  {
    slug: { type: String, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    short: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    booking: { type: String, required: true, trim: true },
    included: { type: [String], default: [] },
    stops: { type: [String], default: [] },
    notes: { type: [String], default: [] },
    gallery: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const TourModel = models.Tour || model<TourDocument>("Tour", TourSchema);
