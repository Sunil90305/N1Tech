import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';
import '..//node_modules/bootstrap/dist/css/bootstrap.min.css';
import '..//node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './assets/logo.png';
import Navbar from './layout/Navbar.js';
import ResetPasswordPage from './pages/ResetpasswordPage';
import ProfileForm from './pages/ProfileForm';


function App() {
  return (
    <div className="App">
       {/* <div className="text-center my-4">
        <img src={logo} alt="N1 Solutions Logo" style={{ width: '250px' }} />
      </div>
      <h2 className="text-center">Welcome to N1 Talent Tech Dashboard</h2>
      <LoginPage /> */}
      <Navbar/>
      <Router>
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/updateprofile" element={<ProfileForm />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
