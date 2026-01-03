import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";

export async function GET() {
  await connectDB();

  // 🔥 Explicitly fetch all fields
  const leads = await Lead.find({})
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(leads);
}
