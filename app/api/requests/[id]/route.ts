import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { UserAccount } from "@/models/UserAccount";
import { generateLoginId, generatePassword } from "@/lib/credentials";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();

    const {
      status,
      vehicle,
      fromPlace,
      toPlace,
      transportTime,
      cost,
    } = body;

    // 🔥 Build update object SAFELY
    const updateData: Record<string, unknown> = {};

    if (status) updateData.status = status;
    if (vehicle) updateData.vehicle = vehicle;
    if (fromPlace) updateData.fromPlace = fromPlace;
    if (toPlace) updateData.toPlace = toPlace;
    if (transportTime) updateData.transportTime = transportTime;
    if (cost !== undefined && cost !== null)
      updateData.cost = cost;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No data to update" },
        { status: 400 }
      );
    }
    const {
  itemDescription,
  paymentStatus,
  vehicleLocation,
} = body;

if (itemDescription)
  updateData.itemDescription = itemDescription;

if (paymentStatus)
  updateData.paymentStatus = paymentStatus;

if (vehicleLocation)
  updateData.vehicleLocation = vehicleLocation;

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    // 🔐 Auto-create login on CONFIRMED
    if (status === "CONFIRMED") {
      const exists = await UserAccount.findOne({
        requestId: updatedLead.requestId,
      });

      if (!exists) {
        await UserAccount.create({
          requestId: updatedLead.requestId,
          loginId: generateLoginId(updatedLead.email),
          password: generatePassword(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    console.error("PATCH /api/requests error:", error);
    return NextResponse.json(
      { success: false, error: "Update failed" },
      { status: 500 }
    );
  }
}
