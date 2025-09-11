import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId");
  try {
    await connectToDB();
    const product = await Product.findById(productId);
    return NextResponse.json(
      { message: "Product fetched successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
