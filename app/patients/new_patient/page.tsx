
"use client";

import { useState, type FormEvent } from "react";
import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Droplets,
  HeartPulse,
  Save,
  X,
  FileText,
  Venus,
  Mars,
  Users,
  ShieldCheck,
  Activity,
} from "lucide-react";

export interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: string;
  disease: string;
  status: string;
}

interface PatientFormProps {
  initialData?: PatientFormData;
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

export default function PatientForm({
  initialData,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>(
    initialData || {
      name: "",
      email: "",
      phone: "",
      age: 0,
      gender: "",
      bloodGroup: "",
      address: "",
      disease: "",
      status: "Active",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (name: keyof PatientFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputStyle =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 pl-11 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-indigo-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

  const labelStyle =
    "mb-2 block text-sm font-semibold text-slate-700";

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Patient name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.age || formData.age < 1 || formData.age > 120)
      newErrors.age = "Enter a valid age";
    if (!formData.gender) newErrors.gender = "Select gender";

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const genderOptions = [
    { value: "Male", label: "Male", icon: Mars },
    { value: "Female", label: "Female", icon: Venus },
    { value: "Other", label: "Other", icon: Users },
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-md sm:p-6">

      <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/20">

        {/* HEADER */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-7 sm:px-9">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur">
                <UserRound size={29} className="text-white" />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                    Patient Management
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {initialData ? "Edit Patient" : "New Patient"}
                </h2>

                <p className="mt-1 text-sm text-indigo-100">
                  Manage patient records and medical details
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-white transition hover:rotate-90 hover:bg-white/20"
            >
              <X size={21} />
            </button>
          </div>

          <div className="relative mt-6 flex items-center gap-2 text-xs text-indigo-100">
            <ShieldCheck size={15} />
            <span>Patient information is securely managed</span>
          </div>
        </div>

        {/* FORM BODY */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 space-y-7 overflow-y-auto bg-slate-50/60 px-5 py-7 sm:px-9"
        >

          {/* PERSONAL DETAILS */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600">
                <UserRound size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">
                  Personal Information
                </h3>
                <p className="text-xs text-slate-500">
                  Basic details about the patient
                </p>
              </div>
              <div className="ml-auto h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <label className={labelStyle}>Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <UserRound className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter full name"
                    className={inputStyle}
                  />
                </div>
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label className={labelStyle}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="example@email.com"
                    className={inputStyle}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* PHONE */}
              <div>
                <label className={labelStyle}>Phone Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+880 1XXXXXXXXX"
                    className={inputStyle}
                  />
                </div>
                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
              </div>

              {/* AGE */}
              <div>
                <label className={labelStyle}>Age <span className="text-red-500">*</span></label>
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age || ""}
                    onChange={(e) => updateField("age", Number(e.target.value))}
                    placeholder="Patient age"
                    className={inputStyle}
                  />
                </div>
                {errors.age && <p className="mt-1.5 text-xs text-red-500">{errors.age}</p>}
              </div>
            </div>
          </section>

          {/* GENDER */}
          <section>
            <label className={labelStyle}>
              Gender <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-3 gap-3">
              {genderOptions.map(({ value, label, icon: Icon }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => updateField("gender", value)}
                  className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold transition ${
                    formData.gender === value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/10"
                      : "border-slate-200 bg-white text-slate-500 hover:border-indigo-300"
                  }`}
                >
                  <Icon size={19} />
                  {label}
                </button>
              ))}
            </div>
            {errors.gender && <p className="mt-1.5 text-xs text-red-500">{errors.gender}</p>}
          </section>

          {/* MEDICAL INFORMATION */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-rose-100 p-2.5 text-rose-600">
                <HeartPulse size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">
                  Medical Information
                </h3>
                <p className="text-xs text-slate-500">
                  Health and medical details
                </p>
              </div>
              <div className="ml-auto h-px flex-1 bg-slate-200" />
            </div>

            {/* BLOOD GROUP */}
            <label className={labelStyle}>Blood Group</label>

            <div className="mb-5 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {bloodGroups.map((group) => (
                <button
                  type="button"
                  key={group}
                  onClick={() => updateField("bloodGroup", group)}
                  className={`rounded-xl border py-3 text-sm font-bold transition ${
                    formData.bloodGroup === group
                      ? "border-rose-500 bg-rose-50 text-rose-600 shadow-sm"
                      : "border-slate-200 bg-white text-slate-500 hover:border-rose-300"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* DISEASE */}
            <div className="mb-5">
              <label className={labelStyle}>Disease / Medical Condition</label>
              <div className="relative">
                <Activity className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  value={formData.disease}
                  onChange={(e) => updateField("disease", e.target.value)}
                  placeholder="e.g. Diabetes, Blood Pressure"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className={labelStyle}>Residential Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="Enter patient full address..."
                  className={`${inputStyle} resize-none`}
                />
              </div>
            </div>
          </section>

          {/* STATUS */}
          <section>
            <label className={labelStyle}>Patient Status</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <select
                value={formData.status}
                onChange={(e) => updateField("status", e.target.value)}
                className={inputStyle}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </section>

          {/* FOOTER */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              <Save size={18} />
              {initialData ? "Update Patient" : "Save Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
