const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacherId: {
    type: String,
    required: [true, 'Please add a teacher ID'],
    unique: true,
    trim: true
  },
  qualification: {
    type: String,
    required: [true, 'Please add qualification']
  },
  specialization: {
    type: String,
    required: [true, 'Please add specialization']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please add date of birth']
  },
  gender: {
    type: String,
    required: [true, 'Please add gender'],
    enum: ['Male', 'Female', 'Other']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  contactNumber: {
    type: String,
    required: [true, 'Please add a contact number']
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'On Leave', 'Resigned', 'Terminated'],
    default: 'Active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for teacher's courses
TeacherSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'teacher',
  justOne: false
});

module.exports = mongoose.model('Teacher', TeacherSchema);