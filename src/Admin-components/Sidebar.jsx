import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5 space-y-4">
      <h2 className="text-2xl font-bold text-orange-400">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/admin/dashboard" className="hover:text-orange-300">Dashboard</Link>
        <Link to="/admin/menu" className="hover:text-orange-300">Menu Management</Link>
        <Link to="/admin/orders" className="hover:text-orange-300">Orders</Link>

        <Link to="/admin/inventory" className="hover:text-orange-300">Inventory</Link>
        <Link to="/admin/staff" className="hover:text-orange-300">Staff</Link>
        <Link to="/admin/staff-registration" className="hover:text-orange-300">Staff Registration</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
