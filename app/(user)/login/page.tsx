"use client";

import { useState } from "react";

export default function UserLoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginId, password }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    window.location.href = "/user/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Track Your Booking</h1>
          <p className="text-gray-400 text-sm mt-1">
            Enter your credentials to view live status
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Login ID
            </label>
            <input
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="Enter Login ID"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              required
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-900 text-white py-3.5 rounded-lg font-bold shadow-lg transition-all active:scale-[0.98]">
            Secure Login
          </button>
        </form>
        
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
           <p className="text-xs text-gray-500">Don&apos;t have an ID? Contact Admin.</p>
        </div>
      </div>
    </div>
  );
}