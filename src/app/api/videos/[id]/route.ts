import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Video from '@/models/Video';

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
  if (url.includes("cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await dbConnect();

  try {
    const videos = await Video.find({ userId: id }).select(
      "_id url createdAt publicId",
    );
    
    // Add downloadUrl to each video
    const videosWithDownload = (videos as unknown as VideoDoc[]).map((v) => ({
      _id: v._id,
      url: v.url,
      downloadUrl: getDownloadUrl(v.url),
      publicId: v.publicId,
      createdAt: v.createdAt,
    }));
    
    return NextResponse.json({ 
      success: true, 
      binId: id,
      count: videosWithDownload.length,
      videos: videosWithDownload 
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
