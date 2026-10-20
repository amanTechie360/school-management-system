import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>Copyright &copy; {new Date().getFullYear()} School Management System</p>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;