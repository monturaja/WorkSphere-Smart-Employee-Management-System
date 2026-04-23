import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Department from '@/models/Department';

export async function GET() {
  try {
    try {
      await dbConnect();
    } catch (e) {
      console.log("Mock Mode Active for GET departments");
    }

    if (global.isMockMode) {
      const mockDepartments = [
        { _id: '1', name: 'Engineering', budget: 1500000, description: 'Software and systems development' },
        { _id: '2', name: 'Marketing', budget: 500000, description: 'Brand and growth' },
        { _id: '3', name: 'Human Resources', budget: 200000, description: 'People and culture' },
        { _id: '4', name: 'Design', budget: 300000, description: 'UI/UX and branding' }
      ];
      return NextResponse.json({ success: true, data: mockDepartments });
    }

    const departments = await Department.find({}).populate('head', 'name').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: departments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    try {
      await dbConnect();
    } catch (e) {}

    if (global.isMockMode) {
        return NextResponse.json({ success: true, message: "Mock Department Created" });
    }

    const body = await request.json();
    const department = await Department.create(body);
    return NextResponse.json({ success: true, data: department }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
