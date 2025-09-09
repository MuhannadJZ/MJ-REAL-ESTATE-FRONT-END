import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import AddPropertyForm from './components/AddPropertyForm';
import AllProperties from './components/AllProperties';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Property Management App</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/add-property" 
            element={
              <ProtectedRoute>
                <AddPropertyForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/all-properties" 
            element={
              <ProtectedRoute>
                <AllProperties />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
