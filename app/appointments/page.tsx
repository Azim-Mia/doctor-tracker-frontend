
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  CalendarDays,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Filter,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  color: string;
}

const initialAppointments: Appointment[] = [
  {
    id: "APT-001",
    patient: "John Smith",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2026-11-11",
    time: "09:30 AM",
    status: "Confirmed",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "APT-002",
    patient: "Emily Johnson",
    doctor: "Dr. Michael Brown",
    department: "Neurology",
    date: "2026-11-11",
    time: "10:30 AM",
    status: "Pending",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "APT-003",
    patient: "Robert Davis",
    doctor: "Dr. James Miller",
    department: "Orthopedic",
    date: "2026-11-12",
    time: "11:00 AM",
    status: "Completed",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "APT-004",
    patient: "Sophia Wilson",
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2026-11-12",
    time: "02:00 PM",
    status: "Cancelled",
    color: "bg-red-100 text-red-600",
  },
  {
    id: "APT-005",
    patient: "Daniel Martinez",
    doctor: "Dr. Michael Brown",
    department: "Neurology",
    date: "2026-11-13",
    time: "03:30 PM",
    status: "Confirmed",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "APT-006",
    patient: "Olivia Taylor",
    doctor: "Dr. James Miller",
    department: "Orthopedic",
    date: "2026-11-14",
    time: "04:00 PM",
    status: "Pending",
    color: "bg-purple-100 text-purple-600",
  },
];

const statusStyles: Record<string, string> = {
  Confirmed: "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
  Completed: "bg-green-50 text-green-700",
};

export default function Appointments() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Appointment | null>(null);

  const pageSize = 5;

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patient.toLowerCase().includes(search.toLowerCase()) ||
        appointment.doctor.toLowerCase().includes(search.toLowerCase()) ||
        appointment.id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || appointment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [appointments, search, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAppointments.length / pageSize)
  );

  const currentAppointments = filteredAppointments.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const stats = [
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Confirmed",
      value: appointments.filter((a) => a.status === "Confirmed").length,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending",
      value: appointments.filter((a) => a.status === "Pending").length,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Cancelled",
      value: appointments.filter((a) => a.status === "Cancelled").length,
      icon: XCircle,
      color: "bg-red-50 text-red-600",
    },
  ];

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      setSelected(null);
    }
  };

  const handleStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Dashboard / Appointments
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-800 md:text-3xl">
              Appointments
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and track all patient appointments.
            </p>
          </div>
        <Link href='/appointments/new'> 
          <button
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            <Plus size={19} />
          New Appointment
          </button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-800">
                      {stat.value.toString().padStart(2, "0")}
                    </h2>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Appointment Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Appointment List
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View and manage patient appointments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm outline-none focus:border-blue-500 sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Appointment ID</th>
                  <th className="px-6 py-4 font-semibold">Patient</th>
                  <th className="px-6 py-4 font-semibold">Doctor</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {currentAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="transition hover:bg-blue-50/40"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      {appointment.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
                          {appointment.patient.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {appointment.patient}
                          </p>
                          <p className="text-xs text-slate-400">
                            Patient
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {appointment.doctor}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {appointment.department}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="flex items-center gap-2 text-sm text-slate-700">
                        <CalendarDays size={15} className="text-blue-500" />
                        {appointment.date}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                        <Clock size={14} />
                        {appointment.time}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[appointment.status]}`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          title="View"
                          onClick={() => setSelected(appointment)}
                          className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Edit"
                          onClick={() => setSelected(appointment)}
                          className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-100"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          title="Delete"
                          onClick={() => handleDelete(appointment.id)}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {currentAppointments.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              Showing{" "}
              {filteredAppointments.length === 0
                ? 0
                : (page - 1) * pageSize + 1}
              {" - "}
              {Math.min(page * pageSize, filteredAppointments.length)} of{" "}
              {filteredAppointments.length} appointments
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="px-3 text-sm font-semibold text-slate-700">
                {page} / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Appointment Details Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                  Appointment Details
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <XCircle size={22} />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs text-slate-400">Appointment ID</p>
                  <p className="font-semibold text-blue-600">{selected.id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Patient</p>
                  <p className="font-semibold text-slate-800">{selected.patient}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Doctor</p>
                  <p className="font-semibold text-slate-800">{selected.doctor}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Department</p>
                  <p className="font-semibold text-slate-800">{selected.department}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Date & Time</p>
                  <p className="font-semibold text-slate-800">
                    {selected.date} · {selected.time}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Update Status
                  </label>
                  <select
                    value={selected.status}
                    onChange={(e) => {
                      const status = e.target.value as Appointment["status"];
                      setSelected({ ...selected, status });
                      handleStatus(selected.id, status);
                    }}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
