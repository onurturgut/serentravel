import { model, models, Schema } from "mongoose";
import type { SiteSettings } from "@/lib/site-defaults";

const LinkSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const SiteSettingsSchema = new Schema<SiteSettings>(
  {
    brandInitials: { type: String, required: true, trim: true },
    brandTop: { type: String, required: true, trim: true },
    brandBottom: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, required: true, trim: true },
    whatsappMessage: { type: String, required: true, trim: true },
    instagramUrl: { type: String, required: true, trim: true },
    instagramLabel: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    footerDescription: { type: String, required: true, trim: true },
    footerBottomText: { type: String, required: true, trim: true },
    navLinks: { type: [LinkSchema], default: [] },
  },
  { timestamps: true },
);

export const SiteSettingsModel =
  models.SiteSettings ||
  model<SiteSettings>("SiteSettings", SiteSettingsSchema);
