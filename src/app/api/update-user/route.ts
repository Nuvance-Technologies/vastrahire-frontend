import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/util/emailValidator";

export async function PUT(req: NextRequest) {
  await connectToDB();
  const body = await req.json();
  const { firstname, lastname, email } = body;
  const userId = req.nextUrl.searchParams.get("userId");

//   Optional: Validate email if being updated
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const updateResult = await User.updateOne(
      { _id: userId },
      { $set: { name: { firstname, lastname }, email } }
    );
    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "No changes made to user" }, { status: 400 });
    }
    const updatedUser = await User.findById(userId);
    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user", details: error }, { status: 500 });
  }
}
