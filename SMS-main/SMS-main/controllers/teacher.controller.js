const Teacher = require('../models/Teacher');
const User = require('../models/User');

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private (Admin)
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate({
      path: 'user',
      select: 'name email role'
    });

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single teacher
// @route   GET /api/teachers/:id
// @access  Private (Admin, Teacher - own profile)
exports.getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email role'
      })
      .populate('courses');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: `Teacher not found with id of ${req.params.id}`
      });
    }

    // Make sure user is teacher owner or admin
    if (
      teacher.user._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: `User ${req.user.id} is not authorized to access this teacher profile`
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new teacher
// @route   POST /api/teachers
// @access  Private (Admin)
exports.createTeacher = async (req, res, next) => {
  try {
    // Create user first
    const { name, email, password, teacherId, qualification, specialization, dateOfBirth, gender, address, contactNumber } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role: 'teacher'
    });

    // Create teacher profile
    const teacher = await Teacher.create({
      user: user._id,
      teacherId,
      qualification,
      specialization,
      dateOfBirth,
      gender,
      address,
      contactNumber,
      joiningDate: Date.now()
    });

    res.status(201).json({
      success: true,
      data: teacher
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update teacher
// @route   PUT /api/teachers/:id
// @access  Private (Admin)
exports.updateTeacher = async (req, res, next) => {
  try {
    let teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: `Teacher not found with id of ${req.params.id}`
      });
    }

    // Update teacher
    teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // If user data is being updated
    if (req.body.name || req.body.email) {
      await User.findByIdAndUpdate(teacher.user, {
        name: req.body.name,
        email: req.body.email
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete teacher
// @route   DELETE /api/teachers/:id
// @access  Private (Admin)
exports.deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: `Teacher not found with id of ${req.params.id}`
      });
    }

    // Remove teacher
    await teacher.remove();

    // Remove associated user
    await User.findByIdAndDelete(teacher.user);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};