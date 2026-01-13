import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Video from '@/models/Video';
import cloudinary from '@/lib/cloudinary';

// Cloudinary upload helper
const uploadToCloudinary = (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "gratify-ads" },
      (error: Error | undefined, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    uploadStream.end(buffer);
  });
};

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const file = formData.get('video') as File | null;
    const userId = formData.get('userId') as string | null;

    if (!file || !userId) {
      return NextResponse.json({ error: 'Missing file or userId' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToCloudinary(buffer);

    // Avoid creating duplicate records for the same Cloudinary asset + bin
    const existing = await Video.findOne({
      userId,
      publicId: result.public_id,
    });

    if (existing) {
      return NextResponse.json({ success: true, video: existing, duplicate: true });
    }

    const video = await Video.create({
      userId,
      url: result.secure_url,
      publicId: result.public_id,
    });

    return NextResponse.json({ success: true, video, duplicate: false });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload Failed' }, { status: 500 });
  }
}
