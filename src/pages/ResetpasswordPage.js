import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/resetPassword", { email, newPassword });
            if (response.data.success) {
                alert(response.data.message); // Show success message
                navigate("/login"); // Redirect to the login page
            } else {
                alert(response.data.message); // Show error message
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            alert("An error occurred while resetting your password. Please try again later.");
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
                <h4 className="text-center mb-4">Reset Your Password</h4>
                <form onSubmit={(e) => onSubmit(e)}>
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label" style={{ fontWeight: 'bold' }}>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter your new password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}