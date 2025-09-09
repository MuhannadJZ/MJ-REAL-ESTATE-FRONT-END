import React, { useEffect, useState } from 'react';
import { getAllProperties, deleteProperty } from '../services/realEstateServices';
import { useNavigate } from 'react-router-dom';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (err) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`); // Assuming you have a route to edit
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((property) => property._id !== id));
    } catch (err) {
      alert('Failed to delete property.');
      console.error(err);
    }
  };

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>All Properties</h2>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Location: {property.location}</p>
            {property.createdBy && (
              <p>
                Created by: {property.createdBy.name} ({property.createdBy.role})
              </p>
            )}
            {property.imageUrl && <img src={property.imageUrl} alt={property.title} width="200" />}
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => handleEdit(property._id)} style={{ marginRight: '0.5rem' }}>
                Edit
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                style={{ background: 'red', color: 'white' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
