import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // In a real application, we would fetch from the API
        // const res = await axios.get(`/api/students/${id}`);
        // setStudent(res.data.data);
        
        // Placeholder data
        setStudent({
          id: parseInt(id),
          name: 'John Doe',
          email: 'john@example.com',
          grade: '10th',
          age: 16,
          address: '123 School St, Education City',
          phone: '(555) 123-4567',
          parentName: 'Richard Doe',
          parentEmail: 'richard@example.com',
          parentPhone: '(555) 987-6543',
          enrolledCourses: [
            { id: 1, name: 'Mathematics', teacher: 'Dr. Smith', grade: 'A' },
            { id: 2, name: 'Science', teacher: 'Mrs. Johnson', grade: 'B+' },
            { id: 3, name: 'History', teacher: 'Mr. Williams', grade: 'A-' }
          ],
          attendance: {
            present: 45,
            absent: 3,
            late: 2,
            percentage: 90
          }
        });
        setLoading(false);
      } catch (err) {
        setError('Error fetching student details');
        setLoading(false);
        console.error('Error fetching student details:', err);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!student) return <div className="alert alert-warning">Student not found</div>;

  return (
    <div className="student-detail-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Student Details</h1>
        <div>
          <Link to="/students" className="btn btn-secondary me-2">
            <i className="fas fa-arrow-left"></i> Back to List
          </Link>
          <button className="btn btn-warning me-2">
            <i className="fas fa-edit"></i> Edit
          </button>
          <button className="btn btn-danger">
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Personal Information</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="avatar-placeholder bg-light rounded-circle mx-auto mb-2" style={{ width: '100px', height: '100px', lineHeight: '100px' }}>
                  {student.name.charAt(0)}
                </div>
                <h4>{student.name}</h4>
                <p className="text-muted">Student ID: {student.id}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Email:</strong> <span>{student.email}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Grade:</strong> <span>{student.grade}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Age:</strong> <span>{student.age}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Address:</strong> <span>{student.address}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Phone:</strong> <span>{student.phone}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Parent Information</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Name:</strong> <span>{student.parentName}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Email:</strong> <span>{student.parentEmail}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Phone:</strong> <span>{student.parentPhone}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Enrolled Courses</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {student.enrolledCourses.map(course => (
                    <tr key={course.id}>
                      <td>{course.name}</td>
                      <td>{course.teacher}</td>
                      <td>{course.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Attendance Summary</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3 mb-3">
                  <div className="card bg-success text-white">
                    <div className="card-body py-3">
                      <h3>{student.attendance.present}</h3>
                      <p className="mb-0">Present</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-danger text-white">
                    <div className="card-body py-3">
                      <h3>{student.attendance.absent}</h3>
                      <p className="mb-0">Absent</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-warning text-dark">
                    <div className="card-body py-3">
                      <h3>{student.attendance.late}</h3>
                      <p className="mb-0">Late</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-info text-white">
                    <div className="card-body py-3">
                      <h3>{student.attendance.percentage}%</h3>
                      <p className="mb-0">Attendance Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;