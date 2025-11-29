import { connectToDB } from "@/lib/db/db";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import Product from "@/lib/models/product.model";
import User from "@/lib/models/user.model";
import { getMaxListeners } from "events";

export async function POST(req: Request) {
    await connectToDB();
    // Get data from request body
    const data = await req.json();
    const { userEmail, productName, productID } = data;

    const productData = await Product.findById(productID);
    if (!productData) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const userData = await User.findOne({ _id: productData.ownerID });

    // Setup nodemailer transporter (use your SMTP credentials)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "vastrahires@gmail.com",
            pass: "sfib pljj csza bhxn",
        },
    });
    // Email content
    const mailOptionsCustomer = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: "Cancellation Confirmation for Your Rental",
        html: `
      <h1>Cancellation Confirmation</h1>
      <p>Dear Customer,</p>
        <p>Your rental for the product: <strong>${productName}</strong> has been successfully cancelled.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <br/>
        <p>Best regards,</p>
        <p>The Vastrahire Team</p>
    `,
    };

    const mailOptionsOwner = {
        from: process.env.SMTP_USER,
        to: userData.email,
        subject: "Product Rental Cancellation Notification",
        html: `
        <h1>Product Rental Cancellation Notification</h1>
        <p>Dear Owner,</p>
        <p>The rental for the product: <strong>${productName}</strong> by <strong>${userEmail}</strong> has been cancelled.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <br/>
        <p>Best regards,</p>
        <p>The Vastrahire Team</p>
    `,
    };
    try {
        // Send email
        await transporter.sendMail(mailOptionsCustomer);
        await transporter.sendMail(mailOptionsOwner);
        return NextResponse.json({ success: true, message: "Cancellation email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
    }
}