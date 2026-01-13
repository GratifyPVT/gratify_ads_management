import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const user = await User.create(body);
    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json({ success: true, users });
}
