"use client";

import { useState,useEffect } from "react";
import Sidebar from "./Sidebar";
import OverviewTab from "./tabs/OverviewTab";
import BinsTab from "./tabs/BinsTab";
import VideosTab from "./tabs/VideosTab";
import UploadTab from "./tabs/UploadTab";
import WasteTab from "./tabs/WasteTab";

import WastePredictorGuide from "./WastePredictorGuide";
import ApiTab from "./tabs/ApiTab";
import ApiGuide from "./ApiGuide";
import WasteUploadGuide from "./WasteUploadGuide";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "bins":
        return <BinsTab />;
      case "videos":
        return <VideosTab />;
      case "upload":
        return <UploadTab />;
      case "waste":
        return <WasteTab />;
      case "api":
        return <ApiTab />;
      case "mlguide":
        return <WastePredictorGuide />;
      case "apiguide":
        return <ApiGuide />;
      case "wasteuploadguide":
        return <WasteUploadGuide />;
      default:
        return <OverviewTab />;
    }
  };

  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0D1117]">
      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
      {/* Sidebar */}
      <div className={`fixed z-50 md:static md:translate-x-0 top-0 left-0 h-full transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`} style={{width: '224px'}}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {/* Main content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Top Header */}
        <header className="bg-[#161B22] border-b border-[#2D3748] px-4 md:px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="md:hidden mr-2 text-[#00ED64] focus:outline-none"
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-white capitalize truncate">
              {activeTab === "api" ? "API Access" : activeTab === "waste" ? "Waste Management" : activeTab}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "bins" && (
              <button className="px-3 py-1.5 text-xs bg-[#00ED64] text-[#0D1117] rounded font-medium hover:bg-[#00D455] transition-colors">
                + New Bin
              </button>
            )}
            {activeTab === "waste" && (
              <button className="px-3 py-1.5 text-xs bg-[#00ED64] text-[#0D1117] rounded font-medium hover:bg-[#00D455] transition-colors">
                + Upload Waste
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-2 sm:p-4 md:p-6 max-w-full">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
