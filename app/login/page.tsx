'use client'
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
const handleLogin = async () => {
  // API দিয়ে Login সফল হলে
  router.replace("/dashboard");
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Doctor Tracker Login
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-lg border p-3 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border p-3 outline-none"
            required
          />

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
