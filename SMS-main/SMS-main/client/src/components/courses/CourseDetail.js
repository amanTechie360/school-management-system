import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // In a real application, we would fetch from the API
        // const res = await axios.get(`/api/courses/${id}`);
        // setCourse(res.data.data);
        
        // Placeholder data
        setCourse({
          id: parseInt(id),
          name: 'Algebra I',
          description: 'Introduction to basic algebraic concepts including equations, inequalities, functions, and graphs.',
          teacher: 'Dr. Smith',
          teacherId: 1,
          grade: '9th',
          credits: 3,
          schedule: [
            { day: 'Monday', time: '8:00 AM - 9:30 AM', room: 'A101' },
            { day: 'Wednesday', time: '8:00 AM - 9:30 AM', room: 'A101' },
            { day: 'Friday', time: '8:00 AM - 9:30 AM', room: 'A101' }
          ],
          enrolledStudents: [
            { id: 1, name: 'John Doe', grade: 'A' },
            { id: 2, name: 'Jane Smith', grade: 'B+' },
            { id: 3, name: 'Bob Johnson', grade: 'A-' },
            { id: 4, name: 'Sarah Williams', grade: 'B' },
            { id: 5, name: 'Michael Brown', grade: 'A' }
          ],
          materials: [
            { id: 1, name: 'Textbook: Algebra Fundamentals', type: 'Book' },
            { id: 2, name: 'Practice Worksheets', type: 'Document' },
            { id: 3, name: 'Online Resources', type: 'Link' }
          ]
        });
        setLoading(false);
      } catch (err) {
        setError('Error fetching course details');
        setLoading(false);
        console.error('Error fetching course details:', err);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!course) return <div className="alert alert-warning">Course not found</div>;

  return (
    <div className="course-detail-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Course Details</h1>
        <div>
          <Link to="/courses" className="btn btn-secondary me-2">
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
              <h5 className="mb-0">Course Information</h5>
            </div>
            <div className="card-body">
              <h4 className="mb-3">{course.name}</h4>
              <p className="text-muted">Course ID: {course.id}</p>
              <p>{course.description}</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Teacher:</strong> 
                  <Link to={`/teachers/${course.teacherId}`}>{course.teacher}</Link>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Grade Level:</strong> <span>{course.grade}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Credits:</strong> <span>{course.credits}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Students Enrolled:</strong> <span>{course.enrolledStudents.length}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Course Materials</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {course.materials.map(material => (
                  <li key={material.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {material.name}
                    <span className="badge bg-secondary">{material.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Class Schedule</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Room</th>
                  </tr>
                </thead>
                <tbody>
                  {course.schedule.map((session, index) => (
                    <tr key={index}>
                      <td>{session.day}</td>
                      <td>{session.time}</td>
                      <td>{session.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">Enrolled Students</h5>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Current Grade</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {course.enrolledStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.grade}</td>
                      <td>
                        <Link to={`/students/${student.id}`} className="btn btn-sm btn-info">
                          <i className="fas fa-eye"></i> View
                        </Link>
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

export default CourseDetail;