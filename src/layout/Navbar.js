import React from 'react';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // Show buttons on any dashboard route
  const showButtons = location.pathname.includes('dashboard');

  return (
    <div className="App">
      {/* Navigation Bar */}
      <div
        className="d-flex align-items-center px-4 py-3"
        style={{
          background: 'linear-gradient(to right,rgb(218, 204, 253), #2575fc)',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo */}
        <div className="d-flex align-items-center" style={{ flex: 1 }}>
          <img src={logo} alt="N1 Solutions Logo" style={{ width: '150px' }} />
        </div>

        {/* Centered Title */}
        <div className="text-center" style={{ flex: 2 }}>
          <h4 className="m-0" style={{ fontWeight: 'bold' }}>
            Welcome to N1 Talent Tech Dashboard
          </h4>
        </div>

        {/* Buttons */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          {showButtons && (
            <>
              <Link
                to="/profile"
                className="btn btn-outline-light me-2"
                style={{ fontWeight: 'bold' }}
              >
                Profile
              </Link>
              <Link
                to="/updateprofile"
                className="btn btn-light text-primary"
                style={{ fontWeight: 'bold' }}
              >
                Update Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
