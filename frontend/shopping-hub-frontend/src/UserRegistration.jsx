import React, { useState } from 'react';
import axios from 'axios';
import './UserRegistration.css';

function UserRegistration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER' // Default role is USER
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/users/register', formData);
      setMessage(response.data);
      // Clear form on successful registration
      setFormData({ username: '', email: '', password: '', role: 'USER' });
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {/* Role Selection Dropdown */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="USER">Customer</option>
          <option value="SELLER">Seller</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UserRegistration;
