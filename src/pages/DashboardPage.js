import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
        console.log("Token from localStorage:", token); // Debugging log
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.get('http://localhost:8080/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        console.log("Response from /api/user/me:", response); // Debugging log
        console.log("Response from /api/user/me:", response.data); // Debugging log
        // setUserData(response.data); // Save user data in state
        if (response.data) {
          setUserData(response.data);
        } else {
          throw new Error("Invalid response");
        }
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
    <div>
      {/* Main Content */}
      <div className="d-flex" style={{ height: 'calc(100vh - 100px)' }}>
        {/* Sidebar */}
        <div
          className="p-4"
          style={{
            width: '300px',
            background: '#f8f9fa',
            borderRight: '1px solid #ddd',
          }}
        >
          <h5>Candidate Access</h5>
          {userData && <p>Welcome, {userData.name}</p>}
          <hr />
          <h6>Profile Info</h6>
          {userData && (
            <p>
              <strong>Name:</strong> {userData.name}
              <br />
              <strong>Email:</strong> {userData.email}
              <br />
              <strong>Role:</strong> Admin / Master {/* Replace with dynamic role if available */}
              <br />
              <strong>Phone:</strong> +1-234-567-8901 {/* Replace with dynamic phone number if available */}
            </p>
          )}
        </div>

        {/* Dashboard */}
        <div
          className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
          style={{
            background: 'linear-gradient(to bottom, #dfe9f3, #ffffff)',
          }}
        >
          <h1 className="mb-4">Dashboard</h1>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            <div
              className="p-4 text-center"
              style={{
                width: '200px',
                background: '#f8d7da',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <strong>IT Recruiter</strong>
            </div>
            <div
              className="p-4 text-center"
              style={{
                width: '200px',
                background: '#d4edda',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <strong>Bench Sales Recruiter</strong>
            </div>
            <div
              className="p-4 text-center"
              style={{
                width: '200px',
                background: '#cce5ff',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <strong>Vendor Database</strong>
            </div>
            <Link
              to="/active-bench-jobs"
              className="p-4 text-center"
              style={{
                width: '200px',
                background: '#fff3cd',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <strong>Active Openings</strong>
            </Link>
            <div
              className="p-4 text-center"
              style={{
                width: '200px',
                background: '#e2e3e5',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <strong>Prospective Bench Database</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}