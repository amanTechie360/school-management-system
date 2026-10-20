import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [alert, setAlert] = useState(null);

  const { name, email, password, password2 } = formData;
  const { register, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    // Set alert if there's an error
    if (error) {
      setAlert({ type: 'danger', message: error });
      clearErrors();
    }
  }, [isAuthenticated, error, clearErrors, navigate]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (password !== password2) {
      setAlert({ type: 'danger', message: 'Passwords do not match' });
      return;
    }
    
    const userData = {
      name,
      email,
      password
    };
    
    const result = await register(userData);
    if (!result.success) {
      setAlert({ type: 'danger', message: result.message });
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-primary mb-4">Register</h1>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-3">
          Register
        </button>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;