import React from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleLogin = () => {
    login();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0A192F] p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        <button
          onClick={handleLogin}
          className="w-full bg-[#0ef] text-black font-semibold py-2 px-4 rounded hover:bg-[#08c] transition-colors"
        >
          Login
        </button>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal; 