/**
 * LocalStorageService.js
 * This service handles all data persistence operations using localStorage
 * instead of API calls, allowing the application to run without a backend.
 */

class LocalStorageService {
  // Initialize default data if localStorage is empty
  static initializeData() {
    // Check if data already exists
    if (!localStorage.getItem('students')) {
      // Set default students
      const students = [
        { id: 1, name: 'John Doe', email: 'john@example.com', grade: '10th', age: 16 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: '11th', age: 17 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', grade: '9th', age: 15 },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', grade: '12th', age: 18 },
        { id: 5, name: 'Michael Brown', email: 'michael@example.com', grade: '10th', age: 16 }
      ];
      localStorage.setItem('students', JSON.stringify(students));
    }

    if (!localStorage.getItem('teachers')) {
      // Set default teachers
      const teachers = [
        { id: 1, name: 'Dr. Smith', email: 'smith@example.com', subject: 'Mathematics', phone: '(555) 123-4567' },
        { id: 2, name: 'Mrs. Johnson', email: 'johnson@example.com', subject: 'Science', phone: '(555) 234-5678' },
        { id: 3, name: 'Mr. Williams', email: 'williams@example.com', subject: 'History', phone: '(555) 345-6789' },
        { id: 4, name: 'Ms. Davis', email: 'davis@example.com', subject: 'English', phone: '(555) 456-7890' },
        { id: 5, name: 'Mr. Brown', email: 'brown@example.com', subject: 'Physical Education', phone: '(555) 567-8901' }
      ];
      localStorage.setItem('teachers', JSON.stringify(teachers));
    }

    if (!localStorage.getItem('courses')) {
      // Set default courses
      const courses = [
        { id: 1, name: 'Algebra I', teacher: 'Dr. Smith', grade: '9th', students: 25, credits: 3 },
        { id: 2, name: 'Biology', teacher: 'Mrs. Johnson', grade: '10th', students: 22, credits: 4 },
        { id: 3, name: 'World History', teacher: 'Mr. Williams', grade: '11th', students: 20, credits: 3 },
        { id: 4, name: 'English Literature', teacher: 'Ms. Davis', grade: '12th', students: 18, credits: 3 },
        { id: 5, name: 'Physical Education', teacher: 'Mr. Brown', grade: 'All', students: 30, credits: 2 }
      ];
      localStorage.setItem('courses', JSON.stringify(courses));
    }

    if (!localStorage.getItem('enrollments')) {
      // Set default enrollments
      const enrollments = [
        { id: 1, student: 'John Doe', studentId: 1, course: 'Algebra I', courseId: 1, enrollmentDate: '2023-08-15', status: 'Active', grade: '9th' },
        { id: 2, student: 'Jane Smith', studentId: 2, course: 'Biology', courseId: 2, enrollmentDate: '2023-08-15', status: 'Active', grade: '10th' },
        { id: 3, student: 'Bob Johnson', studentId: 3, course: 'World History', courseId: 3, enrollmentDate: '2023-08-16', status: 'Active', grade: '11th' },
        { id: 4, student: 'Sarah Williams', studentId: 4, course: 'English Literature', courseId: 4, enrollmentDate: '2023-08-14', status: 'Active', grade: '12th' },
        { id: 5, student: 'Michael Brown', studentId: 5, course: 'Physical Education', courseId: 5, enrollmentDate: '2023-08-17', status: 'Active', grade: '10th' },
        { id: 6, student: 'John Doe', studentId: 1, course: 'Biology', courseId: 2, enrollmentDate: '2023-08-15', status: 'Pending', grade: '9th' },
        { id: 7, student: 'Jane Smith', studentId: 2, course: 'World History', courseId: 3, enrollmentDate: '2023-08-15', status: 'Active', grade: '10th' },
        { id: 8, student: 'Bob Johnson', studentId: 3, course: 'English Literature', courseId: 4, enrollmentDate: '2023-08-16', status: 'Dropped', grade: '11th' }
      ];
      localStorage.setItem('enrollments', JSON.stringify(enrollments));
    }

    if (!localStorage.getItem('attendance')) {
      // Create default attendance records for today
      const today = new Date().toISOString().split('T')[0];
      const attendance = [
        { id: 1, student: 'John Doe', studentId: 1, date: today, status: 'Present', course: 'Algebra I', grade: '9th' },
        { id: 2, student: 'Jane Smith', studentId: 2, date: today, status: 'Present', course: 'Biology', grade: '10th' },
        { id: 3, student: 'Bob Johnson', studentId: 3, date: today, status: 'Absent', course: 'World History', grade: '11th' },
        { id: 4, student: 'Sarah Williams', studentId: 4, date: today, status: 'Present', course: 'English Literature', grade: '12th' },
        { id: 5, student: 'Michael Brown', studentId: 5, date: today, status: 'Late', course: 'Physical Education', grade: '10th' },
        { id: 6, student: 'Emily Davis', studentId: 6, date: today, status: 'Present', course: 'Chemistry', grade: '11th' },
        { id: 7, student: 'David Wilson', studentId: 7, date: today, status: 'Absent', course: 'Physics', grade: '12th' },
        { id: 8, student: 'Olivia Martin', studentId: 8, date: today, status: 'Present', course: 'Art', grade: '9th' }
      ];
      localStorage.setItem('attendance', JSON.stringify(attendance));
    }

    // Set default user credentials
    if (!localStorage.getItem('users')) {
      const users = [
        { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' }
      ];
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  // Generic CRUD operations
  static getAll(entity) {
    const data = localStorage.getItem(entity);
    return data ? JSON.parse(data) : [];
  }

  static getById(entity, id) {
    const data = this.getAll(entity);
    return data.find(item => item.id === parseInt(id));
  }

  static create(entity, item) {
    const data = this.getAll(entity);
    const newId = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
    const newItem = { ...item, id: newId };
    data.push(newItem);
    localStorage.setItem(entity, JSON.stringify(data));
    return newItem;
  }

  static update(entity, id, item) {
    const data = this.getAll(entity);
    const index = data.findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
      data[index] = { ...data[index], ...item };
      localStorage.setItem(entity, JSON.stringify(data));
      return data[index];
    }
    return null;
  }

  static delete(entity, id) {
    const data = this.getAll(entity);
    const filteredData = data.filter(item => item.id !== parseInt(id));
    localStorage.setItem(entity, JSON.stringify(filteredData));
    return true;
  }

  // Authentication methods
  static login(email, password) {
    const users = this.getAll('users');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // Create a fake token
      const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
      localStorage.setItem('token', token);
      return { success: true, token, data: { ...user, password: undefined } };
    }
    return { success: false, message: 'Invalid credentials' };
  }

  static getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const decoded = JSON.parse(atob(token));
      const users = this.getAll('users');
      const user = users.find(u => u.id === decoded.userId);
      if (user) {
        return { ...user, password: undefined };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  static logout() {
    localStorage.removeItem('token');
    return true;
  }

  // Specific methods for attendance
  static getAttendanceByDate(date) {
    const allAttendance = this.getAll('attendance');
    return allAttendance.filter(record => record.date === date);
  }

  static updateAttendanceStatus(id, status) {
    return this.update('attendance', id, { status });
  }
}

export default LocalStorageService;