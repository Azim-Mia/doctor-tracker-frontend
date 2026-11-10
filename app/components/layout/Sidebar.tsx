
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Activity,
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  X,
  HeartPulse,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Doctors",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    name: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: CalendarDays,
  },
];

const settingsNavigation = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Authentication integration will be added later.
    localStorage.removeItem("token");
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">

          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <HeartPulse size={25} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Doctor<span className="text-blue-600">Tracker</span>
              </h1>

              <p className="text-[11px] text-slate-400">
                Management System
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">

          {/* Main Menu */}
          <div>
            <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400">
              Main Menu
            </p>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon
                      size={19}
                      className={
                        active
                          ? "text-white"
                          : "text-slate-400 group-hover:text-blue-600"
                      }
                    />

                    <span>{item.name}</span>

                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-white" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Preferences */}
          <div className="mt-10">
            <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400">
              Preferences
            </p>

            <nav className="space-y-2">
              {settingsNavigation.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={19} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Help Card */}
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 text-white">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
              <Activity size={20} />
            </div>

            <h3 className="text-sm font-bold">
              Need Help?
            </h3>

            <p className="mt-1 text-xs leading-5 text-blue-100">
              Contact our support team for assistance.
            </p>

            <button className="mt-4 w-full rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50">
              Contact Support
            </button>
          </div>
        </div>

        {/* Admin Profile & Logout */}
        <div className="border-t border-slate-100 p-4">

          <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">
                Admin User
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
