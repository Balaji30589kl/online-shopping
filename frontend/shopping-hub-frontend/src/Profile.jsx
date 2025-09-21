import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader, isLoggedIn, logout } from './authUtils';

function Profile() {
  const [profileMessage, setProfileMessage] = useState('');

  const fetchProfile = async () => {
    if (!isLoggedIn()) {
      setProfileMessage('Please login first!');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8081/api/users/profile', {
        headers: getAuthHeader()
      });
      setProfileMessage(response.data);
    } catch (error) {
      console.error(error);
      setProfileMessage('Failed to fetch profile. Please login again.');
    }
  };

  const handleLogout = () => {
    logout();
    setProfileMessage('You have been logged out.');
  };

  return (
    <div className="profile-container" style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h3>User Profile</h3>
      <button onClick={fetchProfile} style={{ margin: '5px' }}>
        Get Profile Info
      </button>
      <button onClick={handleLogout} style={{ margin: '5px' }}>
        Logout
      </button>
      {profileMessage && <p>{profileMessage}</p>}
    </div>
  );
}

export default Profile;
