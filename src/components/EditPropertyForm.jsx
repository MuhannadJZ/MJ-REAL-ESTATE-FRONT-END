import React, { useEffect, useState } from 'react';
import { getPropertyById, updateProperty } from '../services/realEstateServices';
import { useParams, useNavigate } from 'react-router-dom';

const EditPropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setPropertyData({
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          imageUrl: data.imageUrl || '',
        });
      } catch {
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await updateProperty(id, propertyData);
      navigate('/');
    } catch {
      setError('Error updating property, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading property details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit Property</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" value={propertyData.title} onChange={handleChange} required />
        
        <label>Description</label>
        <textarea name="description" value={propertyData.description} onChange={handleChange} required />
        
        <label>Price</label>
        <input type="number" name="price" value={propertyData.price} onChange={handleChange} required />
        
        <label>Location</label>
        <input type="text" name="location" value={propertyData.location} onChange={handleChange} required />
        
        <label>Image URL</label>
        <input type="text" name="imageUrl" value={propertyData.imageUrl} onChange={handleChange} />
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Property'}
        </button>
      </form>
    </div>
  );
};

export default EditPropertyForm;
