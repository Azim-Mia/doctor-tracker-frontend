
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DoctorForm,{
  type DoctorFormData
} from "@/app/components/doctors/DoctorForm";
export default function NewDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: DoctorFormData) => {
    try {
      setLoading(true);

      console.log("Doctor Data:", data);

      // এখানে আপনার Backend API যুক্ত করবেন

      alert("Doctor information submitted successfully!");

      router.push("/doctors");
    } catch (error) {
      console.error("Doctor submission failed:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <DoctorForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}
