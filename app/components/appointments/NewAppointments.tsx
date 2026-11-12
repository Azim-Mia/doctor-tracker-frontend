
"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  FileText,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface AppointmentFormData {
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string;
}

const initialFormData: AppointmentFormData = {
  patientName: "",
  doctorName: "",
  date: "",
  time: "",
  type: "Consultation",
  status: "Scheduled",
  notes: "",
};

export default function NewAppointments() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<AppointmentFormData>(initialFormData);

  const [today, setToday] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Set today's date after component mounts
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    setToday(`${year}-${month}-${day}`);
  }, []);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Handle Form Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.patientName.trim() ||
      !formData.doctorName.trim() ||
      !formData.date ||
      !formData.time
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (today && formData.date < today) {
      setError("Appointment date cannot be in the past.");
      return;
    }

    // Appointment Data
    const appointmentData = {
      ...formData,
      id: Date.now().toString(),
    };

    console.log("New Appointment:", appointmentData);

    setSuccess("Appointment created successfully!");

    // TODO: Connect Backend API here.
  };

  // Reset Form
  const handleReset = () => {
    setFormData(initialFormData);
    setError("");
    setSuccess("");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-blue-600">
              <CalendarDays size={18} />
              <span>Appointment Management</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              New Appointment
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Create and schedule a new patient appointment.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
            <CheckCircle size={20} />
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Card Header */}
          <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarDays size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Appointment Information
                </h2>

                <p className="text-xs text-gray-500">
                  Enter the details below to schedule an appointment.
                </p>
              </div>

            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-6 sm:p-8"
          >

            {/* Patient & Doctor */}
            <section>

              <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-gray-800">
                <User size={19} className="text-blue-600" />
                Patient & Doctor Details
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Patient Name */}
                <div>
                  <label className={labelClass}>
                    Patient Name *
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </div>

                {/* Doctor Name */}
                <div>
                  <label className={labelClass}>
                    Doctor Name *
                  </label>

                  <div className="relative">
                    <Stethoscope
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleChange}
                      placeholder="Enter doctor name"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </div>

              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Date & Time */}
            <section>

              <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-gray-800">
                <Clock size={19} className="text-blue-600" />
                Date & Time
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Date */}
                <div>
                  <label className={labelClass}>
                    Appointment Date *
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today || undefined}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className={labelClass}>
                    Appointment Time *
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Appointment Settings */}
            <section>

              <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-gray-800">
                <FileText size={19} className="text-blue-600" />
                Appointment Settings
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Type */}
                <div>
                  <label className={labelClass}>
                    Appointment Type *
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Consultation">
                      Consultation
                    </option>

                    <option value="Follow-up">
                      Follow-up
                    </option>

                    <option value="Checkup">
                      Regular Checkup
                    </option>

                    <option value="Emergency">
                      Emergency
                    </option>

                    <option value="Online">
                      Online Consultation
                    </option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className={labelClass}>
                    Appointment Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Notes */}
            <section>

              <label className={labelClass}>
                Additional Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Write appointment notes..."
                className={`${inputClass} resize-none`}
              />

            </section>

            {/* Buttons */}
            <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">

              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Reset Form
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
              >
                <Save size={18} />
                Create Appointment
              </button>

            </div>

          </form>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Doctor Tracker · Appointment Management System
        </p>

      </div>
    </div>
  );
}
