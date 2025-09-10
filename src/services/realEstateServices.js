const API_URL = 'http://localhost:5000/api/properties';

export const createProperty = async (propertyData) => {
  const token = localStorage.getItem('token');

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to create property');
  }

  return await res.json();
};

export const getAllProperties = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }

  return await res.json();
};



export const getPropertyById = async (id) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }

  return await res.json();
};


export const updateProperty = async (id,propertyData) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Failed to create property');
  }

  return await res.json();
};

// getPropertyById


// export const getPropertyById = async (id) => {
//     const token = localStorage.getItem('token');

// const res = await fetch(`${API_URL}/${id}`,{
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// if (!res.ok){
//     throw new Error('Failed to fetch property')
// }
// return await res.json();
// });
// }