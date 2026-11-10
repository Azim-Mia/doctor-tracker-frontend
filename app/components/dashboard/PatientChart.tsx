
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";

const monthlyPatients = [
  { month: "Jan", patients: 120 },
  { month: "Feb", patients: 180 },
  { month: "Mar", patients: 150 },
  { month: "Apr", patients: 220 },
  { month: "May", patients: 250 },
  { month: "Jun", patients: 280 },
  { month: "Jul", patients: 310 },
  { month: "Aug", patients: 350 },
  { month: "Sep", patients: 390 },
  { month: "Oct", patients: 420 },
  { month: "Nov", patients: 450 },
  { month: "Dec", patients: 500 },
];

const genderData = [
  { name: "Male", value: 55, color: "#3B82F6" },
  { name: "Female", value: 40, color: "#EC4899" },
  { name: "Other", value: 5, color: "#A78BFA" },
];

const statusData = [
  { name: "Active", patients: 320 },
  { name: "Inactive", patients: 85 },
];

const stats = [
  {
    title: "Total Patients",
    value: "405",
    change: "+12.5%",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active Patients",
    value: "320",
    change: "+8.2%",
    icon: UserCheck,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Inactive Patients",
    value: "85",
    change: "-2.4%",
    icon: UserX,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "New Patients",
    value: "48",
    change: "+15.3%",
    icon: UserPlus,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function PatientChart() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Patient Analytics
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor patient registration and status.
        </p>
      </div>

      {/* Patient Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                </div>
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="mt-3 text-xs font-semibold text-green-600">
                {stat.change} from last month
              </p>
            </div>
          );
        })}
      </div>

      {/* Monthly Patient Growth */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800">
          Monthly Patient Growth
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          Patient registration throughout the year
        </p>

        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyPatients}>
              <defs>
                <linearGradient
                  id="patientGrowthGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="patients"
                name="Patients"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#patientGrowthGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gender and Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">
            Gender Distribution
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            Patients by gender
          </p>

          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >
                  {genderData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">
            Patient Status
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            Active and inactive patients
          </p>

          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="patients"
                  name="Patients"
                  radius={[8, 8, 0, 0]}
                  fill="#3B82F6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
