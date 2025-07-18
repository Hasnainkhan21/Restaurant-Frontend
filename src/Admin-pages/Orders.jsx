import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io("http://localhost:3002"); // ✅ Move outside component to avoid reconnecting

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Real-time update listener
  useEffect(() => {
    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => socket.off("orderStatusUpdated"); // ✅ Clean up socket event
  }, []);

  // Fetch orders from server
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3002/api/v0/orders/allOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle order status change
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3002/api/v0/orders/updateOrder/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // ❌ No need to call fetchOrders again if Socket.io is working
    } catch (err) {
      console.error("Status update failed", err);
    }
  };
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this order?")) return;
  try {
    await axios.delete(`http://localhost:3002/api/v0/orders/deleteOrder/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(prev => prev.filter(order => order._id !== id)); // Remove from UI
  } catch (err) {
    console.error("Error deleting order", err);
  }
};


  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6"> Orders</h2>

        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="bg-white shadow-md rounded p-4 mb-5">
  <div className="flex justify-between items-center mb-2">
    <h3 className="font-semibold">Table: {order.tableNumber}</h3>
    <select
      value={order.status}
      onChange={(e) => handleStatusChange(order._id, e.target.value)}
      className="border px-2 py-1 rounded"
    >
      <option value="Pending">Pending</option>
      <option value="Preparing">Preparing</option>
      <option value="Ready">Ready</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </div>

  {/* Order Items */}
  {Array.isArray(order.items) && order.items.length > 0 ? (
    <ul className="pl-5 list-disc text-sm text-gray-700">
      {order.items.map((item, index) => (
        <li key={index}>
          {item.menuItem?.name || 'Unnamed Item'} — Qty: {item.quantity}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-sm text-gray-500">No items in this order.</p>
  )}

  <p className="text-xs text-gray-500 mt-2">
    Time: {new Date(order.createdAt).toLocaleString()}
  </p>

  {/* ✅ Delete Button */}
  <button
    onClick={() => handleDelete(order._id)}
    className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
  >
    Delete Order
  </button>
</div>

          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
