"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Bin {
  _id: string;
  name: string;
}

const BinsTab = () => {
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");

  const fetchBins = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) {
        setBins(data.users);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setCreating(true);
    setMessage("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Bin created successfully!");
        setName("");
        setShowForm(false);
        fetchBins();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage("Failed to create bin");
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Smart Bins</h2>
          <p className="text-sm text-[#8B949E]">Manage your registered smart bins</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#00ED64] text-[#0D1117] rounded-lg text-sm font-medium hover:bg-[#00D455] transition-colors"
        >
          + Register Bin
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
          <h3 className="text-white font-medium mb-4">Register New Bin</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm text-[#8B949E] mb-2">Bin Name / Identifier</label>
              <input
                type="text"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="e.g., BIN-001 or Location Name"
                className="w-full px-4 py-2.5 bg-[#0D1117] border border-[#2D3748] rounded-lg text-white text-sm placeholder-[#484F58] focus:border-[#00ED64] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 bg-[#00ED64] text-[#0D1117] rounded-lg text-sm font-medium hover:bg-[#00D455] transition-colors disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create Bin"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-[#21262D] text-[#8B949E] rounded-lg text-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
          {message && (
            <p className={`mt-3 text-sm ${message.includes("Error") ? "text-[#f85149]" : "text-[#00ED64]"}`}>
              {message}
            </p>
          )}
        </div>
      )}

      {/* Bins Table */}
      <div className="bg-[#161B22] border border-[#2D3748] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2D3748]">
              <th className="text-left px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Bin Name
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Bin ID
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-[#8B949E]">
                  Loading bins...
                </td>
              </tr>
            ) : bins.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-[#8B949E]">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-12 h-12 text-[#2D3748]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p>No bins registered yet</p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="text-[#00ED64] hover:underline text-sm"
                    >
                      Register your first bin
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              bins.map((bin) => (
                <tr key={bin._id} className="border-b border-[#2D3748] hover:bg-[#21262D] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#238636]/20 rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#00ED64]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">{bin.name || "Unnamed Bin"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <code className="px-2 py-1 bg-[#0D1117] rounded text-xs text-[#8B949E] font-mono">
                      {bin._id}
                    </code>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => copyToClipboard(bin._id)}
                      className="px-3 py-1.5 text-xs bg-[#21262D] border border-[#2D3748] text-[#8B949E] rounded hover:text-white hover:border-[#484F58] transition-colors"
                    >
                      Copy ID
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

export default BinsTab;
