import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      {user && (
        <li className="nav-item">
          <span className="nav-link">Welcome, {user.name}</span>
        </li>
      )}
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={handleLogout} href="#!" className="nav-link">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          School Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/students">
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teachers">
                    Teachers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/grades">
                    Grades
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/enrollments">
                    Enrollments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/attendance">
                    Attendance
                  </Link>
                </li>
              </>
            )}
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;