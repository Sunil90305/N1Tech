import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ConsultantDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/consultant/dashboard", { withCredentials: true })
      .then((res) => {
        setAuthorized(true);
      })
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
          <h5>Consultant Access</h5>
          <p>Welcome, Consultant User</p>
          <hr />
          <h6>Profile Info</h6>
          <p>
            <strong>Name:</strong> Jane Consultant<br />
            <strong>Email:</strong> consultant@example.com<br />
            <strong>Role:</strong> Consultant<br />
            <strong>Phone:</strong> +1-222-333-4444
          </p>
        </div>

        {/* Dashboard */}
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
              <h1 className="mb-4">Consultant Dashboard</h1>
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
                <div
                  className="p-4 text-center"
                  style={{
                    width: '200px',
                    background: '#fff3cd',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <strong>Active Bench Database</strong>
                </div>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
