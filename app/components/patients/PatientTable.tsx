
"use client";

import { useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  UserRound,
  CalendarDays,
  Users,
} from "lucide-react";

import PatientSearch from "./PatientSearch";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  disease: string;
  doctor: string;
  status: "Active" | "Inactive";
}

interface PatientsTableProps {
  patients?: Patient[];
  onEdit?: (patient: Patient) => void;
  onDelete?: (id: string) => void;
  onView?: (patient: Patient) => void;
}

const initialPatients: Patient[] = [
  {
    id: "PAT-001",
    name: "James Anderson",
    email: "james@example.com",
    phone: "01712345678",
    age: 35,
    gender: "Male",
    bloodGroup: "A+",
    disease: "Heart Disease",
    doctor: "Dr. John Smith",
    status: "Active",
  },
  {
    id: "PAT-002",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "01812345678",
    age: 28,
    gender: "Female",
    bloodGroup: "B+",
    disease: "Migraine",
    doctor: "Dr. Sarah Wilson",
    status: "Active",
  },
  {
    id: "PAT-003",
    name: "David Brown",
    email: "david@example.com",
    phone: "01912345678",
    age: 45,
    gender: "Male",
    bloodGroup: "O+",
    disease: "Skin Allergy",
    doctor: "Dr. Emily Davis",
    status: "Inactive",
  },
  {
    id: "PAT-004",
    name: "Emily Johnson",
    email: "emily@example.com",
    phone: "01612345678",
    age: 22,
    gender: "Female",
    bloodGroup: "AB+",
    disease: "Fever",
    doctor: "Dr. David Brown",
    status: "Active",
  },
  {
    id: "PAT-005",
    name: "Michael Smith",
    email: "michael@example.com",
    phone: "01512345678",
    age: 50,
    gender: "Male",
    bloodGroup: "B-",
    disease: "Diabetes",
    doctor: "Dr. John Smith",
    status: "Active",
  },
];

export default function PatientsTable({
  patients = initialPatients,
  onEdit,
  onDelete,
  onView,
}: PatientsTableProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Search Handler
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Filter Patients
  const filteredPatients = useMemo(() => {
    const value = search.toLowerCase().trim();

    return patients.filter((patient) =>
      [
        patient.id,
        patient.name,
        patient.email,
        patient.phone,
        patient.bloodGroup,
        patient.disease,
        patient.doctor,
        patient.gender,
      ].some((item) => item.toLowerCase().includes(value))
    );
  }, [patients, search]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / pageSize);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Delete Handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      onDelete?.(id);
    }
  };

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  return (
    <div className="w-full space-y-6">

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-800">
                {patients.length}
              </h3>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Patients</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-800">
                {activePatients}
              </h3>
            </div>
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <UserRound size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive Patients</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-800">
                {patients.length - activePatients}
              </h3>
            </div>
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <CalendarDays size={23} />
            </div>
          </div>
        </div>

      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Patients List
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor all registered patients.
            </p>
          </div>

          <div className="w-full sm:max-w-sm">
            <PatientSearch onSearch={handleSearch} />
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px] text-left">

            <thead>
              <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">

                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Age / Gender</th>
                <th className="px-5 py-4">Blood Group</th>
                <th className="px-5 py-4">Disease</th>
                <th className="px-5 py-4">Assigned Doctor</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {paginatedPatients.map((patient) => (

                <tr
                  key={patient.id}
                  className="transition-colors hover:bg-blue-50/30"
                >

                  {/* Patient */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {patient.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="whitespace-nowrap text-sm font-semibold text-gray-800">
                          {patient.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {patient.id}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {patient.email}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {patient.phone}
                    </p>
                  </td>

                  {/* Age Gender */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-700">
                      {patient.age} Years
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {patient.gender}
                    </p>
                  </td>

                  {/* Blood Group */}
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                      {patient.bloodGroup}
                    </span>
                  </td>

                  {/* Disease */}
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {patient.disease}
                  </td>

                  {/* Doctor */}
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {patient.doctor}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        patient.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          patient.status === "Active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      {patient.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">

                      <button
                        type="button"
                        onClick={() => onView?.(patient)}
                        title="View Patient"
                        aria-label="View Patient"
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit?.(patient)}
                        title="Edit Patient"
                        aria-label="Edit Patient"
                        className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(patient.id)}
                        title="Delete Patient"
                        aria-label="Delete Patient"
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>

                </tr>

              ))}

              {/* Empty State */}
              {paginatedPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-16 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <Users size={35} className="mb-3 text-gray-300" />
                      <h3 className="font-semibold text-gray-700">
                        No Patients Found
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Try searching with another name or keyword.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row">

          <p className="text-sm text-gray-500">
            Showing{" "}
            {filteredPatients.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            {" - "}
            {Math.min(currentPage * pageSize, filteredPatients.length)}
            {" of "}
            {filteredPatients.length} patients
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="px-3 text-sm font-semibold text-gray-700">
              {currentPage} / {Math.max(totalPages, 1)}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
