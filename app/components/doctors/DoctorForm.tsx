
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Stethoscope,
  BriefcaseMedical,
  MapPin,
  Save,
  X,
  Activity,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export interface DoctorFormData {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  address: string;
  status: "active" | "inactive";
}

interface DoctorFormProps {
  initialData?: Partial<DoctorFormData>;
  onSubmit: (data: DoctorFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export default function DoctorForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: DoctorFormProps) {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: initialData?.name ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    specialization: initialData?.specialization ?? "",
    experience: initialData?.experience ?? 0,
    address: initialData?.address ?? "",
    status: initialData?.status ?? "active",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  const iconClass =
    "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400";

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-6 py-8 sm:px-9">
        <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/10" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-blue-100">
              <Stethoscope size={17} />
              <span className="text-xs font-semibold uppercase tracking-[2px]">
                Doctor Management
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {initialData ? "Update Doctor" : "Add New Doctor"}
            </h2>

            <p className="mt-2 text-sm text-blue-100">
              Manage doctor information and professional details.
            </p>
          </div>

          <div className="hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg sm:flex">
            <UserRound size={34} />
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-9">

        {/* Section 1 */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <UserRound size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">
              Personal Information
            </h3>
            <p className="text-xs text-slate-500">
              Basic details of the doctor
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Name */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Doctor Full Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <UserRound className={iconClass} size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter doctor's full name"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <Mail className={iconClass} size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@example.com"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <Phone className={iconClass} size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1XXXXXXXXX"
                className={inputClass}
                required
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-100" />

        {/* Section 2 */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <BriefcaseMedical size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">
              Professional Information
            </h3>
            <p className="text-xs text-slate-500">
              Specialization and experience details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Specialization */}
          <div>
            <label className={labelClass}>Specialization <span className="text-red-500">*</span></label>
            <div className="relative">
              <Stethoscope className={iconClass} size={18} />
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select specialization</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Medicine">Medicine</option>
                <option value="Surgery">Surgery</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className={labelClass}>Experience (Years) <span className="text-red-500">*</span></label>
            <div className="relative">
              <BriefcaseMedical className={iconClass} size={18} />
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 5"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Status */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Doctor Account Status</label>
            <div className="relative">
              <Activity className={iconClass} size={18} />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-100" />

        {/* Section 3 */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <MapPin size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">
              Location Information
            </h3>
            <p className="text-xs text-slate-500">
              Doctor's current address
            </p>
          </div>
        </div>

        <div>
          <label className={labelClass}>Full Address <span className="text-red-500">*</span></label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-4 text-slate-400" size={18} />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter doctor's full address..."
              rows={3}
              className={`${inputClass} resize-none pl-11`}
              required
            />
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
          <ShieldCheck className="mt-0.5 shrink-0 text-blue-600" size={20} />
          <div>
            <p className="text-sm font-semibold text-blue-900">
              Information Security
            </p>
            <p className="mt-1 text-xs leading-5 text-blue-700">
              Please verify all information before submitting the doctor record.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">

          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={17} />
              Cancel
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {loading
              ? "Saving..."
              : initialData
                ? "Update Doctor"
                : "Save Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
}
