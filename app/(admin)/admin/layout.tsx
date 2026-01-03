import Link from "next/link";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * NOTE:
   * For now this is a placeholder check.
   * We will improve admin security later (password / cookie based).
   */
  const adminEnabled = process.env.ADMIN_SECRET;

  if (!adminEnabled) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans text-gray-800">
      {/* Sidebar / Topbar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white border-r border-slate-800 flex-shrink-0 transition-all duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>

        <nav className="flex flex-row md:flex-col gap-1 px-4 pb-4 md:pb-0 overflow-x-auto md:overflow-visible">
          <NavLink href="/admin/dashboard" label="Dashboard" />
          <NavLink href="/admin/requests" label="Requests" />
           
          <div className="my-2 border-t border-slate-700 hidden md:block"></div>
          <NavLink href="/" label="Back to Site" isSecondary />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

// Helper component for cleaner nav links
function NavLink({
  href,
  label,
  isSecondary = false,
}: {
  href: string;
  label: string;
  isSecondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm whitespace-nowrap ${
        isSecondary
          ? "text-slate-400 hover:text-white hover:bg-slate-800"
          : "text-slate-200 hover:text-white hover:bg-indigo-600 hover:shadow-md"
      }`}
    >
      {label}
    </Link>
  );
}