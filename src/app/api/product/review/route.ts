import { connectToDB } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import ProductReview from "@/lib/models/product-review.model";

// to add product reviews
export async function POST(req: NextRequest) {
  await connectToDB();

  const formData = await req.formData();

  const productId = formData.get("productId");
  const userId = formData.get("userId");
  const rating = formData.get("rating");
  const comment = formData.get("comment") || "";
  const files = formData.getAll("pImages") as File[];

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads/reviews");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    uploadedUrls.push(`/uploads/reviews/${filename}`);
  }

  try {
    const newReview = new ProductReview({
      productId,
      userId,
      rating: Number(rating),
      comment,
      images: uploadedUrls,
    });
    await newReview.save();

    return NextResponse.json({ review: newReview }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
