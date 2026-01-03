import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";

function generateRequestId() {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `REQ-${year}-${rand}`;
}

export async function POST(req: NextRequest) {
  const { name, company, phone, email } = await req.json();

  if (!name || !company || !phone || !email) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  await connectDB();

  const lead = await Lead.create({
    requestId: generateRequestId(),
    name,
    company,
    phone,
    email,
    status: "NEW",
  });

  return NextResponse.json({
    success: true,
    requestId: lead.requestId,
  });
}
