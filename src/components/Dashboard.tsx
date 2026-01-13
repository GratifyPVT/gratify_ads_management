"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import OverviewTab from "./tabs/OverviewTab";
import BinsTab from "./tabs/BinsTab";
import VideosTab from "./tabs/VideosTab";
import UploadTab from "./tabs/UploadTab";
import ApiTab from "./tabs/ApiTab";

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
      case "api":
        return <ApiTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0D1117]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-[#161B22] border-b border-[#2D3748] px-6 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-white capitalize">
                {activeTab === "api" ? "API Access" : activeTab}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 text-xs bg-[#00ED64] text-[#0D1117] rounded font-medium hover:bg-[#00D455] transition-colors">
                + New Bin
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
