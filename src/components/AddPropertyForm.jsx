import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../services/realEstateServices';
import './AddPropertyForm.css';

const AddPropertyForm = ({ onPropertyAdded }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const newProperty = await createProperty(propertyData);
      onPropertyAdded(newProperty);

      setPropertyData({
        title: '',
        description: '',
        price: '',
        location: '',
        imageUrl: '',
      });

      navigate('/all-properties');
    } catch (error) {
      setError('Error creating property, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Property</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        name="title"
        placeholder="Title"
        value={propertyData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={propertyData.description}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={propertyData.price}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={propertyData.location}
        onChange={handleChange}
        required
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={propertyData.imageUrl}
        onChange={handleChange}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default AddPropertyForm;
