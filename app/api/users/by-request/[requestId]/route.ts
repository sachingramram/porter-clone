import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserAccount } from "@/models/UserAccount";

export async function GET(
  _req: Request,
  context: { params: Promise<{ requestId: string }> }
) {
  await connectDB();

  const { requestId } = await context.params;

  const user = await UserAccount.findOne({ requestId });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    loginId: user.loginId,
    password: user.password,
  });
}
