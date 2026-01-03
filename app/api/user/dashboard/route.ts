import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { UserSession } from "@/models/UserSession";
import { Lead } from "@/models/Lead";

export async function GET() {
  // ✅ Next.js 15 fix: await cookies()
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const session = await UserSession.findOne({ token });
  if (!session) {
    return NextResponse.json(
      { error: "Invalid session" },
      { status: 401 }
    );
  }

  const lead = await Lead.findOne({
    requestId: session.requestId,
  });

  if (!lead) {
    return NextResponse.json(
      { error: "Booking not found" },
      { status: 404 }
    );
  }

 return NextResponse.json({
  requestId: lead.requestId,
  status: lead.status,
  name: lead.name,
  company: lead.company,

  vehicle: lead.vehicle,
  fromPlace: lead.fromPlace,
  toPlace: lead.toPlace,
  transportTime: lead.transportTime,
  cost: lead.cost,

  itemDescription: lead.itemDescription,
paymentStatus: lead.paymentStatus,
vehicleLocation: lead.vehicleLocation,


  updatedAt: lead.updatedAt,
});

}
