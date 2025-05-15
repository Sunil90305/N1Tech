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
    location: '',
    role: '',
    visaStatus: '',
    expectedPayRate: '',
    comments: '',
    resumeFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, resumeFile: file }));
  };

  const handleSave = async () => {
    console.log('Save button clicked');

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Name, Email, and Phone are required.');
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

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

            <label>Location</label>
            <input name="location" value={formData.location} onChange={handleChange} />

            <label>Role</label>
            <input name="role" value={formData.role} onChange={handleChange} />

            <label>Visa Status</label>
            <input name="visaStatus" value={formData.visaStatus} onChange={handleChange} />

            <label>Expected Pay Rate</label>
            <input name="expectedPayRate" value={formData.expectedPayRate} onChange={handleChange} />

            <label>Skills</label>
            <textarea name="skills" value={formData.skills} onChange={handleChange} />

            <label>Work Experience</label>
            <textarea name="experience" value={formData.experience} onChange={handleChange} />

            <label>Comments</label>
            <textarea name="comments" value={formData.comments} onChange={handleChange} />

            <label>Resume</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Location:</strong> {formData.location}</p>
            <p><strong>Role:</strong> {formData.role}</p>
            <p><strong>Visa Status:</strong> {formData.visaStatus}</p>
            <p><strong>Expected Pay Rate:</strong> {formData.expectedPayRate}</p>
            <p><strong>Skills:</strong> {formData.skills}</p>
            <p><strong>Experience:</strong> {formData.experience}</p>
            <p><strong>Comments:</strong> {formData.comments}</p>
            <p><strong>Resume:</strong> {formData.resumeFile ? formData.resumeFile.name : 'Not uploaded'}</p>

            <button onClick={() => setIsEditMode(true)}>Edit</button>
          </>
        )}
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Profile;
