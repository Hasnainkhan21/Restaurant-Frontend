import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/v0/orders/userOrders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sorted = res.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    const socket = io("http://localhost:3002");
    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders(prev =>
        prev.map(order => order._id === updatedOrder._id ? updatedOrder : order)
      );
    });

    return () => socket.disconnect();
  }, [token]);

  const getStatusStyle = (status) => {
    const statusStyles = {
      Pending: 'bg-yellow-200 text-yellow-800',
      Preparing: 'bg-blue-200 text-blue-800',
      Ready: 'bg-purple-200 text-purple-800',
      Completed: 'bg-green-200 text-green-800',
      Cancelled: 'bg-red-200 text-red-800',
    };
    return statusStyles[status] || 'bg-gray-200 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
        <Navbar />
        <p className="text-lg">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-14 px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">My Orders 🍽️</h1>

        {orders.length === 0 ? (
          <div className="text-center bg-gray-800 p-6 rounded-md">
            <p className="text-xl mb-2">No orders yet</p>
            <p className="text-gray-400">Visit our menu and place your first order!</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-gray-800 rounded-md p-5 mb-6 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-xl font-semibold">Table: {order.tableNumber}</h2>
                  <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusStyle(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="text-sm mb-3">
                <p className="font-semibold mb-1">Items:</p>
                <ul className="space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-orange-300 font-medium">Qty: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
