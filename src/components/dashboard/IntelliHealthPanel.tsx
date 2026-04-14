"use client";

import { useState } from "react";
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
  Circle,
  RefreshCw,
  ClipboardCopy,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface IntelliHealthPanelProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
}

const tabLabels = ["Patient Details", "Assessments", "Labs", "Wearable Data", "Trends", "Alerts", "Recommendation"];

const labCategories = [
  { color: "text-pink-500 bg-pink-50", label: "reproductive" },
  { color: "text-orange-500 bg-orange-50", label: "adrenal" },
  { color: "text-blue-500 bg-blue-50", label: "androgens" },
  { color: "text-purple-500 bg-purple-50", label: "thyroid" },
  { color: "text-gray-500 bg-gray-100", label: "other" },
];

const recommendedLabs = [
  { name: "Estradiol (Saliva)", desc: "Diurnal estrogen mapping", cat: 0 },
  { name: "Progesterone (Saliva)", desc: "Diurnal progesterone mapping", cat: 0 },
  { name: "Cortisol (Saliva - 4-point)", desc: "Diurnal cortisol rhythm (4-point)", cat: 1 },
  { name: "Estradiol", desc: "Fasting estradiol baseline", cat: 0 },
  { name: "Progesterone", desc: "Fasting progesterone baseline", cat: 0 },
  { name: "Total Testosterone", desc: "Fasting testosterone", cat: 2 },
  { name: "Free Testosterone", desc: "Bioavailable testosterone", cat: 2 },
  { name: "Sex Hormone Binding Globulin (SHBG)", desc: "Hormone binding capacity", cat: 2 },
  { name: "DHEA-Sulfate", desc: "Adrenal androgen marker", cat: 2 },
  { name: "Thyroid-Stimulating Hormone (TSH)", desc: "Rule out thyroid dysfunction", cat: 3 },
  { name: "Prolactin", desc: "Rule out hyperprolactinemia", cat: 4 },
];

const wearableData = [
  { day: "Day 1", recovery: 105, algorithm: 102 },
  { day: "Day 3", recovery: 98, algorithm: 96 },
  { day: "Day 5", recovery: 95, algorithm: 93 },
  { day: "Day 7", recovery: 92, algorithm: 90 },
  { day: "Day 10", recovery: 88, algorithm: 92 },
  { day: "Day 12", recovery: 90, algorithm: 88 },
  { day: "Day 14", recovery: 87, algorithm: 85 },
];

const recentLabs = [
  { name: "Fasting Insulin", value: "18 µIU/mL", status: "elevated" },
  { name: "HOMA-IR", value: "3.8", status: "elevated" },
  { name: "Total Testosterone", value: "68 ng/dL", status: "elevated" },
  { name: "DHEA-S", value: "380 µg/dL", status: "normal" },
  { name: "AMH", value: "8.2 ng/mL", status: "elevated" },
];

