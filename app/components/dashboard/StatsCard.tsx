
"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  Users,
  Stethoscope,
  CalendarCheck,
  DollarSign,
} from "lucide-react";

const appointmentData = [
  { day: "Mon", appointments: 35 },
  { day: "Tue", appointments: 48 },
  { day: "Wed", appointments: 40 },
  { day: "Thu", appointments: 65 },
  { day: "Fri", appointments: 55 },
  { day: "Sat", appointments: 78 },
  { day: "Sun", appointments: 30 },
];

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 14000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 25000 },
];

const statistics = [
  {
    title: "Total Patients",
    value: "405",
    change: "+12.5%",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Doctors",
    value: "48",
    change: "+5.2%",
    icon: Stethoscope,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Appointments",
    value: "1,250",
    change: "+18.3%",
    icon: CalendarCheck,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Total Revenue",
    value: "৳1,25,000",
    change: "+10.8%",
    icon: DollarSign,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function StatsChart() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Overall hospital performance and analytics.
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => {
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

      {/* Weekly Appointments */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800">
          Weekly Appointments
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          Appointment statistics by day
        </p>

        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="appointments"
                name="Appointments"
                fill="#2563eb"
                radius={[7, 7, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800">
          Revenue Overview
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          Monthly revenue summary
        </p>

        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `৳${Number(value).toLocaleString("en-BD")}`,
                  "Revenue",
                ]}
              />

              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#6366F1"
                radius={[7, 7, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
