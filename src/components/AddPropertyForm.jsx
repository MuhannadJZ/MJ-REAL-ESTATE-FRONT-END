import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../services/realEstateServices';

const AddPropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setPropertyData({
      ...propertyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await createProperty(propertyData);
      setPropertyData({
        title: '',
        description: '',
        price: '',
        location: '',
        imageUrl: '',
      });
      navigate('/all-properties');
    } catch {
      setError('Error creating property, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form inputs here */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Add Property'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AddPropertyForm;
