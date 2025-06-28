import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (firstName, lastName, email, password) => {
  return api.post('register/', { first_name: firstName, last_name: lastName, email, password });
};

export const loginUser = async (email, password) => {
  return api.post('login/', { email, password });
};

export const getProperties = async () => {
  return api.get('properties/');
};

export const getPropertyById = async (id) => {
  return api.get(`properties/${id}/`);
};

export const createProperty = async (propertyData) => {
  return api.post('properties/', propertyData);
};

export const updateProperty = async (id, propertyData) => {
  return api.put(`properties/${id}/`, propertyData);
};

export const deleteProperty = async (id) => {
  return api.delete(`properties/${id}/`);
};

export const sendContactMessage = async (data) => {
  return api.post('contact-messages/', data);
};

export const getUserProperties = async (userId) => {
  return api.get(`properties/?owner=${userId}`);
};

export default api; 