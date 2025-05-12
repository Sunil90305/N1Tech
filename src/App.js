import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './layout/Navbar';
import ResetPasswordPage from './pages/ResetpasswordPage';
import ProfileForm from './pages/ProfileForm';
import MasterDashboard from './pages/MasterDashboard';
import ConsultantDashboard from './pages/ConsultantDashboard';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignUpPage />} />
  <Route path="/reset-password" element={<ResetPasswordPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/updateprofile" element={<ProfileForm />} />
  <Route path="/master-dashboard" element={<MasterDashboard />} />

<Route path="/consultant-dashboard" element={<ConsultantDashboard />} />

</Routes>

      </div>
    </Router>
  );
}

export default App;
