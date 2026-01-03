"use client";

import { useEffect, useState } from "react";

/* ---------------- Types ---------------- */

interface DashboardData {
  requestId: string;
  status:
    | "NEW"
    | "CONTACTED"
    | "CONFIRMED"
    | "IN_PROGRESS"
    | "COMPLETED";

  name: string;
  company: string;

  // Transport details (filled by admin)
  vehicle?: string;
  fromPlace?: string;
  toPlace?: string;
  transportTime?: string;
  cost?: number;

  itemDescription?: string;
  paymentStatus?: "PENDING" | "PAID" | "COD";
  vehicleLocation?: {
    lat: number;
    lng: number;
    label?: string;
  };

  updatedAt: string;
}

/* ---------------- Component ---------------- */

export default function UserDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard(initial = false) {
      try {
        const res = await fetch("/api/user/dashboard");

        if (!res.ok) {
          window.location.href = "/login";
          return;
        }

        const result: DashboardData = await res.json();
        setData(result);

        if (initial) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Dashboard fetch failed", error);
      }
    }

    // Initial load
    fetchDashboard(true);

    // 🔁 Live tracking refresh
    const intervalId = setInterval(() => {
      fetchDashboard();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium animate-pulse">Loading tracking details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-red-600 text-center mt-10">
        Failed to load booking data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-end mb-6">
           <h1 className="text-3xl font-bold text-gray-900">Tracking Order</h1>
           <span className="text-xs text-gray-400 font-mono">ID: {data.requestId}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Status */}
          <div className="bg-blue-900 p-6 text-white flex justify-between items-center">
             <div>
               <p className="text-slate-400 text-sm uppercase tracking-wide font-semibold">Current Status</p>
               <p className="text-2xl font-bold mt-1 text-white">{data.status.replace("_", " ")}</p>
             </div>
             <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
               📦
             </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            
            {/* Customer Info */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-6">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-semibold text-gray-900">{data.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-semibold text-gray-900">{data.company}</p>
              </div>
            </div>

            {/* Transport Details */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              {data.vehicle ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <div>
                       <p className="text-xs text-gray-400 uppercase font-bold">Vehicle</p>
                       <p className="font-medium text-lg">{data.vehicle}</p>
                     </div>
                     <div>
                       <p className="text-xs text-gray-400 uppercase font-bold">Route</p>
                       <div className="flex items-center gap-2 mt-1">
                          <span className="font-medium">{data.fromPlace || 'Origin'}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium">{data.toPlace || 'Destination'}</span>
                       </div>
                     </div>
                     <div>
                       <p className="text-xs text-gray-400 uppercase font-bold">Schedule</p>
                       <p className="font-medium">
                         {data.transportTime ? new Date(data.transportTime).toLocaleString() : "-"}
                       </p>
                     </div>
                  </div>

                  <div className="space-y-4 border-t md:border-t-0 md:border-l border-gray-200 md:pl-6 pt-4 md:pt-0">
                     <div>
                       <p className="text-xs text-gray-400 uppercase font-bold">Cost Estimate</p>
                       <p className="font-bold text-2xl text-gray-900">₹{data.cost}</p>
                     </div>
                     {data.itemDescription && (
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold">Item Description</p>
                          <p className="font-medium text-gray-800">{data.itemDescription}</p>
                        </div>
                     )}
                     {data.paymentStatus && (
                       <div>
                         <p className="text-xs text-gray-400 uppercase font-bold mb-1">Payment</p>
                         <span className={`px-2 py-1 rounded text-xs font-bold ${
                           data.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                         }`}>
                           {data.paymentStatus}
                         </span>
                       </div>
                     )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">Logistics details are being updated by our operations team.</p>
                </div>
              )}
            </div>

            {/* Live Location */}
            {data.vehicleLocation && (
              <div className="border border-indigo-100 bg-indigo-50/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                   <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </div>
                   <p className="font-bold text-indigo-900">Live Location</p>
                </div>
                <p className="text-indigo-800 font-medium ml-6">
                  {data.vehicleLocation.label ?? `Lat: ${data.vehicleLocation.lat}, Lng: ${data.vehicleLocation.lng}`}
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-right">
             <p className="text-xs text-gray-400">
               Last updated: {new Date(data.updatedAt).toLocaleString()}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}