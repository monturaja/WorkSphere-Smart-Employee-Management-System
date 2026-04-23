import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Leave from '@/models/Leave';
import Employee from '@/models/Employee';
import User from '@/models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    let query = {};
    
    // If not admin/hr, only show their own leaves
    if (session.user.role !== 'admin' && session.user.role !== 'hr') {
      const user = await User.findById(session.user.id);
      let employeeId = user.employeeId;
      
      if (!employeeId) {
        const employee = await Employee.findOne({ email: user.email });
        if (employee) {
          employeeId = employee._id;
        }
      }

      if (!employeeId) {
        return NextResponse.json({ success: true, data: [] });
      }
      
      query = { employeeId };
    }

    const requests = await Leave.find(query)
      .populate('employeeId', 'name position image')
      .sort({ createdAt: -1 });
      
    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error('Leave GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    
    // Find the employee ID for the logged in user
    const user = await User.findById(session.user.id);
    let employeeId = user.employeeId;
    
    if (!employeeId) {
      const employee = await Employee.findOne({ email: user.email });
      if (employee) {
        employeeId = employee._id;
      } else {
        return NextResponse.json({ success: false, message: 'Employee record not found. Please update your profile first.' }, { status: 404 });
      }
    }

    const leaveRequest = await Leave.create({
      ...body,
      employeeId,
      status: 'Pending'
    });

    return NextResponse.json({ success: true, data: leaveRequest }, { status: 201 });
  } catch (error) {
    console.error('Leave POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'hr')) {
      return NextResponse.json({ success: false, message: 'Forbidden: Only Admins/HR can manage leaves' }, { status: 403 });
    }

    await dbConnect();
    const { id, status } = await request.json();
    
    const updatedRequest = await Leave.findByIdAndUpdate(
      id, 
      { 
        status,
        approvedBy: session.user.id 
      }, 
      { new: true }
    );
    
    return NextResponse.json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error('Leave PATCH error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
