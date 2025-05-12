import React from 'react';


export default function DashboardPage() {
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
          <p>Welcome, Yeswanth</p>
          <hr />
          <h6>Profile Info</h6>
          <p>
            <strong>Name:</strong> Yeswanth
            <br />
            <strong>Email:</strong> yeswanth@example.com
            <br />
            <strong>Role:</strong> Admin / Master
            <br />
            <strong>Phone:</strong> +1-234-567-8901
          </p>
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
        </div>
      </div>
    </div>
  );
}