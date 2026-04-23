import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const inquiry = await Inquiry.create(body);

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
