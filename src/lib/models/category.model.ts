import mongoose from "mongoose";

const CATEGORY = ["women", "men", "kids"];

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, enum: CATEGORY, required: true, unique: true },
    subcategories: [
      {
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
