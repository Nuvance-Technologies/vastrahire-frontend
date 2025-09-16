import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

// to fetch products by ownerID
export async function GET(req: NextRequest) {
  const ownerID = req.url.split("/")[req.url.split("/").length - 1];
  try {
    await connectToDB();
    const products = await Product.find({ ownerID, availability: "active", quantity: { $gt: 0 } }).sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Products fetched successfully", products },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
