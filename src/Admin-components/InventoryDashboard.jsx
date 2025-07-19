import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { fetchInventoryItems, fetchLowStockItems } from '../Services/inventory';
import Alert from '@mui/material/Alert';

const InventoryDashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getInventoryData = async () => {
      try {
        // Fetch all inventory
        const allInventory = await fetchInventoryItems(token);
        const formatted = allInventory.map(item => {
          const quantity = Number(item.quantity);
          const threshold = Number(item.threshold ?? 0);

          return {
            name: item.name.length > 10 ? item.name.slice(0, 10) + '…' : item.name,
            quantity,
            threshold,
            unit: item.unit || "unknown",
          };
        });

        setInventoryData(formatted);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    const getLowStockItems = async () => {
      try {
        const lowStock = await fetchLowStockItems(token);
        const formattedLow = lowStock.map(item => ({
          name: item.name.length > 10 ? item.name.slice(0, 10) + '…' : item.name,
          quantity: Number(item.quantity),
          threshold: Number(item.threshold ?? 0),
          unit: item.unit || "unknown",
        }));
        setLowStockItems(formattedLow);
      } catch (error) {
        console.error("Error fetching low stock items:", error);
      }
    };

    getInventoryData();
    getLowStockItems();
  }, [token]);

  const groupedByUnit = inventoryData.reduce((acc, item) => {
    const unit = item.unit;
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-black max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📦 Inventory Overview</h2>

      {/* 🔔 Alert if any low stock */}
      {lowStockItems.length > 0 && (
        <Alert severity="warning" className="mb-6">
                       ⚠️ Low Stock Alert:{" "}{lowStockItems.map(item => `${item.name} (${item.quantity.toFixed(1)} ${item.unit})`
                    ).join(', ')}
                </Alert>
      )}

      {/* 📊 Bar Charts Grouped by Unit */}
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
                  <YAxis domain={[0, (dataMax) => Math.max(100, dataMax)]} />
                <Tooltip formatter={(value, name, props) => {
                    const { payload } = props;
                    return `${Number(value).toFixed(1)} ${payload.unit}`;
                  }} />

                <Bar dataKey="quantity" barSize={50} radius={[6, 6, 0, 0]}>
                  {items.map((entry, index) => {
                    const isLow = lowStockItems.some(low => low.name === entry.name);
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={isLow ? "#EF4444" : "#4F46E5"} // 🔴 Red if in low stock
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryDashboard;
  