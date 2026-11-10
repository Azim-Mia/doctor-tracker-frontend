
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const [search, setSearch] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    {
      title: "New Patient Registered",
      description: "A new patient has been added.",
      time: "5 minutes ago",
    },
    {
      title: "New Doctor Added",
      description: "Doctor profile created successfully.",
      time: "20 minutes ago",
    },
    {
      title: "Appointment Updated",
      description: "An appointment has been updated.",
      time: "1 hour ago",
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Page Title */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Doctor Tracker
          </h2>

          <p className="hidden text-xs text-slate-400 sm:block">
            Healthcare Management System
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 md:flex">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="w-36 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 lg:w-52"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">

              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <h3 className="font-bold text-slate-800">
                  Notifications
                </h3>

                <button
                  onClick={() => setNotificationOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                  aria-label="Close notifications"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="border-b border-slate-50 p-4 transition hover:bg-slate-50"
                  >
                    <p className="text-sm font-semibold text-slate-800">
                      {notification.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {notification.description}
                    </p>

                    <p className="mt-2 text-[11px] text-slate-400">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3 text-center">
                <button
                  onClick={() => setNotificationOpen(false)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  Close Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="relative">

          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationOpen(false);
            }}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50 sm:gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
              A
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-bold text-slate-800">
                Admin User
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-slate-400 sm:block"
            />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-14 z-50 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">

              <Link
                href="/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <User size={17} />
                My Profile
              </Link>

              <Link
                href="/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Settings size={17} />
                Settings
              </Link>

              <div className="my-2 border-t border-slate-100" />

              <button
                onClick={() => {
                  setProfileOpen(false);
                  window.location.href = "/login";
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
