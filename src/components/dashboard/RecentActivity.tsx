import { TrendingUp } from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-[#1A1816]" />
          <h3 className="font-semibold text-[#1A1816]">Recent Activity</h3>
        </div>
        <span className="text-xs text-gray-400">Last 7 days</span>
      </div>
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <TrendingUp size={40} className="text-gray-200 mb-3" />
        <div className="text-sm font-medium text-gray-500">No recent activities</div>
        <div className="text-xs text-gray-400 mt-1">Activity will appear as changes are made</div>
      </div>
    </div>
  );
}
