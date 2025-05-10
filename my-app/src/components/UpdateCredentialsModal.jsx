import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UpdateCredentialsModal = ({ isOpen, onClose }) => {
  const { sendUpdateVerification, updateCredentials, loading, error, adminEmail } = useAuth();
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEmailPassword, setNewEmailPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  if (!isOpen) return null;

  const handleInitiateUpdate = async (e) => {
    e.preventDefault();
    setLocalError('');
    try {
      if (!adminEmail) {
        setLocalError('No admin email found. Please log in again.');
        return;
      }
      console.log('Sending verification code to:', adminEmail); // Debug log
      await sendUpdateVerification(adminEmail);
      setStep(2);
    } catch (error) {
      console.error('Error in handleInitiateUpdate:', error);
      setLocalError(error.response?.data?.error || 'Failed to send verification code. Please try again.');
    }
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      const success = await updateCredentials(
        adminEmail,
        verificationCode,
        newEmail,
        newEmailPassword,
        newPassword
      );
      
      if (success) {
        onClose();
      }
    } catch (error) {
      setLocalError(error.response?.data?.error || 'Failed to update credentials');
    }
  };

  const resetForm = () => {
    setStep(1);
    setVerificationCode('');
    setNewEmail('');
    setNewEmailPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLocalError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Update Admin Credentials</h2>

        {step === 1 && (
          <div>
            <p className="text-gray-300 mb-4">
              You are about to update your admin account credentials. A verification code will be sent to your current email address.
            </p>
            <form onSubmit={handleInitiateUpdate}>
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
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleUpdateCredentials}>
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
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">New Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">New Email App Password</label>
              <input
                type="password"
                value={newEmailPassword}
                onChange={(e) => setNewEmailPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Updating...' : 'Update Credentials'}
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

export default UpdateCredentialsModal; 