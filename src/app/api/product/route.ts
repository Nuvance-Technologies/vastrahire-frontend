import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    pName,
    pBrand,
    pPrice,
    pDesc,
    pSize,
    pImages,
    pCat,
    pColor,
    pDiscount,
    pFabric,
    pPattern,
    pOccasion,
    ownerID,
    pLocation,
    availability,
    quantity,
  } = body;

  try {
    await connectToDB();
    if (
      !ownerID ||
      !pName ||
      !pPrice ||
      !pSize ||
      !pCat ||
      !pBrand ||
      !pFabric
    ) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }

    const newProduct = new Product({
      pName,
      pBrand,
      pPrice,
      pDesc,
      pSize,
      pImages,
      pCat,
      pColor,
      pDiscount,
      pFabric,
      pPattern,
      pOccasion,
      ownerID,
      pLocation,
      availability,
      quantity,
    });
    await newProduct.save();
    return NextResponse.json({
      message: "Product added successfully",
      product: newProduct,
      status: 201,
    });
  } catch (error) {
    console.log("Error in adding product", error);
    return NextResponse.json({
      message: "Error in adding product",
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const products = await Product.find({ _id: productId });
    if (!products) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
