
import DoctorTable from "../components/doctors/DoctorTable";

export default function DoctorsPage() {

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Doctors Management
      </h1>
        <DoctorTable />
    </div>
  );
}
