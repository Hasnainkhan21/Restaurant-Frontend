// src/Admin-components/InventoryDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const InventoryDashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/v0/inventory/getAllInventoryItems", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = res.data.map(item => ({
          name: item.name.length > 10 ? item.name.slice(0, 10) + '…' : item.name,
          quantity: item.quantity,
          unit: item.unit || "unknown",
        }));

        setInventoryData(formatted);
      } catch (err) {
        console.error("Error fetching inventory", err);
      }
    };

    fetchInventoryData();
  }, [token]);

  // Group items by unit
  const groupedByUnit = inventoryData.reduce((acc, item) => {
    const unit = item.unit || "unknown";
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-black max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📦 Inventory Overview</h2>

      {Object.entries(groupedByUnit).map(([unit, items]) => (
        <div key={unit} className="mb-12">
          <h3 className="text-lg font-semibold text-orange-600 mb-4">Items in {unit}</h3>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={items}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toFixed(2)} ${unit}`} />
                <Bar dataKey="quantity" fill="#4F46E5" barSize={40} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryDashboard;
