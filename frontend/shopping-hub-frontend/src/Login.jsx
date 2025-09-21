import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
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
      const response = await axios.post('http://localhost:8081/api/users/login', formData);
      
      if (response.data.token) {
        // Store token, username, and role in localStorage
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('userRole', response.data.role);
        
        setMessage(`Welcome back, ${response.data.username}!`);
        setFormData({ usernameOrEmail: '', password: '' });
        
        // Notify parent component of successful login
        if (onLoginSuccess) {
          setTimeout(() => onLoginSuccess(), 1000);
        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          value={formData.usernameOrEmail}
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
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;
