import { connectToDB } from "@/lib/db/db";
import User from "@/lib/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();

    const {
      firstname,
      lastname,
      email,
      password,
      role,
      phoneNumber,
      companyName,
      address,
      bankAccNo,
      ifscCode,
      brandBio,
    } = body;

    if (!firstname || !email || !password) {
      return NextResponse.json(
        { message: "These fields are required!" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: { firstname, lastname },
      role,
      email,
      password: hashedPassword,
      phoneNumber,
      companyName,
      address,
      bankDetails: {
        accountNumber: bankAccNo,
        ifscCode,
      },
      brandBio,
    });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
