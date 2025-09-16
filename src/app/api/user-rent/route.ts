import { connectToDB } from "@/lib/db/db";
import UserRentalItem from "@/lib/models/userRental.model";
import { NextRequest, NextResponse } from "next/server";
import "@/lib/models/product.model"; // ensure Product model is registered
import "@/lib/models/user.model";    // ensure User model is registered if ownerID is populated

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    await connectToDB();

    const userRentals = await UserRentalItem.find({ userID: userId })
      .populate({
        path: "productID",
        model: "Product",
        populate: {
          path: "ownerID",
          model: "User",
        },
      });

    const totalSpentOfAllProducts = userRentals.reduce(
      (total, rental) => total + rental.totalSpent,
      0
    );

    const totalRentedItems = userRentals.reduce(
      (total, rental) => total + rental.totalRentals,
      0
    );

    return NextResponse.json(
      { userRentals, totalSpentOfAllProducts, totalRentedItems },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return NextResponse.json(
      { error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
}
