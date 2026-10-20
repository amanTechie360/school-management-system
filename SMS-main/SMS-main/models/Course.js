const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Please add a course code'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please add a course name'],
    trim: true,
    maxlength: [100, 'Course name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  credits: {
    type: Number,
    required: [true, 'Please add credit hours'],
    min: [1, 'Credits must be at least 1']
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Please assign a teacher']
  },
  grade: {
    type: String,
    required: [true, 'Please specify which grade/class this course is for']
  },
  academicYear: {
    type: String,
    required: [true, 'Please add academic year']
  },
  semester: {
    type: String,
    required: [true, 'Please add semester'],
    enum: ['Fall', 'Spring', 'Summer']
  },
  schedule: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
      },
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      room: {
        type: String,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Completed'],
    default: 'Active'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for course's students through enrollment
CourseSchema.virtual('students', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'course',
  justOne: false
});

module.exports = mongoose.model('Course', CourseSchema);