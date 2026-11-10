
"use client";

import {
  Activity,
  Stethoscope,
  UserX,
  Users,
  TrendingUp,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", doctors: 20 },
  { month: "Feb", doctors: 25 },
  { month: "Mar", doctors: 28 },
  { month: "Apr", doctors: 32 },
  { month: "May", doctors: 38 },
  { month: "Jun", doctors: 42 },
  { month: "Jul", doctors: 48 },
];

const statusData = [
  { name: "Active", value: 42, color: "#16A34A" },
  { name: "Inactive", value: 6, color: "#EF4444" },
];

export default function DoctorChart() {
  const totalDoctors = 48;
  const activeDoctors = 42;
  const inactiveDoctors = 6;

  const statistics = [
    {
      title: "Total Doctors",
      value: totalDoctors,
      description: "Total registered doctors",
      icon: Stethoscope,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Doctors",
      value: activeDoctors,
      description: "Currently active doctors",
      icon: Activity,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Inactive Doctors",
      value: inactiveDoctors,
      description: "Currently inactive doctors",
      icon: UserX,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Doctor Analytics
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor doctor registration and activity statistics.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {item.value}
                  </h3>
                </div>

                <div className={`rounded-xl p-3 ${item.iconBg} ${item.iconColor}`}>
                  <Icon size={25} />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Doctor Growth Chart */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Doctor Growth
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Monthly doctor registration overview
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="doctorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#2563EB"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor="#2563EB"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="doctors"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fill="url(#doctorGradient)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Doctor Status Chart */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Doctor Status
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Active vs inactive doctors
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 flex justify-between border-t border-gray-100 pt-4">
            <div>
              <p className="text-xs text-gray-500">Active</p>
              <p className="font-bold text-green-600">
                {activeDoctors}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Inactive</p>
              <p className="font-bold text-red-600">
                {inactiveDoctors}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-bold text-gray-900">
                {totalDoctors}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Activity Summary */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Users size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Doctor Activity Summary
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-gray-600">
                Active Doctors
              </span>
              <span className="font-semibold text-green-600">
                {Math.round((activeDoctors / totalDoctors) * 100)}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{
                  width: `${(activeDoctors / totalDoctors) * 100}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-gray-600">
                Inactive Doctors
              </span>
              <span className="font-semibold text-red-600">
                {Math.round((inactiveDoctors / totalDoctors) * 100)}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-red-500"
                style={{
                  width: `${(inactiveDoctors / totalDoctors) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
