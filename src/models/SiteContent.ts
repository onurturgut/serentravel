import { model, models, Schema } from "mongoose";
import type { SiteContent } from "@/lib/site-defaults";

const ValueCardSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const SiteContentSchema = new Schema<SiteContent>(
  {
    home: { type: Schema.Types.Mixed, required: true },
    tours: { type: Schema.Types.Mixed, required: true },
    about: {
      heroEyebrow: String,
      heroTitle: String,
      heroDescription: String,
      valuesEyebrow: String,
      valuesTitle: String,
      values: { type: [ValueCardSchema], default: [] },
    },
    contact: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const SiteContentModel =
  models.SiteContent || model<SiteContent>("SiteContent", SiteContentSchema);
