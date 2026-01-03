"use client";

import { useEffect, useState } from "react";
import type { Booking } from "@/types/booking";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      const res = await fetch("/api/bookings");
      const data: Booking[] = await res.json();
      setBookings(data);
    }

    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Bookings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="group border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {b.vehicleType}
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  ID: {b._id.slice(-6)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                  b.status === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : b.status === "ASSIGNED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-indigo-100" />
                  <div className="w-0.5 h-8 bg-gray-300 border-l border-dashed border-gray-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-pink-100" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Pickup
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {b.pickup}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Drop
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {b.drop}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-500">Total Fare</p>
              <p className="text-xl font-bold text-gray-900">₹{b.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      {bookings.length === 0 && (
         <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl">
           <p className="text-gray-400">No bookings found.</p>
         </div>
      )}
    </div>
  );
}