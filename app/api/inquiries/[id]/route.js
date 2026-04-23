import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await request.json();

    if (!['accepted', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    await dbConnect();
    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });

    if (!inquiry) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
