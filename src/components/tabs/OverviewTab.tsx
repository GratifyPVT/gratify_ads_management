"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalBins: number;
  totalVideos: number;
}

const OverviewTab = () => {
  const [stats, setStats] = useState<Stats>({ totalBins: 0, totalVideos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          setStats((prev) => ({ ...prev, totalBins: data.users.length }));
          
          // Count total videos
          let videoCount = 0;
          for (const user of data.users) {
            const vRes = await fetch(`/api/videos/${user._id}`);
            const vData = await vRes.json();
            if (vData.success) {
              videoCount += vData.videos.length;
            }
          }
          setStats((prev) => ({ ...prev, totalVideos: videoCount }));
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#00ED64]/20 to-[#00ED64]/5 border border-[#00ED64]/30 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-2">
          Welcome to Gratify Ads Dashboard
        </h2>
        <p className="text-[#8B949E] text-sm">
          Manage your smart bins, upload advertisement videos, and monitor content distribution.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8B949E] text-xs uppercase tracking-wider mb-1">Total Bins</p>
              <p className="text-3xl font-bold text-white">
                {loading ? "—" : stats.totalBins}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#238636]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#00ED64]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8B949E] text-xs uppercase tracking-wider mb-1">Total Videos</p>
              <p className="text-3xl font-bold text-white">
                {loading ? "—" : stats.totalVideos}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#1f6feb]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#58a6ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8B949E] text-xs uppercase tracking-wider mb-1">Status</p>
              <p className="text-lg font-semibold text-[#00ED64]">Active</p>
            </div>
            <div className="w-12 h-12 bg-[#238636]/20 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-[#00ED64] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
        <h3 className="text-white font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="flex items-center gap-3 p-3 bg-[#21262D] border border-[#2D3748] rounded-lg hover:border-[#00ED64] transition-colors group">
            <div className="w-10 h-10 bg-[#238636]/20 rounded-lg flex items-center justify-center group-hover:bg-[#238636]/30">
              <svg className="w-5 h-5 text-[#00ED64]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Register Bin</p>
              <p className="text-xs text-[#8B949E]">Add a new smart bin</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-3 bg-[#21262D] border border-[#2D3748] rounded-lg hover:border-[#58a6ff] transition-colors group">
            <div className="w-10 h-10 bg-[#1f6feb]/20 rounded-lg flex items-center justify-center group-hover:bg-[#1f6feb]/30">
              <svg className="w-5 h-5 text-[#58a6ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Upload Video</p>
              <p className="text-xs text-[#8B949E]">Add content to bin</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-3 bg-[#21262D] border border-[#2D3748] rounded-lg hover:border-[#a371f7] transition-colors group">
            <div className="w-10 h-10 bg-[#8957e5]/20 rounded-lg flex items-center justify-center group-hover:bg-[#8957e5]/30">
              <svg className="w-5 h-5 text-[#a371f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">View API</p>
              <p className="text-xs text-[#8B949E]">Integration docs</p>
            </div>
          </button>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
        <h3 className="text-white font-medium mb-4">Getting Started</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#00ED64] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#0D1117]">
              1
            </div>
            <div>
              <p className="text-sm text-white font-medium">Register a Smart Bin</p>
              <p className="text-xs text-[#8B949E]">Create a new bin with a unique identifier</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#00ED64] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#0D1117]">
              2
            </div>
            <div>
              <p className="text-sm text-white font-medium">Upload Advertisement Videos</p>
              <p className="text-xs text-[#8B949E]">Add video content to your registered bins</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#00ED64] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#0D1117]">
              3
            </div>
            <div>
              <p className="text-sm text-white font-medium">Connect Your Smart Bin</p>
              <p className="text-xs text-[#8B949E]">Use the API endpoint to fetch and play videos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
