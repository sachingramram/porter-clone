"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  // Helper to check active state
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-black text-blue-800 tracking-tighter flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-lg text-lg">P</span>
          Porter Clone
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden md:flex gap-6">
             <Link
              href="/"
              className={`text-sm font-medium transition ${isActive('/') ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Home
            </Link>

            <Link
              href="/book-vehicle"
              className={`text-sm font-medium transition ${isActive('/book-vehicle') ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Book Vehicle
            </Link>

            <Link
              href="/login"
              className={`text-sm font-medium transition ${isActive('/login') ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Track Booking
            </Link>
          </div>

          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-900 transition shadow-sm"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}