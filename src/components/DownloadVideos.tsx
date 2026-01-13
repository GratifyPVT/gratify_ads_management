"use client";
import { ChangeEvent, useState } from "react";

const DownloadVideos = () => {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const handleDownload = async () => {
    if (!userId) return;
    setLoading(true);
    setStatus("Fetching video list...");
    try {
      const res = await fetch(`/api/videos/${userId}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
        setStatus(`Found ${data.videos.length} videos. Downloading...`);

        let count = 0;
        for (const [index, video] of data.videos.entries() as IterableIterator<[number, { url: string }]>) {
          const url = video.url;
          try {
            const videoRes = await fetch(url);
            if (!videoRes.ok) throw new Error("Fetch failed");
            const blob = await videoRes.blob();

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `user-${userId}-video-${index + 1}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            count++;
            setStatus(`Downloaded ${count}/${data.videos.length}`);

            await new Promise((r) => setTimeout(r, 1000));
          } catch (err) {
            console.error("Download error for one video", err);
            setStatus(`Error downloading video ${index + 1}`);
          }
        }
        setStatus("All downloads processed.");
      } else {
        setStatus("No videos found for this ID.");
      }
    } catch (e) {
      console.error(e);
      setStatus("Error fetching video list.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl mb-2 font-bold">3. Download All Videos</h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
          className="border p-2 text-black"
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-purple-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Download All"}
        </button>
      </div>
      {status && <p className="mt-2 text-yellow-300">{status}</p>}
    </div>
  );
};

export default DownloadVideos;
