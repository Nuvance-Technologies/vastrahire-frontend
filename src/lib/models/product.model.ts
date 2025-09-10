import mongoose from "mongoose";

const LENDER_AVAILABILITY = ["active", "rented"];

const productSchema = new mongoose.Schema(
  {
    pName: { type: String, required: true },
    pPrice: { type: Number, required: true },
    pDesc: { type: String },

    pSize: { type: String, required: true },
    pImages: [{ type: String }],
    pColor: { type: String },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },

    pDiscount: { type: String },
    pFabric: { type: String },
    pPattern: { type: String },
    pOccasion: { type: String },

    availability: {
      type: String,
      enum: LENDER_AVAILABILITY,
      default: "active",
    },

    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pLocation: { type: String },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
