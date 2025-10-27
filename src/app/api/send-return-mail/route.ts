import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  // Get data from request body
  const data = await req.json();
  const { userEmail, productName } = data;
    // Setup nodemailer transporter (use your SMTP credentials)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    // Email content
    const mailOptions = {
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
    try {
        // Send email
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, message: "Return email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ success: false, error: "Failed to send return email" }, { status: 500 });
    }
}