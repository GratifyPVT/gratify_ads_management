import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waste from '@/models/Waste';
import cloudinary from '@/lib/cloudinary'

const uploadToCloudinary = (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "Waste" },
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
        const formData=await req.formData()
        const file = formData.get('image') as File | null;
        const { type, binlocation} = Object.fromEntries(formData) as {
          type: string;
          binlocation: string;
        };
        const editedtype= type.toLowerCase();
        if (!file){
            return NextResponse.json({error: 'No file provided'}, {status: 400});
        }
        if (!type || !binlocation){
            return NextResponse.json({error: 'Missing type or binlocation'}, {status: 400});
        }
        const MAX_SIZE = 10 * 1024 * 1024; 
        if (file.size > MAX_SIZE) {
           return NextResponse.json({error: 'File too large (max 10MB)'}, {status: 413});
        }
        const arrayBuffer=await file.arrayBuffer();
        const buffer=Buffer.from(arrayBuffer);
        const result = await uploadToCloudinary(buffer);

        const waste = new Waste({
            imageUrl: result.secure_url,
            publicId: result.public_id,
            type,
            editedtype,
            binlocation

        })
        await waste.save();
        return NextResponse.json({ success: true, waste });
    } catch (error) {
         console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Upload Failed' }, { status: 500 });
        
    }
}