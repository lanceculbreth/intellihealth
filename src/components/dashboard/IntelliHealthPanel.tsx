"use client";

import {
  X,
  Sparkles,
  ClipboardList,
  FlaskConical,
  TrendingUp,
  Bell,
  MessageSquare,
  Activity,
  ChevronRight,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface IntelliHealthPanelProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
}

const tabs = [
  { label: "Assessments" },
  { label: "Labs" },
  { label: "Wearable Data", preview: true },
  { label: "Trends" },
  { label: "Alerts" },
  { label: "Recommendation" },
];

export default function IntelliHealthPanel({ open, onClose, patientName }: IntelliHealthPanelProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-[60]" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-2 top-2 h-[calc(100vh-16px)] w-[720px] bg-gray-50 z-[70] shadow-2xl overflow-y-auto animate-slide-in rounded-2xl">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-teal-600" />
              <h2 className="text-lg font-semibold text-[#1A1816]">IntelliHealth</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="font-medium text-[#1A1816]">{patientName}</span>
            <span>·</span>
            <span>DOB: Apr 21, 2002</span>
            <span>·</span>
            <span>Age: 24</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-6">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  i === 0
                    ? "border-[#1A1816] text-[#1A1816] font-medium"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                {tab.preview && (
                  <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium">
                    Preview
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* IntelliHealth Ready */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-teal-600" />
              <span className="font-semibold text-[#1A1816]">IntelliHealth Ready</span>
              <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">27%</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Analysis available with current data. Gather 5 more data points for deeper insights.
            </p>
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Data profile</span>
                <span>3 / 11 fields</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: "27%" }} />
              </div>
            </div>
            <button className="text-xs text-teal-600 font-medium flex items-center gap-1 mt-2">
              <TrendingUp size={12} />
              5 to enhance
            </button>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
              <Circle size={12} className="text-teal-500" />
              Ready for analysis now. Additional data unlocks deeper personalization.
            </div>
          </div>

          {/* Intake Requests */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ClipboardList size={16} className="text-[#1A1816]" />
                <span className="font-semibold text-[#1A1816]">Intake Requests</span>
                <span className="text-xs text-gray-500">1 pending, 1 new response</span>
                <span className="text-[10px] bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">
                  New Data Available
                </span>
              </div>
            </div>
            {/* Intake item 1 */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#1A1816]">Weight Management (GLP-1)</span>
                    <span className="text-[9px] bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded-full font-medium">NEW</span>
                  </div>
                  <span className="text-xs text-gray-400">Completed Apr 10</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#1A1816] border border-gray-200 px-2.5 py-1.5 rounded-md">
                  <Eye size={12} />
                  Review
                </button>
                <button className="flex items-center gap-1 text-xs text-white bg-[#1A1816] px-2.5 py-1.5 rounded-md hover:bg-[#2a2826]">
                  <Sparkles size={12} />
                  Run AI
                </button>
              </div>
            </div>
            {/* Intake item 2 */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#1A1816]">General Health</span>
                    <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium">IN PROGRESS</span>
                  </div>
                  <span className="text-xs text-gray-400">Sent Apr 10 · Expires May 10</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#1A1816] border border-gray-200 px-2.5 py-1.5 rounded-md">
                <MessageSquare size={12} />
                Resend
              </button>
            </div>
          </div>

          {/* Labs Needed */}
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-orange-500" />
                <div>
                  <span className="font-semibold text-[#1A1816]">Labs Needed</span>
                  <span className="text-xs text-gray-400 ml-2">for GLP-1 Receptor Agonist Therapy</span>
                </div>
              </div>
              <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">4 labs</span>
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Metabolic Panel</div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
              <span></span>
              <span>0/4 available</span>
            </div>
            {["HbA1c", "Fasting Glucose", "Lipid Panel", "Kidney Function"].map((lab) => (
              <div key={lab} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#1A1816]">{lab}</span>
                  <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium">recommended</span>
                </div>
                <Circle size={14} className="text-gray-300" />
              </div>
            ))}
            <button className="w-full mt-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors">
              Order Labs
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Weight Management */}
          <div className="bg-white rounded-xl p-5">
            <h4 className="font-semibold text-[#1A1816] mb-2">Weight Management (GLP-1)</h4>
            <p className="text-sm text-gray-400">No responses recorded</p>
          </div>
        </div>
      </div>
    </>
  );
}
