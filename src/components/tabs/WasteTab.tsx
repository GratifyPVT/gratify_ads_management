"use client";

import { ChangeEvent, useEffect, useState } from "react";

interface WasteEntry {
  _id: string;
  type: string;
  editedtype: string;
  binlocation: string;
  imageUrl: string;
  publicId: string;
  category?: "biodegradable" | "recyclable" | "miscellaneous";
  disposedAt: string;
}

const WasteTab = () => {
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchWaste = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/waste");
      const data = await res.json();
      if (data.success) {
        setWasteEntries(data.waste);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaste();
  }, []);

  const deleteWaste = async (wasteId: string, publicId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this waste entry? This will also remove the image from storage.");
    if (!confirmed) return;

    setUpdating(wasteId);
    try {
      const res = await fetch(`/api/waste/${wasteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      const data = await res.json();
      if (data.success) {
        setWasteEntries((prev) => prev.filter((waste) => waste._id !== wasteId));
      } else {
        alert(`Delete failed: ${data.error}`);
      }
    } catch {
      alert("Failed to delete waste entry");
    } finally {
      setUpdating(null);
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "biodegradable":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "recyclable":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "miscellaneous":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

    function updateCategory(_id: string, arg1: string): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">Waste Management</h2>
        <p className="text-sm text-[#8B949E]">
          View and categorize waste entries from smart bins
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-4">
          <p className="text-[#8B949E] text-sm">Total Waste</p>
          <p className="text-2xl font-bold text-white">{wasteEntries.length}</p>
        </div>
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-4">
          <p className="text-[#8B949E] text-sm">Biodegradable</p>
          <p className="text-2xl font-bold text-green-400">
            {wasteEntries.filter((w) => w.category === "biodegradable").length}
          </p>
        </div>
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-4">
          <p className="text-[#8B949E] text-sm">Recyclable</p>
          <p className="text-2xl font-bold text-blue-400">
            {wasteEntries.filter((w) => w.category === "recyclable").length}
          </p>
        </div>
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-4">
          <p className="text-[#8B949E] text-sm">Miscellaneous</p>
          <p className="text-2xl font-bold text-yellow-400">
            {wasteEntries.filter((w) => w.category === "miscellaneous").length}
          </p>
        </div>
      </div>

      {/* Waste Table */}
      <div className="bg-[#161B22] border border-[#2D3748] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2D3748]">
              <th className="text-left px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Image
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Location
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Date
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-[#8B949E]">
                  Loading waste entries...
                </td>
              </tr>
            ) : wasteEntries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-[#8B949E]">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-[#2D3748]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <p>No waste entries yet</p>
                  </div>
                </td>
              </tr>
            ) : (
              wasteEntries.map((waste) => (
                <tr key={waste._id} className="border-b border-[#2D3748] hover:bg-[#21262D] transition-colors">
                  <td className="px-5 py-4">
                    <img
                      src={waste.imageUrl}
                      alt={waste.type}
                      className="w-12 h-12 object-cover rounded border border-[#2D3748]"
                    />
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-white font-medium">{waste.type}</p>
                      <p className="text-xs text-[#8B949E]">{waste.editedtype}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-white text-sm">{waste.binlocation}</p>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={waste.category || ""}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        updateCategory(waste._id, e.target.value as "biodegradable" | "recyclable" | "miscellaneous")
                      }
                      disabled={updating === waste._id}
                      className={`px-3 py-1 text-xs rounded border transition-colors ${
                        waste.category
                          ? getCategoryColor(waste.category)
                          : "bg-[#21262D] border-[#2D3748] text-[#8B949E]"
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="biodegradable">Biodegradable</option>
                      <option value="recyclable">Recyclable</option>
                      <option value="miscellaneous">Miscellaneous</option>
                    </select>
                    {updating === waste._id && (
                      <span className="ml-2 text-xs text-[#8B949E]">Updating...</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[#8B949E] text-sm">
                      {new Date(waste.disposedAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => deleteWaste(waste._id, waste.publicId)}
                      disabled={updating === waste._id}
                      className="px-3 py-1.5 text-xs border border-[#f85149] text-[#f85149] rounded hover:bg-[#f85149]/10 transition-colors disabled:opacity-50"
                    >
                      {updating === waste._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WasteTab;
