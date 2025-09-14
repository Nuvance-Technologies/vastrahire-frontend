import { connectToDB } from "@/lib/db/db";
import LenderItem from "@/lib/models/lenderItem.model";
import { NextRequest, NextResponse } from "next/server";
import "@/lib/models/product.model";

export async function GET(req: NextRequest) {
  const ownerId = req.nextUrl.searchParams.get("ownerId");
  if (ownerId) {
    try {
      await connectToDB();
      const lenderRentals = await LenderItem.find({
        ownerID: ownerId,
      }).populate("productID");

      const totalEarningOfAllProducts = lenderRentals.reduce(
        (total, rental) => total + rental.totalEarnings,
        0
      );
      return NextResponse.json(
        { lenderRentals, totalEarningOfAllProducts },
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
}
