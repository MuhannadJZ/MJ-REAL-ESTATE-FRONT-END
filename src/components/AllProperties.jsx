import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../services/realEstateServices';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AllProperties.css';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  const deleteproperties = async (id) => {
    try {
      console.log("IN delete")
      const deletedValue = await axios.delete(`http://localhost:5000/api/properties/${id}`)
      console.log(deletedValue)
      setProperties((prev) => prev.filter((properties) => properties._id !== id))
    }
    catch (err) {

      console.log("err")
    }

  }

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>MJ PROPERTIES</h1>
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
            
            <button onClick={() => deleteproperties(property._id)}>Delete</button>
            <Link to={`/properties/${property._id}/edit`}>   Edit Property</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;

