import React, { useState } from 'react';
import api from '/src/api';

const statusClassMap = {
  SUCCESS: 'text-green-600',
  EXPIRED: 'text-amber-600',
  INVALID: 'text-red-600',
};

const ValidateBookingQR = () => {
  const [qrToken, setQrToken] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();

    if (!qrToken.trim()) {
      setResult({ result: 'INVALID', message: 'Please enter a QR token.' });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('http://localhost:8080/booking/validate-qr', {
        qrToken: qrToken.trim(),
      });
      setResult(response.data);
    } catch (error) {
      setResult({ result: 'INVALID', message: 'Validation failed. Please try again.' });
      console.error('QR validation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Validate Booking QR</h1>
        <p className="mt-2 text-sm text-gray-600">Scan or paste a booking QR token and validate it securely.</p>

        <form onSubmit={handleValidate} className="mt-6 space-y-4">
          <label htmlFor="qrToken" className="block text-sm text-gray-600">QR Token</label>
          <input
            id="qrToken"
            type="text"
            value={qrToken}
            onChange={(e) => setQrToken(e.target.value)}
            placeholder="Paste scanned QR token"
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md py-2 px-6 hover:scale-105 hover:shadow-md transition disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? 'Validating...' : 'Validate QR'}
          </button>
        </form>

        {result && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className={`text-lg font-semibold ${statusClassMap[result.result] || 'text-gray-800'}`}>
              {result.result}
            </p>
            <p className="mt-1 text-gray-700">{result.message}</p>
            {result.bookingId && <p className="mt-1 text-sm text-gray-600">Booking ID: {result.bookingId}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateBookingQR;
