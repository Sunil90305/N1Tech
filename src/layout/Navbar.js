import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get('http://localhost:8080/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setUserData(response.data); // Save user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Session expired. Please log in again.');
        navigate('/login'); // Redirect to login if token is invalid
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token
    navigate('/login'); // Redirect to login page
  };

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
          {/* Show Profile dropdown only on the Dashboard page */}
          {location.pathname === '/dashboard' && userData && (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png" // Online placeholder image
                  alt="Profile"
                  style={{ borderRadius: '50%', marginRight: '10px', width: '40px', height: '40px' }}
                />
                <span>{userData.name}</span>
              </div>
              {showDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                  }}
                >
                  <div style={{ padding: '10px' }}>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                  </div>
                  <button
                    onClick={() => navigate('/profile')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0',
                      cursor: 'pointer',
                    }}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0 0 5px 5px',
                      cursor: 'pointer',
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}