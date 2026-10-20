const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Dropped', 'Completed'],
    default: 'Active'
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F', 'Incomplete', 'Not Graded'],
    default: 'Not Graded'
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate enrollments
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);