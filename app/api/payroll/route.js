import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Payroll from '@/models/Payroll';

export async function GET() {
  try {
    try {
      await dbConnect();
    } catch (e) {
      console.log("Mock Mode Active for GET payroll");
    }

    if (global.isMockMode) {
      const mockPayrolls = [
        { _id: '1', employeeId: { name: 'John Doe', position: 'Lead Engineer' }, month: 'March 2026', totalSalary: 10000, status: 'Paid' },
        { _id: '2', employeeId: { name: 'Sarah Wilson', position: 'Senior Designer' }, month: 'March 2026', totalSalary: 8000, status: 'Paid' },
        { _id: '3', employeeId: { name: 'Mike Ross', position: 'HR Manager' }, month: 'March 2026', totalSalary: 7000, status: 'Pending' }
      ];
      return NextResponse.json({ success: true, data: mockPayrolls });
    }

    const payrolls = await Payroll.find({}).populate('employeeId', 'name position').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: payrolls });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Auto calculate total salary if not provided
    const totalSalary = (body.basicSalary || 0) + (body.bonuses || 0) - (body.deductions || 0);
    
    const payroll = await Payroll.create({
      ...body,
      totalSalary: body.totalSalary || totalSalary
    });
    
    return NextResponse.json({ success: true, data: payroll }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
