import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// to add products
export async function POST(req: Request) {
  await connectToDB();

  const formData = await req.formData();

  const pName = formData.get("pName");
  const pPrice = formData.get("pPrice");
  const pSize = formData.get("pSize");
  const pDesc = formData.get("pDesc") || "";
  const pColor = formData.get("pColor") || "";
  const subcategory = formData.get("subcategory") || "";
  const pDiscount = formData.get("pDiscount") || "";
  const pFabric = formData.get("pFabric") || "";
  const pPattern = formData.get("pPattern") || "";
  const pOccasion = formData.get("pOccasion") || "";
  const pLocation = formData.get("pLocation") || "";
  const quantity = formData.get("quantity") || 1;
  const category = formData.get("category");
  const ownerID = formData.get("ownerID");

  if (!pName || !pPrice || !pSize || !category || !ownerID) {
    return NextResponse.json(
      { message: "Please provide all required fields" },
      { status: 400 }
    );
  }

  const files = formData.getAll("pImages") as File[];
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure folder exists
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
    pSize,
    ownerID,
    pImages: uploadedUrls,
    pDesc,
    pColor,
    category,
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
