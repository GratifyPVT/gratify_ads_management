"use client";
import { ChangeEvent, FormEvent, useState } from "react";

const UploadVideo = () => {
  const [userId, setUserId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !file) return;

    setMessage("Uploading... please wait.");
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("video", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Video uploaded successfully!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Upload failed");
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-xl mb-2 font-bold">2. Upload Video to User</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-2">
        <input
          className="border p-2 text-black"
          placeholder="User ID"
          value={userId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFile(e.target.files && e.target.files[0]
              ? e.target.files[0]
              : null)
          }
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Upload
        </button>
      </form>
      {message && <p className="mt-2 text-yellow-300">{message}</p>}
    </div>
  );
};

export default UploadVideo;