export default function IntelliHealthPanel({ open, onClose, patientName }: IntelliHealthPanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [recsOpen, setRecsOpen] = useState(true);

  if (!open) return null;

  const aiByTab: { suggestions: string[]; action: string }[] = [
    { suggestions: ["Emergency contact is missing — request from patient at next visit.", "Shipping address matches billing — confirm if separate shipping is needed for medication delivery.", "Patient BMI of 31 indicates obesity — ensure weight management program is active.", "Last updated 8 days ago — consider requesting updated health metrics."], action: "Update Patient Record" },
    { suggestions: ["Order metabolic panel (HbA1c, fasting glucose, lipid, kidney function) before initiating GLP-1 therapy.", "Review completed Weight Management intake — new data available for AI analysis.", "Follow up on General Health intake (in progress) — expires May 10.", "Consider scheduling baseline labs within 7 days to avoid therapy delay."], action: "Apply Recommendations" },
    { suggestions: ["Saliva + blood panel recommended based on general guidance track and low metabolic risk.", "Prioritize reproductive and androgen panels — 6 of 11 tests target hormonal assessment.", "TSH should be included to rule out thyroid-related differential diagnosis.", "Consider ordering full panel in one visit to reduce patient burden."], action: "Order Recommended Panel" },
    { suggestions: ["HRV declining since Week 3 — consider adjusting medication timing or dosage.", "Recovery scores trending down — recommend reducing exercise intensity for 1-2 weeks.", "Elevated insulin and HOMA-IR confirm insulin-resistant PCOS phenotype — Metformin dose may need review.", "Sleep quality degrading — screen for sleep apnea given BMI of 31."], action: "Apply Protocol Adjustments" },
    { suggestions: ["No trend data available yet — order baseline labs to begin longitudinal tracking.", "Once 2+ lab panels are on file, trend analysis will auto-generate comparison charts.", "Recommend scheduling follow-up labs at 3-month intervals for PCOS management."], action: "Schedule Follow-up Labs" },
    { suggestions: ["No clinical alerts triggered yet — connect wearable data source to enable real-time monitoring.", "Once connected, alerts will flag abnormal HRV drops, missed medication windows, and lab value changes.", "Set alert thresholds for this patient based on PCOS insulin-resistant profile."], action: "Configure Alert Rules" },
    { suggestions: ["Upstream recommendation engine has not generated output yet — ensure all intake data is submitted.", "Run AI on the completed Weight Management intake to trigger recommendation generation.", "Full recommendation requires: intake responses, baseline labs, and wearable data connection."], action: "Generate Recommendation" },
  ];

  const currentAI = aiByTab[activeTab];

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[60]" onClick={onClose} />

      {/* AI Summary - floats to the left of the panel */}
      <div className="fixed right-[796px] top-2 w-[380px] z-[70] animate-slide-in">
        <div className="bg-white rounded-2xl p-6 text-[#1A1816] shadow-2xl border border-gray-200">
          <button
            onClick={() => setRecsOpen(!recsOpen)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-teal-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Recommendations</span>
              {!recsOpen && (
                <span className="text-[10px] bg-[#1A1816] text-white px-1.5 py-0.5 rounded-full">{currentAI.suggestions.length}</span>
              )}
            </div>
            <ChevronRight size={14} className={`text-gray-400 transition-transform duration-200 ${recsOpen ? "rotate-90" : ""}`} />
          </button>
          {recsOpen && (
            <>
              <ul className="space-y-1.5 mt-4 mb-4">
                {currentAI.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#F5F0EA]/80 group cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-1 shrink-0 accent-[#1A1816] rounded cursor-pointer" />
                    <span className="group-hover:text-[#1A1816] transition-colors text-gray-600">{s}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors">
                Apply Selected
              </button>
            </>
          )}
        </div>
      </div>

      <div className="fixed right-2 top-2 h-[calc(100vh-16px)] w-[780px] bg-gray-50 z-[70] shadow-2xl overflow-y-auto animate-slide-in rounded-2xl">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
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
        <div className="bg-white border-b border-gray-200 px-6 pt-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === i
                    ? "border-[#1A1816] text-[#1A1816] font-medium"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5">
          {activeTab === 0 && <PatientDetailsTab patientName={patientName} />}
          {activeTab === 1 && <AssessmentsTab />}
          {activeTab === 2 && <LabsTab />}
          {activeTab === 3 && <WearableDataTab />}
          {activeTab === 4 && <TrendsTab />}
          {activeTab === 5 && <AlertsTab />}
          {activeTab === 6 && <RecommendationTab />}
        </div>
      </div>
    </>
  );
}

/* ─── AI Summary Block ─── */
function AISummary({ suggestions, action }: { suggestions: string[]; action: string }) {
  return (
    <div className="bg-[#1A1816] rounded-xl p-5 text-[#F5F0EA]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-teal-400" />
        <span className="text-sm font-semibold">Recommendations</span>
      </div>
      <ul className="space-y-2 mb-4">
        {suggestions.map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[#F5F0EA]/80">
            <span className="text-teal-400 mt-0.5 shrink-0">→</span>
            {s}
          </li>
        ))}
      </ul>
      <button className="w-full py-2.5 bg-[#AF7D62] hover:bg-[#9a6d54] text-white text-sm font-medium rounded-lg transition-colors">
        {action}
      </button>
    </div>
  );
}

