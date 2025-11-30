import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import User from "@/lib/models/user.model";
import Product from "@/lib/models/product.model";
import UserRental from "@/lib/models/userRental.model";

// Helper functions for DB queries
async function fetchLatestRentalForUser(userId: string) {
  return await UserRental.findOne({ userId }).sort({ createdAt: -1 }).lean();
}

async function fetchProductById(productId: string) {
  return await Product.findById(productId).lean();
}

async function fetchOwnerById(ownerId: string) {
  return await User.findById(ownerId).lean();
}

export async function POST(req: Request) {
  // Get userId from request body
  const { userId } = await req.json();

  // Fetch latest rental for user
  const rental = await fetchLatestRentalForUser(userId);
  if (!rental || Array.isArray(rental) || !rental.productID) {
    return NextResponse.json({ success: false, error: "Rental not found or missing productId" }, { status: 404 });
  }

  // Fetch product info
  const product = await fetchProductById(rental.productID);
  if (!product || Array.isArray(product) || !product.ownerID) {
    return NextResponse.json({ success: false, error: "Product not found or missing ownerId" }, { status: 404 });
  }

  // Fetch owner info
  const owner = await fetchOwnerById(product.ownerID);
  if (!owner || Array.isArray(owner) || !owner.email) {
    return NextResponse.json({ success: false, error: "Owner not found or missing email" }, { status: 404 });
  }

  // Setup nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vastrahire@gmail.com",
      pass: "pnym qbqb skmo sudr",
    },
  });

  // Email content for owner
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: owner.email,
    subject: "New Rental Request Received!",
    html: `
      <h2>Dear ${owner.name},</h2>
      <p>A new rental request has been made for your product.</p>
      <h3>Product Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${product.pName}</li>
        <li><strong>Description:</strong> ${product.pDesc}</li>
        <li><strong>Price:</strong> ₹${product.pPrice}</li>
        <li><strong>Options:</strong> Size: ${rental.size}, Quantity: ${rental.quantity}, Dates: ${rental.from} to ${rental.to}</li>
      </ul>
      <h3>Customer Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${rental.customerName || "N/A"}</li>
        <li><strong>Email:</strong> ${rental.customerEmail || "N/A"}</li>
        <li><strong>Phone:</strong> ${rental.customerPhone || "N/A"}</li>
        <li><strong>Address:</strong> ${rental.customerAddress || "N/A"}</li>
      </ul>
      <p>Please check your dashboard for more details.</p>
      <br />
      <p>Thank you for using Vastrahire!</p>
    `,
  };
  const mailOptionsAbhinav = {
    from: process.env.SMTP_USER,
    to: "abhinavpandey7723@gmail.com",
    subject: "New Rental Request Received!",
    html: `
      <h2>Dear ${owner.name},</h2>
      <p>A new rental request has been made for your product.</p>
      <h3>Product Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${product.pName}</li>
        <li><strong>Description:</strong> ${product.pDesc}</li>
        <li><strong>Price:</strong> ₹${product.pPrice}</li>
        <li><strong>Options:</strong> Size: ${rental.size}, Quantity: ${rental.quantity}, Dates: ${rental.from} to ${rental.to}</li>
      </ul>
      <h3>Customer Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${rental.customerName || "N/A"}</li>
        <li><strong>Email:</strong> ${rental.customerEmail || "N/A"}</li>
        <li><strong>Phone:</strong> ${rental.customerPhone || "N/A"}</li>
        <li><strong>Address:</strong> ${rental.customerAddress || "N/A"}</li>
      </ul>
      <p>Please check your dashboard for more details.</p>
      <br />
      <p>Thank you for using Vastrahire!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptionsAbhinav);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error instanceof Error ? error.message : "An unknown error occurred") }, { status: 500 });
  }
}
