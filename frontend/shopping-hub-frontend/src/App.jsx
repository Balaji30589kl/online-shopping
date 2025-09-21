import React, { useState, useEffect } from 'react';
import UserRegistration from './UserRegistration';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import SellerDashboard from './SellerDashboard';
import UserDashboard from './UserDashboard';
import { isLoggedIn, getUserRole, logout } from './authUtils';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    setUserLoggedIn(loggedIn);
    if (loggedIn) {
      setRole(getUserRole());
      setCurrentView('dashboard');
    }
  }, []);

  const handleLoginSuccess = () => {
    setUserLoggedIn(true);
    const userRole = getUserRole();
    setRole(userRole);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    logout();
    setUserLoggedIn(false);
    setRole(null);
    setCurrentView('login');
  };

  const renderContent = () => {
    if (!userLoggedIn) {
      if (currentView === 'register') {
        return <UserRegistration />;
      }
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }
    // Logged in → Dashboard view
    if (role === 'ADMIN') {
      return <AdminDashboard onLogout={handleLogout} />;
    }
    if (role === 'SELLER') {
      return <SellerDashboard onLogout={handleLogout} />;
    }
    // Default to regular user dashboard
    return <UserDashboard onLogout={handleLogout} />;
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h1>Shopping Hub</h1>
        {!userLoggedIn && (
          <div>
            <button
              onClick={() => setCurrentView('login')}
              disabled={currentView === 'login'}
              style={{ margin: '0 10px', padding: '8px 16px' }}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentView('register')}
              disabled={currentView === 'register'}
              style={{ margin: '0 10px', padding: '8px 16px' }}
            >
              Register
            </button>
          </div>
        )}
      </header>
      {renderContent()}
    </div>
  );
}

export default App;
