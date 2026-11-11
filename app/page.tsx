
import Link from "next/link";
import { Stethoscope, LogIn, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: "url('/doctor.png')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-950/55" />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">

        {/* Logo */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-white shadow-xl backdrop-blur-md">
          <Stethoscope size={42} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Doctor Tracker
        </h1>

        <p className="mt-4 max-w-md text-base leading-7 text-white/85 sm:text-lg">
          Smart and Simple Healthcare Management System
        </p>

        {/* Login Button */}
        <Link
          href="/login"
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
        >
          <LogIn size={22} />
          Login
        </Link>

        {/* Security Text */}
        <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
          <ShieldCheck size={17} />
          Secure Healthcare Management
        </div>
      </div>
    </main>
  );
}
