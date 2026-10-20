import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

// Protected Route Component
import PrivateRoute from './components/routing/PrivateRoute';

// Feature Components
import StudentList from './components/students/StudentList';
import StudentDetail from './components/students/StudentDetail';
import TeacherList from './components/teachers/TeacherList';
import TeacherDetail from './components/teachers/TeacherDetail';
import CourseList from './components/courses/CourseList';
import CourseDetail from './components/courses/CourseDetail';
import GradeList from './components/grades/GradeList';
import EnrollmentList from './components/enrollments/EnrollmentList';
import AttendanceList from './components/attendance/AttendanceList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          
          {/* Student Routes */}
          <Route path="/students" element={<PrivateRoute><StudentList /></PrivateRoute>} />
          <Route path="/students/:id" element={<PrivateRoute><StudentDetail /></PrivateRoute>} />
          
          {/* Teacher Routes */}
          <Route path="/teachers" element={<PrivateRoute><TeacherList /></PrivateRoute>} />
          <Route path="/teachers/:id" element={<PrivateRoute><TeacherDetail /></PrivateRoute>} />
          
          {/* Course Routes */}
          <Route path="/courses" element={<PrivateRoute><CourseList /></PrivateRoute>} />
          <Route path="/courses/:id" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
          
          {/* Grade Routes */}
          <Route path="/grades" element={<PrivateRoute><GradeList /></PrivateRoute>} />
          
          {/* Enrollment Routes */}
          <Route path="/enrollments" element={<PrivateRoute><EnrollmentList /></PrivateRoute>} />
          
          {/* Attendance Routes */}
          <Route path="/attendance" element={<PrivateRoute><AttendanceList /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;