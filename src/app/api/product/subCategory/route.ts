import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

// to fetch products by subcategory and category
export async function GET(req: NextRequest) {
  const subCat = req.nextUrl.searchParams.get("subCat");
  const catId = req.nextUrl.searchParams.get("catId");
  try {
    await connectToDB();
    const products = await Product.find({
      subcategory: { $regex: new RegExp('^' + subCat + '$', 'i') },
      category: catId,
      availability: "active",
    });
    return NextResponse.json(
      { message: "Products fetched successfully", products },
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
