import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParkingSlots = () => {
  const navigate = useNavigate();
  const { parkingId } = useParams(); // Get parkingId from URL
  const [slots, setSlots] = useState([]);
  const [user, setUser] = useState(null); // Initialize user state

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
        const response = await axios.get(`http://localhost:8080/parkingSlots/${parkingId}`);
        setSlots(response.data);
      } catch (error) {
        
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

  const handleBookNow = (Slotid,userid) => {
    navigate(`/Book/${Slotid}/${userid}`); // Navigate to booking page with Slot ID
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6">
      <ToastContainer position="top-center" />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Parking Slots</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.length > 0 ? (
            slots.map((slot, index) => (
              <div key={`${slot.id}-${index}`} className="bg-white text-black rounded-lg p-4 shadow-md">
                <h2 className="text-2xl font-bold">Slot Number: {slot.number}</h2>
                <p>Vehicle Type: {slot.vehicleType}</p>
                <p>Status: {slot.status}</p>
                <p>Price: {slot.price ? `$${slot.price.toFixed(2)}` : 'N/A'}</p>
                <button
                  className="mt-4 bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition"
                  onClick={() => handleBookNow(slot.id, user.id)} // Ensure parkingId is available in the context
                >
                  View Slots
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
