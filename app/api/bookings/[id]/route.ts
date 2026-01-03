import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";

/**
 * PATCH → Update booking status (Admin use)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const body = await req.json();
  const { status } = body;

  if (!status) {
    return NextResponse.json(
      { error: "Status is required" },
      { status: 400 }
    );
  }

  await connectDB();

  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updatedBooking) {
    return NextResponse.json(
      { error: "Booking not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedBooking);
}

/**
 * DELETE → Remove booking (optional admin action)
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await connectDB();

  const deletedBooking = await Booking.findByIdAndDelete(id);

  if (!deletedBooking) {
    return NextResponse.json(
      { error: "Booking not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Booking deleted successfully",
  });
}
