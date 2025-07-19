import axios from 'axios';

const API = 'http://localhost:3002/api/v0';
const token = localStorage.getItem('token');

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const fetchInventoryItems = async () => {
  const res = await axios.get(`${API}/inventory/getAllInventoryItems`, config);
  return Array.isArray(res.data) ? res.data : res.data.items || [];
};

export const addInventoryItem = async (formData) => {
  return await axios.post(`${API}/inventory/addInventoryItem`, formData, config);
};

export const updateInventoryItem = async (id, formData) => {
  return await axios.put(`${API}/inventory/updateInventoryItem/${id}`, formData, config);
};

export const deleteInventoryItem = async (id) => {
  return await axios.delete(`${API}/inventory/deleteInventoryItem/${id}`, config);
};

export const fetchLowStockItems = async () => {
  const res = await axios.get(`${API}/inventory/low-stockItems`, config);
  return res.data;
};