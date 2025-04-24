import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        userName: "",
        password: ""
    });
    const { userName, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/loginUser", user);
      
            // Handle the structured JSON response from the backend
            if (response.data.success) {
              alert(response.data.message); // Show success message
              navigate("/"); // Redirect to the home page
            } else {
              alert(response.data.message); // Show error message from the backend
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              // Handle "Unauthorized" error
              alert("Invalid credentials. Please try again.");
            } else {
              console.error("Error during login:", error);
              alert("An error occurred while logging in. Please try again later.");
            }
          }
    };


    return (
        <div
            style={{
                background: 'linear-gradient(to right,rgb(218, 204, 253), #2575fc)',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className="card shadow p-4" style={{ width: '500px', borderRadius: '10px' }}>
                <div className="text-center mb-4">
                    <img src={logo} alt="N1 Solutions Logo" style={{ width: '150px' }} />
                </div>
                <h4 className="text-center mb-4">Login to Your Account</h4>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label" style={{ fontWeight: 'bold' }}>Role</label>
                        <select className="form-select" id="role" name="role" required>
                            <option value="Master">Master</option>
                            <option value="Consultant">Consultant</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold' }}>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="userName" // Ensure the name matches the state key
                            placeholder="Enter your email / username"
                            required
                            value={userName}
                            onChange={(e) => onInputChange(e)} // This should update the state
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ fontWeight: 'bold' }}>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-2">
                        Login
                    </button>
                    <button type="button" className="btn btn-primary w-100" onClick={() => navigate('/signup')}>
                        Sign Up / Create Account
                    </button>
                    <button type="button" className="btn btn-link w-100" onClick={() => navigate('/reset-password')}>
                        Forgot Password?
                    </button>
                </form>


            </div>
        </div>
    );
}


