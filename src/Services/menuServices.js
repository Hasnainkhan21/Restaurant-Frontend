// src/Services/menuService.js
import axios from 'axios';
import { API } from './authService';


export const fetchMenuItems = async () => {
  try {
    const res = await axios.get(`${API}/getAllMenuItems`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
