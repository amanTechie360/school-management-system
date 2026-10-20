const Grade = require('../models/Grade');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// @desc    Get all grades
// @route   GET /api/grades
// @access  Private (Admin, Teacher)
exports.getGrades = async (req, res, next) => {
  try {
    let query;

    // If user is a teacher, only show grades for their courses
    if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      const courses = await Course.find({ teacher: teacher._id });
      const courseIds = courses.map(course => course._id);
      
      query = Grade.find({ course: { $in: courseIds } });
    } else {
      query = Grade.find();
    }

    // Add query parameters
    if (req.query.course) {
      query = query.where('course').equals(req.query.course);
    }
    
    if (req.query.student) {
      query = query.where('student').equals(req.query.student);
    }
    
    if (req.query.assessmentType) {
      query = query.where('assessmentType').equals(req.query.assessmentType);
    }

    // Execute query with population
    const grades = await query
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
        path: 'gradedBy',
        select: 'name role'
      });

    res.status(200).json({
      success: true,
      count: grades.length,
      data: grades
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single grade
// @route   GET /api/grades/:id
// @access  Private (Admin, Teacher, Student - own grade)
exports.getGrade = async (req, res, next) => {
  try {
    const grade = await Grade.findById(req.params.id)
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
        path: 'gradedBy',
        select: 'name role'
      });

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: `Grade not found with id of ${req.params.id}`
      });
    }

    // Check if user is authorized to view this grade
    if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user.id });
      
      if (grade.student.toString() !== student._id.toString()) {
        return res.status(403).json({
          success: false,
          message: `User ${req.user.id} is not authorized to view this grade`
        });
      }
    } else if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      const course = await Course.findById(grade.course);
      
      if (course.teacher.toString() !== teacher._id.toString()) {
        return res.status(403).json({
          success: false,
          message: `User ${req.user.id} is not authorized to view this grade`
        });
      }
    }

    res.status(200).json({
      success: true,
      data: grade
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new grade
// @route   POST /api/grades
// @access  Private (Admin, Teacher)
exports.createGrade = async (req, res, next) => {
  try {
    // Add logged in user as the one who graded
    req.body.gradedBy = req.user.id;
    
    // Check if teacher is authorized to grade for this course
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
          message: `User ${req.user.id} is not authorized to grade for this course`
        });
      }
    }

    const grade = await Grade.create(req.body);

    res.status(201).json({
      success: true,
      data: grade
    });
  } catch (err) {
    // Handle duplicate entry error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Grade record already exists for this student, course, and assessment'
      });
    }
    next(err);
  }
};

// @desc    Update grade
// @route   PUT /api/grades/:id
// @access  Private (Admin, Teacher)
exports.updateGrade = async (req, res, next) => {
  try {
    let grade = await Grade.findById(req.params.id);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: `Grade not found with id of ${req.params.id}`
      });
    }

    // Check if teacher is authorized to update grade for this course
    if (req.user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: req.user.id });
      const course = await Course.findById(grade.course);
      
      if (course.teacher.toString() !== teacher._id.toString()) {
        return res.status(403).json({
          success: false,
          message: `User ${req.user.id} is not authorized to update grade for this course`
        });
      }
    }

    grade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: grade
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete grade
// @route   DELETE /api/grades/:id
// @access  Private (Admin)
exports.deleteGrade = async (req, res, next) => {
  try {
    const grade = await Grade.findById(req.params.id);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: `Grade not found with id of ${req.params.id}`
      });
    }

    await grade.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};