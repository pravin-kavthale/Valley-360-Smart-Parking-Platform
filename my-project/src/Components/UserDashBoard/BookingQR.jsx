import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const BookingQR = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking?.qrToken) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl text-center">
          <h2 className="text-2xl font-bold text-gray-800">Booking QR not available</h2>
          <p className="mt-3 text-gray-600">Please complete a booking first to generate a valid QR code.</p>
          <button
            onClick={() => navigate('/UserDashBoard')}
            className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md py-2 px-6 hover:scale-105 hover:shadow-md transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800">Booking QR</h1>
        <p className="mt-2 text-sm text-gray-600">Show this code at entry for booking validation.</p>

        <div className="mt-6 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="rounded-lg border border-gray-200 p-4 bg-white">
            <QRCodeSVG value={booking.qrToken} size={220} includeMargin />
          </div>

          <div className="space-y-3 text-gray-700 w-full">
            <p><span className="font-semibold">Booking ID:</span> {booking.id || 'N/A'}</p>
            <p><span className="font-semibold">Parking Area:</span> {booking.parkingAreaName || 'N/A'}</p>
            <p><span className="font-semibold">Slot Number:</span> {booking.slotNumber || booking.parking_slot_id || 'N/A'}</p>
            <p><span className="font-semibold">Start Time:</span> {booking.arrivalDate || 'N/A'}</p>
            <p><span className="font-semibold">End Time:</span> {booking.departureDate || 'N/A'}</p>
            <p><span className="font-semibold">Status:</span> {booking.status || 'ACTIVE'}</p>
            <p className="break-all"><span className="font-semibold">QR Token:</span> {booking.qrToken}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate('/UserDashBoard')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md py-2 px-6 hover:scale-105 hover:shadow-md transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingQR;
