"use client";

import { useState } from "react";

export default function BookVehicleEnterprisePage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setSuccessId(data.requestId);
      setForm({ name: "", company: "", phone: "", email: "" });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4 py-12 animate-in fade-in duration-700">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/20">
        <div className="bg-gray-50 p-8 border-b border-gray-100 text-center">
          <h2 className="text-3xl font-extrabold text-blue-600 tracking-tight">
            Enterprise Logistics
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Fill out the details below to request a vehicle.
          </p>
        </div>

        <div className="p-8">
          {successId ? (
            <div className="text-center py-8 animate-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Request Submitted!
              </h3>
              <p className="text-gray-600 mb-6">
                Your request has been queued successfully.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300 inline-block w-full">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Request ID
                </p>
                <p className="text-xl font-mono font-bold text-indigo-600 mt-1 select-all">
                  {successId}
                </p>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                Our operations team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Business or Personal
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Personal/Business"
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765..."
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition-all active:scale-[0.98] mt-4"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Get In Touch"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}