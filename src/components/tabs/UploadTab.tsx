"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Bin {
  _id: string;
  name: string;
}

const UploadTab = () => {
  const [bins, setBins] = useState<Bin[]>([]);
  const [selectedBin, setSelectedBin] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          setBins(data.users);
        }
      } catch {
        // ignore
      }
    };
    fetchBins();
  }, []);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBin || !file) {
      setMessage("Please select a bin and choose a video file");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("userId", selectedBin);
    formData.append("video", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.duplicate ? "Video already exists for this bin" : "Video uploaded successfully!");
        setFile(null);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">Upload Video</h2>
        <p className="text-sm text-[#8B949E]">
          Upload advertisement videos to your smart bins
        </p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-6">
        {/* Bin Selection */}
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
          <label className="block text-sm font-medium text-white mb-3">
            Select Target Bin
          </label>
          {bins.length === 0 ? (
            <p className="text-[#8B949E] text-sm">
              No bins available. Please register a bin first.
            </p>
          ) : (
            <select
              value={selectedBin}
              onChange={(e) => setSelectedBin(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0D1117] border border-[#2D3748] rounded-lg text-white text-sm focus:border-[#00ED64] focus:outline-none transition-colors"
            >
              <option value="">Choose a bin...</option>
              {bins.map((bin) => (
                <option key={bin._id} value={bin._id}>
                  {bin.name || "Unnamed Bin"} ({bin._id.slice(-6)})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* File Upload */}
        <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
          <label className="block text-sm font-medium text-white mb-3">
            Video File
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver
                ? "border-[#00ED64] bg-[#00ED64]/5"
                : "border-[#2D3748] hover:border-[#484F58]"
            }`}
          >
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <svg className="w-8 h-8 text-[#00ED64]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-xs text-[#8B949E]">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="ml-4 text-[#f85149] hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <svg className="w-12 h-12 mx-auto mb-3 text-[#484F58]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-[#8B949E] mb-2">
                  Drag and drop a video file here, or{" "}
                  <label className="text-[#00ED64] cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFile(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-xs text-[#484F58]">
                  Supported formats: MP4, MOV, AVI, WebM
                </p>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={uploading || !selectedBin || !file}
            className="px-6 py-2.5 bg-[#00ED64] text-[#0D1117] rounded-lg text-sm font-medium hover:bg-[#00D455] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
          {message && (
            <p className={`text-sm ${message.includes("Error") || message.includes("failed") ? "text-[#f85149]" : "text-[#00ED64]"}`}>
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadTab;
