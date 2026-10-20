const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Private (Admin, Teacher)
exports.getEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find()
      .populate({
        path: 'student',
        select: 'name email'
      })
      .populate({
        path: 'course',
        select: 'title code'
      });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single enrollment
// @route   GET /api/enrollments/:id
// @access  Private
exports.getEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate({
        path: 'student',
        select: 'name email'
      })
      .populate({
        path: 'course',
        select: 'title code'
      });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment with id ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new enrollment
// @route   POST /api/enrollments
// @access  Private (Admin)
exports.createEnrollment = async (req, res, next) => {
  try {
    // Check if student exists
    const student = await Student.findById(req.body.student);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if course exists
    const course = await Course.findById(req.body.course);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      student: req.body.student,
      course: req.body.course
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Student is already enrolled in this course'
      });
    }

    const enrollment = await Enrollment.create(req.body);

    res.status(201).json({
      success: true,
      data: enrollment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update enrollment
// @route   PUT /api/enrollments/:id
// @access  Private (Admin, Teacher)
exports.updateEnrollment = async (req, res, next) => {
  try {
    let enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment with id ${req.params.id} not found`
      });
    }

    enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private (Admin)
exports.deleteEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment with id ${req.params.id} not found`
      });
    }

    await enrollment.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get enrollments by student
// @route   GET /api/enrollments/student/:studentId
// @access  Private
exports.getStudentEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.params.studentId })
      .populate({
        path: 'course',
        select: 'title code description'
      });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get enrollments by course
// @route   GET /api/enrollments/course/:courseId
// @access  Private (Admin, Teacher)
exports.getCourseEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId })
      .populate({
        path: 'student',
        select: 'name email'
      });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (err) {
    next(err);
  }
};