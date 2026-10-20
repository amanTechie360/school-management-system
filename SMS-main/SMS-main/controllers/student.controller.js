const Student = require('../models/Student');
const User = require('../models/User');

// @desc    Get all students
// @route   GET /api/students
// @access  Private (Admin, Teacher)
exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate({
      path: 'user',
      select: 'name email role'
    });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private (Admin, Teacher, Student - own profile)
exports.getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email role'
      })
      .populate('courses')
      .populate('attendance')
      .populate('grades');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id of ${req.params.id}`
      });
    }

    // Make sure user is student owner or admin or teacher
    if (
      student.user._id.toString() !== req.user.id &&
      req.user.role !== 'admin' &&
      req.user.role !== 'teacher'
    ) {
      return res.status(403).json({
        success: false,
        message: `User ${req.user.id} is not authorized to access this student profile`
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Private (Admin)
exports.createStudent = async (req, res, next) => {
  try {
    // Create user first
    const { name, email, password, studentId, grade, section, dateOfBirth, gender, address, contactNumber, parentInfo } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role: 'student'
    });

    // Create student profile
    const student = await Student.create({
      user: user._id,
      studentId,
      grade,
      section,
      dateOfBirth,
      gender,
      address,
      contactNumber,
      parentInfo,
      enrollmentDate: Date.now()
    });

    res.status(201).json({
      success: true,
      data: student
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private (Admin)
exports.updateStudent = async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id of ${req.params.id}`
      });
    }

    // Update student
    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // If user data is being updated
    if (req.body.name || req.body.email) {
      await User.findByIdAndUpdate(student.user, {
        name: req.body.name,
        email: req.body.email
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin)
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id of ${req.params.id}`
      });
    }

    // Remove student
    await student.remove();

    // Remove associated user
    await User.findByIdAndDelete(student.user);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};