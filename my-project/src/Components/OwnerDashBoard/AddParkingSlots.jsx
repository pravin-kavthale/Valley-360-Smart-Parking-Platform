import React, { useState } from 'react';
import api from '/src/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // This should be at the top with other imports
import { useNavigate, useParams } from 'react-router-dom';

function ParkingSlotForm(){
    const [slotNumber, setSlotNumber] = useState('');
    const [price, setPrice] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [status, setStatus] = useState('');
    const { parkingId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('http://localhost:8080/parkingSlots/Add', {
              slotNumber,
              price,
              vehicleType,
              status,
              parkingId
            });
      
            if (response.status === 200) {
              toast.success('Parking slot added successfully');
              navigate('/home'); // Use navigate for redirecting
            }
          }catch (error) {
            toast.error('There was an error adding the parking slot!');
          }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 text-white flex flex-col justify-center items-center text-center p-6">
                <h2 className="text-3xl font-bold">Add Parking Slot</h2>
                <p className="mt-3 text-sm sm:text-base text-white/90">Create and configure parking slots quickly</p>
            </div>
            <div className="w-full md:w-1/2 p-6">
           <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="slotNumber" className="block text-sm text-gray-600">
                            Slot Number
                        </label>
                        <input
                            type="text"
                            id="slotNumber"
                            value={slotNumber}
                            onChange={(e) => setSlotNumber(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm text-gray-600">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="vehicleType" className="block text-sm text-gray-600">
                            Vehicle Type
                        </label>
                        <select
                            id="vehicleType"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="TWO_WHEELER">Two-Wheeler</option>
                            <option value="FOUR_WHEELER">Four-Wheeler</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="status" className="block text-sm text-gray-600">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">Select Status</option>
                            <option value="AVAILABLE">Available</option>
                            <option value="NOT_AVAILABLE">Not Available</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="parkingId" className="block text-sm text-gray-600">
                            Parking ID
                        </label>
                        <input
                            type="number"
                            id="parkingId"
                            value={parkingId}
                            onChange={(e) => setParkingId(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md py-2 hover:scale-105 hover:shadow-md transition"
                        >
                            Add Parking Slot
                        </button>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </div>
            </div>
        </div>
    );
}

export default ParkingSlotForm;

