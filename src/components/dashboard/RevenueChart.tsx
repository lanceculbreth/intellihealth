"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "2026-01-01", revenue: 5000 },
  { month: "2026-02-01", revenue: 45000 },
  { month: "2026-03-01", revenue: 30000 },
  { month: "2026-03-15", revenue: 15000 },
  { month: "2026-04-01", revenue: 0 },
  { month: "2026-05-01", revenue: 0 },
  { month: "2026-06-01", revenue: 0 },
  { month: "2026-07-01", revenue: 0 },
  { month: "2026-08-01", revenue: 0 },
  { month: "2026-09-01", revenue: 0 },
  { month: "2026-10-01", revenue: 0 },
  { month: "2026-11-01", revenue: 0 },
  { month: "2026-12-01", revenue: 0 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-[#1A1816]" />
          <h3 className="font-semibold text-[#1A1816]">Revenue Overview</h3>
        </div>
        <select className="text-sm rounded-md px-3 py-1 text-gray-600 bg-white">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tickFormatter={(v) => {
              const d = new Date(v);
              return d.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, "-");
            }}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${v / 1000}k`}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2A9D8F"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
