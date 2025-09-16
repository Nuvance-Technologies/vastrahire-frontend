import mongoose from "mongoose";

const WishListItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
});

const WishListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [WishListItemSchema],
});

const WishList = mongoose.models.WishList || mongoose.model("WishList", WishListSchema);

export default WishList;
