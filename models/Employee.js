import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this employee.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, "Please provide the employee's email."],
    unique: true,
  },
  phone: String,
  position: {
    type: String,
    required: [true, 'Please specify the employee position.'],
  },
  department: {
    type: String, // Can be changed to ObjectId if Department model is ready
    required: [true, 'Please specify the department.'],
  },
  salary: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave'],
    default: 'Active',
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  officeLocation: String,
  image: String,
}, {
  timestamps: true,
});

// In development, Next.js hot reloading might keep the old model schema in memory.
// We clear it here to ensure the new schema (with optional salary) is applied.
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Employee;
}

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
