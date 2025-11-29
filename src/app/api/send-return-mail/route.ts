import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/db/db";
import User from "@/lib/models/user.model";

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
    console.log("Owner Data: ", userData);
    if (!userData) {
        return NextResponse.json({ success: false, error: "Owner not found" }, { status: 404 });
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
    const mailOptionsCustomer = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: "Return Confirmation for Your Rental",
        html: `
      <h1>Return Confirmation</h1>
      <p>Dear Customer,</p>
        <p>We have received your return request for the product: <strong>${productName}</strong>.</p>
        <p>Please ensure that the product is returned by <strong>12 P.M.</strong>.</p>
        <p>We would appreciate it if you could provide feedback on why you are returing the product early</p>
        <p>It would help us improve our services.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Please make sure to pack the item securely to avoid any damage during transit.</p>
        <p>Thank you for using our rental service!</p>
        <br/>
        <p>Best regards,</p>
        <p>The Vastrahire Team</p>
    `,
    };

    const mailOptionsOwner = {
        from: process.env.SMTP_USER,
        to: userData.email,
        subject: "Product Return Notification",
        html: `
      <h1>Product Return Notification</h1>
        <p>Dear Owner,</p>
        <p>The product: <strong>${productName}</strong> rented by <strong>${userEmail}</strong> is scheduled for return by 12 P.M. today.</p>
        <p>Please prepare to receive the returned item and inspect it for any damages.</p>
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
        return NextResponse.json({ success: true, message: "Return email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ success: false, error: "Failed to send return email" }, { status: 500 });
    }
}