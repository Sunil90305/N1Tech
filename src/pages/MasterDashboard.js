import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MasterDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/master/dashboard", { withCredentials: true })
      .then(() => setAuthorized(true))
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setError("Access Denied: You are not authorized to view this page.");
        } else {
          setError("Error loading data.");
        }
      });
  }, []);

  return (
    <div>
      <div className="d-flex" style={{ height: 'calc(100vh - 100px)' }}>
        {/* Sidebar (LEFT) */}
        <div
          className="p-4"
          style={{
            width: '300px',
            background: '#f8f9fa',
            borderRight: '1px solid #ddd',
          }}
        >
          <h5>Master Access</h5>
          <p>Welcome, John Master</p>
          <hr />
          <h6>Profile Info</h6>
          <p>
            <strong>Name:</strong> John Master<br />
            <strong>Email:</strong> master@example.com<br />
            <strong>Role:</strong> Master<br />
            <strong>Phone:</strong> +1-999-888-7777
          </p>
        </div>

        {/* Dashboard Content */}
        <div
          className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
          style={{
            background: 'linear-gradient(to bottom, #dfe9f3, #ffffff)',
          }}
        >
          {!authorized ? (
            <h4 className="text-danger">{error}</h4>
          ) : (
            <>
              <h1 className="mb-4"> Dashboard</h1>
              <div className="d-flex flex-wrap justify-content-center gap-4">
                {[
                  { label: 'IT Recruiter', bg: '#f8d7da' },
                  { label: 'Bench Sales Recruiter', bg: '#d4edda' },
                  { label: 'Vendor Database', bg: '#cce5ff' },
                  { label: 'Active Bench Database', bg: '#fff3cd' },
                  { label: 'Prospective Bench Database', bg: '#e2e3e5' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 text-center"
                    style={{
                      width: '200px',
                      background: item.bg,
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <strong>{item.label}</strong>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
