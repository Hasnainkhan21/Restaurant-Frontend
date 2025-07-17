import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with fixed width and fixed position */}
      <div className="w-64 flex-shrink-0 h-screen fixed left-0 top-0 bg-white z-20 shadow-lg">
        <Sidebar />
      </div>
      {/* Main content with left margin to accommodate fixed sidebar, scrolls independently */}
      <main className="flex-1 p-6 bg-slate-100 ml-64 min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
