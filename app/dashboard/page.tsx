import DoctorChart from "../components/dashboard/DoctorChart";
import PatientChart from "../components/dashboard/PatientChart";
import AdminLayout from "../components/layout/AdminLayout";
import StatsChart from "../components/dashboard/StatsCard";
export default function DashboardPage() {
  return (
    <AdminLayout> 
      <DoctorChart />
      <PatientChart />
      <StatsChart />
    </AdminLayout>
  );
}