import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-in fade-in duration-700">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center max-w-md w-full shadow-xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🎉</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Booking Confirmed
        </h1>

        <p className="text-gray-600 mb-8">
          Your booking has been successfully created. We will be in touch shortly.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/bookings"
            className="w-full px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition shadow-md"
          >
            View My Bookings
          </Link>

          <Link
            href="/"
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}