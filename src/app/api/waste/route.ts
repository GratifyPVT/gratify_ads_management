import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waste from '@/models/Waste';

export async function GET() {
  await dbConnect();

  try {
    const waste = await Waste.find({}).sort({ disposedAt: -1 });
    return NextResponse.json({ success: true, waste });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
