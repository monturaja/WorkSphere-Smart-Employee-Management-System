import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
  },
  company: {
    type: String,
    required: [true, 'Please provide your company name.'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
