export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome to Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Manage your logistics and track active fleets.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="group border border-gray-200 p-8 rounded-2xl hover:border-black transition-colors cursor-pointer bg-white shadow-sm hover:shadow-lg">
          <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            📋
          </div>
          <p className="text-xl font-bold text-gray-900">Total Bookings</p>
          <p className="text-gray-500 mt-2">
            View booking history and status from the admin panel.
          </p>
        </div>

        <div className="group border border-gray-200 p-8 rounded-2xl hover:border-blue-600 transition-colors cursor-pointer bg-white shadow-sm hover:shadow-lg">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🚚
          </div>
          <p className="text-xl font-bold text-gray-900">Create New Booking</p>
          <p className="text-gray-500 mt-2">
            Go to the Book Vehicle page to start a new request.
          </p>
        </div>
      </div>
    </div>
  );
}