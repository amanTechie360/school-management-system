import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        // In a real application, we would fetch from the API
        // const res = await axios.get(`/api/teachers/${id}`);
        // setTeacher(res.data.data);
        
        // Placeholder data
        setTeacher({
          id: parseInt(id),
          name: 'Dr. Smith',
          email: 'smith@example.com',
          subject: 'Mathematics',
          phone: '(555) 123-4567',
          address: '456 Faculty Ave, Education City',
          qualification: 'Ph.D. in Mathematics',
          joinDate: '2018-08-15',
          assignedCourses: [
            { id: 1, name: 'Algebra I', grade: '9th', students: 25 },
            { id: 2, name: 'Geometry', grade: '10th', students: 22 },
            { id: 3, name: 'Calculus', grade: '12th', students: 18 }
          ],
          schedule: [
            { day: 'Monday', periods: ['8:00 AM - 9:30 AM: Algebra I', '10:00 AM - 11:30 AM: Geometry', '1:00 PM - 2:30 PM: Calculus'] },
            { day: 'Tuesday', periods: ['8:00 AM - 9:30 AM: Algebra I', '10:00 AM - 11:30 AM: Office Hours', '1:00 PM - 2:30 PM: Calculus'] },
            { day: 'Wednesday', periods: ['8:00 AM - 9:30 AM: Algebra I', '10:00 AM - 11:30 AM: Geometry', '1:00 PM - 2:30 PM: Department Meeting'] },
            { day: 'Thursday', periods: ['8:00 AM - 9:30 AM: Algebra I', '10:00 AM - 11:30 AM: Geometry', '1:00 PM - 2:30 PM: Calculus'] },
            { day: 'Friday', periods: ['8:00 AM - 9:30 AM: Office Hours', '10:00 AM - 11:30 AM: Geometry', '1:00 PM - 2:30 PM: Calculus'] }
          ]
        });
        setLoading(false);
      } catch (err) {
        setError('Error fetching teacher details');
        setLoading(false);
        console.error('Error fetching teacher details:', err);
      }
    };

    fetchTeacher();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!teacher) return <div className="alert alert-warning">Teacher not found</div>;

  return (
    <div className="teacher-detail-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Teacher Details</h1>
        <div>
          <Link to="/teachers" className="btn btn-secondary me-2">
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
                  {teacher.name.split(' ')[1].charAt(0)}
                </div>
                <h4>{teacher.name}</h4>
                <p className="text-muted">Teacher ID: {teacher.id}</p>
                <p className="badge bg-info">{teacher.subject} Teacher</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Email:</strong> <span>{teacher.email}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Phone:</strong> <span>{teacher.phone}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Address:</strong> <span>{teacher.address}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Qualification:</strong> <span>{teacher.qualification}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Join Date:</strong> <span>{teacher.joinDate}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Assigned Courses</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Grade</th>
                    <th>Students</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teacher.assignedCourses.map(course => (
                    <tr key={course.id}>
                      <td>{course.name}</td>
                      <td>{course.grade}</td>
                      <td>{course.students}</td>
                      <td>
                        <Link to={`/courses/${course.id}`} className="btn btn-sm btn-info me-2">
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Weekly Schedule</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {teacher.schedule.map((day, index) => (
                    <tr key={index}>
                      <td><strong>{day.day}</strong></td>
                      <td>
                        <ul className="list-unstyled mb-0">
                          {day.periods.map((period, idx) => (
                            <li key={idx}>{period}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;