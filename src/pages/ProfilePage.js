import React from 'react'
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function ProfilePage() {
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        phonenumber: ""
    });
    const {email} = useParams();
    
    const loadUser = async () => {
        try{
        const hardcodedEmail = "kush@gmail.com";
        const result = await axios.get(`http://localhost:8080/User/${hardcodedEmail}`);
        console.log("API Response:", result.data);
          // Extract the user object from the response
          if (result.data.success) {
            setUser(result.data.user);
        } else {
            alert("Failed to fetch user details.");
        }
    }
    catch (error) {
        console.error("Axios Error:", error.response ? error.response.data : error.message);
        alert("Error fetching user! Check console for details.");
    }
    
};
    useEffect(() => {
        loadUser(); 
    },[email]);
    

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
      {/* Profile Container with Glassmorphism Effect */}
      <div
  className="col-md-6 border rounded shadow-lg"
  style={{
    background: "#ffffff", // Changed to solid white background
    borderRadius: "20px", // Keeps rounded corners for elegance
    padding: "40px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Stronger shadow for depth
    width: "50%", // Expanded width
    border: "2px solid rgba(0, 0, 0, 0.1)", // Subtle light gray border
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Hover animation
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
                <FaUser className="me-2 text-primary" /> <strong>Name:&nbsp;</strong> {user.name}
              </li>
              <li className="list-group-item d-flex align-items-center">
                <FaEnvelope className="me-2 text-success" /> <strong>Email:&nbsp;</strong> {user.email}
              </li>
              <li className="list-group-item d-flex align-items-center">
                <FaPhone className="me-2 text-danger" /> <strong>Phone Number:&nbsp;</strong> {user.phonenumber}
              </li>
            </ul>
          </div>
        </div>

        {/* Actions Section */}
        <div className="text-center mt-4">
          <Link className="btn btn-primary px-4 py-2 rounded-pill shadow-sm" to="/dashboard">
            <i className="fas fa-arrow-left me-2"></i> {/* Font Awesome icon for arrow */}
            Back to DashBoard
          </Link>
        </div>
      </div>
    </div>
  );
}
