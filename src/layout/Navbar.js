import React from 'react';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
export default function Navbar() {

  const location = useLocation(); // Get the current route
  return (
    <div className="App">
      {/* Navigation Bar */}
      <div
        className="d-flex align-items-center px-4 py-3"
        style={{
          background: 'linear-gradient(to right,rgb(218, 204, 253), #2575fc)', // Gradient background
          color: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow for better appearance
        }}
      >
        <div className="d-flex align-items-center" style={{ flex: 1 }}>
          <img src={logo} alt="N1 Solutions Logo" style={{ width: '150px' }} />
        </div>
        <div className="text-center" style={{ flex: 2 }}>
          <h4 className="m-0" style={{ fontWeight: 'bold' }}>
            Welcome to N1 Talent Tech Dashboard
          </h4>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          {/* Show Profile button only on the dashboard page */}
          {location.pathname === '/dashboard' && (
            <Link className="btn btn-outline-light"
            style={{
              fontWeight: 'bold',
            }} to="/profile">
              Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}