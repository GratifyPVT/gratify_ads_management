"use client";

import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: "bins",
      label: "Smart Bins",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "videos",
      label: "Videos",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "upload",
      label: "Upload",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      id: "waste",
      label: "Waste Management",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      id: "api",
      label: "API Access",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-56 bg-[#1C2333] border-r border-[#2D3748] flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-[#2D3748]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00ED64] rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-[#1C2333]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-white text-sm">Gratify</span>
        </div>
      </div>

      {/* Project selector */}
      <div className="p-3 border-b border-[#2D3748]">
        <div className="bg-[#2D3748] rounded px-3 py-2">
          <p className="text-[10px] text-[#8B949E] uppercase tracking-wider">Project</p>
          <p className="text-sm text-white font-medium truncate">Smart Bin Ads</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        <p className="px-3 py-2 text-[10px] text-[#8B949E] uppercase tracking-wider font-medium">
          Deployment
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
              activeTab === item.id
                ? "bg-[#00ED64]/10 text-[#00ED64] border-l-2 border-[#00ED64]"
                : "text-[#8B949E] hover:bg-[#2D3748] hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#2D3748]">
        <div className="flex items-center gap-2 text-[#8B949E] text-xs">
          <div className="w-2 h-2 bg-[#00ED64] rounded-full animate-pulse" />
          <span>Connected</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
