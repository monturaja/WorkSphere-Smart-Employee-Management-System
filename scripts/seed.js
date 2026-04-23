const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env');
  process.exit(1);
}

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  role: { type: String, enum: ['admin', 'employee', 'hr'], default: 'employee' },
}, { timestamps: true });

UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Other Schemas
const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  department: String,
  salary: Number,
  status: String,
});

const DepartmentSchema = new mongoose.Schema({
  name: String,
  budget: Number,
  description: String,
});

const AttendanceSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  date: Date,
  checkIn: String,
  checkOut: String,
  status: String,
});

const LeaveSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  type: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: String,
});

const PayrollSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  month: String,
  totalSalary: Number,
  status: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
const Department = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
const Leave = mongoose.models.Leave || mongoose.model('Leave', LeaveSchema);
const Payroll = mongoose.models.Payroll || mongoose.model('Payroll', PayrollSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Department.deleteMany({});
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    await Payroll.deleteMany({});

    console.log('Cleared existing data');

    // Create Admin User as requested
    await User.create({
      name: 'System Admin',
      email: 'CEMSadmin@gmail.com',
      password: '@#cems147',
      role: 'admin'
    });

    // Create a demo HR user
    await User.create({
      name: 'Sarah HR',
      email: 'hr@cems.com',
      password: 'password123',
      role: 'hr'
    });

    const newHRs = [
      { name: 'Varun Sisodiya', email: 'varun.sisodiya@cems.com' },
      { name: 'Prem Kumar', email: 'prem.kumar@cems.com' },
      { name: 'Kishan Chouhan', email: 'kishan.chouhan@cems.com' },
      { name: 'Ratan Kumar', email: 'ratan.kumar@cems.com' },
      { name: 'Chanchal Rajpurohit', email: 'chanchal.rajpurohit@cems.com' },
      { name: 'Kesar Prajapat', email: 'kesar.prajapat@cems.com' },
      { name: 'Harshita Parihar', email: 'harshita.parihar@cems.com' },
      { name: 'Mansi Rajpurohit', email: 'mansi.rajpurohit@cems.com' }
    ];

    for (const hr of newHRs) {
      await User.create({
        name: hr.name,
        email: hr.email,
        password: 'password123',
        role: 'hr'
      });
    }

    // Create a demo Employee user
    await User.create({
      name: 'John Doe',
      email: 'john@cems.com',
      password: 'password123',
      role: 'employee'
    });

    console.log('Seeded initial users');

    // Create Departments
    const depts = await Department.insertMany([
      { name: 'Engineering', budget: 1500000, description: 'Software and systems development' },
      { name: 'Marketing', budget: 500000, description: 'Brand and growth' },
      { name: 'Human Resources', budget: 200000, description: 'People and culture' },
      { name: 'Design', budget: 300000, description: 'UI/UX and branding' }
    ]);

    // Create Employees
    const employees = await Employee.insertMany([
      { name: 'John Doe', email: 'john@cems.com', position: 'Lead Engineer', department: 'Engineering', salary: 120000, status: 'Active' },
      { name: 'Sarah Wilson', email: 'sarah@cems.com', position: 'Senior Designer', department: 'Design', salary: 95000, status: 'Active' },
      { name: 'Mike Ross', email: 'mike@cems.com', position: 'HR Manager', department: 'Human Resources', salary: 85000, status: 'Active' },
      { name: 'Emily Blunt', email: 'emily@cems.com', position: 'Marketing Lead', department: 'Marketing', salary: 90000, status: 'On Leave' },
      { name: 'David Goggins', email: 'david@cems.com', position: 'DevOps Engineer', department: 'Engineering', salary: 110000, status: 'Active' },
      { name: 'Varun Sisodiya', email: 'varun.sisodiya@cems.com', position: 'HR Executive', department: 'Human Resources', salary: 60000, status: 'Active' },
      { name: 'Prem Kumar', email: 'prem.kumar@cems.com', position: 'HR Executive', department: 'Human Resources', salary: 60000, status: 'Active' },
      { name: 'Kishan Chouhan', email: 'kishan.chouhan@cems.com', position: 'HR Executive', department: 'Human Resources', salary: 60000, status: 'Active' },
      { name: 'Ratan Kumar', email: 'ratan.kumar@cems.com', position: 'HR Executive', department: 'Human Resources', salary: 60000, status: 'Active' },
      { name: 'Chanchal Rajpurohit', email: 'chanchal.rajpurohit@cems.com', position: 'HR Executive', department: 'Human Resources', salary: 60000, status: 'Active' },
      { name: 'Kesar Prajapat', email: 'kesar.prajapat@cems.com', position: 'HR Executive', department: 'Human Resources', salary: 60000, status: 'Active' },
      { name: 'Harshita Parihar', email: 'harshita.parihar@cems.com', position: 'HR Executive', department: 'Human Resources', salary: 60000, status: 'Active' },
      { name: 'Mansi Rajpurohit', email: 'mansi.rajpurohit@cems.com', position: 'HR Executive', department: 'Human Resources', salary: 60000, status: 'Active' }
    ]);

    // Create Attendance for today
    const today = new Date();
    await Attendance.insertMany(employees.slice(0, 3).map(emp => ({
      employeeId: emp._id,
      date: today,
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      status: 'Present'
    })));

    // Create Leave Requests
    await Leave.insertMany([
      { employeeId: employees[3]._id, type: 'Vacation', startDate: new Date(), endDate: new Date(Date.now() + 86400000 * 5), reason: 'Family vacation', status: 'Approved' },
      { employeeId: employees[0]._id, type: 'Sick', startDate: new Date(), endDate: new Date(), reason: 'Fever', status: 'Pending' }
    ]);

    // Create Payroll Records
    await Payroll.insertMany(employees.map(emp => ({
      employeeId: emp._id,
      month: 'March 2026',
      totalSalary: Math.floor(emp.salary / 12),
      status: 'Paid'
    })));

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
