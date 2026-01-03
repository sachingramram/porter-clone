export type BookingStatus = "PENDING" | "ASSIGNED" | "DELIVERED";

export interface Booking {
  _id: string;
  vehicleType: "BIKE" | "MINI_TRUCK" | "TRUCK";
  pickup: string;
  drop: string;
  distanceKm: number;
  price: number;
  status: BookingStatus;
  createdAt: string;
}
