import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    student: '',
    course: '',
    status: ''
  });

  useEffect(() => {
    const fetchEnrollments = () => {
      try {
        // Get enrollments from local storage
        const enrollmentsData = LocalStorageService.getAll('enrollments');
        setEnrollments(enrollmentsData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching enrollments');
        setLoading(false);
        console.error('Error fetching enrollments:', err);
      }
    };

    fetchEnrollments();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const resetFilters = () => {
    setFilters({
      student: '',
      course: '',
      status: ''
    });
  };

  // Apply filters to enrollments
  const filteredEnrollments = enrollments.filter(enrollment => {
    return (
      (filters.student === '' || enrollment.student.toLowerCase().includes(filters.student.toLowerCase())) &&
      (filters.course === '' || enrollment.course.toLowerCase().includes(filters.course.toLowerCase())) &&
      (filters.status === '' || enrollment.status === filters.status)
    );
  });

  // Get unique statuses for filter dropdown
  const statuses = [...new Set(enrollments.map(enrollment => enrollment.status))];

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="enrollment-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Enrollment Management</h1>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> New Enrollment
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="student" className="form-label">Student Name</label>
              <input
                type="text"
                className="form-control"
                id="student"
                name="student"
                value={filters.student}
                onChange={handleFilterChange}
                placeholder="Filter by student"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="course" className="form-label">Course</label>
              <input
                type="text"
                className="form-control"
                id="course"
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
                placeholder="Filter by course"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end mb-3">
              <button onClick={resetFilters} className="btn btn-secondary w-100">
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="card">
        <div className="card-header bg-light">
          <div className="row font-weight-bold">
            <div className="col-md-1">#</div>
            <div className="col-md-2">Student</div>
            <div className="col-md-2">Course</div>
            <div className="col-md-2">Enrollment Date</div>
            <div className="col-md-1">Grade</div>
            <div className="col-md-2">Status</div>
            <div className="col-md-2">Actions</div>
          </div>
        </div>
        <div className="card-body p-0">
          {filteredEnrollments.length === 0 ? (
            <div className="text-center p-3">No enrollments found</div>
          ) : (
            <ul className="list-group list-group-flush">
              {filteredEnrollments.map((enrollment) => (
                <li key={enrollment.id} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-md-1">{enrollment.id}</div>
                    <div className="col-md-2">
                      <Link to={`/students/${enrollment.studentId}`}>{enrollment.student}</Link>
                    </div>
                    <div className="col-md-2">
                      <Link to={`/courses/${enrollment.courseId}`}>{enrollment.course}</Link>
                    </div>
                    <div className="col-md-2">{enrollment.enrollmentDate}</div>
                    <div className="col-md-1">{enrollment.grade}</div>
                    <div className="col-md-2">
                      <span className={`badge ${enrollment.status === 'Active' ? 'bg-success' : enrollment.status === 'Pending' ? 'bg-warning' : 'bg-danger'}`}>
                        {enrollment.status}
                      </span>
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-sm btn-warning me-2">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Summary Statistics */}
      {filteredEnrollments.length > 0 && (
        <div className="card mt-4">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">Enrollment Summary</h5>
          </div>
          <div className="card-body">
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title">Total Enrollments</h6>
                    <h3>{filteredEnrollments.length}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title">Active Enrollments</h6>
                    <h3>
                      {filteredEnrollments.filter(e => e.status === 'Active').length}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title">Pending/Dropped</h6>
                    <h3>
                      {filteredEnrollments.filter(e => e.status !== 'Active').length}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentList;