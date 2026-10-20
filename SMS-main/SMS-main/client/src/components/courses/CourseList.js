import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = () => {
      try {
        // Get courses from local storage
        const coursesData = LocalStorageService.getAll('courses');
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching courses');
        setLoading(false);
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="course-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Courses</h1>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Course
        </button>
      </div>

      <div className="card">
        <div className="card-header bg-light">
          <div className="row font-weight-bold">
            <div className="col-md-1">#</div>
            <div className="col-md-3">Course Name</div>
            <div className="col-md-2">Teacher</div>
            <div className="col-md-1">Grade</div>
            <div className="col-md-1">Students</div>
            <div className="col-md-1">Credits</div>
            <div className="col-md-3">Actions</div>
          </div>
        </div>
        <div className="card-body p-0">
          {courses.length === 0 ? (
            <div className="text-center p-3">No courses found</div>
          ) : (
            <ul className="list-group list-group-flush">
              {courses.map((course) => (
                <li key={course.id} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-md-1">{course.id}</div>
                    <div className="col-md-3">{course.name}</div>
                    <div className="col-md-2">{course.teacher}</div>
                    <div className="col-md-1">{course.grade}</div>
                    <div className="col-md-1">{course.students}</div>
                    <div className="col-md-1">{course.credits}</div>
                    <div className="col-md-3">
                      <Link to={`/courses/${course.id}`} className="btn btn-sm btn-info me-2">
                        <i className="fas fa-eye"></i> View
                      </Link>
                      <button className="btn btn-sm btn-warning me-2">
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;