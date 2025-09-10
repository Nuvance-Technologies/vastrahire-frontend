import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/db";
import Onboarding from "@/lib/models/onboarding.model";

export async function POST(req: NextRequest) {
  await connectToDB();
  const body = await req.json();
  const { userId, answers } = body;

  if (!userId || !answers || typeof answers !== "object") {
    return NextResponse.json({ error: "Missing or invalid data" }, { status: 400 });
  }

  try {
    // Upsert: update if exists, else create new
    const onboarding = await Onboarding.findOneAndUpdate(
      { userId },
      { answers },
      { upsert: true, new: true }
    );
    return NextResponse.json({ message: "Onboarding answers saved", onboarding }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save onboarding answers", details: error }, { status: 500 });
  }
}
