import { Users, Stethoscope, Package, DollarSign, Bell, Settings } from "lucide-react";

function DashIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import GrowthChart from "@/components/dashboard/GrowthChart";
import RecentPatients from "@/components/dashboard/RecentPatients";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Tasks from "@/components/dashboard/Tasks";

export default function Dashboard() {
  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Page header */}
      <div className="mb-[14px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DashIcon size={18} className="text-[#1A1816]" />
          <h1 className="text-base font-semibold text-[#1A1816]">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-[#1A1816] hover:text-[#1A1816]/70">
            <Bell size={18} />
          </button>
          <button className="text-[#1A1816] hover:text-[#1A1816]/70">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-[14px] mb-[14px]">
        <StatCard
          icon={<Users size={20} />}
          label="Total Patients"
          value="3"
          trend="100.0%"
        />
        <StatCard
          icon={<Stethoscope size={20} />}
          label="Active Practitioners"
          value="1"
          trend="100.0%"
        />
        <StatCard
          icon={<Package size={20} />}
          label="Total Products"
          value="464"
          trend="12.5%"
        />
        <StatCard
          icon={<DollarSign size={20} />}
          label="Monthly Revenue"
          value="$0.00"
          trend="0%"
          trendUp={false}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
        <div className="col-span-2">
          <RevenueChart />
        </div>
        <GrowthChart />
      </div>

      {/* Patients + Activity row */}
      <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
        <div className="col-span-2">
          <RecentPatients />
        </div>
        <RecentActivity />
      </div>

      {/* Tasks */}
      <Tasks />
    </div>
  );
}
