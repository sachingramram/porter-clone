"use client";

import { useEffect, useState } from "react";

/* ---------------- Types ---------------- */

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
  status: LeadStatus;
  cost?: number;
  createdAt?: string;
}

/* ---------------- Component ---------------- */

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/requests/admin");
        const data: Lead[] = await res.json();
        setLeads(data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  /* ---------------- Calculations ---------------- */

  const totalOrders = leads.length;
  const completedOrders = leads.filter((l) => l.status === "COMPLETED").length;

  const revenue = leads
    .filter((l) => l.status === "COMPLETED" && typeof l.cost === "number")
    .reduce((sum, l) => sum + (l.cost ?? 0), 0);

  // Chart Data Preparation
  const statusCounts = {
    NEW: leads.filter((l) => l.status === "NEW").length,
    CONTACTED: leads.filter((l) => l.status === "CONTACTED").length,
    CONFIRMED: leads.filter((l) => l.status === "CONFIRMED").length,
    IN_PROGRESS: leads.filter((l) => l.status === "IN_PROGRESS").length,
    COMPLETED: leads.filter((l) => l.status === "COMPLETED").length,
  };

  const maxCount = Math.max(...Object.values(statusCounts), 1);

  /* ---------------- UI Render ---------------- */

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
        <p className="font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back. Here is the performance summary for Enterprise Requests.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Requests"
          value={totalOrders}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Revenue (Completed)"
          value={`₹${revenue.toLocaleString()}`}
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Completed Orders"
          value={completedOrders}
          gradient="from-purple-500 to-indigo-600"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h2>
          <span className="text-xs text-gray-500">
            Based on latest requests
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {leads.slice(0, 5).map((l) => (
            <div
              key={l._id}
              className="p-5 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-lg">
                    {l.name || l.company}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 font-mono">
                    ID: {l.requestId || l._id.slice(-4)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  {l.company}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1">
                {/* Cost Display */}
                {l.cost !== undefined && l.cost > 0 ? (
                  <span className="text-sm font-bold text-emerald-600">
                    + ₹{l.cost.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    No cost set
                  </span>
                )}

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    l.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : l.status === "NEW"
                      ? "bg-blue-100 text-blue-700"
                      : l.status === "IN_PROGRESS"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {l.status.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}

          {leads.length === 0 && (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <span className="text-2xl mb-2">📭</span>
              No requests found.
            </div>
          )}
        </div>
      </div>

      {/* Analytics & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>📊</span> Order Status Distribution
          </h2>
          <div className="space-y-5">
            <ChartBar
              label="New Requests"
              count={statusCounts.NEW}
              max={maxCount}
              color="bg-blue-500"
            />
            <ChartBar
              label="Contacted"
              count={statusCounts.CONTACTED}
              max={maxCount}
              color="bg-indigo-500"
            />
            <ChartBar
              label="Confirmed"
              count={statusCounts.CONFIRMED}
              max={maxCount}
              color="bg-purple-500"
            />
            <ChartBar
              label="In Progress"
              count={statusCounts.IN_PROGRESS}
              max={maxCount}
              color="bg-orange-500"
            />
            <ChartBar
              label="Completed"
              count={statusCounts.COMPLETED}
              max={maxCount}
              color="bg-green-500"
            />
          </div>
        </div>

        {/* Quick Summary / Mini Chart */}
        <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">Performance</h2>
            <p className="text-slate-400 text-sm">
              Current conversion rate from New to Completed orders.
            </p>
          </div>

          <div className="my-8 flex justify-center items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray={`${
                    totalOrders > 0
                      ? (statusCounts.COMPLETED / totalOrders) * 100
                      : 0
                  }, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">
                  {totalOrders > 0
                    ? Math.round((statusCounts.COMPLETED / totalOrders) * 100)
                    : 0}
                  %
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  Completed
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-400">
              You have <span className="text-white font-bold">{statusCounts.NEW}</span> new
              requests pending action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Stat Card Component ---------------- */

function StatCard({
  title,
  value,
  gradient,
}: {
  title: string;
  value: string | number;
  gradient: string;
}) {
  return (
    <div
      className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-br ${gradient} transform hover:scale-[1.02] transition-transform duration-200`}
    >
      <p className="text-blue-100 text-xs font-bold uppercase tracking-wider opacity-80">
        {title}
      </p>
      <p className="text-3xl font-bold mt-2 tracking-tight">{value}</p>
    </div>
  );
}

/* ---------------- Chart Bar Component ---------------- */

function ChartBar({
  label,
  count,
  max,
  color,
}: {
  label: string;
  count: number;
  max: number;
  color: string;
}) {
  const percentage = max > 0 ? (count / max) * 100 : 0;

  return (
    <div className="flex items-center gap-4 group">
      <div className="w-24 text-sm font-medium text-gray-600">{label}</div>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
        <div
          style={{ width: `${percentage}%` }}
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out group-hover:opacity-90 relative`}
        ></div>
      </div>
      <div className="w-8 text-right text-sm font-bold text-gray-800">
        {count}
      </div>
    </div>
  );
}