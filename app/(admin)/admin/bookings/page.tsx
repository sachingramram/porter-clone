"use client";

import { useEffect, useState } from "react";
import type { Booking, BookingStatus } from "@/types/booking";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  /* ---------------- Fetch bookings ---------------- */
  useEffect(() => {
    let isMounted = true;

    async function loadBookings() {
      const res = await fetch("/api/bookings");
      const data: Booking[] = await res.json();

      if (isMounted) {
        setBookings(data);
      }
    }

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ---------------- Update status ---------------- */
  async function updateStatus(id: string, status: BookingStatus) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    // re-fetch
    const res = await fetch("/api/bookings");
    const data: Booking[] = await res.json();
    setBookings(data);
  }

  /* ---------------- Delete booking ---------------- */
  async function deleteBooking(id: string) {
    if (!confirm("Delete this booking?")) return;

    await fetch(`/api/bookings/${id}`, { method: "DELETE" });

    // re-fetch
    const res = await fetch("/api/bookings");
    const data: Booking[] = await res.json();
    setBookings(data);
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">All Bookings</h1>
        <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
          {bookings.length} Total
        </span>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-lg font-bold text-gray-800">
                  {b.vehicleType}
                </p>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-sm border border-emerald-100">
                  ₹{b.price}
                </span>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-500 font-medium text-xs">
                  FROM
                </span>
                {b.pickup}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-500 font-medium text-xs">
                  TO
                </span>
                {b.drop}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 text-sm font-medium transition-colors cursor-pointer"
                  value={b.status}
                  onChange={(e) =>
                    updateStatus(b._id, e.target.value as BookingStatus)
                  }
                >
                  <option value="PENDING">Pending</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => deleteBooking(b._id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No active bookings available.</p>
          </div>
        )}
      </div>
    </div>
  );
}