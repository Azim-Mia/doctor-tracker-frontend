import Link from "next/link";
import Button from "../components/ui/Button";
import PatientTable from "../components/patients/PatientTable";
export default function PatientsPage() {
  return (
    <div className="space-y-6 p-6">
    <div className="flex justify-between mr-16">
        <h1 className="text-2xl font-bold text-gray-800">
        Patients Management
      </h1>
       <Link href='/patients/new_patient'> 
   <Button text="Create New Patient" />
   </Link>
    </div>
       <PatientTable  /> 
    </div>
  );
}
