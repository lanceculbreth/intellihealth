import { ArrowUp } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({
  icon,
  label,
  value,
  trend,
  trendUp = true,
}: StatCardProps) {
  return (
    <div className="bg-[#1A1816] rounded-xl p-6 flex flex-col gap-6">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-[#F5F0EA]/10 flex items-center justify-center text-[#F5F0EA]">
        {icon}
      </div>

      {/* Label + Value */}
      <div>
        <div className="text-sm text-[#F5F0EA]/70 mb-1">{label}</div>
        <div className="text-3xl font-bold text-[#F5F0EA]">{value}</div>
      </div>

      {/* Trend badge */}
      {trend && (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trendUp ? "text-teal-400 bg-teal-400/10" : "text-red-400 bg-red-400/10"
          }`}>
            <ArrowUp size={11} className={trendUp ? "" : "rotate-180"} />
            {trend}
          </div>
          <span className="text-xs text-[#F5F0EA]/50">vs last year</span>
        </div>
      )}
    </div>
  );
}
