import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import {
  fetchLowStockItems,
  fetchInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from '../Services/inventory';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    threshold: ''
  });
  const [message, setMessage] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAllowed = user?.role === 'admin' || user?.role === 'inventory';

  useEffect(() => {
    if (isAllowed) {
      fetchInventory();
      fetchLowStock();
    }
  }, [isAllowed]);

  const fetchInventory = async () => {
    try {
      const data = await fetchInventoryItems();
      setItems(data);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setItems([]);
    }
  };

  const fetchLowStock = async () => {
    try {
      const data = await fetchLowStockItems();
      setLowStockItems(data);
    } catch (err) {
      console.error('Error fetching low stock items:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAllowed) {
      setMessage('Only admin or inventory staff can add items');
      return;
    }

    try {
      if (editItemId) {
        await updateInventoryItem(editItemId, formData);
        setMessage('Item updated successfully');
      } else {
        await addInventoryItem(formData);
        setMessage('Item added successfully');
      }

      setFormData({ name: '', quantity: '', unit: '', threshold: '' });
      setEditItemId(null);
      fetchInventory();
      fetchLowStock(); // Refresh low stock list
    } catch (err) {
      console.error('Error:', err);
      setMessage(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInventoryItem(id);
      setMessage('Item deleted successfully');
      fetchInventory();
      fetchLowStock(); // Refresh low stock list
    } catch (err) {
      setMessage(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEditClick = (item) => {
    setFormData({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      threshold: item.threshold
    });
    setEditItemId(item._id);
    setMessage('');
  };

  if (!isAllowed) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded text-center">
        <Alert severity="error">Access Denied: Only admin or inventory staff allowed</Alert>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {message && <Alert severity="info" className="mb-4">{message}</Alert>}

      {lowStockItems.length > 0 && (
        <Stack spacing={2} className="mb-4">
          <Alert severity="warning">
            ⚠️ Low Stock Alert:{" "}
            {lowStockItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}
          </Alert>
        </Stack>
      )}

      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>

      {/* Inventory Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name (e.g. Oil, Tomato)"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="border px-3 py-2 rounded"
        />
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        >
          <option value="">Select Unit</option>
          <option value="kg">kg</option>
          <option value="liters">liters</option>
          <option value="pieces">pieces</option>
        </select>
        <input
          type="number"
          name="threshold"
          value={formData.threshold}
          onChange={handleChange}
          placeholder="Low Stock Threshold"
          required
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="col-span-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          {editItemId ? 'Update Inventory' : 'Add Inventory'}
        </button>
      </form>

      {/* Inventory List */}
      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className={`p-4 rounded shadow flex justify-between items-center ${
              item.quantity <= item.threshold ? 'bg-red-100' : 'bg-white'
            }`}
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-700">
                Quantity: {typeof item.quantity === 'number' ? item.quantity.toFixed(1) : item.quantity} {item.unit} | Threshold: {item.threshold}
              </p>
            </div>
            {user.role === 'admin' && (
              <div className="space-x-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
