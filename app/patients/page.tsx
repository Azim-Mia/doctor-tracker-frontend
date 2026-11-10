
import PatientTable from "../components/patients/PatientTable";
export default function PatientsPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Patients Management
      </h1>
       <PatientTable  /> 
    </div>
  );
}
