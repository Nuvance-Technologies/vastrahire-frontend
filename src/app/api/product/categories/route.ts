import { connectToDB } from "@/lib/db/db";
import Category from "@/lib/models/category.model";
import { NextRequest, NextResponse } from "next/server";

// to get all categories
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const categories = await Category.find({}, {_id:1, name:1}).lean();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}