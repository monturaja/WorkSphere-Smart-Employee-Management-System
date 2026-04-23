import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'employee', 'hr'],
    default: 'employee',
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }
}, {
  timestamps: true,
});

// Password hashing middleware
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Password comparison method
UserSchema.methods.comparePassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
