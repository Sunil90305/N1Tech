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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
