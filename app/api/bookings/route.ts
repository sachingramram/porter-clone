import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { calculatePrice } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { vehicleType, pickup, drop, distanceKm } = body;

  await connectDB();

  const price = calculatePrice(vehicleType, distanceKm);

  const booking = await Booking.create({
    vehicleType,
    pickup,
    drop,
    distanceKm,
    price,
    status: "PENDING",
  });

  return NextResponse.json(booking);
}

export async function GET() {
  await connectDB();
  const bookings = await Booking.find().sort({ createdAt: -1 });
  return NextResponse.json(bookings);
}
