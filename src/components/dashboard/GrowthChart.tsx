"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

const data = [
  { month: "Nov", patients: 0, practitioners: 0 },
  { month: "Dec", patients: 0, practitioners: 0 },
  { month: "Jan", patients: 0, practitioners: 0 },
  { month: "Feb", patients: 0, practitioners: 0 },
  { month: "Mar", patients: 3, practitioners: 1 },
  { month: "Apr", patients: 0, practitioners: 0 },
];

export default function GrowthChart() {
  return (
    <div className="bg-white rounded-xl p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-[#1A1816]" />
        <h3 className="font-semibold text-[#1A1816]">Growth Analytics</h3>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Bar dataKey="patients" fill="#2A9D8F" radius={[3, 3, 0, 0]} barSize={20} name="Patients" />
          <Bar dataKey="practitioners" fill="#c2956a" radius={[3, 3, 0, 0]} barSize={20} name="Practitioners" />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2 justify-center">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
          Patients
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c2956a]" />
          Practitioners
        </div>
      </div>
    </div>
  );
}
