import React, { useState } from 'react';
import api from '/src/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

const ParkingSlotForm = () => {
    const [slotNumber, setSlotNumber] = useState('');
    const [price, setPrice] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [status, setStatus] = useState('');
    const { parkingId } = useParams(); // Retrieve parkingId from URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!parkingId) {
            console.log("pk: ");
            console.log({parkingId});
            toast.error({parkingId},'Parking ID is missing');
            return;
        }

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
                navigate('/home'); // Navigate to home or relevant page
            } else {
                toast.error('Unexpected response status');
                console.error('Response status:', response.status);
            }
        } catch (error) {
            toast.error('Error adding parking slot');
            console.error('Error:', error.response ? error.response.data : error.message); // Enhanced error logging
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Parking Slot</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="slotNumber" className="block text-sm font-medium text-gray-700">Slot Number</label>
                        <input
                            type="text"
                            id="slotNumber"
                            value={slotNumber}
                            onChange={(e) => setSlotNumber(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                        <select
                            id="vehicleType"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="TWO_WHEELER">Two-Wheeler</option>
                            <option value="FOUR_WHEELER">Four-Wheeler</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">Select Status</option>
                            <option value="AVAILABLE">Available</option>
                            <option value="NOT_AVAILABLE">Not Available</option>
                        </select>
                    </div>

                    <div>
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
    );
};

export default ParkingSlotForm;