/* ─── Patient Details Tab ─── */
function PatientDetailsTab({ patientName: name }: { patientName: string }) {
  return (
    <>
      {/* Patient Header Card */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-lg font-semibold">
            {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-[#1A1816]">{name}</h3>
              <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                Active
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
              <span>Patient ID: 18337720</span>
              <span>·</span>
              <span>london@patient.com</span>
              <span>·</span>
              <span>+15127865634</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-[#1A1816] hover:bg-gray-50">+ Add SOAP Note</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-[#1A1816] hover:bg-gray-50">Schedule Appointment</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1816] text-white rounded-md text-xs font-medium hover:bg-[#2a2826]">+ Create Order</button>
        </div>
      </div>

      {/* Personal Information + Contact */}
      <div className="grid grid-cols-2 gap-5">
        {/* Personal Info */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1A1816]">Personal Information</div>
              <div className="text-xs text-gray-400">Basic patient details</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg px-3 py-2.5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Date of Birth</div>
              <div className="text-sm font-medium text-[#1A1816]">Jul 5, 1976</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Gender</div>
                <div className="text-sm font-medium text-[#1A1816]">Female</div>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Assigned Practitioner</div>
                <div className="text-sm font-medium text-[#1A1816]">Sophia Long</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2.5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Last Updated</div>
              <div className="text-sm font-medium text-[#1A1816]">04/08/2026, 01:57 PM</div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center">
              <MessageSquare size={14} className="text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1A1816]">Contact Information</div>
              <div className="text-xs text-gray-400">Communication details</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Email <span className="text-[9px] bg-gray-200 text-gray-500 px-1 rounded">DEFAULT</span></div>
                <div className="text-sm font-medium text-[#1A1816]">london@patient.com</div>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Phone <span className="text-[9px] bg-gray-200 text-gray-500 px-1 rounded">DEFAULT</span></div>
                <div className="text-sm font-medium text-[#1A1816]">+15127865634</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2.5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Preferred Contact Method</div>
              <div className="text-sm font-medium text-teal-600">Email</div>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2.5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Emergency Contact</div>
              <div className="text-sm text-gray-400">—</div>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2.5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Billing Address</div>
              <div className="text-sm font-medium text-[#1A1816]">12001 Braun Road, Mount Pleasant, Wisconsin, 53177</div>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2.5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Shipping Address</div>
              <div className="text-sm font-medium text-[#1A1816]">12001 Braun Road, Mount Pleasant, Wisconsin, 53177</div>
              <div className="text-xs text-gray-400">(Same as billing)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-[#1A1816]" />
          <div>
            <div className="text-sm font-semibold text-[#1A1816]">Health Metrics</div>
            <div className="text-xs text-gray-400">Physical measurements & vitals</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Height", value: "5'6\"" },
            { label: "Weight", value: "182 lbs" },
            { label: "BMI", value: "31" },
            { label: "Blood Pressure", value: "128/82" },
          ].map((m) => (
            <div key={m.label} className="bg-gray-50 rounded-lg px-3 py-2.5">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{m.label}</div>
              <div className="text-sm font-medium text-[#1A1816]">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <FlaskConical size={16} className="text-[#1A1816]" />
          <div>
            <div className="text-sm font-semibold text-[#1A1816]">Current Medications</div>
          </div>
        </div>
        {[
          { name: "Metformin", dose: "500mg BID", route: "oral", status: "Active" },
          { name: "Vitamin D3", dose: "2000 IU daily", route: "oral", status: "Active" },
        ].map((med) => (
          <div key={med.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span className="text-sm font-medium text-[#1A1816]">{med.name}</span>
              <span className="text-sm text-gray-500">{med.dose} ({med.route})</span>
            </div>
            <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">{med.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Assessments Tab ─── */
function AssessmentsTab() {
  return (
    <>
      {/* IntelliHealth Ready */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#1A1816]">IntelliHealth Ready</h3>
            <span className="text-xs text-gray-400">Analysis available with current data</span>
          </div>
          <span className="text-xs bg-teal-50 text-teal-600 px-2.5 py-1 rounded-full font-medium">27%</span>
        </div>

        {/* Progress */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg px-3 py-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Data Profile</div>
            <div className="text-sm font-medium text-[#1A1816]">3 / 11 fields</div>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">To Enhance</div>
            <div className="text-sm font-medium text-teal-600">5 remaining</div>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Status</div>
            <div className="text-sm font-medium text-teal-600">Ready</div>
          </div>
        </div>

        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full" style={{ width: "27%" }} />
        </div>
      </div>

      {/* Intake Requests */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold text-[#1A1816]">Intake Requests</span>
          <span className="text-xs text-gray-500">1 pending, 1 new response</span>
          <span className="text-[10px] bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">
            New Data Available
          </span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#1A1816]">Weight Management (GLP-1)</span>
              <span className="text-[9px] bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded-full font-medium">NEW</span>
            </div>
            <span className="text-xs text-gray-400">Completed Apr 10</span>
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
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#1A1816]">General Health</span>
              <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium">IN PROGRESS</span>
            </div>
            <span className="text-xs text-gray-400">Sent Apr 10 · Expires May 10</span>
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
            <span className="font-semibold text-[#1A1816]">Labs Needed</span>
            <span className="text-xs text-gray-400">for GLP-1 Receptor Agonist Therapy</span>
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
        <button className="w-full mt-4 py-2.5 bg-[#1A1816] hover:bg-[#2a2826] text-white text-sm font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors">
          Order Labs
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Weight Management */}
      <div className="bg-white rounded-xl p-5">
        <h4 className="font-semibold text-[#1A1816] mb-2">Weight Management (GLP-1)</h4>
        <p className="text-sm text-gray-400">No responses recorded</p>
      </div>
    </>
  );
}

/* ─── Labs Tab ─── */
function LabsTab() {
  return (
    <>
      {/* Recommended Lab Panel */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-semibold text-[#1A1816]">Recommended Lab Panel</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">Saliva + Blood Panel</span>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Based on your general guidance track and low metabolic risk, we recommend a comprehensive saliva + blood panel.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {recommendedLabs.map((lab) => (
            <div key={lab.name} className="border border-gray-100 rounded-lg px-4 py-3 flex items-start justify-between">
              <div>
                <div className="text-sm font-medium text-[#1A1816]">{lab.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{lab.desc}</div>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ml-2 ${labCategories[lab.cat].color}`}>
                {labCategories[lab.cat].label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <Circle size={12} />
          11 tests recommended based on patient intake assessment
        </div>
      </div>

      {/* Lab Results */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <FlaskConical size={32} className="text-gray-300 mb-3" />
          <div className="text-sm font-medium text-gray-500">No lab results on file yet</div>
        </div>
      </div>
    </>
  );
}

/* ─── Wearable Data Tab ─── */
function WearableDataTab() {
  return (
    <>
      {/* Classification */}
      <div className="bg-white rounded-xl p-5">
        {/* Title row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#1A1816]">PCOS Classification</h3>
            <span className="text-xs text-gray-400">Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">Moderate</span>
            <span className="text-xs text-gray-500 border border-gray-200 px-2.5 py-1 rounded-md">89% confidence</span>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg px-3 py-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Phenotype</div>
            <div className="text-sm font-medium text-[#1A1816]">A (Classic)</div>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Endotype</div>
            <div className="text-sm font-medium text-[#1A1816]">Insulin-Resistant</div>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Protocol</div>
            <div className="text-sm font-medium text-teal-600">Enhanced</div>
          </div>
        </div>

        {/* Safety checks */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-sm text-gray-500">Safety Checks</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2A9D8F" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
            ))}
            <span className="text-xs text-teal-600 font-medium ml-1">6/6 passed</span>
          </div>
        </div>
      </div>

      {/* Patient Summary + Event Timeline */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1A1816]">{patientName || "John C."}</div>
              <div className="text-xs text-gray-400">Age</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 mb-4">
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">PCOS Phenotype A (Classic)</span>
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">BMI 31</span>
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Current Medications</div>
          <div className="text-sm text-[#1A1816] mb-4">• Metformin 500mg BID (oral)</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Recent Labs</div>
          {recentLabs.map((lab) => (
            <div key={lab.name} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-sm text-[#1A1816]">{lab.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{lab.value}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                  lab.status === "elevated" ? "bg-orange-100 text-orange-600" : "bg-teal-50 text-teal-600"
                }`}>{lab.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-5">
          <div className="font-semibold text-[#1A1816] mb-4">Event Timeline</div>
          <div className="space-y-4">
            {[
              { step: 1, title: "Baseline Labs", desc: "NimCore Women panel: Elevated insulin, HOMA-IR, testosterone", tag: "labs", tagColor: "bg-blue-50 text-blue-600" },
              { step: 2, title: "Week 1-2", desc: "Wearable monitoring begins, baseline HRV 38ms", tag: "wearable", tagColor: "bg-purple-50 text-purple-600" },
              { step: 3, title: "Week 3", desc: "HRV declining, sleep degrading, recovery scores dropping", tag: "wearable", tagColor: "bg-purple-50 text-purple-600" },
            ].map((event) => (
              <div key={event.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 shrink-0 mt-0.5">
                  {event.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1A1816]">{event.title}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${event.tagColor}`}>{event.tag}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wearable Chart */}
      <div className="bg-white rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-[#1A1816]" />
          <span className="font-semibold text-[#1A1816]">Wearable Data</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={wearableData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[0, 120]} />
            <Tooltip />
            <Line type="monotone" dataKey="recovery" stroke="#2A9D8F" strokeWidth={2} dot={{ r: 4, fill: "#2A9D8F" }} name="Recovery" />
            <Line type="monotone" dataKey="algorithm" stroke="#2A9D8F" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Proprietary Algorithm" />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

/* ─── Trends Tab ─── */
function TrendsTab() {
  return (
    <>
    <div className="bg-white rounded-xl p-5">
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <TrendingUp size={40} className="text-gray-300 mb-3" />
        <div className="text-base font-medium text-gray-500">Trend Analysis</div>
        <p className="text-sm text-gray-400 mt-1 text-center max-w-xs">
          Lab trend visualization will appear here once historical data is available.
        </p>
      </div>
    </div>
    </>
  );
}

/* ─── Alerts Tab ─── */
function AlertsTab() {
  return (
    <>
    <div className="bg-white rounded-xl p-5">
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <Bell size={40} className="text-gray-300 mb-3" />
        <div className="text-base font-medium text-gray-500">Proactive Alerts</div>
        <p className="text-sm text-gray-400 mt-1 text-center max-w-xs">
          Clinical alerts from the deterministic engine will appear here once connected.
        </p>
      </div>
    </div>
    </>
  );
}

/* ─── Recommendation Tab ─── */
function RecommendationTab() {
  return (
    <>
    <div className="bg-white rounded-xl p-5">
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <Sparkles size={40} className="text-gray-300 mb-3" />
        <div className="text-base font-medium text-gray-500">No Recommendation Yet</div>
        <p className="text-sm text-gray-400 mt-1 text-center max-w-xs">
          Recommendation will appear here once it is generated upstream.
        </p>
        <div className="flex items-center gap-3 mt-5">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">
            <ClipboardCopy size={14} />
            Force Sync
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

/* Need patientName in WearableDataTab - using a default */
const patientName = "John C.";
