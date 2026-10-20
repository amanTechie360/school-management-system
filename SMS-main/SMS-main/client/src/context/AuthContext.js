import React, { createContext, useState, useEffect } from 'react';
import LocalStorageService from '../services/LocalStorageService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize local storage data
  useEffect(() => {
    LocalStorageService.initializeData();
  }, []);

  // Load user if token exists
  useEffect(() => {
    const loadUser = () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = LocalStorageService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Invalid token
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setError('Authentication failed');
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (formData) => {
    try {
      // In a real app, we would validate and hash the password
      const newUser = LocalStorageService.create('users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user'
      });
      
      // Login the user after registration
      const result = LocalStorageService.login(formData.email, formData.password);
      if (result.success) {
        setToken(result.token);
        setUser(result.data);
        setIsAuthenticated(true);
        setLoading(false);
      }
      return result;
    } catch (err) {
      setError('Registration failed');
      return { success: false, message: 'Registration failed' };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const result = LocalStorageService.login(email, password);
      if (result.success) {
        setToken(result.token);
        setUser(result.data);
        setIsAuthenticated(true);
        setLoading(false);
      }
      return result;
    } catch (err) {
      setError('Login failed');
      return { success: false, message: 'Login failed' };
    }
  };

  // Logout user
  const logout = () => {
    LocalStorageService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear errors
  const clearErrors = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};