const Attendance = require('../models/Attendance');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private (Admin, Teacher)
exports.getAttendances = async (req, res, next) => {
  try {
    let query;

    // If user is a teacher, only show attendance for their courses
    if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      const courses = await Course.find({ teacher: teacher._id });
      const courseIds = courses.map(course => course._id);
      
      query = Attendance.find({ course: { $in: courseIds } });
    } else {
      query = Attendance.find();
    }

    // Add query parameters
    if (req.query.course) {
      query = query.where('course').equals(req.query.course);
    }
    
    if (req.query.student) {
      query = query.where('student').equals(req.query.student);
    }
    
    if (req.query.date) {
      const date = new Date(req.query.date);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      
      query = query.where('date').gte(date).lt(nextDay);
    }

    // Execute query with population
    const attendance = await query
      .populate({
        path: 'student',
        select: 'studentId',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .populate({
        path: 'course',
        select: 'courseCode name'
      })
      .populate({
        path: 'markedBy',
        select: 'name role'
      });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single attendance record
// @route   GET /api/attendance/:id
// @access  Private (Admin, Teacher, Student - own record)
exports.getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate({
        path: 'student',
        select: 'studentId',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .populate({
        path: 'course',
        select: 'courseCode name'
      })
      .populate({
        path: 'markedBy',
        select: 'name role'
      });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: `Attendance record not found with id of ${req.params.id}`
      });
    }

    // Check if user is authorized to view this attendance record
    if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user.id });
      
      if (attendance.student.toString() !== student._id.toString()) {
        return res.status(403).json({
          success: false,
          message: `User ${req.user.id} is not authorized to view this attendance record`
        });
      }
    } else if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      const course = await Course.findById(attendance.course);
      
      if (course.teacher.toString() !== teacher._id.toString()) {
        return res.status(403).json({
          success: false,
          message: `User ${req.user.id} is not authorized to view this attendance record`
        });
      }
    }

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new attendance record
// @route   POST /api/attendance
// @access  Private (Admin, Teacher)
exports.createAttendance = async (req, res, next) => {
  try {
    // Add logged in user as the one who marked attendance
    req.body.markedBy = req.user.id;
    
    // Check if teacher is authorized to mark attendance for this course
    if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      const course = await Course.findById(req.body.course);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course not found with id of ${req.body.course}`
        });
      }
      
      if (course.teacher.toString() !== teacher._id.toString()) {
        return res.status(403).json({
          success: false,
          message: `User ${req.user.id} is not authorized to mark attendance for this course`
        });
      }
    }

    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      data: attendance
    });
  } catch (err) {
    // Handle duplicate entry error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Attendance record already exists for this student, course, and date'
      });
    }
    next(err);
  }
};

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private (Admin, Teacher)
exports.updateAttendance = async (req, res, next) => {
  try {
    let attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: `Attendance record not found with id of ${req.params.id}`
      });
    }

    // Check if teacher is authorized to update attendance for this course
    if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      const course = await Course.findById(attendance.course);
      
      if (course.teacher.toString() !== teacher._id.toString()) {
        return res.status(403).json({
          success: false,
          message: `User ${req.user.id} is not authorized to update attendance for this course`
        });
      }
    }

    attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private (Admin)
exports.deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: `Attendance record not found with id of ${req.params.id}`
      });
    }

    await attendance.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};