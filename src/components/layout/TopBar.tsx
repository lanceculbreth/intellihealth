"use client";

import { Search, Bell, Settings, Command } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-16 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-gray-400">
            <Command size={12} />
            <span className="text-xs">K</span>
          </div>
        </div>
      </div>

      {/* Right: role toggles + actions */}
      <div className="flex items-center gap-3">
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          <button className="px-3 py-1.5 text-xs font-medium bg-teal-600 text-white">
            Clinic Admin
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
            Provider
          </button>
        </div>
        <button className="text-gray-400 hover:text-gray-600 relative">
          <Bell size={18} />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
