// src/layouts/DashboardLayout.jsx

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { getNavLinksForRole } from "../constants/navigation";
import { useTheme } from "../context/ThemeContext";

const ROLE_LABELS = {
  student: "Student",
  teacher: "Teacher",
  admin: "Admin",
};

export default function DashboardLayout({ role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navLinks = getNavLinksForRole(role);
  const roleLabel = ROLE_LABELS[role] ?? "Dashboard";

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-background">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-surface p-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
              MQ
            </span>
            <span className="text-body font-semibold text-slate-900">{roleLabel}</span>
          </div>
          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={`${roleLabel} navigation`} className="flex flex-1 flex-col gap-1">
          {navLinks.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-body font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-body font-medium text-slate-600 hover:bg-slate-100 hover:text-danger"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          Log Out
        </button>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-surface px-6 py-4">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <h1 className="text-h3 font-semibold text-slate-900">{roleLabel} Dashboard</h1>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full px-3 py-1.5 text-caption font-medium text-slate-600 hover:bg-slate-100"
            aria-label="Toggle color theme"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}