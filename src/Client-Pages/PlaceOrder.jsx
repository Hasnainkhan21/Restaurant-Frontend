import React, { useEffect, useState } from 'react';
import { fetchMenuItems } from '../Services/menuServices';
import { placeOrder } from '../Services/orderService';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getItems = async () => {
      try {
        const items = await fetchMenuItems(token);
        setMenuItems(items);
      } catch (err) {
        console.error('Failed to fetch menu items', err);
      }
    };
    getItems();
  }, [token]);

  const handleQuantityChange = (menuItemId, quantity) => {
    const updatedItems = [...orderItems];
    const index = updatedItems.findIndex(item => item.menuItem === menuItemId);

    if (index !== -1) {
      updatedItems[index].quantity = parseFloat(quantity);
    } else {
      updatedItems.push({ menuItem: menuItemId, quantity: parseFloat(quantity) });
    }

    setOrderItems(updatedItems.filter(item => item.quantity > 0));
  };

  const handleSubmit = async () => {
    if (!tableNumber || orderItems.length === 0) {
      setErrorMessage("Please enter table number and at least one item");
      return;
    }

    try {
      await placeOrder({ items: orderItems, tableNumber }, token);
      toast.success("✅ Order Placed Successfully!", {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
      });

      setOrderItems([]);
      setTableNumber('');
      setErrorMessage('');
      setTimeout(() => navigate('/order'), 2000);
    } catch (err) {
      console.error("Order Failed:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || "Failed to place order");
    }
  };

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ToastContainer />

      <div className="max-w-5xl mx-auto py-12 mt-14 px-4">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">🛒 Place Your Order</h2>

        {errorMessage && (
          <Alert severity="error" className="mb-4">{errorMessage}</Alert>
        )}

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Table Number</label>
          <input
            type="text"
            value={tableNumber}
            onChange={e => setTableNumber(e.target.value)}
            className="w-40 px-4 py-2 border rounded shadow-sm"
            placeholder="e.g. 5"
          />
        </div>

        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h3 className="text-xl font-bold text-orange-700 mb-4">{category.toUpperCase()}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map(item => (
                <div key={item._id} className="bg-white p-4 rounded shadow-md flex items-center gap-4">
                  <img
                    src={`http://localhost:3002/uploads/${item.image}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Rs. {item.price}</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Qty"
                    className="w-20 px-2 py-1 border rounded"
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-10">
          <button
            onClick={handleSubmit}
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
