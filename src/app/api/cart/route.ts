import Cart from "@/lib/models/cart.model";
import Product from "@/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export interface CartItemI {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
    try {
    const { userId, productId, quantity } = await req.json();

    if (!userId || !productId || !quantity) {
      return NextResponse.json({ message: "userId, productId, and quantity are required" }, { status: 400 });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item: CartItemI) => item.productId.toString() === productId
      );

      if (existingItem) {
        // update quantity
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    return NextResponse.json({ message: "Cart updated successfully", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "userId is required" }, { status: 400 });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Cart fetched successfully", cart });
  } catch (err) {
    console.error("Fetch cart error:", err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json({ message: "userId and productId are required" }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    cart.items = cart.items.filter(
      (item: CartItemI) => item.productId.toString() !== productId
    );

    await cart.save();
    return NextResponse.json({ message: "Item removed from cart", cart });
  } catch (err) {
    console.error("Remove from cart error:", err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId, productId, quantity } = await req.json();

    if (!userId || !productId || !quantity) {
      return NextResponse.json({ message: "userId, productId, and quantity are required" }, { status: 400 });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const item = cart.items.find(
      (item: CartItemI) => item.productId.toString() === productId
    );

    if (!item) {
      return NextResponse.json({ message: "Item not found in cart" }, { status: 404 });
    }

    item.quantity = quantity;
    await cart.save();
    return NextResponse.json({ message: "Cart item updated", cart });
  } catch (err) {
    console.error("Update cart error:", err);
    return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
  }
}