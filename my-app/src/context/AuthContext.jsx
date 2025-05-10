import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const initiateLogin = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:5000/admin-login', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to initiate login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyAndLogin = async (email, code) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:5000/verify-admin-login', {
        email,
        code
      });
      
      const { token, admin } = response.data;
      localStorage.setItem('adminToken', token);
      setAdminEmail(admin.email);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to verify code');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminEmail('');
  };

  const sendUpdateVerification = async (email) => {
    try {
      if (!email) {
        throw new Error('Email is required');
      }
      
      setLoading(true);
      setError("");
      
      console.log('Making request to send verification code to:', email); // Debug log
      
      const response = await axios.post("http://localhost:5000/send-update-verification", {
        email: email
      });

      console.log('Server response:', response.data); // Debug log

      if (response.data.message) {
        return true;
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError(error.response?.data?.error || "Failed to send verification code. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCredentials = async (email, verificationCode, newEmail, newEmailPassword, newPassword) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('http://localhost:5000/update-admin-credentials', {
        email,
        verificationCode,
        newEmail,
        newEmailPassword,
        newPassword
      });
      
      if (response.data.message) {
        setAdminEmail(newEmail);
        return true;
      }
      return false;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update credentials');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      adminEmail,
      loading,
      error,
      initiateLogin,
      verifyAndLogin,
      logout,
      sendUpdateVerification,
      updateCredentials 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 