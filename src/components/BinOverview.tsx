"use client";

import { useEffect, useState } from "react";

interface Bin {
  _id: string;
  name: string;
}

interface BinVideo {
  _id: string;
  url: string;
  createdAt?: string;
}

interface BinWithVideos extends Bin {
  videos: BinVideo[];
  loading: boolean;
  expanded: boolean;
}

const BinOverview = () => {
  const [bins, setBins] = useState<BinWithVideos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBins = async () => {
      setLoading(true);
      setError("");
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
        } else {
          setError("Failed to load bins");
        }
      } catch (err) {
        setError("Failed to load bins");
      } finally {
        setLoading(false);
      }
    };

    fetchBins();
  }, []);

  const toggleExpand = async (binId: string) => {
    setBins((prev) =>
      prev.map((b) =>
        b._id === binId ? { ...b, expanded: !b.expanded } : b,
      ),
    );

    const target = bins.find((b) => b._id === binId);
    if (!target) return;
    if (target.videos.length > 0 || target.loading) return;

    setBins((prev) =>
      prev.map((b) => (b._id === binId ? { ...b, loading: true } : b)),
    );

    try {
      const res = await fetch(`/api/videos/${binId}`);
      const data = await res.json();
      if (data.success) {
        setBins((prev) =>
          prev.map((b) =>
            b._id === binId
              ? { ...b, videos: data.videos as BinVideo[] }
              : b,
          ),
        );
      }
    } catch {
      // ignore, keep empty list
    } finally {
      setBins((prev) =>
        prev.map((b) => (b._id === binId ? { ...b, loading: false } : b)),
      );
    }
  };

  return (
    <section className="h-full w-full rounded-xl bg-slate-900/70 p-4 shadow-lg border border-slate-800 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Bins & Assigned Videos</h2>
          <p className="text-xs text-slate-400">
            Overview of each smart bin and the videos assigned to it.
          </p>
        </div>
      </div>

      {loading && <p className="text-sm text-slate-300">Loading bins...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && bins.length === 0 && !error && (
        <p className="text-sm text-slate-400">
          No bins registered yet. Create a bin on the left to get started.
        </p>
      )}

      <div className="space-y-3 mt-2">
        {bins.map((bin) => (
          <div
            key={bin._id}
            className="rounded-lg border border-slate-700 bg-slate-800/60 p-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  {bin.name || "Unnamed Bin"}
                </p>
                <p className="text-[11px] text-slate-400">ID: {bin._id}</p>
              </div>
              <button
                onClick={() => toggleExpand(bin._id)}
                className="text-xs px-2 py-1 rounded border border-slate-500 text-slate-100 hover:bg-slate-700"
              >
                {bin.expanded ? "Hide Videos" : "View Videos"}
              </button>
            </div>

            {bin.expanded && (
              <div className="mt-3 border-t border-slate-700 pt-2 space-y-2">
                {bin.loading && (
                  <p className="text-xs text-slate-300">Loading videos...</p>
                )}

                {!bin.loading && bin.videos.length === 0 && (
                  <p className="text-xs text-slate-400">
                    No videos assigned to this bin yet.
                  </p>
                )}

                {!bin.loading && bin.videos.length > 0 && (
                  <ul className="space-y-2">
                    {bin.videos.map((video) => (
                      <li
                        key={video._id}
                        className="flex items-center justify-between gap-2 rounded bg-slate-900/80 p-2"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-slate-300 truncate">
                            {video.url}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] px-2 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                          >
                            Preview
                          </a>
                          <button
                            className="text-[11px] px-2 py-1 rounded border border-red-500 text-red-300 hover:bg-red-600/20"
                            onClick={async () => {
                              const confirmed = window.confirm(
                                "Delete this video from the bin?",
                              );
                              if (!confirmed) return;

                              const res = await fetch(
                                `/api/video/${video._id}`,
                                {
                                  method: "DELETE",
                                },
                              );
                              const data = await res.json();
                              if (data.success) {
                                setBins((prev) =>
                                  prev.map((b) =>
                                    b._id === bin._id
                                      ? {
                                          ...b,
                                          videos: b.videos.filter(
                                            (v) => v._id !== video._id,
                                          ),
                                        }
                                      : b,
                                  ),
                                );
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BinOverview;
