import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import UserRentalItem from "@/lib/models/userRental.model";
import LenderItem from "@/lib/models/lenderItem.model";

// to rent a product
// check it once not checked properly
export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { productId, quantity, userId, rentalPeriod } = await request.json();

    if (!productId || !userId || !rentalPeriod) {
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

    const userRental = await UserRentalItem.create({
      userID: userId,
      productID: productId,
      activeRentals: quantity,
      totalRentals: quantity,
      totalSpent: product.pPrice * quantity * rentalPeriod,
      rentalPeriod: {
        from: rentalPeriod.from,
        to: rentalPeriod.to,
      },
    });

    const lenderRental = await LenderItem.create({
      userID: userId,
      productID: productId,
      activeRentals: quantity,
      totalEarnings: product.pPrice * quantity * rentalPeriod,
      avgRating: product.avgRating,
    });

    return NextResponse.json(
      {
        message: "Rental successful",
        userRental,
        lenderRental,
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

// to fetch rentals by userID
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
