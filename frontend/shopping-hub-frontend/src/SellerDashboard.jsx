import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader, getUsername, logout } from './authUtils';

function SellerDashboard({ onLogout }) {
  const [message, setMessage] = useState('');
  const username = getUsername();

  const fetchSellerData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/users/profile', {
        headers: getAuthHeader()
      });
      setMessage(response.data);
    } catch {
      setMessage('Failed to fetch seller data. Please login again.');
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
      <header style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>Seller Dashboard</h2>
        <p>Welcome, <strong>{username}</strong>! Manage your products and orders here.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {/* Product Management Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>My Products</h3>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Add New Product</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>View My Products</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Edit Products</button>
        </div>

        {/* Order Management Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>Orders & Sales</h3>
          <button style={{ margin: '5px', padding: '8px 12px' }}>View Orders</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Sales Analytics</button>
          <button style={{ margin: '5px', padding: '8px 12px' }}>Shipping Management</button>
        </div>

        {/* Account Management Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3>Account</h3>
          <button onClick={fetchSellerData} style={{ margin: '5px', padding: '8px 12px' }}>
            Test Seller Access
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

export default SellerDashboard;
