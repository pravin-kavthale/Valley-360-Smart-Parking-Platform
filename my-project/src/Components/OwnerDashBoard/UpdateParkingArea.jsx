import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateParkingArea = () => {
  const { id } = useParams(); // Get the parking area ID from the URL
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [status, setStatus] = useState('ACTIVE'); // Default status

  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          toast.error('Error getting location: ' + error.message);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    // Fetch parking area details by ID
    const fetchParkingArea = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/parkingArea/${id}`);
        const { data } = response;
        setArea(data.area);
        setCity(data.city);
        setPincode(data.pincode);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setStatus(data.status);
      } catch (error) {
        toast.error('Error fetching parking area details');
        console.error(error);
      }
    };

    fetchParkingArea();
  }, [id]);

  const handleUpdateParkingArea = async (e) => {
    e.preventDefault();
    const owner = JSON.parse(sessionStorage.getItem('user'));

    if (!owner || !owner.id) {
      toast.error('Owner not found in session. Please log in again.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/parkingArea/update/${id}`, {
        area,
        city,
        pincode,
        latitude,
        longitude,
        status,
        ownerId: owner.id // Send owner ID if needed
      });

      if (response.status === 200) {
        toast.success('Parking area updated successfully!');
        navigate('/dashboard'); // Navigate to dashboard or relevant page
      }
    } catch (error) {
      toast.error('Error updating parking area');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold mb-8 text-center">Update Parking Area</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleUpdateParkingArea}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Area:</label>
              <input 
                type="text" 
                value={area} 
                onChange={(e) => setArea(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">City:</label>
              <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Pincode:</label>
              <input 
                type="text" 
                value={pincode} 
                onChange={(e) => setPincode(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Latitude:</label>
              <input 
                type="text" 
                value={latitude} 
                onChange={(e) => setLatitude(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Longitude:</label>
              <input 
                type="text" 
                value={longitude} 
                onChange={(e) => setLongitude(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Status:</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Update Parking Area
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateParkingArea;
