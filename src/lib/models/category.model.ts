import mongoose from "mongoose";

const CATEGORY = ["women", "men", "kids"];

const SUBCATEGORY = {
  women: [
    "clothes",
    "jewellery",
    "footwear",
    "handbags",
    "watches",
    "accessories",
  ],
  men: ["clothes", "shoes", "watches", "accessories"],
  kids: ["clothes", "toys", "footwear", "accessories"],
};

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
