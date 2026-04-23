import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Attendance from '@/models/Attendance';

export async function GET() {
  try {
    try {
      await dbConnect();
    } catch (e) {
      console.log("Mock Mode Active for GET attendance");
    }

    if (global.isMockMode) {
      const mockAttendance = [
        { _id: '1', employeeId: { name: 'John Doe', position: 'Lead Engineer' }, checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', date: new Date() },
        { _id: '2', employeeId: { name: 'Sarah Wilson', position: 'Senior Designer' }, checkIn: '09:15 AM', checkOut: '06:05 PM', status: 'Present', date: new Date() },
        { _id: '3', employeeId: { name: 'Mike Ross', position: 'HR Manager' }, checkIn: '08:50 AM', checkOut: '05:45 PM', status: 'Late', date: new Date() },
        { _id: '4', employeeId: { name: 'David Goggins', position: 'DevOps' }, checkIn: '05:00 AM', checkOut: '09:00 PM', status: 'Present', date: new Date() },
      ];
      return NextResponse.json({ success: true, data: mockAttendance });
    }

    // Get attendance for today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const attendance = await Attendance.find({
      date: { $gte: startOfDay }
    }).populate('employeeId', 'name position').sort({ checkIn: -1 });
    
    return NextResponse.json({ success: true, data: attendance });
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
        return NextResponse.json({ success: true, message: "Mock Check-in Successful" });
    }

    const body = await request.json();
    
    if (!body.employeeId) {
      return NextResponse.json({ success: false, message: "Employee ID is required" }, { status: 400 });
    }

    // Check if attendance already exists for this employee today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({
      employeeId: body.employeeId,
      date: { $gte: startOfDay }
    });

    if (attendance) {
      // If already checked in, perform Check Out
      attendance.checkOut = body.checkOut || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      await attendance.save();
    } else {
      // Perform Check In
      attendance = await Attendance.create({
        ...body,
        date: new Date(),
        checkIn: body.checkIn || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: body.status || 'Present'
      });
    }

    return NextResponse.json({ success: true, data: attendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
