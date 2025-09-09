const API_URL = 'http://localhost:5000/api/realestate';

const getToken = () => localStorage.getItem('token');

export const getAllProperties = async () => {
  const response = await fetch(`${API_URL}`);
  return response.json();
};

export const createProperty = async (propertyData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });
  return response.json();
};

export const updateProperty = async (id, propertyData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });
  return response.json();
};

export const deleteProperty = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
