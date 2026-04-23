import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a department name.'],
    unique: true,
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  budget: {
    type: Number,
    default: 0,
  },
  description: String,
}, {
  timestamps: true,
});

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
