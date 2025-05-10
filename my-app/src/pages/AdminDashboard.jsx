import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#081b29] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="bg-[#0A192F] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
          <p className="text-gray-300">
            This is a protected admin area. You can manage your portfolio content here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
