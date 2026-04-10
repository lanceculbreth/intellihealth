"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import IntelliHealthPanel from "./IntelliHealthPanel";

const patients = [
  { id: 1, name: "Jessica Fernadez", email: "jessica@gmail.com", status: "Active" },
  { id: 2, name: "Maria Wilson", email: "mariawilson@example.in", status: "Active" },
  { id: 3, name: "Lucas Wilson Hughes", email: "lucashughes@example.in", status: "Active" },
  { id: 4, name: "John Jacob Christopher", email: "johnchristo@example.in", status: "Active" },
  { id: 5, name: "Rachel Kim", email: "rachelkim@example.in", status: "Active" },
  { id: 6, name: "David Chen", email: "davidchen@example.in", status: "Active" },
  { id: 7, name: "Emily Rodriguez", email: "emilyrod@example.in", status: "Active" },
  { id: 8, name: "Michael Thompson", email: "mthompson@example.in", status: "Active" },
  { id: 9, name: "Sarah Patel", email: "spatel@example.in", status: "Active" },
  { id: 10, name: "James O'Brien", email: "jobrien@example.in", status: "Active" },
];

export default function RecentPatients() {
  const [showAll, setShowAll] = useState(false);
  const [panelPatient, setPanelPatient] = useState<string | null>(null);
  const visible = showAll ? patients : patients.slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={18} className="text-[#1A1816]" />
        <h3 className="font-semibold text-[#1A1816]">Recent Patients</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <th className="pb-3 pl-2 font-medium">#</th>
            <th className="pb-3 font-medium">Patient Name</th>
            <th className="pb-3 font-medium">Email</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">IntelliHealth</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 last:border-0">
              <td className="py-3 pl-2 text-sm text-gray-500">{p.id}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[#1A1816]">{p.name}</span>
                </div>
              </td>
              <td className="py-3 text-sm text-gray-500">{p.email}</td>
              <td className="py-3">
                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                  {p.status}
                </span>
              </td>
              <td className="py-3">
                <button
                  onClick={() => setPanelPatient(p.name)}
                  className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors"
                >
                  View Insights
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-3 border-t border-gray-100 mt-1 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm font-medium text-[#1A1816] hover:text-[#1A1816]/70 transition-colors"
        >
          {showAll ? "Show less" : `See more (${patients.length - 5} remaining)`}
        </button>
      </div>
      <IntelliHealthPanel
        open={!!panelPatient}
        onClose={() => setPanelPatient(null)}
        patientName={panelPatient || ""}
      />
    </div>
  );
}
