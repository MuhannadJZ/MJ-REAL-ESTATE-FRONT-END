import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'User' });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '2px solid #ddd' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link> |{' '}
      <Link to="/all-properties" style={{ marginRight: '1rem' }}>All Properties</Link> |{' '}
      
      {user ? (
        <>
          <Link to="/add-property" style={{ marginRight: '1rem' }}>Add Property</Link> |{' '}
          <span style={{ marginRight: '1rem' }}>Have a Great Time !</span> |{''}
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link> |{' '}
          <Link to="/signup" style={{ marginRight: '1rem' }}>Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
