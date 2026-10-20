import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GradeList = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    student: '',
    course: '',
    gradeLevel: ''
  });

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // In a real application, we would fetch from the API
        // const res = await axios.get('/api/grades');
        // setGrades(res.data.data);
        
        // Placeholder data
        setGrades([
          { id: 1, student: 'John Doe', studentId: 1, course: 'Algebra I', courseId: 1, teacher: 'Dr. Smith', grade: 'A', score: 92, gradeLevel: '9th' },
          { id: 2, student: 'Jane Smith', studentId: 2, course: 'Biology', courseId: 2, teacher: 'Mrs. Johnson', grade: 'B+', score: 87, gradeLevel: '10th' },
          { id: 3, student: 'Bob Johnson', studentId: 3, course: 'World History', courseId: 3, teacher: 'Mr. Williams', grade: 'A-', score: 90, gradeLevel: '11th' },
          { id: 4, student: 'Sarah Williams', studentId: 4, course: 'English Literature', courseId: 4, teacher: 'Ms. Davis', grade: 'B', score: 85, gradeLevel: '12th' },
          { id: 5, student: 'Michael Brown', studentId: 5, course: 'Physical Education', courseId: 5, teacher: 'Mr. Brown', grade: 'A', score: 95, gradeLevel: '10th' },
          { id: 6, student: 'John Doe', studentId: 1, course: 'Biology', courseId: 2, teacher: 'Mrs. Johnson', grade: 'B', score: 83, gradeLevel: '9th' },
          { id: 7, student: 'Jane Smith', studentId: 2, course: 'World History', courseId: 3, teacher: 'Mr. Williams', grade: 'A', score: 94, gradeLevel: '10th' },
          { id: 8, student: 'Bob Johnson', studentId: 3, course: 'English Literature', courseId: 4, teacher: 'Ms. Davis', grade: 'B+', score: 88, gradeLevel: '11th' }
        ]);
        setLoading(false);
      } catch (err) {
        setError('Error fetching grades');
        setLoading(false);
        console.error('Error fetching grades:', err);
      }
    };

    fetchGrades();
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
      gradeLevel: ''
    });
  };

  // Apply filters to grades
  const filteredGrades = grades.filter(grade => {
    return (
      (filters.student === '' || grade.student.toLowerCase().includes(filters.student.toLowerCase())) &&
      (filters.course === '' || grade.course.toLowerCase().includes(filters.course.toLowerCase())) &&
      (filters.gradeLevel === '' || grade.gradeLevel === filters.gradeLevel)
    );
  });

  // Get unique grade levels for filter dropdown
  const gradeLevels = [...new Set(grades.map(grade => grade.gradeLevel))];

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="grade-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Grade Management</h1>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Grade
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
              <label htmlFor="gradeLevel" className="form-label">Grade Level</label>
              <select
                className="form-select"
                id="gradeLevel"
                name="gradeLevel"
                value={filters.gradeLevel}
                onChange={handleFilterChange}
              >
                <option value="">All Grade Levels</option>
                {gradeLevels.map((level, index) => (
                  <option key={index} value={level}>{level}</option>
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

      {/* Grades Table */}
      <div className="card">
        <div className="card-header bg-light">
          <div className="row font-weight-bold">
            <div className="col-md-1">#</div>
            <div className="col-md-2">Student</div>
            <div className="col-md-2">Course</div>
            <div className="col-md-2">Teacher</div>
            <div className="col-md-1">Grade</div>
            <div className="col-md-1">Score</div>
            <div className="col-md-1">Level</div>
            <div className="col-md-2">Actions</div>
          </div>
        </div>
        <div className="card-body p-0">
          {filteredGrades.length === 0 ? (
            <div className="text-center p-3">No grades found</div>
          ) : (
            <ul className="list-group list-group-flush">
              {filteredGrades.map((grade) => (
                <li key={grade.id} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-md-1">{grade.id}</div>
                    <div className="col-md-2">
                      <Link to={`/students/${grade.studentId}`}>{grade.student}</Link>
                    </div>
                    <div className="col-md-2">
                      <Link to={`/courses/${grade.courseId}`}>{grade.course}</Link>
                    </div>
                    <div className="col-md-2">{grade.teacher}</div>
                    <div className="col-md-1">
                      <span className={`badge ${grade.grade.startsWith('A') ? 'bg-success' : grade.grade.startsWith('B') ? 'bg-primary' : grade.grade.startsWith('C') ? 'bg-warning' : 'bg-danger'}`}>
                        {grade.grade}
                      </span>
                    </div>
                    <div className="col-md-1">{grade.score}</div>
                    <div className="col-md-1">{grade.gradeLevel}</div>
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
      {filteredGrades.length > 0 && (
        <div className="card mt-4">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">Grade Summary</h5>
          </div>
          <div className="card-body">
            <div className="row text-center">
              <div className="col-md-3 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title">Total Grades</h6>
                    <h3>{filteredGrades.length}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title">Average Score</h6>
                    <h3>
                      {(filteredGrades.reduce((acc, curr) => acc + curr.score, 0) / filteredGrades.length).toFixed(1)}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title">Highest Score</h6>
                    <h3>{Math.max(...filteredGrades.map(g => g.score))}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title">Lowest Score</h6>
                    <h3>{Math.min(...filteredGrades.map(g => g.score))}</h3>
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

export default GradeList;