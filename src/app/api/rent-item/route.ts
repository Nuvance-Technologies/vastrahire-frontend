import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/db";
import Product from "@/lib/models/product.model";
import UserRentalItem from "@/lib/models/userRental.model";
import LenderItem from "@/lib/models/lenderItem.model";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";

// Helper function to calculate days between dates
function calculateRentalDays(from: Date, to: Date): number {
  const diffTime = Math.abs(new Date(to).getTime() - new Date(from).getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper function to validate rental period
function validateRentalPeriod(
  from: Date,
  to: Date
): { isValid: boolean; error?: string } {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ignore current time, only compare date

  if (fromDate < today) {
    return { isValid: false, error: "Rental start date cannot be in the past" };
  }
  if (toDate <= fromDate) {
    return {
      isValid: false,
      error: "Rental end date must be after start date",
    };
  }
  return { isValid: true };
}

// to rent a product
export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { productId, quantity, userId, from, to } = await request.json();

    if (!productId || !userId || !from || !to || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json(
        { error: "Invalid quantity. Must be a positive number" },
        { status: 400 }
      );
    }

    const periodValidation = validateRentalPeriod(from, to);
    if (!periodValidation.isValid) {
      return NextResponse.json(
        { error: periodValidation.error },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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

    // calculate cost
    const rentalDays = calculateRentalDays(from, to);
    const totalCost = product.pPrice * quantity * rentalDays;

    // update product quantity
    product.quantity -= quantity;
    const updatedProduct = await product.save();

    // create a new user rental record
    const userRental = await UserRentalItem.create({
      userID: new mongoose.Types.ObjectId(userId),
      productID: new mongoose.Types.ObjectId(productId),
      totalRentals: quantity,
      totalSpent: totalCost,
      rentalPeriod: {
        from: new Date(from),
        to: new Date(to),
      },
    });

    // create a new lender rental record
    const lenderRental = await LenderItem.create({
      userID: userId,
      ownerID: product.ownerID,
      productID: productId,
      totalEarnings: totalCost,
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
