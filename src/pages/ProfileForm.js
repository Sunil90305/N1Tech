import React, { useState } from 'react';
import './ProfileForm.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ data }) => {
  const [isEditMode, setIsEditMode] = useState(true);

  const [formData, setFormData] = useState({
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    skills: '',
    experience: '',
    resumeUrl: '' // Updated to match the backend's `resumeUrl` field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resumeUrl: file.name })); // Save the file name
    }
  };

  const handleSave = async () => {
    console.log('Save button clicked');

    // Optional: Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Name, Email, and Phone are required.');
      return;
    }

    try {
      // Send JSON data to the backend
      const response = await axios.post('http://localhost:8080/api/profile/save', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response from backend:', response.data);
      toast.success('Profile saved successfully!');
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error.response?.data || error.message);
      toast.error('Error saving profile.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        {isEditMode ? (
          <>
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />

            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />

            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />

            <label>Skills</label>
            <textarea name="skills" value={formData.skills} onChange={handleChange} />

            <label>Work Experience</label>
            <textarea name="experience" value={formData.experience} onChange={handleChange} />

            <label>Resume</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Skills:</strong> {formData.skills}
            </p>
            <p>
              <strong>Experience:</strong> {formData.experience}
            </p>
            <p>
              <strong>Resume:</strong>{' '}
              {formData.resumeUrl ? (
                <span>{formData.resumeUrl}</span>
              ) : (
                'Not uploaded'
              )}
            </p>
            <button onClick={() => setIsEditMode(true)}>Edit</button>
          </>
        )}
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Profile;