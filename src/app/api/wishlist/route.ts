import Cart from "@/lib/models/cart.model";
import Product from "@/lib/models/product.model";
import WishList from "@/lib/models/wishlist.model";
import { NextRequest, NextResponse } from "next/server";

export interface CartItemI {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
    try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ message: "userId and productId are required" }, { status: 400 });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    let wishlist = await WishList.findOne({ userId });

    if (!wishlist) {
      // create new wishlist
      wishlist = new WishList({
        userId,
        items: [{ productId }],
      });
    } else {
      const existingItem = wishlist.items.find(
        (item: CartItemI) => item.productId.toString() === productId
      );

      if (existingItem) {
        return NextResponse.json({ message: "Item already in wishlist" }, { status: 400 });
      }
    }

    await wishlist.save();
    return NextResponse.json({ message: "Wishlist updated successfully", wishlist });
  } catch (err) {
    console.error("Add to wishlist error:", err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "userId is required" }, { status: 400 });
  }

  try {
    const wishlist = await WishList.findOne({ userId }).populate("items.productId");

    if (!wishlist) {
      return NextResponse.json({ message: "Wishlist not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Wishlist fetched successfully", wishlist });
  } catch (err) {
    console.error("Fetch wishlist error:", err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ message: "userId and productId are required" }, { status: 400 });
    }

    const wishlist = await WishList.findOne({ userId });

    if (!wishlist) {
      return NextResponse.json({ message: "Wishlist not found" }, { status: 404 });
    }

    wishlist.items = wishlist.items.filter(
      (item: CartItemI) => item.productId.toString() !== productId
    );

    await wishlist.save();
    return NextResponse.json({ message: "Item removed from wishlist", wishlist });
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}