import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function SignUpPage() {
    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const { name, email, password, role } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/addUser", user);

            if (response.data.success) {
                alert(response.data.message);
                navigate("/login");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("User with this email already exists. Please login.");
                navigate("/login");
            } else {
                console.error("Error creating account:", error);
                alert("An error occurred while creating your account. Please try again.");
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
                <h4 className="text-center mb-4">Create Your Account</h4>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label" style={{ fontWeight: 'bold' }}>Role</label>
                        <select
                            className="form-select"
                            id="role"
                            name="role"
                            required
                            value={role}
                            onChange={onInputChange}
                        >
                            <option value="">Select Role</option>
                            <option value="Master">Master</option>
                            <option value="Consultant">Consultant</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{ fontWeight: 'bold' }}>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold' }}>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={onInputChange}
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
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label" style={{ fontWeight: 'bold' }}>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            required
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2">
                        Create Account
                    </button>
                    <Link type="cancel" className="btn btn-danger mx-2" to="/login">Cancel</Link>
                </form>
            </div>
        </div>
    );
}
