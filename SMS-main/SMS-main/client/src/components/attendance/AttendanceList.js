import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';

const AttendanceList = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    student: '',
    date: '',
    status: ''
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchAttendance = () => {
      try {
        // Get attendance records from local storage
        const records = LocalStorageService.getAttendanceByDate(selectedDate);
        setAttendanceRecords(records);
        setLoading(false);
      } catch (err) {
        setError('Error fetching attendance records');
        setLoading(false);
        console.error('Error fetching attendance records:', err);
      }
    };

    fetchAttendance();
  }, [selectedDate]);

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
      date: '',
      status: ''
    });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Apply filters to attendance records
  const filteredRecords = attendanceRecords.filter(record => {
    return (
      (filters.student === '' || record.student.toLowerCase().includes(filters.student.toLowerCase())) &&
      (filters.status === '' || record.status === filters.status)
    );
  });

  // Get unique statuses for filter dropdown
  const statuses = [...new Set(attendanceRecords.map(record => record.status))];

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Calculate attendance statistics
  const totalStudents = filteredRecords.length;
  const presentCount = filteredRecords.filter(r => r.status === 'Present').length;
  const absentCount = filteredRecords.filter(r => r.status === 'Absent').length;
  const lateCount = filteredRecords.filter(r => r.status === 'Late').length;
  const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  return (
    <div className="attendance-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Attendance Management</h1>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Take Attendance
        </button>
      </div>

      {/* Date Selector */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Select Date</h5>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <label htmlFor="attendanceDate" className="form-label">Attendance Date</label>
              <input
                type="date"
                className="form-control"
                id="attendanceDate"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="col-md-8">
              <div className="row mt-md-4">
                <div className="col-md-3 col-6 text-center mb-3">
                  <div className="card bg-success text-white">
                    <div className="card-body py-2">
                      <h3>{presentCount}</h3>
                      <p className="mb-0">Present</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 text-center mb-3">
                  <div className="card bg-danger text-white">
                    <div className="card-body py-2">
                      <h3>{absentCount}</h3>
                      <p className="mb-0">Absent</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 text-center mb-3">
                  <div className="card bg-warning text-dark">
                    <div className="card-body py-2">
                      <h3>{lateCount}</h3>
                      <p className="mb-0">Late</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 text-center mb-3">
                  <div className="card bg-info text-white">
                    <div className="card-body py-2">
                      <h3>{attendanceRate}%</h3>
                      <p className="mb-0">Attendance Rate</p>
                    </div>
                  </div>
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
            <div className="col-md-4 mb-3">
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
            <div className="col-md-4 d-flex align-items-end mb-3">
              <button onClick={resetFilters} className="btn btn-secondary w-100">
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="card">
        <div className="card-header bg-light">
          <div className="row font-weight-bold">
            <div className="col-md-1">#</div>
            <div className="col-md-3">Student</div>
            <div className="col-md-2">Grade</div>
            <div className="col-md-2">Course</div>
            <div className="col-md-2">Status</div>
            <div className="col-md-2">Actions</div>
          </div>
        </div>
        <div className="card-body p-0">
          {filteredRecords.length === 0 ? (
            <div className="text-center p-3">No attendance records found</div>
          ) : (
            <ul className="list-group list-group-flush">
              {filteredRecords.map((record) => (
                <li key={record.id} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-md-1">{record.id}</div>
                    <div className="col-md-3">
                      <Link to={`/students/${record.studentId}`}>{record.student}</Link>
                    </div>
                    <div className="col-md-2">{record.grade}</div>
                    <div className="col-md-2">{record.course}</div>
                    <div className="col-md-2">
                      <span className={`badge ${record.status === 'Present' ? 'bg-success' : record.status === 'Late' ? 'bg-warning' : 'bg-danger'}`}>
                        {record.status}
                      </span>
                    </div>
                    <div className="col-md-2">
                      <div className="btn-group" role="group">
                        <button 
                          className="btn btn-sm btn-success"
                          title="Mark as Present"
                          disabled={record.status === 'Present'}
                          onClick={() => {
                            const updated = LocalStorageService.updateAttendanceStatus(record.id, 'Present');
                            if (updated) {
                              setAttendanceRecords(prev => 
                                prev.map(r => r.id === record.id ? {...r, status: 'Present'} : r)
                              );
                            }
                          }}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-warning"
                          title="Mark as Late"
                          disabled={record.status === 'Late'}
                          onClick={() => {
                            const updated = LocalStorageService.updateAttendanceStatus(record.id, 'Late');
                            if (updated) {
                              setAttendanceRecords(prev => 
                                prev.map(r => r.id === record.id ? {...r, status: 'Late'} : r)
                              );
                            }
                          }}
                        >
                          <i className="fas fa-clock"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          title="Mark as Absent"
                          disabled={record.status === 'Absent'}
                          onClick={() => {
                            const updated = LocalStorageService.updateAttendanceStatus(record.id, 'Absent');
                            if (updated) {
                              setAttendanceRecords(prev => 
                                prev.map(r => r.id === record.id ? {...r, status: 'Absent'} : r)
                              );
                            }
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
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

export default AttendanceList;