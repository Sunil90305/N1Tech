import React from 'react'
import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <div
        className="d-flex align-items-center justify-content-between px-4 py-3"
        style={{
          background: 'linear-gradient(to right,rgb(218, 204, 253), #2575fc)', // Gradient background
          color: 'white',
        }}
      >
        <img src={logo} alt="N1 Solutions Logo" style={{ width: '200px' }} />
        <h2 className="m-0">Welcome to N1 Talent Tech Dashboard</h2>
      </div>
    </div>
  )
}
