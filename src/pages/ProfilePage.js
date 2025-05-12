import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: ""
  });
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const navigate = useNavigate();
const goToDashboard = () => {
    navigate("/dashboard"); // ✅ Navigates to dashboard
};

// ✅ Add a button to trigger navigation
<button onClick={goToDashboard}>Back to Dashboard</button>
  // Load user data
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get('http://localhost:8080/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}` // Include token in Authorization header
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.response ? error.response.data : error.message);
      alert("Error fetching user! Check console for details.");
    }
  };

  // Update user data
  const updateUser = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      if (!token) {
        throw new Error("Token not found");
      }
  
      console.log("User data being sent:", user); // Debugging log
  
      // Ensure the payload matches the backend model
      const payload = {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber // Correct casing for phoneNumber
      };
  
      const response = await axios.put('http://localhost:8080/api/user/update', payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
          'Content-Type': 'application/json'
        }
      });
  
      console.log("Response from backend:", response.data); // Debugging log
      alert("User updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating user data:", error.response ? error.response.data : error.message);
      alert("Error updating user! Check console for details.");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to right, rgb(194, 203, 247), rgb(88, 98, 231))", // Gradient background
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      {/* Profile Container */}
      <div
        className="col-md-6 border rounded shadow-lg"
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          width: "50%",
          border: "2px solid rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h2 className="fw-bold text-center mb-4">Profile Details</h2>

        {/* Profile Information */}
        <div className="card w-100 border-0">
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex align-items-center">
                <FaUser className="me-2 text-primary" />
                <strong>Name:&nbsp;</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  user.name
                )}
              </li>
              <li className="list-group-item d-flex align-items-center">
                <FaEnvelope className="me-2 text-success" />
                <strong>Email:&nbsp;</strong>
                {isEditing ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  user.email
                )}
              </li>
              <li className="list-group-item d-flex align-items-center">
                <FaPhone className="me-2 text-danger" />
                <strong>Phone Number:&nbsp;</strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.phoneNumber}
                    onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  user.phonenumber
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Actions Section */}
        <div className="text-center mt-4">
          {isEditing ? (
            <>
              <button
                className="btn btn-success px-4 py-2 rounded-pill shadow-sm me-2"
                onClick={updateUser}
              >
                Save Changes
              </button>
              <button
                className="btn btn-secondary px-4 py-2 rounded-pill shadow-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
          <Link className="btn btn-primary px-4 py-2 rounded-pill shadow-sm ms-2" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}