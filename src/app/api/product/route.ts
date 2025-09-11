import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Category from "@/lib/models/category.model";

// to add products
export async function POST(req: Request) {
  await connectToDB();

  const formData = await req.formData();

  const pName = formData.get("pName");
  const pPrice = formData.get("pPrice");

  const rawPSize = formData.get("pSize") as string;
  const pSize = rawPSize ? rawPSize.split(",").map((s) => s.trim()) : [];

  const pDesc = formData.get("pDesc") || "";
  const pColor = formData.get("pColor") || "";
  const subcategory = formData.get("subcategory") || "";
  const pDiscount = formData.get("pDiscount") || "";
  const pFabric = formData.get("pFabric") || "";
  const pPattern = formData.get("pPattern") || "";
  const pOccasion = formData.get("pOccasion") || "";
  const pLocation = formData.get("pLocation") || "";
  const quantity = Number(formData.get("quantity")) || 1;
  const category = formData.get("category");
  const ownerID = formData.get("ownerID");

  if (!pName || !pPrice || !pSize.length || !category || !ownerID) {
    return NextResponse.json(
      { message: "Please provide all required fields" },
      { status: 400 }
    );
  }

  const categoryData = await Category.findOne({ name: category });
  if (!categoryData) {
    return NextResponse.json({ message: "Invalid category" }, { status: 400 });
  }
  const categoryId = categoryData._id;

  const files = formData.getAll("pImages") as File[];
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    uploadedUrls.push(`/uploads/${filename}`);
  }

  const newProduct = new Product({
    pName,
    pPrice,
    pSize, // ✅ saved as ["M","L","XL"]
    ownerID,
    pImages: uploadedUrls,
    pDesc,
    pColor,
    category: categoryId,
    subcategory,
    pDiscount,
    pFabric,
    pPattern,
    pOccasion,
    pLocation,
    quantity,
  });

  await newProduct.save();

  return NextResponse.json(
    { message: "Success", product: newProduct },
    { status: 201 }
  );
}

// to fetch products based on category
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
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// delete product by ID
export async function DELETE(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) {
    return NextResponse.json(
      { message: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    await Product.findByIdAndDelete(productId);
    return NextResponse.json(
      { message: "Product deleted successfully" },
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
