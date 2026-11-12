
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Empty validation
    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required!");
      return;
    }

    // Login validation
    if (
      email.trim() === "example@gmail.com" &&
      password === "1234"
    ) {
      setError("");
      router.replace("/dashboard");
      return;
    }

    setError("Invalid Email or Password!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-center text-2xl font-bold">
          Doctor Tracker Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4" noValidate>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

          {error && (
            <p className="text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <div className="mt-5 rounded-lg bg-gray-50 p-3 text-sm">
          <p>Demo Email: example@gmail.com</p>
          <p>Demo Password: 1234</p>
        </div>

      </div>
    </div>
  );
}
