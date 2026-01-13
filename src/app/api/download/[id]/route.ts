import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Video from "@/models/Video";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

interface VideoDoc {
  _id: string;
  url: string;
  publicId: string;
  createdAt?: Date;
}

// Convert Cloudinary URL to force download (add fl_attachment)
function getDownloadUrl(url: string): string {
  // Cloudinary URL format: https://res.cloudinary.com/cloud_name/video/upload/v1234/public_id.mp4
  // We need to add fl_attachment after /upload/
  if (url.includes("cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await dbConnect();

  try {
    const videos = await Video.find({ userId: id }).select("_id url publicId");

    if (!videos || videos.length === 0) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
        <head><title>No Videos</title></head>
        <body style="font-family: system-ui; background: #0D1117; color: #fff; padding: 40px; text-align: center;">
          <h1>No Videos Found</h1>
          <p>No videos are assigned to this bin ID.</p>
        </body>
        </html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Generate HTML page with download links that auto-trigger
    const videoList = (videos as unknown as VideoDoc[])
      .map(
        (v, i) => {
          const downloadUrl = getDownloadUrl(v.url);
          return `<li style="margin: 10px 0;">
            <a href="${downloadUrl}" style="color: #00ED64;">Video ${i + 1}</a>
            <span style="color: #8B949E; margin-left: 10px; font-size: 12px;">${v.publicId}</span>
          </li>`;
        }
      )
      .join("");

    // Create download script that triggers downloads using fetch + blob for cross-origin
    const downloadScript = (videos as unknown as VideoDoc[])
      .map(
        (v, i) => {
          const downloadUrl = getDownloadUrl(v.url);
          return `setTimeout(async () => { 
            try {
              updateStatus('Downloading video ${i + 1} of ${videos.length}...');
              const response = await fetch('${downloadUrl}');
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a'); 
              a.href = url;
              a.download = 'video_${i + 1}.mp4'; 
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove();
            } catch(e) {
              console.error('Download failed:', e);
              window.open('${downloadUrl}', '_blank');
            }
          }, ${i * 3000});`;
        }
      )
      .join("\n");

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Download Videos - Bin ${id}</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0D1117;
      color: #E6EDF3;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 { color: #00ED64; }
    .card {
      background: #161B22;
      border: 1px solid #2D3748;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    ul { list-style: none; padding: 0; }
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
    .status {
      background: #238636;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 10px;
    }
    .note {
      color: #8B949E;
      font-size: 14px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>📥 Downloading Videos</h1>
  <div class="card">
    <p><strong>Bin ID:</strong> <code style="background: #21262D; padding: 2px 6px; border-radius: 4px;">${id}</code></p>
    <p><strong>Total Videos:</strong> ${videos.length}</p>
    <div class="status" id="status">Starting downloads...</div>
  </div>
  
  <div class="card">
    <h3 style="margin-top: 0;">Video Files</h3>
    <ul>${videoList}</ul>
  </div>
  
  <p class="note">
    💡 If downloads don't start automatically, click the links above manually.<br>
    Some browsers may block multiple automatic downloads.
  </p>

  <script>
    function updateStatus(text) {
      document.getElementById('status').textContent = text;
    }
    ${downloadScript}
    setTimeout(() => {
      document.getElementById('status').textContent = 'All downloads complete!';
      document.getElementById('status').style.background = '#1f6feb';
    }, ${videos.length * 3000 + 2000});
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head><title>Error</title></head>
      <body style="font-family: system-ui; background: #0D1117; color: #f85149; padding: 40px;">
        <h1>Error</h1>
        <p>${message}</p>
      </body>
      </html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }
}
