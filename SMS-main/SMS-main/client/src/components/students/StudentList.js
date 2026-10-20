import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    grade: '',
    email: ''
  });

  useEffect(() => {
    const fetchStudents = () => {
      try {
        // Get students from local storage
        const studentsData = LocalStorageService.getAll('students');
        setStudents(studentsData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching students');
        setLoading(false);
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
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
      name: '',
      grade: '',
      email: ''
    });
  };

  // Apply filters to students
  const filteredStudents = students.filter(student => {
    return (
      (filters.name === '' || student.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.grade === '' || student.grade.toString() === filters.grade) &&
      (filters.email === '' || student.email.toLowerCase().includes(filters.email.toLowerCase()))
    );
  });

  // Get unique grades for filter dropdown
  const grades = [...new Set(students.map(student => student.grade))].sort();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  
  // Calculate student statistics
  const totalStudents = filteredStudents.length;
  const gradeDistribution = {};
  
  // Calculate grade distribution
  filteredStudents.forEach(student => {
    if (gradeDistribution[student.grade]) {
      gradeDistribution[student.grade]++;
    } else {
      gradeDistribution[student.grade] = 1;
    }
  });
  
  // Calculate average age
  const averageAge = totalStudents > 0 
    ? Math.round(filteredStudents.reduce((sum, student) => sum + student.age, 0) / totalStudents) 
    : 0;

  return (
    <div className="student-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Students</h1>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Student
        </button>
      </div>

      {/* Student Statistics */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Student Statistics</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 col-6 text-center mb-3">
              <div className="card bg-info text-white">
                <div className="card-body py-2">
                  <h3>{totalStudents}</h3>
                  <p className="mb-0">Total Students</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-6 text-center mb-3">
              <div className="card bg-success text-white">
                <div className="card-body py-2">
                  <h3>{averageAge}</h3>
                  <p className="mb-0">Average Age</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 text-center mb-3">
              <div className="card bg-warning text-dark">
                <div className="card-body py-2">
                  <h3>{Object.keys(gradeDistribution).length}</h3>
                  <p className="mb-0">Grade Levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="name" className="form-label">Student Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Filter by name"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="grade" className="form-label">Grade</label>
              <select
                className="form-select"
                id="grade"
                name="grade"
                value={filters.grade}
                onChange={handleFilterChange}
              >
                <option value="">All Grades</option>
                {grades.map((grade, index) => (
                  <option key={index} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                placeholder="Filter by email"
              />
            </div>
            <div className="col-12 text-end">
              <button onClick={resetFilters} className="btn btn-secondary">
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card shadow">
        <div className="card-header bg-light">
          <div className="row font-weight-bold">
            <div className="col-md-1">#</div>
            <div className="col-md-3">Name</div>
            <div className="col-md-3">Email</div>
            <div className="col-md-2">Grade</div>
            <div className="col-md-1">Age</div>
            <div className="col-md-2">Actions</div>
          </div>
        </div>
        <div className="card-body p-0">
          {filteredStudents.length === 0 ? (
            <div className="text-center p-3">No students found</div>
          ) : (
            <ul className="list-group list-group-flush">
              {filteredStudents.map((student) => (
                <li key={student.id} className="list-group-item hover-effect">
                  <div className="row align-items-center">
                    <div className="col-md-1">{student.id}</div>
                    <div className="col-md-3 fw-bold">{student.name}</div>
                    <div className="col-md-3">{student.email}</div>
                    <div className="col-md-2">
                      <span className="badge bg-primary">{student.grade}</span>
                    </div>
                    <div className="col-md-1">{student.age}</div>
                    <div className="col-md-2">
                      <Link to={`/students/${student.id}`} className="btn btn-sm btn-info me-2" title="View Student">
                        <i className="fas fa-eye"></i>
                      </Link>
                      <button className="btn btn-sm btn-warning me-2" title="Edit Student">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" title="Delete Student">
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

      {/* Grade Distribution */}
      {filteredStudents.length > 0 && (
        <div className="card mt-4">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">Grade Distribution</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {Object.entries(gradeDistribution).map(([grade, count]) => (
                <div key={grade} className="col-md-3 col-6 mb-3">
                  <div className="card bg-light">
                    <div className="card-body text-center py-2">
                      <h5>Grade {grade}</h5>
                      <h3>{count} {count === 1 ? 'Student' : 'Students'}</h3>
                      <div className="progress mt-2">
                        <div 
                          className="progress-bar bg-success" 
                          role="progressbar" 
                          style={{ width: `${(count / totalStudents) * 100}%` }}
                          aria-valuenow={(count / totalStudents) * 100}
                          aria-valuemin="0"
                          aria-valuemax="100">
                          {Math.round((count / totalStudents) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;