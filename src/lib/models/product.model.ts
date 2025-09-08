import mongoose from "mongoose";

const PRODUCT_SIZE = ["XS", "S", "M", "L", "XL", "XXL"];
const PRODUCT_DIS = ["0%", "10%", "20%", "30%", "40%", "above 40%"];
const PRODUCT_FABRIC = ["cotton", "silk", "georgette", "linen", "chiffon"];
const PRODUCT_PATTERN = ["embroidered", "floral", "geometric", "abstract"];
const PRODUCT_OCCASION = ["casual", "formal", "party", "ethnic", "festive"];
const LENDER_AVAILABILITY = ["active", "rented"];

const productSchema = new mongoose.Schema(
  {
    pName: { type: String, required: true },
    pBrand: { type: String },
    pPrice: { type: Number, required: true },
    pDesc: { type: String },

    pSize: { type: String, enum: PRODUCT_SIZE },
    pImages: [{ type: String }],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },

    pDiscount: { type: String, enum: PRODUCT_DIS },
    pFabric: { type: String, enum: PRODUCT_FABRIC },
    pPattern: { type: String, enum: PRODUCT_PATTERN },
    pOccasion: { type: String, enum: PRODUCT_OCCASION },

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
