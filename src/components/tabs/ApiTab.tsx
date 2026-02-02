"use client";

import { useState } from "react";

const ApiTab = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://your-domain.com";

  const endpoints = [
    {
      id: "get-videos",
      method: "GET",
      path: "/api/videos/{binId}",
      description: "Retrieve all videos assigned to a specific bin. Use this from your smart bin to download content.",
      example: `curl "${baseUrl}/api/videos/YOUR_BIN_ID"`,
      response: `{
  "success": true,
  "videos": [
    {
      "_id": "video_id",
      "url": "https://cloudinary.com/...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}`,
    },
    {
      id: "create-bin",
      method: "POST",
      path: "/api/users",
      description: "Register a new smart bin in the system.",
      example: `curl -X POST "${baseUrl}/api/users" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "BIN-001"}'`,
      response: `{
  "success": true,
  "user": {
    "_id": "generated_bin_id",
    "name": "BIN-001"
  }
}`,
    },
    {
      id: "upload-video",
      method: "POST",
      path: "/api/upload",
      description: "Upload a video file to a specific bin.",
      example: `curl -X POST "${baseUrl}/api/upload" \\
  -F "userId=YOUR_BIN_ID" \\
  -F "video=@/path/to/video.mp4"`,
      response: `{
  "success": true,
  "video": {
    "_id": "video_id",
    "url": "https://cloudinary.com/...",
    "publicId": "cloudinary_public_id"
  },
  "duplicate": false
}`,
    },
    {
      id: "delete-video",
      method: "DELETE",
      path: "/api/video/{videoId}",
      description: "Delete a specific video from the system.",
      example: `curl -X DELETE "${baseUrl}/api/video/VIDEO_ID"`,
      response: `{
  "success": true
}`,
    },
    {
      id: "download-videos",
      method: "GET",
      path: "/api/download/{binId}",
      description: "Open this URL in a browser to automatically download all videos for a bin. Perfect for smart bin devices.",
      example: `# Open in browser to auto-download:
${baseUrl}/api/download/YOUR_BIN_ID`,
      response: `HTML page that automatically triggers
video downloads for all assigned videos.
Displays download links if auto-download
is blocked by the browser.`,
    },
    {
      id: "upload-waste",
      method: "POST",
      path: "/api/uploadwaste",
      description: "Upload waste image and classification data from smart bins.",
      example: `curl -X POST "${baseUrl}/api/uploadwaste" \\
  -F "image=@/path/to/waste.jpg" \\
  -F "type=plastic" \\
  -F "binlocation=Building A - Floor 1"`,
      response: `{
  "success": true,
  "waste": {
    "_id": "waste_id",
    "type": "plastic",
    "editedtype": "plastic",
    "binlocation": "Building A - Floor 1",
    "category": "recyclable",
    "imageUrl": "https://cloudinary.com/...",
    "disposedAt": "2026-02-02T..."
  }
}`,
    },
    {
      id: "get-waste",
      method: "GET",
      path: "/api/waste",
      description: "Retrieve all waste entries with categorization data.",
      example: `curl "${baseUrl}/api/waste"`,
      response: `{
  "success": true,
  "waste": [
    {
      "_id": "waste_id",
      "type": "plastic",
      "category": "recyclable",
      "binlocation": "Building A",
      "imageUrl": "https://cloudinary.com/...",
      "disposedAt": "2026-02-02T..."
    }
  ]
}`,
    },
    {
      id: "update-waste-category",
      method: "PATCH",
      path: "/api/waste/{wasteId}",
      description: "Update the category of a waste entry.",
      example: `curl -X PATCH "${baseUrl}/api/waste/WASTE_ID" \\
  -H "Content-Type: application/json" \\
  -d '{"category": "biodegradable"}'`,
      response: `{
  "success": true,
  "waste": {
    "_id": "waste_id",
    "category": "biodegradable"
  }
}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">API Reference</h2>
        <p className="text-sm text-[#8B949E]">
          Use these endpoints to integrate your smart bins with the platform
        </p>
      </div>

      {/* Base URL */}
      <div className="bg-[#161B22] border border-[#2D3748] rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8B949E] uppercase tracking-wider mb-1">Base URL</p>
            <code className="text-[#00ED64] font-mono">{baseUrl}</code>
          </div>
          <button
            onClick={() => copyToClipboard(baseUrl, "base")}
            className="px-3 py-1.5 text-xs bg-[#21262D] border border-[#2D3748] text-[#8B949E] rounded hover:text-white transition-colors"
          >
            {copied === "base" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Smart Bin Integration */}
      <div className="bg-gradient-to-r from-[#1f6feb]/20 to-[#1f6feb]/5 border border-[#1f6feb]/30 rounded-lg p-5">
        <h3 className="text-white font-medium mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-[#58a6ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Smart Bin Integration
        </h3>
        <p className="text-sm text-[#8B949E] mb-3">
          Your smart bin should periodically call the <code className="text-[#58a6ff]">GET /api/videos/{"{binId}"}</code> endpoint 
          to fetch assigned videos and download them locally for playback.
        </p>
        <div className="bg-[#0D1117] rounded p-3">
          <code className="text-xs text-[#8B949E] font-mono">
            # Example: Fetch videos for bin<br />
            curl {baseUrl}/api/videos/YOUR_BIN_ID
          </code>
        </div>
      </div>

      {/* Endpoints */}
      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <div
            key={endpoint.id}
            className="bg-[#161B22] border border-[#2D3748] rounded-lg overflow-hidden"
          >
            {/* Endpoint Header */}
            <div className="px-5 py-4 border-b border-[#2D3748] flex items-center gap-3">
              <span
                className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                  endpoint.method === "GET"
                    ? "bg-[#238636]/20 text-[#00ED64]"
                    : endpoint.method === "POST"
                    ? "bg-[#1f6feb]/20 text-[#58a6ff]"
                    : "bg-[#f85149]/20 text-[#f85149]"
                }`}
              >
                {endpoint.method}
              </span>
              <code className="text-white font-mono">{endpoint.path}</code>
            </div>

            {/* Endpoint Details */}
            <div className="px-5 py-4 space-y-4">
              <p className="text-sm text-[#8B949E]">{endpoint.description}</p>

              {/* Example */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-[#8B949E] uppercase tracking-wider">Example Request</p>
                  <button
                    onClick={() => copyToClipboard(endpoint.example, `ex-${endpoint.id}`)}
                    className="text-xs text-[#8B949E] hover:text-white transition-colors"
                  >
                    {copied === `ex-${endpoint.id}` ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="bg-[#0D1117] border border-[#2D3748] rounded p-3 overflow-x-auto">
                  <code className="text-xs text-[#8B949E] font-mono whitespace-pre">{endpoint.example}</code>
                </pre>
              </div>

              {/* Response */}
              <div>
                <p className="text-xs text-[#8B949E] uppercase tracking-wider mb-2">Response</p>
                <pre className="bg-[#0D1117] border border-[#2D3748] rounded p-3 overflow-x-auto">
                  <code className="text-xs text-[#00ED64] font-mono whitespace-pre">{endpoint.response}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTab;
