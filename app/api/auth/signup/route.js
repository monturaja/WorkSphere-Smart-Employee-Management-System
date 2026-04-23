import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({ success: false, message: "Email already registered" }, { status: 400 });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'employee' // Default to employee
    });

    return NextResponse.json({ success: true, message: "User registered successfully", data: { id: user._id, name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
