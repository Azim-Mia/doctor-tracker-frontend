
"use client";

import { useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DoctorSearch from "./DoctorSearch";

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  status: "Active" | "Inactive";
}

interface DoctorTableProps {
  doctors?: Doctor[];
  onEdit?: (doctor: Doctor) => void;
  onDelete?: (id: string) => void;
  onView?: (doctor: Doctor) => void;
}

const initialDoctors: Doctor[] = [
  {
    id: "DOC-001",
    name: "Dr. John Smith",
    email: "john@example.com",
    phone: "01712345678",
    specialization: "Cardiologist",
    experience: 10,
    status: "Active",
  },
  {
    id: "DOC-002",
    name: "Dr. Sarah Wilson",
    email: "sarah@example.com",
    phone: "01812345678",
    specialization: "Neurologist",
    experience: 8,
    status: "Active",
  },
  {
    id: "DOC-003",
    name: "Dr. David Brown",
    email: "david@example.com",
    phone: "01912345678",
    specialization: "Dermatologist",
    experience: 5,
    status: "Inactive",
  },
  {
    id: "DOC-004",
    name: "Dr. Emily Davis",
    email: "emily@example.com",
    phone: "01612345678",
    specialization: "Pediatrician",
    experience: 7,
    status: "Active",
  },
];

export default function DoctorTable({
  doctors = initialDoctors,
  onEdit,
  onDelete,
  onView,
}: DoctorTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const filteredDoctors = useMemo(() => {
    const value = search.toLowerCase();

    return doctors.filter((doctor) =>
      [
        doctor.name,
        doctor.email,
        doctor.phone,
        doctor.specialization,
        doctor.id,
      ].some((item) => item.toLowerCase().includes(value))
    );
  }, [doctors, search]);

  const totalPages = Math.ceil(filteredDoctors.length / pageSize);

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
const handleSearch = (value: string) => {
  setSearch(value);
  setCurrentPage(1)
};
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      onDelete?.(id);
    }
  };

  return (
    <div className="w-full space-y-5 rounded-xl bg-white p-4 shadow-sm sm:p-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Doctors List
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage all registered doctors.
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
        <DoctorSearch onSearch={handleSearch}  />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead>
            <tr className="border-y bg-gray-50 text-xs uppercase text-gray-500">
              <th className="px-4 py-4">Doctor</th>
              <th className="px-4 py-4">Contact</th>
              <th className="px-4 py-4">Specialization</th>
              <th className="px-4 py-4">Experience</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedDoctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-b border-gray-100 transition hover:bg-gray-50"
              >
                <td className="px-4 py-4">
                  <div className="font-semibold text-gray-800">
                    {doctor.name}
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {doctor.id}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="text-sm text-gray-700">
                    {doctor.email}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {doctor.phone}
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-gray-700">
                  {doctor.specialization}
                </td>

                <td className="px-4 py-4 text-sm text-gray-700">
                  {doctor.experience} Years
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      doctor.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {doctor.status}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onView?.(doctor)}
                      title="View Doctor"
                      className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={() => onEdit?.(doctor)}
                      title="Edit Doctor"
                      className="rounded-lg bg-amber-50 p-2 text-amber-600 hover:bg-amber-100"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() => handleDelete(doctor.id)}
                      title="Delete Doctor"
                      className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedDoctors.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-sm text-gray-500"
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500">
          Showing {filteredDoctors.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          {" - "}
          {Math.min(currentPage * pageSize, filteredDoctors.length)}
          {" of "}
          {filteredDoctors.length} doctors
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="rounded-lg border p-2 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="px-3 text-sm font-medium text-gray-700">
            {currentPage} / {Math.max(totalPages, 1)}
          </span>

          <button
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="rounded-lg border p-2 text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
