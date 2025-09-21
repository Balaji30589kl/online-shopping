import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader, getUsername, logout } from './authUtils';

function AdminDashboard({ onLogout }) {
  const [message, setMessage] = useState('');
  const username = getUsername();

  const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/users/profile', {
        headers: getAuthHeader()
      });
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Failed to fetch admin data. Please login again.');
    }
  };

  const handleLogout = () => {
    logout();
    setMessage('You have been logged out.');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>Admin Dashboard</h2>
        <p>Welcome, <strong>{username}</strong>! You have administrative access.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {/* User Management Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>User Management</h3>
          <button style={{ margin: '5px', padding: '8px 12px' }}>View All Users</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Manage Sellers</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>User Analytics</button>
        </div>

        {/* Product Management Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>Product Management</h3>
          <button style={{ margin: '5px', padding: '8px 12px' }}>View All Products</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Moderate Products</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Product Analytics</button>
        </div>

        {/* System Management Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>System Management</h3>
          <button onClick={fetchAdminData} style={{ margin: '5px', padding: '8px 12px' }}>
            Test Admin Access
          </button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>System Settings</button>
          <button onClick={handleLogout} style={{ margin: '5px', padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ddd' }}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
