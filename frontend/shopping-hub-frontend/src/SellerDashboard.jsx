import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader, getUsername, logout } from './authUtils';
import SellerProductList from './SellerProductList';

function SellerDashboard({ onLogout }) {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('products'); // New state for tab management
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

      {/* Navigation Tabs */}
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeTab === 'products' ? '#28a745' : '#f8f9fa',
            color: activeTab === 'products' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderBottom: 'none',
            cursor: 'pointer',
            marginRight: '5px'
          }}
        >
          My Products
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeTab === 'orders' ? '#28a745' : '#f8f9fa',
            color: activeTab === 'orders' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderBottom: 'none',
            cursor: 'pointer',
            marginRight: '5px'
          }}
        >
          Orders & Sales
        </button>
        <button 
          onClick={() => setActiveTab('account')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: activeTab === 'account' ? '#28a745' : '#f8f9fa',
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
      {activeTab === 'products' && (
        <SellerProductList />
      )}

      {activeTab === 'orders' && (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Orders & Sales</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <button style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
              View Orders
            </button>
            <button style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
              Sales Analytics
            </button>
            <button style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
              Shipping Management
            </button>
          </div>
        </div>
      )}

      {activeTab === 'account' && (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Account Management</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
            <button 
              onClick={fetchSellerData} 
              style={{ padding: '10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Test Seller Access
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

export default SellerDashboard;
