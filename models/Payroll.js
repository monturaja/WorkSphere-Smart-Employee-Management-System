import mongoose from 'mongoose';

const PayrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  month: {
    type: String, // e.g., "March 2026"
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  bonuses: {
    type: Number,
    default: 0,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  totalSalary: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending',
  },
  paymentDate: Date,
}, {
  timestamps: true,
});

export default mongoose.models.Payroll || mongoose.model('Payroll', PayrollSchema);
