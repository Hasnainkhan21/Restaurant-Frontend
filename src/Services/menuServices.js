// Services/menuServices.js
import axios from 'axios';

// ✅ Centralized API base
const BASE_URL = 'http://localhost:3002/api/v0';
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getMultipartHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

// ✅ Get all menu items
export const fetchMenuItems = async (token) => {
  const res = await axios.get(`${BASE_URL}/users/getAllMenuItems`, getAuthHeaders(token));
  return res.data;
};

// ✅ Add new menu item (with image and ingredients)
export const addMenuItem = async (formData, token) => {
  const res = await axios.post(`${BASE_URL}/users/addMenuItem`, formData, getMultipartHeaders(token));
  return res.data;
};

// ✅ Update menu item (with or without image)
export const updateMenuItem = async (id, formData, token) => {
  const res = await axios.put(`${BASE_URL}/users/updateMenuItem/${id}`, formData, getMultipartHeaders(token));
  return res.data;
};

// ✅ Delete menu item
export const deleteMenuItem = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/users/deleteMenuItem/${id}`, getAuthHeaders(token));
  return res.data;
};
