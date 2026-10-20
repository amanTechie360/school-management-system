const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: [true, 'Please add a student ID'],
    unique: true,
    trim: true
  },
  grade: {
    type: String,
    required: [true, 'Please add a grade/class']
  },
  section: {
    type: String,
    required: [true, 'Please add a section']
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
  parentInfo: {
    name: {
      type: String,
      required: [true, 'Please add parent name']
    },
    relationship: {
      type: String,
      required: [true, 'Please specify relationship']
    },
    contactNumber: {
      type: String,
      required: [true, 'Please add parent contact number']
    },
    email: {
      type: String,
      required: [true, 'Please add parent email']
    }
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Graduated', 'Transferred'],
    default: 'Active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for student's courses
StudentSchema.virtual('courses', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'student',
  justOne: false
});

// Virtual for student's attendance
StudentSchema.virtual('attendance', {
  ref: 'Attendance',
  localField: '_id',
  foreignField: 'student',
  justOne: false
});

// Virtual for student's grades
StudentSchema.virtual('grades', {
  ref: 'Grade',
  localField: '_id',
  foreignField: 'student',
  justOne: false
});

module.exports = mongoose.model('Student', StudentSchema);