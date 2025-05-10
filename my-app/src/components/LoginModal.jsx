import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { initiateLogin, verifyAndLogin, loading, error } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [localError, setLocalError] = useState('');

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            {(localError || error) && (
              <p className="text-red-500 mb-4">{localError || error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0ef] text-black font-semibold py-2 rounded hover:bg-[#08c] transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerificationSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
                maxLength={6}
                pattern="[0-9]{6}"
                title="Please enter the 6-digit verification code"
              />
            </div>
            {(localError || error) && (
              <p className="text-red-500 mb-4">{localError || error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0ef] text-black font-semibold py-2 rounded hover:bg-[#08c] transition disabled:opacity-50"
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
          className="mt-4 text-gray-400 hover:text-white transition w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal; 