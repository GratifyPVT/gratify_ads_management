import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Video from "@/models/Video";
import cloudinary from "@/lib/cloudinary";

interface RouteParams {
  params: Promise<{
    videoId: string;
  }>;
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams,
) {
  const { videoId } = await params;

  await dbConnect();

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    try {
      await cloudinary.uploader.destroy(video.publicId, {
        resource_type: "video",
      });
    } catch (err) {
      console.warn("Cloudinary delete failed", err);
    }

    await Video.findByIdAndDelete(videoId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
