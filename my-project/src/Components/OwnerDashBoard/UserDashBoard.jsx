import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import NavbarUser from './NavbarUser';

const UserDashboard = () => {
  const [parkingAreas, setParkingAreas] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const navigate = useNavigate();
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
    const fetchParkingAreas = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });

            try {
              const response = await axios.get('http://localhost:8080/parkingArea/nearby', {
                params: {
                  latitude,
                  longitude,
                   // Assuming 3 km radius
                },
              });
              
              setParkingAreas(response.data);
              alert(response)
            } catch (error) {
              toast.error('Error fetching nearby parking areas');
              console.error('Error fetching nearby parking areas:', error);
            }
          },
          (error) => {
            toast.error('Error fetching location');
            console.error('Error fetching location:', error);
          }
        );
      } else {
        toast.error('Geolocation is not supported by this browser');
      }
    };

    fetchParkingAreas();
  }, []);

  const handleBookNow = (id) => {
    navigate(`/ViewSlots/${id}`); // Navigate to booking page with parking ID
  };

  return (
    <div>
      <NavbarUser></NavbarUser>
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6">
      <ToastContainer position="top-center" />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">User Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingAreas.length > 0 ? (
            parkingAreas.map((area) => (
              <div key={area.id} className="bg-white text-black rounded-lg p-4 shadow-md">
                <h2 className="text-2xl font-bold">{area.city}</h2>
                <p>Status: {area.status}</p>
                <p>PinCode: {area.pincode}</p>
                <p>Area: {area.area}</p>
                <p>Distance: {area.distance ? area.distance.toFixed(2) : 'N/A'} km</p>
                <button
                  className="mt-4 bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition"
                  onClick={() => handleBookNow(area.id)}
                >
                  View Slots
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">No parking areas found.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;
