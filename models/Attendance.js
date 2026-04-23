import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Present', 'Late', 'Absent', 'On Leave'],
    default: 'Present',
  },
  location: String,
}, {
  timestamps: true,
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
