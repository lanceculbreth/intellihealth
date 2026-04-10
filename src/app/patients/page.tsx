"use client";

import { useState } from "react";
import { Users, Search, SlidersHorizontal, Mail, Plus, MoreHorizontal, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import IntelliHealthPanel from "@/components/dashboard/IntelliHealthPanel";

const firstNames = ["John", "Jessica", "Maria", "Lucas", "Rachel", "David", "Emily", "Michael", "Sarah", "James", "Anna", "Robert", "Olivia", "Daniel", "Sophia", "William", "Isabella", "Benjamin", "Mia", "Alexander"];
const lastNames = ["Christopher", "Fernadez", "Wilson", "Hughes", "Kim", "Chen", "Rodriguez", "Thompson", "Patel", "O'Brien", "Martinez", "Johnson", "Lee", "Garcia", "Brown", "Davis", "Miller", "Anderson", "Taylor", "Moore"];
const genders = ["Male", "Female"];
const practitioners = ["Sophia Long", "Dr. James Reed", "Dr. Amy Chen"];

function generatePatients(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i + 3) % lastNames.length];
    const g = genders[i % 2];
    const year = 1985 + (i % 30);
    const month = ((i * 3) % 12) + 1;
    const day = ((i * 7) % 28) + 1;
    const dob = new Date(year, month - 1, day);
    const dobStr = dob.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return {
      num: `#${String(i + 1).padStart(3, "0")}`,
      id: String(18337720 - i * 312),
      name: `${fn} ${ln}`,
      gender: g,
      dob: dobStr,
      email: `${fn.toLowerCase()}${ln.toLowerCase()}@example.in`,
      phone: `+1201${String(6000000 + i * 111111).slice(0, 7)}`,
      practitioner: practitioners[i % practitioners.length],
      status: "Active",
    };
  });
}

const allPatients = generatePatients(440);
const PER_PAGE = 10;
const TOTAL_PAGES = 22;

export default function PatientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [panelPatient, setPanelPatient] = useState<string | null>(null);
  const startIdx = (currentPage - 1) * PER_PAGE;
  const visiblePatients = allPatients.slice(startIdx, startIdx + PER_PAGE);

  const pageNumbers = () => {
    const pages: (number | string)[] = [];
    if (TOTAL_PAGES <= 7) {
      for (let i = 1; i <= TOTAL_PAGES; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(TOTAL_PAGES - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < TOTAL_PAGES - 2) pages.push("...");
      pages.push(TOTAL_PAGES);
    }
    return pages;
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Page header */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#1A1816]" />
          <h1 className="text-base font-semibold text-[#1A1816]">Patients</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-[#1A1816] hover:bg-gray-50 transition-colors">
            <Mail size={16} />
            Send Link
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#AF7D62] text-white rounded-lg text-sm font-medium hover:bg-[#9a6d54] transition-colors">
            <Plus size={16} />
            Add Patient
          </button>
        </div>
      </div>

      {/* Search + Toggle + Filter */}
      <div className="flex items-center justify-between mb-[14px]">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, patient ID, or DOB"
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm w-[360px] focus:outline-none focus:ring-1 focus:ring-[#1A1816]/20 focus:border-[#1A1816]/30 bg-white text-[#1A1816] placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-200 rounded-md h-[38px] items-center">
            <button className="px-3 h-full text-xs font-medium bg-gray-100 text-[#1A1816] rounded-l-md border-r border-gray-200">
              Patients
            </button>
            <button className="px-3 h-full text-xs font-medium text-gray-500 hover:text-[#1A1816] rounded-r-md">
              Form Links
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">
            <SlidersHorizontal size={15} />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl p-5">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-3 pl-2 font-medium w-[60px]">#</th>
              <th className="pb-3 font-medium w-[120px]">Patient ID</th>
              <th className="pb-3 font-medium">
                <span className="flex items-center gap-1">
                  Patient Name <ChevronUp size={12} />
                </span>
              </th>
              <th className="pb-3 font-medium w-[90px]">Gender</th>
              <th className="pb-3 font-medium w-[120px]">DOB</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Phone</th>
              <th className="pb-3 font-medium w-[130px]">Practitioner</th>
              <th className="pb-3 font-medium w-[90px]">
                <span className="flex items-center gap-1">
                  Status <ChevronUp size={12} />
                </span>
              </th>
              <th className="pb-3 font-medium w-[110px]">IntelliHealth</th>
              <th className="pb-3 font-medium w-[40px]"></th>
            </tr>
          </thead>
          <tbody>
            {visiblePatients.map((p) => (
              <tr key={p.num} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="py-3.5 pl-2 text-sm text-gray-500">{p.num}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-[#1A1816]">{p.id}</span>
                    <button className="text-gray-300 hover:text-gray-500">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    </button>
                  </div>
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[#1A1816]">{p.name}</span>
                  </div>
                </td>
                <td className="py-3.5 text-sm text-gray-500">{p.gender}</td>
                <td className="py-3.5 text-sm text-gray-500">{p.dob}</td>
                <td className="py-3.5 text-sm text-gray-500">{p.email}</td>
                <td className="py-3.5 text-sm text-gray-500">{p.phone}</td>
                <td className="py-3.5 text-sm text-gray-500">{p.practitioner}</td>
                <td className="py-3.5">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                    {p.status}
                  </span>
                </td>
                <td className="py-3.5">
                  <button
                    onClick={() => setPanelPatient(p.name)}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    View Insights
                  </button>
                </td>
                <td className="py-3.5 text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
          <div className="text-sm text-gray-500">
            Showing {startIdx + 1}–{Math.min(startIdx + PER_PAGE, allPatients.length)} of {allPatients.length} patients
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1816]"
            >
              <ChevronLeft size={16} />
            </button>
            {pageNumbers().map((pg, i) =>
              pg === "..." ? (
                <span key={`dots-${i}`} className="px-2 text-sm text-gray-400">…</span>
              ) : (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg as number)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    currentPage === pg
                      ? "bg-[#1A1816] text-white"
                      : "text-[#1A1816] hover:bg-gray-100"
                  }`}
                >
                  {pg}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={currentPage === TOTAL_PAGES}
              className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1816]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <IntelliHealthPanel
        open={!!panelPatient}
        onClose={() => setPanelPatient(null)}
        patientName={panelPatient || ""}
      />
    </div>
  );
}
