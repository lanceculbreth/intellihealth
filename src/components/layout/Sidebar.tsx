"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserCog,
  FileText,
  Calendar,
  MessageSquare,
  FlaskConical,
  ClipboardList,
  Sparkles,
  Store,
  Package,
  CreditCard,
  Wallet,
  Shield,
  UserCircle,
  UserPlus,
  Settings,
  Layers,
  ChevronDown,
  ChevronRight,
  PanelLeft,
  Search,
  Command,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  href?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "",
    items: [
      { label: "Dashboard", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>, href: "/" },
    ],
  },
  {
    title: "Clinical",
    items: [
      { label: "Patients", icon: <Users size={18} />, href: "/patients" },
      { label: "Practitioners", icon: <Stethoscope size={18} /> },
      { label: "Practitioner Staff", icon: <UserCog size={18} /> },
      { label: "Prescriptions", icon: <FileText size={18} /> },
      { label: "Calendar", icon: <Calendar size={18} /> },
      { label: "Messaging", icon: <MessageSquare size={18} /> },
      { label: "Lab Orders", icon: <FlaskConical size={18} /> },
      { label: "Intakes", icon: <ClipboardList size={18} /> },
      {
        label: "IntelliHealth",
        icon: <Sparkles size={18} />,
      },
    ],
  },
  {
    title: "Storefront",
    items: [
      { label: "Storefront", icon: <Store size={18} /> },
      { label: "Products", icon: <Package size={18} /> },
      { label: "Subscriptions", icon: <CreditCard size={18} /> },
    ],
  },
  {
    title: "Operations",
    items: [{ label: "Payments", icon: <Wallet size={18} /> }],
  },
  {
    title: "Admin",
    items: [
      { label: "Roles", icon: <Shield size={18} /> },
      { label: "Users", icon: <UserCircle size={18} /> },
      { label: "Admins", icon: <UserPlus size={18} /> },
      { label: "Programs", icon: <Layers size={18} /> },
      { label: "Settings", icon: <Settings size={18} /> },
    ],
  },
];

export default function Sidebar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  return (
    <aside className={`${collapsed ? "w-[60px]" : "w-[250px]"} h-[calc(100vh-16px)] bg-[#1A1816] text-[#F5F0EA] flex flex-col fixed left-2 top-2 z-50 transition-all duration-200 rounded-2xl`}>
      {/* Logo + collapse */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[#F5F0EA]/10">
        {!collapsed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/nimbus_logo_white.svg" alt="Nimbus" className="h-6" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-[#F5F0EA]/50 hover:text-[#F5F0EA] transition-colors ${collapsed ? "mx-auto" : ""}`}
        >
          <PanelLeft size={18} className={collapsed ? "rotate-180" : ""} />
        </button>
      </div>

      {/* Search button */}
      <div className="px-3 pt-3 pb-1">
        <button
          onClick={() => setSearchOpen(true)}
          className={`w-full flex items-center gap-2 px-3 py-2 border border-[#F5F0EA]/10 rounded-md text-sm text-[#F5F0EA]/40 hover:border-[#F5F0EA]/20 transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <Search size={14} />
          {!collapsed && (
            <>
              <span>Search...</span>
              <div className="ml-auto flex items-center gap-0.5 text-[#F5F0EA]/30">
                <Command size={11} />
                <span className="text-[10px]">K</span>
              </div>
            </>
          )}
        </button>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => setSearchOpen(false)}>
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-[680px] max-h-[65vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
              <Search size={22} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search pages, features, settings..."
                className="flex-1 text-lg text-[#1A1816] placeholder-gray-400 focus:outline-none"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            {/* Results */}
            <div className="py-3 overflow-y-auto max-h-[calc(65vh-72px)]">
              <div className="px-6 py-2 text-xs text-gray-400 font-medium">Home</div>
              <button className="w-full flex items-center gap-3 px-6 py-3 bg-[#F5F0EA]/60 text-[#1A1816]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
                <span className="text-base font-medium">Dashboard</span>
              </button>
              <div className="px-6 py-2 text-xs text-gray-400 font-medium mt-2">Clinical</div>
              {["Patients", "Practitioners", "Practitioner Staff", "Prescriptions", "IntelliHealth AI"].map((item) => (
                <button key={item} className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-50 text-[#1A1816]">
                  <Users size={20} className="text-gray-400" />
                  <span className="text-base">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navSections.map((section) => (
          <div key={section.title} className="mb-1">
            {!collapsed && (
              <div className={`text-[10px] text-[#F5F0EA]/50 uppercase tracking-wider px-3 pt-3 pb-1 ${!section.title ? "hidden" : ""}`}>
                {section.title}
              </div>
            )}
            {section.items.map((item) => (
              <a
                key={item.label}
                href={item.href || "#"}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${collapsed ? "justify-center" : ""} ${
                  (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href || "---"))
                    ? "bg-teal-600 text-white font-medium"
                    : "text-[#F5F0EA]/70 hover:bg-white/10 hover:text-[#F5F0EA]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.label === "IntelliHealth" && (
                  <span className="ml-auto bg-red-500 text-white text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    AI
                  </span>
                )}
              </a>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className={`border-t border-[#F5F0EA]/10 px-4 py-3 ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed && (
          <div className="text-[9px] text-[#F5F0EA]/30 mb-2">
            Powered by Nimbus-01 | V2.0.1
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
            S
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm text-[#F5F0EA] font-medium truncate">
                Sophia Long
              </div>
              <div className="text-[11px] text-[#F5F0EA]/50 truncate">
                directtestcareclinic@gmai...
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
