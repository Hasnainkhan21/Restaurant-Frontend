// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchDashboardSummary } from '../Services/analyticsService';
import InventoryDashboard from '../Admin-components/InventoryDashboard';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getSummary = async () => {
      try {
        const data = await fetchDashboardSummary(token);
        setSummary(data);
      } catch (err) {
        console.error("Error loading dashboard summary");
      }
    };

    getSummary();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Total Orders" value={summary?.totalOrders} color="bg-blue-600" />
        <Card title="Total Sales" value={`Rs. ${Number(summary?.totalSales || 0).toFixed(2)}`} color="bg-green-600" />
        <Card title="Menu Items" value={summary?.totalMenuItems} color="bg-yellow-600" />
        <Card title="Total Customers" value={summary?.totalUsers} color="bg-purple-600" />
      </div>

      <InventoryDashboard />
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-6 rounded-lg shadow-lg ${color} text-white`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl mt-2 font-bold">{value ?? "..."}</p>
  </div>
);

export default Dashboard;
