
"use client";

import { useState } from "react";
import { User, Mail, Phone, Stethoscope } from "lucide-react";

export default function DoctorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Doctor Data:", formData);
    alert("Doctor information submitted!");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Add New Doctor
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter doctor information below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Doctor Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter doctor name"
              className={`${inputClass} pl-10`}
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@example.com"
                className={`${inputClass} pl-10`}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className={`${inputClass} pl-10`}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Specialization
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. Cardiologist"
                className={`${inputClass} pl-10`}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Experience (Years)
            </label>
            <input
              type="number"
              min="0"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter doctor address"
            rows={3}
            className={inputClass}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save Doctor
        </button>
      </form>
    </div>
  );
}
