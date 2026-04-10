"use client";

import { Plus, Filter, ClipboardCheck } from "lucide-react";

export default function Tasks() {
  return (
    <div className="bg-white rounded-xl p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <ClipboardCheck size={18} className="text-[#1A1816]" />
          <h3 className="text-xl font-bold text-[#1A1816]">Tasks</h3>
          <p className="text-sm text-gray-500">Manage patient follow-ups and reminders</p>
        </div>
        <button className="bg-[#1A1816] hover:bg-[#2a2826] text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-1.5 transition-colors">
          <Plus size={16} />
          New Task
        </button>
      </div>
      <div className="flex items-center gap-3 mt-3 mb-4">
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
          Pending: 0
        </span>
        <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-medium">
          Overdue: 0
        </span>
      </div>
      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Filter size={14} />
          <span>Status:</span>
          <select className="border border-gray-200 rounded px-2 py-1 text-sm bg-white">
            <option>All</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <span>Priority:</span>
          <select className="border border-gray-200 rounded px-2 py-1 text-sm bg-white">
            <option>All</option>
          </select>
        </div>
      </div>
      {/* Empty state spinner area */}
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
      </div>
    </div>
  );
}
