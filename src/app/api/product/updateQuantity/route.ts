import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();
    const { productId, quantity } = body;
    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { message: "Please provide productId and quantity" },
        { status: 400 }
      );
    }
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    product.quantity += quantity;
    await product.save();
    return NextResponse.json(
      { message: "Product quantity updated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}