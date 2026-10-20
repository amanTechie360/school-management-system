import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState(null);

  const { email, password } = formData;
  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);
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
    const result = await login(email, password);
    if (!result.success) {
      setAlert({ type: 'danger', message: result.message });
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-primary mb-4">Login</h1>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <form onSubmit={onSubmit}>
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
        <button type="submit" className="btn btn-primary btn-block mb-3">
          Login
        </button>
      </form>
      <p className="text-center">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;