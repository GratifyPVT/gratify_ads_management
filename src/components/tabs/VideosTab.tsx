"use client";

import { useEffect, useState } from "react";

interface Bin {
  _id: string;
  name: string;
}

interface Video {
  _id: string;
  url: string;
  createdAt?: string;
}

interface BinWithVideos extends Bin {
  videos: Video[];
  loading: boolean;
  expanded: boolean;
}

const VideosTab = () => {
  const [bins, setBins] = useState<BinWithVideos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBins = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          const mapped: BinWithVideos[] = data.users.map((u: Bin) => ({
            _id: u._id,
            name: u.name,
            videos: [],
            loading: false,
            expanded: false,
          }));
          setBins(mapped);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchBins();
  }, []);

  const toggleExpand = async (binId: string) => {
    const target = bins.find((b) => b._id === binId);
    if (!target) return;

    setBins((prev) =>
      prev.map((b) => (b._id === binId ? { ...b, expanded: !b.expanded } : b))
    );

    if (target.videos.length > 0 || target.loading) return;

    setBins((prev) =>
      prev.map((b) => (b._id === binId ? { ...b, loading: true } : b))
    );

    try {
      const res = await fetch(`/api/videos/${binId}`);
      const data = await res.json();
      if (data.success) {
        setBins((prev) =>
          prev.map((b) =>
            b._id === binId ? { ...b, videos: data.videos as Video[] } : b
          )
        );
      }
    } catch {
      // ignore
    } finally {
      setBins((prev) =>
        prev.map((b) => (b._id === binId ? { ...b, loading: false } : b))
      );
    }
  };

  const deleteVideo = async (binId: string, videoId: string) => {
    const confirmed = window.confirm("Delete this video from the bin?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/video/${videoId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBins((prev) =>
          prev.map((b) =>
            b._id === binId
              ? { ...b, videos: b.videos.filter((v) => v._id !== videoId) }
              : b
          )
        );
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">Videos by Bin</h2>
        <p className="text-sm text-[#8B949E]">
          View and manage videos assigned to each smart bin
        </p>
      </div>

      {/* Bins List */}
      {loading ? (
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-8 text-center text-[#8B949E]">
          Loading bins...
        </div>
      ) : bins.length === 0 ? (
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-8 text-center text-[#8B949E]">
          <svg className="w-12 h-12 mx-auto mb-3 text-[#2D3748]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p>No bins available. Register a bin first.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bins.map((bin) => (
            <div
              key={bin._id}
              className="bg-[#161B22] border border-[#2D3748] rounded-lg overflow-hidden"
            >
              {/* Bin Header */}
              <button
                onClick={() => toggleExpand(bin._id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#21262D] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#238636]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#00ED64]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">{bin.name || "Unnamed Bin"}</p>
                    <p className="text-xs text-[#8B949E] font-mono">{bin._id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-[#21262D] rounded text-xs text-[#8B949E]">
                    {bin.videos.length > 0 ? `${bin.videos.length} videos` : "Click to load"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#8B949E] transition-transform ${bin.expanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Videos List */}
              {bin.expanded && (
                <div className="border-t border-[#2D3748] px-5 py-4 bg-[#0D1117]">
                  {bin.loading ? (
                    <p className="text-[#8B949E] text-sm">Loading videos...</p>
                  ) : bin.videos.length === 0 ? (
                    <p className="text-[#8B949E] text-sm">No videos assigned to this bin</p>
                  ) : (
                    <div className="space-y-2">
                      {bin.videos.map((video, idx) => (
                        <div
                          key={video._id}
                          className="flex items-center justify-between p-3 bg-[#161B22] border border-[#2D3748] rounded-lg"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 bg-[#1f6feb]/20 rounded flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-[#58a6ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-white font-medium">Video {idx + 1}</p>
                              <p className="text-xs text-[#8B949E] truncate">{video.url}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 text-xs bg-[#238636] text-white rounded hover:bg-[#2ea043] transition-colors"
                            >
                              Preview
                            </a>
                            <button
                              onClick={() => deleteVideo(bin._id, video._id)}
                              className="px-3 py-1.5 text-xs border border-[#f85149] text-[#f85149] rounded hover:bg-[#f85149]/10 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideosTab;
