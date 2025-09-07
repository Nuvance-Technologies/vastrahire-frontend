import mongoose from "mongoose";

const userRentalItemSchema = new mongoose.Schema(
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
    totalRentals: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    rentalPeriod: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const UserRentalItem =
  mongoose.models.UserRentalItem ||
  mongoose.model("UserRentalItem", userRentalItemSchema);

export default UserRentalItem;
