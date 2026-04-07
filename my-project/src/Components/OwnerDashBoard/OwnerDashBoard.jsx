import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarOwner from './NavbarOwner';
import { useNavigate } from 'react-router-dom';


const OwnerDashboard = () => {
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [owner, setOwner] = useState(null);
  const [showPreviousBookings, setShowPreviousBookings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the owner object from sessionStorage

    console.log(sessionStorage.getItem('user'));
    const storedOwner = sessionStorage.getItem('user');
    
    
    if (storedOwner) {
      const parsedOwner = JSON.parse(storedOwner);
      console.log("Owner from session:", parsedOwner);
      setOwner(parsedOwner);
      fetchTodaysBookings(parsedOwner.id);
    }
  }, []);

  const fetchTodaysBookings = async (ownerId) => {
    try {
      const response = await axios.get(`http://localhost:8080/booking/today/${ownerId}`);
      setTodaysBookings(response.data);
    } catch (error) {
      toast.error('Error fetching today\'s bookings');
      console.error('Error fetching today\'s bookings:', error);
    }
  };

  const fetchPreviousBookings = async (ownerId) => {
    try {
      const response = await axios.get(`http://localhost:8080/booking/previous/${ownerId}`);
      setPreviousBookings(response.data);
    } catch (error) {
      toast.error('Error fetching previous bookings');
      console.error('Error fetching previous bookings:', error);
    }
  };

  // const handleViewPreviousBookings = () => {
  //   navigate('/previousBookings'); // Navigate to the previous bookings page
  // };
  const handleViewPreviousBookings = () => {
    setShowPreviousBookings(!showPreviousBookings); // Toggle previous bookings view
    if (!showPreviousBookings && owner) {
      fetchPreviousBookings(owner.id); // Fetch previous bookings if not already shown
    }
  };

  return (
    <div>
      <NavbarOwner />
      <div className="min-h-screen bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white p-6">
        <ToastContainer position="top-center" />
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">Owner Dashboard</h1>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Today's Bookings</h2>
            {todaysBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todaysBookings.map((booking) => (
                  <div key={booking.id} className="bg-white text-black rounded-lg p-4 shadow-md">
                    <p>Booking ID: {booking.id}</p>
                    <p>Booking Time: {booking.bookingDate}</p>  
                    <p>Departure Date: {booking.depatureDate}</p>
                    <p>Vehicle No: {booking.vehicleNo}</p>
                    <p>Vehicle Type: {booking.vehicleType}</p>
                    <p>Status: {booking.status}</p>
                    <p>Parking Hours: {booking.parkingHours}</p>
                    <p>Price: {booking.price}</p>
                    <p>Parking Slot ID: {booking.parking_slot_id}</p>
                    <p>User ID: {booking.customer_id}</p>
                    
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white">No bookings found for today.</p>
            )}
          </div>

          <button
            className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition"
            onClick={handleViewPreviousBookings}
          >
            View Previous Bookings
          </button>

          {showPreviousBookings && (
            <div>
              <h2 className="text-3xl font-semibold mb-4">Previous Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {previousBookings.length > 0 ? (
                  previousBookings.map((booking) => (
                    <div key={booking.id} className="bg-white text-black rounded-lg p-4 shadow-md">
                    <p>Booking ID: {booking.id}</p>
                    <p>Booking Time: {booking.bookingDate}</p>  
                    <p>Departure Date: {booking.depatureDate}</p>
                    <p>Vehicle No: {booking.vehicleNo}</p>
                    <p>Vehicle Type: {booking.vehicleType}</p>
                    <p>Status: {booking.status}</p>
                    <p>Parking Hours: {booking.parkingHours}</p>
                    <p>Price: {booking.price}</p>
                    <p>Parking Slot ID: {booking.parking_slot_id}</p>
                    <p>User ID: {booking.customer_id}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No previous bookings found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;