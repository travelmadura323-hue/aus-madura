import { Outlet, NavLink } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed top-0 left-0 w-64 h-screen bg-primary shadow-lg z-40 pt-20">
        <nav className="p-4 space-y-1">
          <NavLink
            to="/admin/tours"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive ? "bg-accent text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V8m-6 4h2" />
            </svg>
            Tours
          </NavLink>
          <NavLink
            to="/admin/destination"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive ? "bg-accent text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Destinations
          </NavLink>
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Site
          </NavLink>
        </nav>
      </aside>

      <main className="ml-64 pt-20 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
