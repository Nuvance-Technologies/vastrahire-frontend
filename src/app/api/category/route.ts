import { connectToDB } from "@/lib/db/db";
import Category from "@/lib/models/category.model";
import { NextRequest, NextResponse } from "next/server";

// to add categories and subcategories
export async function POST(request: NextRequest) {
  const { name, subcategories } = await request.json();
  try {
    connectToDB();
    const cat = await Category.create({ name, subcategories });
    return NextResponse.json(
      { message: "Category added successfully", cat },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// to fetch categories and subcategories
export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const name = req.nextUrl.searchParams.get("name");

    const query = name ? { name } : {};
    const categories = await Category.find(query);

    return NextResponse.json(
      { message: "Categories fetched successfully", categories },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
