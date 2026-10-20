import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    attendance: 0
  });

  useEffect(() => {
    // In a real application, we would fetch these statistics from the API
    // For now, we'll use placeholder data
    const fetchStats = async () => {
      try {
        // Simulating API calls
        // const studentsRes = await axios.get('/api/students/count');
        // const teachersRes = await axios.get('/api/teachers/count');
        // const coursesRes = await axios.get('/api/courses/count');
        // const attendanceRes = await axios.get('/api/attendance/today');
        
        // Placeholder data
        setStats({
          students: 120,
          teachers: 15,
          courses: 25,
          attendance: 85 // percentage
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };

    fetchStats();
  }, []);

  // Determine user role for role-specific content
  const userRole = user?.role || 'student';

  return (
    <div className="dashboard-container">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome, {user?.name || 'User'}!</h5>
              <p className="card-text">
                You are logged in as a {userRole.charAt(0).toUpperCase() + userRole.slice(1)}.
                Here's your overview for today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <h2 className="display-4">{stats.students}</h2>
              <Link to="/students" className="text-white">
                View All <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Teachers</h5>
              <h2 className="display-4">{stats.teachers}</h2>
              <Link to="/teachers" className="text-white">
                View All <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body">
              <h5 className="card-title">Courses</h5>
              <h2 className="display-4">{stats.courses}</h2>
              <Link to="/courses" className="text-dark">
                View All <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <h5 className="card-title">Attendance</h5>
              <h2 className="display-4">{stats.attendance}%</h2>
              <Link to="/attendance" className="text-white">
                View Details <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Access</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-2 col-sm-4 mb-3 text-center">
                  <Link to="/students" className="btn btn-outline-primary w-100 py-3">
                    <i className="fas fa-user-graduate mb-2"></i><br />
                    Students
                  </Link>
                </div>
                <div className="col-md-2 col-sm-4 mb-3 text-center">
                  <Link to="/teachers" className="btn btn-outline-primary w-100 py-3">
                    <i className="fas fa-chalkboard-teacher mb-2"></i><br />
                    Teachers
                  </Link>
                </div>
                <div className="col-md-2 col-sm-4 mb-3 text-center">
                  <Link to="/courses" className="btn btn-outline-primary w-100 py-3">
                    <i className="fas fa-book mb-2"></i><br />
                    Courses
                  </Link>
                </div>
                <div className="col-md-2 col-sm-4 mb-3 text-center">
                  <Link to="/grades" className="btn btn-outline-primary w-100 py-3">
                    <i className="fas fa-chart-line mb-2"></i><br />
                    Grades
                  </Link>
                </div>
                <div className="col-md-2 col-sm-4 mb-3 text-center">
                  <Link to="/attendance" className="btn btn-outline-primary w-100 py-3">
                    <i className="fas fa-calendar-check mb-2"></i><br />
                    Attendance
                  </Link>
                </div>
                <div className="col-md-2 col-sm-4 mb-3 text-center">
                  <Link to="/enrollments" className="btn btn-outline-primary w-100 py-3">
                    <i className="fas fa-user-plus mb-2"></i><br />
                    Enrollments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;