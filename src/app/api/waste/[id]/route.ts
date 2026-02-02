import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waste from '@/models/Waste';
import cloudinary from '@/lib/cloudinary';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await dbConnect();

  try {
    const { category } = await request.json();

    if (!category || !['biodegradable', 'recyclable', 'miscellaneous'].includes(category)) {
      return NextResponse.json({ success: false, error: 'Invalid category' }, { status: 400 });
    }

    const updatedWaste = await Waste.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );

    if (!updatedWaste) {
      return NextResponse.json({ success: false, error: 'Waste entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, waste: updatedWaste });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  await dbConnect();

  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({ success: false, error: 'Public ID required' }, { status: 400 });
    }

    // Delete from Cloudinary
    await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    // Delete from database
    const deletedWaste = await Waste.findByIdAndDelete(id);

    if (!deletedWaste) {
      return NextResponse.json({ success: false, error: 'Waste entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
