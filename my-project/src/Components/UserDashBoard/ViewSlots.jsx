import React, { useEffect, useState } from 'react';
import api from '/src/api';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParkingSlots = () => {
  const navigate = useNavigate();
  const { parkingId } = useParams(); // Get parkingId from URL
  const [slots, setSlots] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user object from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
          toast.error('User is not authenticated. Please log in.');
          return;
        }
        const response = await api.get(`http://localhost:8080/parkingSlots/${parkingId}`);
        setSlots(response.data);
      } catch (error) {
        toast.error('Error fetching parking slots');
        console.error('Error fetching parking slots:', error);
      }
    };

    if (parkingId) {
      fetchSlots();
    }
  }, [parkingId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleBookNow = (slotId, userId) => {
    navigate(`/Book/${slotId}`); // Navigate to booking page with Slot ID
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 p-6">
      <ToastContainer position="top-center" />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Parking Slots</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <div key={slot.id} className="bg-white text-black rounded-xl p-4 shadow-lg">
                <h2 className="text-2xl font-bold">Slot Number: {slot.number}</h2>
                <p>Vehicle Type: {slot.vehicleType}</p>
                <p>Status: {slot.status}</p>
                <p>Price: {slot.price ? `$${slot.price.toFixed(2)}` : 'N/A'}</p>
                <button
                  className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md py-2 hover:scale-105 hover:shadow-md transition"
                  onClick={() => handleBookNow(slot.id, user.id)}
                >
                  Book Slots
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">No slots available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkingSlots;


