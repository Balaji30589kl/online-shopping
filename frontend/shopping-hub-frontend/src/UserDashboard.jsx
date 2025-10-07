import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader, getUsername, logout } from './authUtils';
import ProductList from './ProductList';

function UserDashboard({ onLogout }) {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('browse'); // Default to browse products
  const username = getUsername();

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/users/profile', {
        headers: getAuthHeader()
      });
      setMessage(response.data);
    } catch {
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
      <header style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>User Dashboard</h2>
        <p>Welcome, <strong>{username}</strong>! Browse and shop for products.</p>
      </header>

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
        <button 
          onClick={() => setActiveTab('browse')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeTab === 'browse' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'browse' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderBottom: 'none',
            cursor: 'pointer',
            marginRight: '5px'
          }}
        >
          Browse Products
        </button>
        <button 
          onClick={() => setActiveTab('cart')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeTab === 'cart' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'cart' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderBottom: 'none',
            cursor: 'pointer',
            marginRight: '5px'
          }}
        >
          My Cart
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeTab === 'orders' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'orders' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderBottom: 'none',
            cursor: 'pointer',
            marginRight: '5px'
          }}
        >
          My Orders
        </button>
        <button 
          onClick={() => setActiveTab('account')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeTab === 'account' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'account' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderBottom: 'none',
            cursor: 'pointer'
          }}
        >
          Account
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'browse' && (
        <ProductList />
      )}

      {activeTab === 'cart' && (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'center' }}>
          <h3>Shopping Cart</h3>
          <p>Cart functionality coming soon!</p>
        </div>
      )}

      {activeTab === 'orders' && (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', textAlign: 'center' }}>
          <h3>My Orders</h3>
          <p>Order history coming soon!</p>
        </div>
      )}

      {activeTab === 'account' && (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Account Management</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
            <button 
              onClick={fetchUserData} 
              style={{ padding: '10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Test User Access
            </button>
            <button 
              style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Update Profile
            </button>
            <button 
              onClick={handleLogout} 
              style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {message && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px' }}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
