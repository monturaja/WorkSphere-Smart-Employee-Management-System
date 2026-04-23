import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Employee from '@/models/Employee';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Find user and their linked employee record
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    let employee = null;
    if (user.employeeId) {
      employee = await Employee.findById(user.employeeId);
    } else {
      // Try to find employee by email if id is not linked
      employee = await Employee.findOne({ email: user.email });
      if (employee) {
        user.employeeId = employee._id;
        await user.save();
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        user,
        employee
      }
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    // Find user - explicitly select employeeId to ensure we have it
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found in database' }, { status: 404 });
    }

    // Prepare data for Employee record
    const employeeData = {
      name: body.name || user.name,
      email: user.email,
      phone: body.phone || undefined,
      officeLocation: body.officeLocation || undefined,
      position: body.position || (user.role === 'admin' ? 'Director of Systems' : 'Employee'),
      department: body.department || (user.role === 'admin' ? 'Administration' : 'General'),
      salary: body.salary || 0, // Added safety default for salary
      image: body.image || undefined,
    };

    let employee;
    let isNewEmployee = false;

    // 1. Try to find existing employee record
    if (user.employeeId) {
      employee = await Employee.findById(user.employeeId);
    } 
    
    if (!employee) {
      employee = await Employee.findOne({ email: user.email });
    }

    // 2. Update or Create Employee
    if (employee) {
      // Update existing
      Object.assign(employee, employeeData);
      await employee.save();
    } else {
      // Create new
      employee = await Employee.create(employeeData);
      isNewEmployee = true;
    }

    // 3. Update User (only if name changed or if it's a new employee link)
    let userModified = false;
    if (body.name && body.name !== user.name) {
      user.name = body.name;
      userModified = true;
    }
    
    if (!user.employeeId || user.employeeId.toString() !== employee._id.toString()) {
      user.employeeId = employee._id;
      userModified = true;
    }

    if (userModified) {
      // Use findByIdAndUpdate to avoid potential validation issues with selected fields (like password)
      await User.findByIdAndUpdate(user._id, { 
        name: user.name, 
        employeeId: user.employeeId 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: { 
        user: { name: user.name, email: user.email, role: user.role }, 
        employee 
      } 
    });
  } catch (error) {
    console.error('Profile POST error:', error);
    // Return the actual error message to help debug
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'An unknown error occurred during update' 
    }, { status: 500 });
  }
}
