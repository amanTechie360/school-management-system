import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">School Management System</h1>
        <p className="lead">
          A comprehensive platform for managing students, teachers, courses, grades, and attendance
        </p>
        <hr className="my-4" />
        {!isAuthenticated ? (
          <div>
            <p>
              Access the dashboard by logging in or register for a new account
            </p>
            <Link to="/login" className="btn btn-primary btn-lg mr-3">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Register
            </Link>
          </div>
        ) : (
          <div>
            <p>Welcome back! Access your dashboard to manage school resources</p>
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Student Management</h5>
              <p className="card-text">
                Register new students, update student information, and track academic progress.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Teacher Management</h5>
              <p className="card-text">
                Manage teacher profiles, assign courses, and monitor teaching schedules.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Course Management</h5>
              <p className="card-text">
                Create and update courses, manage enrollments, and track course progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Grade Management</h5>
              <p className="card-text">
                Record and track student grades, generate reports, and analyze academic performance.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Attendance Tracking</h5>
              <p className="card-text">
                Record and monitor student attendance, generate attendance reports, and identify patterns.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Enrollment Management</h5>
              <p className="card-text">
                Manage student enrollments in courses, track enrollment status, and handle course transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;