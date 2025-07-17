import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { fetchMenuItems } from '../Services/menuServices';

const API = 'http://localhost:3002/api/v0';

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: null,
    ingredients: [], // Array of { inventoryId, quantity }
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const isAllowed = user?.role === 'admin' || user?.role === 'chef';

  useEffect(() => {
    fetchMenu();
    fetchInventory();
  }, []);

  const fetchMenu = async () => {
    try {
      const items = await fetchMenuItems(); // Populated ingredients
      setMenuItems(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${API}/inventory/getAllInventoryItems`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = Array.isArray(res.data) ? res.data : res.data.items || [];
      setInventoryItems(items);
    } catch (err) {
      console.error('Error fetching inventory items:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleIngredientChange = (id, quantity) => {
    const updatedIngredients = [...formData.ingredients];
    const index = updatedIngredients.findIndex((ing) => ing.inventoryId === id);
    if (index > -1) {
      updatedIngredients[index].quantity = quantity;
    } else {
      updatedIngredients.push({ inventoryId: id, quantity });
    }
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleIngredientCheck = (id, checked) => {
    const updatedIngredients = [...formData.ingredients];
    if (checked) {
      updatedIngredients.push({ inventoryId: id, quantity: 1 });
    } else {
      const filtered = updatedIngredients.filter((ing) => ing.inventoryId !== id);
      setFormData({ ...formData, ingredients: filtered });
      return;
    }
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAllowed) {
      setMessage('Only admins or chefs can add menu items');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);

    data.append('ingredients', JSON.stringify(formData.ingredients));

    try {
      await axios.post(`${API}/users/addMenuItem`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Menu item added successfully');
      setFormData({
        name: '',
        price: '',
        category: '',
        description: '',
        image: null,
        ingredients: [],
      });
      fetchMenu();
    } catch (err) {
      console.error('Error adding menu item:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Failed to add menu item');
    }
  };

  const handleDelete = async (id) => {
    if (user?.role !== 'admin') {
      setMessage('Only admins can delete menu items');
      return;
    }

    try {
      await axios.delete(`${API}/users/deleteMenuItem/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMenu();
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
  };

  const getIngredientQuantity = (id) => {
    const item = formData.ingredients.find((ing) => ing.inventoryId === id);
    return item?.quantity || '';
  };

  const isIngredientChecked = (id) => {
    return formData.ingredients.some((ing) => ing.inventoryId === id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {message && <Alert severity="info" className="mb-4">{message}</Alert>}
      <h2 className="text-2xl font-bold mb-4">Menu Management</h2>

      {/* Add Menu Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border px-3 py-2 rounded"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="col-span-2 border px-3 py-2 rounded"
        />

        {/* Ingredients with Quantity */}
        <div className="col-span-2">
          <label className="block font-semibold mb-2">Select Ingredients and Quantity:</label>
          <div className="grid grid-cols-2 gap-2">
            {inventoryItems.map(item => (
              <div key={item._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isIngredientChecked(item._id)}
                  onChange={(e) => handleIngredientCheck(item._id, e.target.checked)}
                />
                <span>{item.name} ({item.unit})</span>
                {isIngredientChecked(item._id) && (
                  <input
                      type="number"
                      min="0.1"
                      step="0.1" // 👈 This allows decimals like 0.1, 0.2, etc.
                      className="w-20 border rounded px-2 py-1"
                      placeholder="Qty"
                      value={getIngredientQuantity(item._id)}
                      onChange={(e) => handleIngredientChange(item._id, parseFloat(e.target.value))}
                      required
                    />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Add Menu Item
        </button>
      </form>

      {/* Menu Items List */}
      <div className="grid gap-4">
        {menuItems.map(item => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.category} - Rs. {item.price}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
                {item.ingredients && item.ingredients.length > 0 && (
                  <ul className="text-xs mt-2 text-gray-700">
                    <li className="font-semibold">Ingredients:</li>
                    {item.ingredients.map((ing, i) => (
                      <li key={i}>
                        • {ing?.inventoryId?.name || 'Unknown'} - {ing.quantity} {ing?.inventoryId?.unit}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {item.image && (
                <img
                  src={`http://localhost:3002/uploads/${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              {(user?.role === 'admin' || user?.role === 'chef') && (
          <button onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:underline ml-4"> Delete</button>
)}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManager;
