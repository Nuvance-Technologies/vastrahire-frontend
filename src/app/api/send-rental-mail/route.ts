import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import User from "@/lib/models/user.model";
import Product from "@/lib/models/product.model";
import UserRental from "@/lib/models/userRental.model";

// Helper functions for DB queries (Mongoose example)
async function fetchUserById(userId: string) {
  return await User.findById(userId).lean();
}

async function fetchLatestRentalForUser(userId: string) {
  // Assumes UserRental has a createdAt field
  return await UserRental.findOne({ userId }).sort({ createdAt: -1 }).lean();
}

async function fetchProductById(productId: string) {
  return await Product.findById(productId).lean();
}

export async function POST(req: Request) {

  // Get userId from request body
  const data = await req.json();
  const { userId, fromTime, toTime } = data;
  console.log(userId, fromTime, toTime)

  // Fetch user info
  const user = await fetchUserById(userId);
  if (!user || Array.isArray(user) || !user.email) {
    return NextResponse.json({ success: false, error: "User not found or missing email" }, { status: 404 });
  }

  // Fetch latest rental for user
  const rental = await fetchLatestRentalForUser(userId);
  if (!rental || Array.isArray(rental) || !rental.productID) {
    return NextResponse.json({ success: false, error: "Rental not found or missing productId" }, { status: 404 });
  }

  // Fetch product info
  const product = await fetchProductById(rental.productID);
  if (!product || Array.isArray(product) || !product.pName) {
    return NextResponse.json({ success: false, error: "Product not found or missing name" }, { status: 404 });
  }

  // Setup nodemailer transporter (use your SMTP credentials)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vastrahires@gmail.com",
      pass: "sfib pljj csza bhxn",
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "Your Rental Request Has Been Received!",
    html: `
      <h2>Dear ${user.name},</h2>
      <p>We have received your rental request and are processing your payment.</p>
      <h3>Product Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${product.pName}</li>
        <li><strong>Description:</strong> ${product.pDesc}</li>
        <li><strong>Price:</strong> ₹${product.pPrice}</li>
        <li><strong>Options:</strong> Size: ${rental.size}, Quantity: ${rental.quantity}, Dates: ${rental.from} : ${fromTime} to ${rental.to} : ${toTime}</li>
      </ul>
      <p>We will contact you shortly with further details.</p>
      <p>If you have any questions, reply to this email.</p>
      <br />
      <p>Thank you for choosing Vastrahire!</p>
    `,
  };

  try {
    const sendEmail = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + sendEmail.response);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error instanceof Error ? error.message : "An unknown error occurred") }, { status: 500 });
  }
}
