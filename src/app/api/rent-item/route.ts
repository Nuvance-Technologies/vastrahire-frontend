import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import UserRentalItem from "@/lib/models/userRental.model";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { productId, quantity, userId, rentalPeriod } = await request.json();

    if (!productId || !quantity || !userId || !rentalPeriod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (product.quantity < quantity) {
      return NextResponse.json(
        { error: "Not enough quantity available" },
        { status: 400 }
      );
    }

    product.quantity -= quantity;
    const updatedProduct = await product.save();

    const rental = await UserRentalItem.create({
      userID: userId,
      productID: productId,
      quantity,
      activeRentals: quantity,
      totalRentals: quantity,
      totalSpent: product.pPrice * quantity * rentalPeriod,
      rentalPeriod,
      rentalDate: new Date(),
    });

    return NextResponse.json(
      {
        message: "Rental successful",
        rental,
        updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing rental:", error);
    return NextResponse.json(
      { error: "Failed to process rental" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (userId) {
    try {
      const rentals = await UserRentalItem.find({ userID: userId }).populate(
        "productID"
      );
      return NextResponse.json(rentals, { status: 200 });
    } catch (error) {
      console.error("Error fetching rentals:", error);
      return NextResponse.json(
        { error: "Failed to fetch rentals" },
        { status: 500 }
      );
    }
  }
}
