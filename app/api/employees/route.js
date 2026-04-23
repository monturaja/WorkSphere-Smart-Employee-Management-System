import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Employee from '@/models/Employee';

export async function GET() {
  try {
    try {
      await dbConnect();
    } catch (e) {
      console.log("Mock Mode Active for GET employees");
    }

    if (global.isMockMode) {
      const mockEmployees = [
        { _id: '1', name: 'John Doe', email: 'john@cems.com', position: 'Lead Engineer', department: 'Engineering', salary: 120000, status: 'Active' },
        { _id: '2', name: 'Sarah Wilson', email: 'sarah@cems.com', position: 'Senior Designer', department: 'Design', salary: 95000, status: 'Active' },
        { _id: '3', name: 'Mike Ross', email: 'mike@cems.com', position: 'HR Manager', department: 'Human Resources', salary: 85000, status: 'Active' },
        { _id: '4', name: 'Emily Blunt', email: 'emily@cems.com', position: 'Marketing Lead', department: 'Marketing', salary: 90000, status: 'On Leave' },
        { _id: '5', name: 'David Goggins', email: 'david@cems.com', position: 'DevOps Engineer', department: 'Engineering', salary: 110000, status: 'Active' }
      ];
      return NextResponse.json({ success: true, data: mockEmployees });
    }

    const employees = await Employee.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: employees });
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
        return NextResponse.json({ success: true, message: "Mock Employee Created" });
    }

    const body = await request.json();
    const employee = await Employee.create(body);
    return NextResponse.json({ success: true, data: employee }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
