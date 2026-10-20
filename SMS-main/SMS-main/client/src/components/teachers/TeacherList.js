import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = () => {
      try {
        // Get teachers from local storage
        const teachersData = LocalStorageService.getAll('teachers');
        setTeachers(teachersData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching teachers');
        setLoading(false);
        console.error('Error fetching teachers:', err);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="teacher-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Teachers</h1>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add Teacher
        </button>
      </div>

      <div className="card">
        <div className="card-header bg-light">
          <div className="row font-weight-bold">
            <div className="col-md-1">#</div>
            <div className="col-md-3">Name</div>
            <div className="col-md-3">Email</div>
            <div className="col-md-2">Subject</div>
            <div className="col-md-1">Phone</div>
            <div className="col-md-2">Actions</div>
          </div>
        </div>
        <div className="card-body p-0">
          {teachers.length === 0 ? (
            <div className="text-center p-3">No teachers found</div>
          ) : (
            <ul className="list-group list-group-flush">
              {teachers.map((teacher) => (
                <li key={teacher.id} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-md-1">{teacher.id}</div>
                    <div className="col-md-3">{teacher.name}</div>
                    <div className="col-md-3">{teacher.email}</div>
                    <div className="col-md-2">{teacher.subject}</div>
                    <div className="col-md-1">{teacher.phone}</div>
                    <div className="col-md-2">
                      <Link to={`/teachers/${teacher.id}`} className="btn btn-sm btn-info me-2">
                        <i className="fas fa-eye"></i>
                      </Link>
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
    </div>
  );
};

export default TeacherList;