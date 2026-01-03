import { Schema, model, models } from "mongoose";

export type BookingStatus = "PENDING" | "ASSIGNED" | "DELIVERED";

export interface IBooking {
  userId: string;
  vehicleType: "BIKE" | "MINI_TRUCK" | "TRUCK";
  pickup: string;
  drop: string;
  distanceKm: number;
  price: number;
  status: BookingStatus;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    vehicleType: {
      type: String,
      enum: ["BIKE", "MINI_TRUCK", "TRUCK"],
      required: true,
    },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "ASSIGNED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Booking =
  models.Booking || model<IBooking>("Booking", BookingSchema);
