"use client";

import type { BookingStatus } from "@/types/booking";

interface Props {
  bookingId: string;
  currentStatus: BookingStatus;
}

export default function StatusDropdown({ bookingId, currentStatus }: Props) {
  async function updateStatus(status: BookingStatus) {
    await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    window.location.reload();
  }

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <select
        className={`appearance-none w-full sm:w-32 px-4 py-2 pr-8 rounded-lg text-xs font-bold uppercase tracking-wide border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all
          ${
            currentStatus === "DELIVERED"
              ? "bg-green-50 text-green-700 border-green-200 focus:ring-green-500"
              : currentStatus === "ASSIGNED"
              ? "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500"
              : "bg-orange-50 text-orange-700 border-orange-200 focus:ring-orange-500"
          }
        `}
        value={currentStatus}
        onChange={(e) => updateStatus(e.target.value as BookingStatus)}
      >
        <option value="PENDING">Pending</option>
        <option value="ASSIGNED">Assigned</option>
        <option value="DELIVERED">Delivered</option>
      </select>
      
      {/* Custom arrow icon overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg
          className={`h-3 w-3 ${
            currentStatus === "DELIVERED"
              ? "text-green-600"
              : currentStatus === "ASSIGNED"
              ? "text-blue-600"
              : "text-orange-600"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}