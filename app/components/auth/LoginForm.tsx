
"use client";

import Input from "../ui/Input";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  return (
    <div className="mx-auto max-w-md space-y-5 rounded-xl bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-gray-800">
        Admin Login
      </h2>

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        leftIcon={<Mail size={18} />}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        leftIcon={<Lock size={18} />}
        required
      />

      <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
        Login
      </button>
    </div>
  );
}
