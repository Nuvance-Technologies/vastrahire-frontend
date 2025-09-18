import { connectToDB } from "@/lib/db/db";
import Category from "@/lib/models/category.model";
import Product from "@/lib/models/product.model";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();

    const {
      pName,
      pPrice,
      pSize,
      pDesc,
      pColor,
      subcategory,
      pDiscount,
      pFabric,
      pPattern,
      pOccasion,
      pLocation,
      quantity,
      category,
      ownerID,
      pImages,
    } = body;

    console.log(pSize)

    if (!pName || !pPrice || !category || !ownerID) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const categoryData = await Category.findOne({ name: category });
    if (!categoryData) {
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of pImages) {
      const uploaded = await uploadImageToCloudinary(file);
      uploadedUrls.push(uploaded.secure_url);
    }

    const newProduct = new Product({
      pName,
      pPrice,
      pSize,
      ownerID,
      pImages: uploadedUrls,
      pDesc: pDesc || "",
      pColor: pColor || "",
      category: categoryData._id,
      subcategory: subcategory || "",
      pDiscount: pDiscount || "",
      pFabric: pFabric || "",
      pPattern: pPattern || "",
      pOccasion: pOccasion || "",
      pLocation: pLocation || "",
      quantity: Number(quantity) || 1,
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Success", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation failed:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const catId = req.nextUrl.searchParams.get("catId");
  try {
    await connectToDB();
    const products = await Product.find({
      category: catId,
      availability: "active",
    });
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

export async function DELETE(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId");
  try {
    await connectToDB();
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Product deleted successfully" },
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