const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
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
  assessmentType: {
    type: String,
    enum: ['Quiz', 'Assignment', 'Project', 'Mid-term', 'Final', 'Participation'],
    required: true
  },
  assessmentName: {
    type: String,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  letterGrade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'],
    required: true
  },
  feedback: {
    type: String
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate grade entries
GradeSchema.index({ student: 1, course: 1, assessmentType: 1, assessmentName: 1 }, { unique: true });

module.exports = mongoose.model('Grade', GradeSchema);