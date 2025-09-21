import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader, getUsername, logout } from './authUtils';

function UserDashboard({ onLogout }) {
  const [message, setMessage] = useState('');
  const username = getUsername();

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/users/profile', {
        headers: getAuthHeader()
      });
      setMessage(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage('Failed to fetch user data. Please login again.');
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
      <header style={{ borderBottom: '2px solid #17a2b8', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>Customer Dashboard</h2>
        <p>Welcome, <strong>{username}</strong>! Start shopping for amazing products.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {/* Shopping Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>Shopping</h3>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Browse Products</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Search Products</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>View Categories</button>
        </div>

        {/* Cart & Orders Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>Cart & Orders</h3>
          <button style={{ margin: '5px', padding: '8px 12px' }}>View Cart</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>My Orders</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Order History</button>
        </div>

        {/* Account Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>Account</h3>
          <button onClick={fetchUserData} style={{ margin: '5px', padding: '8px 12px' }}>
            Test User Access
          </button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Update Profile</button>
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

export default UserDashboard;
