"use client";

import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED";

interface Lead {
  _id: string;
  requestId: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: LeadStatus;
  createdAt: string;

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
}

/* ================= COMPONENT ================= */

export default function AdminRequestsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // transport edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [details, setDetails] = useState({
    vehicle: "",
    fromPlace: "",
    toPlace: "",
    transportTime: "",
    cost: "",
    itemDescription: "",
    paymentStatus: "PENDING",
    lat: "",
    lng: "",
    locationLabel: "",
  });

  /* ========== LOAD REQUESTS ========== */
  useEffect(() => {
    let mounted = true;

    async function loadRequests() {
      const res = await fetch("/api/requests/admin");
      const data: Lead[] = await res.json();

      if (mounted) {
        setLeads(data);
        setLoading(false);
      }
    }

    loadRequests();
    return () => {
      mounted = false;
    };
  }, []);

  /* ========== UPDATE STATUS ========== */
  async function updateStatus(id: string, status: LeadStatus) {
    const res = await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      alert("Failed to save transport details");
      return;
    }
    const result = await res.json();
    if (!result.success) {
      alert("Failed to update status");
      return;
    }

    setLeads((prev) =>
      prev.map((l) => (l._id === id ? { ...l, status } : l))
    );
  }

  /* ========== VIEW LOGIN CREDENTIALS ========== */
  async function viewCredentials(requestId: string) {
    const res = await fetch(`/api/users/by-request/${requestId}`);
    const data = await res.json();

    if (!res.ok || data.error) {
      alert("Login credentials not found");
      return;
    }

    alert(`Login ID: ${data.loginId}\nPassword: ${data.password}`);
  }

  /* ========== SAVE TRANSPORT DETAILS ========== */
  async function saveTransportDetails(id: string) {
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicle: details.vehicle,
        fromPlace: details.fromPlace,
        toPlace: details.toPlace,
        transportTime: details.transportTime
          ? new Date(details.transportTime)
          : null,
        cost: details.cost ? Number(details.cost) : null,

        itemDescription: details.itemDescription,
        paymentStatus: details.paymentStatus,
        vehicleLocation:
          details.lat && details.lng
            ? {
                lat: Number(details.lat),
                lng: Number(details.lng),
                label: details.locationLabel,
              }
            : null,
      }),
    });

    setEditId(null);
    setDetails({
      vehicle: "",
      fromPlace: "",
      toPlace: "",
      transportTime: "",
      cost: "",
      itemDescription: "",
      paymentStatus: "PENDING",
      lat: "",
      lng: "",
      locationLabel: "",
    });

    const res = await fetch("/api/requests/admin");
    const data: Lead[] = await res.json();
    setLeads(data);
  }

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 text-gray-400 animate-pulse">
        <svg
          className="w-10 h-10 mb-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="font-medium">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Enterprise Requests
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage incoming leads and assign logistics details.
          </p>
        </div>
        <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
          {leads.length} Active Leads
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-4">
            📭
          </div>
          <p className="text-gray-900 font-semibold text-lg">
            No requests found
          </p>
          <p className="text-gray-500 text-sm mt-1">
            New enterprise requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {leads.map((l) => (
            <div
              key={l._id}
              className={`group border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
                l.status === "NEW" ? "ring-2 ring-blue-500/20" : ""
              }`}
            >
              {/* === CARD HEADER === */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        {l.name}
                      </h3>
                      {l.status === "NEW" && (
                        <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-indigo-600 flex items-center gap-2">
                      🏢 {l.company}
                    </p>
                  </div>

                  {/* Status Controller */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <div className="text-right hidden lg:block">
                      <p className="text-xs text-gray-400 font-mono">
                        ID: {l.requestId}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(l.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="relative w-full sm:w-48">
                      <select
                        value={l.status}
                        onChange={(e) =>
                          updateStatus(l._id, e.target.value as LeadStatus)
                        }
                        className={`appearance-none w-full border p-2.5 pl-4 pr-10 rounded-lg text-xs font-bold uppercase tracking-wide cursor-pointer focus:outline-none focus:ring-2 transition-all ${
                          l.status === "COMPLETED"
                            ? "bg-green-50 text-green-700 border-green-200 focus:ring-green-500"
                            : l.status === "NEW"
                            ? "bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500"
                            : l.status === "IN_PROGRESS"
                            ? "bg-orange-50 text-orange-700 border-orange-200 focus:ring-orange-500"
                            : "bg-white text-gray-700 border-gray-300 focus:ring-gray-400"
                        }`}
                      >
                        <option value="NEW">New Request</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Grid */}
                <div className="mt-4 flex flex-wrap gap-4 md:gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-gray-100 shadow-sm">
                    <span className="text-gray-400">📞</span>
                    <span className="font-medium">{l.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-gray-100 shadow-sm">
                    <span className="text-gray-400">✉️</span>
                    <span className="font-medium">{l.email}</span>
                  </div>
                  <div className="lg:hidden flex items-center gap-2">
                    <span className="text-gray-400">#</span>
                    <span className="font-mono text-xs">{l.requestId}</span>
                  </div>
                </div>
              </div>

              {/* === CARD BODY (Logistics) === */}
              <div className="p-6">
                {(l.vehicle ||
                  l.itemDescription ||
                  l.paymentStatus ||
                  l.vehicleLocation) && (
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                      Logistics Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 text-sm">
                      {/* Column 1 */}
                      <div className="space-y-4">
                        {l.vehicle && (
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Assigned Vehicle
                            </p>
                            <p className="font-bold text-slate-800 flex items-center gap-2">
                              🚛 {l.vehicle}
                            </p>
                          </div>
                        )}
                        {l.itemDescription && (
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Item Description
                            </p>
                            <p className="font-medium text-slate-800 bg-white inline-block px-2 py-1 rounded border border-slate-200">
                              {l.itemDescription}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-4">
                        {(l.fromPlace || l.toPlace) && (
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Route</p>
                            <div className="flex flex-col gap-1 font-medium text-slate-800">
                              <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                {l.fromPlace || "Origin"}
                              </span>
                              <span className="border-l-2 border-dashed border-slate-300 h-3 ml-[3px]"></span>
                              <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                {l.toPlace || "Destination"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Column 3 */}
                      <div className="space-y-4">
                        {l.transportTime && (
                          <div>
                            <p className="text-xs text-slate-500 mb-1">
                              Scheduled Time
                            </p>
                            <p className="font-medium text-slate-800">
                              🗓️ {new Date(l.transportTime).toLocaleString()}
                            </p>
                          </div>
                        )}
                        <div className="flex gap-4">
                          {l.cost !== undefined && (
                            <div>
                              <p className="text-xs text-slate-500 mb-1">
                                Cost
                              </p>
                              <p className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                                ₹{l.cost}
                              </p>
                            </div>
                          )}
                          {l.paymentStatus && (
                            <div>
                              <p className="text-xs text-slate-500 mb-1">
                                Payment
                              </p>
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold border ${
                                  l.paymentStatus === "PAID"
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : l.paymentStatus === "PENDING"
                                    ? "bg-amber-100 text-amber-700 border-amber-200"
                                    : "bg-blue-100 text-blue-700 border-blue-200"
                                }`}
                              >
                                {l.paymentStatus}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Full Width Location */}
                      {l.vehicleLocation && (
                        <div className="md:col-span-2 lg:col-span-3 pt-3 border-t border-slate-200">
                          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                            <span className="animate-pulse text-red-500">
                              ●
                            </span>{" "}
                            Live Tracking
                          </p>
                          <div className="flex items-center gap-3 text-xs bg-white p-2 rounded border border-slate-200 text-slate-600 font-mono">
                            <span>Lat: {l.vehicleLocation.lat}</span>
                            <span className="text-slate-300">|</span>
                            <span>Lng: {l.vehicleLocation.lng}</span>
                            {l.vehicleLocation.label && (
                              <>
                                <span className="text-slate-300">|</span>
                                <span className="font-sans font-semibold text-slate-800">
                                  {l.vehicleLocation.label}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* === ACTIONS FOOTER === */}
                {l.status === "CONFIRMED" && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => {
                        setEditId(l._id);
                        setDetails({
                          vehicle: l.vehicle ?? "",
                          fromPlace: l.fromPlace ?? "",
                          toPlace: l.toPlace ?? "",
                          transportTime: l.transportTime
                            ? new Date(l.transportTime)
                                .toISOString()
                                .slice(0, 16)
                            : "",
                          cost: l.cost !== undefined ? String(l.cost) : "",
                          itemDescription: l.itemDescription ?? "",
                          paymentStatus: l.paymentStatus ?? "PENDING",
                          lat:
                            l.vehicleLocation?.lat !== undefined
                              ? String(l.vehicleLocation.lat)
                              : "",
                          lng:
                            l.vehicleLocation?.lng !== undefined
                              ? String(l.vehicleLocation.lng)
                              : "",
                          locationLabel: l.vehicleLocation?.label ?? "",
                        });
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 hover:shadow-lg transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      {l.vehicle
                        ? "Edit Transport Details"
                        : "Add Transport Details"}
                    </button>

                    <button
                      onClick={() => viewCredentials(l.requestId)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-200 text-purple-700 bg-purple-50 text-sm font-semibold hover:bg-purple-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 010-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View Login Info
                    </button>
                  </div>
                )}

                {/* === EDIT FORM (EXPANDABLE) === */}
                {editId === l._id && (
                  <div className="mt-6 animate-in slide-in-from-top-2">
                    <div className="relative p-6 bg-white border-2 border-indigo-500 rounded-xl shadow-2xl">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        Editing Logistics
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                        {/* Vehicle Info */}
                        <div className="md:col-span-2">
                          <label className="label-text">Vehicle Name</label>
                          <input
                            className="input-field"
                            placeholder="e.g. Tata Ace (DL 1AB 1234)"
                            value={details.vehicle}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                vehicle: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Route */}
                        <div>
                          <label className="label-text">From (Pickup)</label>
                          <input
                            className="input-field"
                            placeholder="Pickup City/Area"
                            value={details.fromPlace}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                fromPlace: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="label-text">To (Drop)</label>
                          <input
                            className="input-field"
                            placeholder="Drop City/Area"
                            value={details.toPlace}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                toPlace: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Time & Cost */}
                        <div>
                          <label className="label-text">Transport Time</label>
                          <input
                            type="datetime-local"
                            className="input-field"
                            value={details.transportTime}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                transportTime: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="label-text">Total Cost (₹)</label>
                          <input
                            type="number"
                            className="input-field"
                            placeholder="0.00"
                            value={details.cost}
                            onChange={(e) =>
                              setDetails({ ...details, cost: e.target.value })
                            }
                          />
                        </div>

                        {/* Item Details */}
                        <div className="md:col-span-2">
                          <label className="label-text">Item Description</label>
                          <input
                            placeholder="What is being transported?"
                            className="input-field"
                            value={details.itemDescription}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                itemDescription: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Payment */}
                        <div>
                          <label className="label-text">Payment Status</label>
                          <select
                            className="input-field bg-white"
                            value={details.paymentStatus}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                paymentStatus: e.target.value,
                              })
                            }
                          >
                            <option value="PENDING">Payment Pending</option>
                            <option value="PAID">Paid</option>
                            <option value="COD">Cash on Delivery</option>
                          </select>
                        </div>

                        {/* Location Label */}
                        <div>
                          <label className="label-text">
                            Location Label (Optional)
                          </label>
                          <input
                            placeholder="e.g. Near Toll Plaza"
                            className="input-field"
                            value={details.locationLabel}
                            onChange={(e) =>
                              setDetails({
                                ...details,
                                locationLabel: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* GPS Coordinates */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="col-span-2 text-xs font-bold text-gray-400 uppercase">
                            Live GPS Coordinates
                          </div>
                          <input
                            placeholder="Latitude"
                            className="input-field bg-white"
                            value={details.lat}
                            onChange={(e) =>
                              setDetails({ ...details, lat: e.target.value })
                            }
                          />
                          <input
                            placeholder="Longitude"
                            className="input-field bg-white"
                            value={details.lng}
                            onChange={(e) =>
                              setDetails({ ...details, lng: e.target.value })
                            }
                          />
                        </div>

                        {/* Form Buttons */}
                        <div className="md:col-span-2 flex gap-3 mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => saveTransportDetails(l._id)}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-[0.98]"
                          >
                            Save Updates
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Styled Components via JSX */}
      <style jsx>{`
        .input-field {
          @apply w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400;
        }
        .label-text {
          @apply block text-xs font-bold text-gray-500 uppercase mb-1 ml-1;
        }
      `}</style>
    </div>
  );
}