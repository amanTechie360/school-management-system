const Course = require('../models/Course');
const Teacher = require('../models/Teacher');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private (Admin, Teacher, Student)
exports.getCourses = async (req, res, next) => {
  try {
    let query;

    // If user is a teacher, only show their courses
    if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      query = Course.find({ teacher: teacher._id });
    } else {
      query = Course.find();
    }

    // Execute query
    const courses = await query.populate({
      path: 'teacher',
      select: 'teacherId',
      populate: {
        path: 'user',
        select: 'name'
      }
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Private (Admin, Teacher, Student)
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'teacher',
        select: 'teacherId',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .populate('students');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin)
exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin, Teacher - own course)
exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id of ${req.params.id}`
      });
    }

    // Make sure user is course teacher or admin
    if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      
      if (course.teacher.toString() !== teacher._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: `User ${req.user.id} is not authorized to update this course`
        });
      }
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin)
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id of ${req.params.id}`
      });
    }

    await course.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};