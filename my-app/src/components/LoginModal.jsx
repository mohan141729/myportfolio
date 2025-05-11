import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { initiateLogin, verifyAndLogin, loading, error } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [localError, setLocalError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this with the transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    try {
      await initiateLogin(email, password);
      setStep(2);
    } catch (error) {
      setLocalError(error.response?.data?.error || 'Failed to send verification code');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    try {
      await verifyAndLogin(email, verificationCode);
      onClose();
    } catch (error) {
      setLocalError(error.response?.data?.error || 'Failed to verify code');
    }
  };

  const resetForm = () => {
    setStep(1);
    setEmail('');
    setPassword('');
    setVerificationCode('');
    setLocalError('');
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div 
          className={`bg-gray-900 rounded-lg w-full max-w-md transform transition-all duration-300 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>
            
            {step === 1 && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] outline-none transition"
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] outline-none transition"
                    required
                    placeholder="Enter your password"
                  />
                </div>
                {(localError || error) && (
                  <p className="text-red-500 text-sm">{localError || error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0ef] text-black font-semibold py-3 rounded-lg hover:bg-[#08c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerificationSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-[#0ef] focus:ring-1 focus:ring-[#0ef] outline-none transition"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    title="Please enter the 6-digit verification code"
                    placeholder="Enter 6-digit code"
                  />
                </div>
                {(localError || error) && (
                  <p className="text-red-500 text-sm">{localError || error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0ef] text-black font-semibold py-3 rounded-lg hover:bg-[#08c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>
            )}

            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="mt-4 w-full text-gray-400 hover:text-white transition py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 