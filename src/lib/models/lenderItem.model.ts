import mongoose from "mongoose";

const lenderItemSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    activeRentals: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    avgRating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true }
);

const LenderItem =
  mongoose.models.LenderItem || mongoose.model("LenderItem", lenderItemSchema);

export default LenderItem;
