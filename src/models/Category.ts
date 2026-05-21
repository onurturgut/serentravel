import { model, models, Schema } from "mongoose";

export type CategoryDocument = {
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
};

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const CategoryModel =
  models.Category || model<CategoryDocument>("Category", CategorySchema);
