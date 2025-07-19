// Services/orderService.js
import axios from 'axios';

const API_URL = 'http://localhost:3002/api/v0/orders';

const getToken = () => localStorage.getItem('token');

export const fetchAllOrders = async () => {
  return axios.get(`${API_URL}/allOrders`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const updateOrderStatus = async (id, status) => {
  return axios.put(`${API_URL}/updateOrder/${id}`, { status }, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const deleteOrder = async (id) => {
  return axios.delete(`${API_URL}/deleteOrder/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const placeOrder = async (orderData, token) => {
  const res = await axios.post(`${API_URL}/placeOrder`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};