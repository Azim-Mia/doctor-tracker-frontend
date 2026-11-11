import DoctorForm from "@/app/components/doctors/DoctorForm";
export default function NewDoctorPage() {

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Add to Doctor
      </h1>
        <DoctorForm />
    </div>
  );
}
