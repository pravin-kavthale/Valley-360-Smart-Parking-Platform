import React, { useState, useEffect } from 'react';
import api from '/src/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddParkingArea = () => {
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [status, setStatus] = useState('AVAILABLE'); // Default status
  const [pincodeError, setPincodeError] = useState(''); // For pincode validation

  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          // Optionally, you can fetch address based on coordinates here
        },
        (error) => {
          toast.error('Error getting location: ' + error.message);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const validatePincode = (pin) => /^\d{6}$/.test(pin);

  const handleAddParkingArea = async (e) => {
    e.preventDefault();

    // Validate pincode
    if (!validatePincode(pincode)) {
      setPincodeError('Pincode must be exactly 6 digits.');
      return;
    } else {
      setPincodeError('');
    }

    const owner = JSON.parse(sessionStorage.getItem('user'));
    const ownerId = owner?.id;
    if (!owner || !ownerId) {
      toast.error('Owner not found in session. Please log in again.');
      return;
    }
    const token = sessionStorage.getItem("jwtToken");
    console.log(sessionStorage.getItem("jwtToken"));
    if(!token){
      toast.error('Authentication token not found. Please log in again.');
      return;
    }



    try {
      const response = await api.post('http://localhost:8080/parkingArea/add', {
        area,
        city,
        pincode,
        latitude,
        longitude,
        status,
        ownerId,
        }
      );
      
      if (response.status === 200) {
        
        const parkArea = response.data;
        
        // Store the parking area details in session storage
        sessionStorage.setItem('parkingArea', JSON.stringify(parkArea));

        toast.success('Parking area added successfully!');
        navigate('/AddParkingSlot'); // Navigate to dashboard or relevant page
      }
    } catch (error) {
      toast.error('Error adding parking area');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold mb-8 text-center">Add Parking Area</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleAddParkingArea}>
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
                className={`mt-1 p-2 border border-gray-300 rounded-md ${pincodeError ? 'border-red-500' : ''}`} 
                required
              />
              {pincodeError && <p className="text-red-500 text-sm mt-1">{pincodeError}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Latitude:</label>
              <input 
                type="text" 
                value={latitude} 
                onChange={(e) => setLatitude(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Longitude:</label>
              <input 
                type="text" 
                value={longitude} 
                onChange={(e) => setLongitude(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md" 
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Status:</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="NOT_AVAILABLE">NOT_AVAILABLE</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Parking Area
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParkingArea;


