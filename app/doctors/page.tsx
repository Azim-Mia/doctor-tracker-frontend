
import Link from "next/link";
import DoctorTable from "../components/doctors/DoctorTable";
import Button from "../components/ui/Button";

export default function DoctorsPage() {

  return (
    <div className="space-y-6 p-6">
<div className="flex justify-between mr-16">
   <div className="text-2xl font-bold text-gray-800">
        Doctors Management
      </div>
   <Link href='/doctors/new_doctor'> 
   <Button text="Create New Patient" />
   </Link>
  </div>
        <DoctorTable />
    </div>
  );
}
