import React, { useEffect, useState } from 'react';
import { fetchMenuItems } from '../Services/menuServices';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
    const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const getItems = async () => {
      const items = await fetchMenuItems();
      setMenuItems(items);
    };
    getItems();
  }, []);

  const handleQuantityChange = (menuItemId, quantity) => {
    const updatedItems = [...orderItems];
    const index = updatedItems.findIndex(item => item.menuItem === menuItemId);

    if (index !== -1) {
      updatedItems[index].quantity = parseFloat(quantity);
    } else {
      updatedItems.push({ menuItem: menuItemId, quantity: parseFloat(quantity) });
    }

    // Remove zero quantity
    const filteredItems = updatedItems.filter(item => item.quantity > 0);
    setOrderItems(filteredItems);
  };

  const handleSubmit = async () => {
    if (!tableNumber || orderItems.length === 0) {
      alert("Please enter table number and at least one item");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3002/api/v0/orders/placeOrder",
        {
          items: orderItems,
          tableNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 Send token
          },
        }
      );

      alert("Order Placed Successfully");
      setOrderItems([]);
      setTableNumber('');
        navigate('/order');
    } catch (err) {
      console.error("Order Failed:", err.response?.data || err.message);
      alert("Order Failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">🛒 Place Your Order</h2>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map(item => (
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
