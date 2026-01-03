import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { UserAccount } from "@/models/UserAccount";
import { UserSession } from "@/models/UserSession";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { loginId, password } = await req.json();

  if (!loginId || !password) {
    return NextResponse.json(
      { error: "Missing credentials" },
      { status: 400 }
    );
  }

  await connectDB();

  const user = await UserAccount.findOne({ loginId, password });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid login ID or password" },
      { status: 401 }
    );
  }

  const token = crypto.randomUUID();

  await UserSession.create({
    token,
    requestId: user.requestId,
  });

  const res = NextResponse.json({ success: true });

  res.cookies.set("user_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}
