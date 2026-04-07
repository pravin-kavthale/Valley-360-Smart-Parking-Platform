import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ParkingSlotForm = () => {
    const [slotNumber, setSlotNumber] = useState('');
    const [price, setPrice] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [status, setStatus] = useState('');
    const [slotNumberError, setSlotNumberError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [vehicleTypeError, setVehicleTypeError] = useState('');
    const [statusError, setStatusError] = useState('');

    const navigate = useNavigate();
    
    // Retrieve parking area ID from session storage
    const parkingArea = JSON.parse(sessionStorage.getItem('parkingArea'));
    const parkingId = parkingArea?.id;

    const validateForm = () => {
        let isValid = true;
        
        if (!slotNumber.trim()) {
            setSlotNumberError('Slot Number is required.');
            isValid = false;
        } else {
            setSlotNumberError('');
        }

        if (!price || price <= 0) {
            setPriceError('Price must be a positive number.');
            isValid = false;
        } else {
            setPriceError('');
        }

        if (!vehicleType) {
            setVehicleTypeError('Vehicle Type is required.');
            isValid = false;
        } else {
            setVehicleTypeError('');
        }

        if (!status) {
            setStatusError('Status is required.');
            isValid = false;
        } else {
            setStatusError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!validateForm()) return;

        if (!parkingId) {
            toast.error('Parking ID is missing in session storage.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/parkingSlots/Add', {
                slotNumber,
                price,
                vehicleType,
                status,
                parkingId: Number(parkingId), // Convert parkingId to number if needed
            });

            if (response.status === 200) {
                toast.success('Parking slot added successfully');
                navigate('/OwnerDashBoard'); // Navigate to home or relevant page
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
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-emerald-300 to-purple-700 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${slotNumberError ? 'border-red-500' : ''}`}
                        />
                        {slotNumberError && <p className="text-red-500 text-sm mt-1">{slotNumberError}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${priceError ? 'border-red-500' : ''}`}
                        />
                        {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}
                    </div>

                    <div>
                        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                        <select
                            id="vehicleType"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            required
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${vehicleTypeError ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="TWO_WHEELER">Two-Wheeler</option>
                            <option value="FOUR_WHEELER">Four-Wheeler</option>
                        </select>
                        {vehicleTypeError && <p className="text-red-500 text-sm mt-1">{vehicleTypeError}</p>}
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${statusError ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Status</option>
                            <option value="AVAILABLE">Available</option>
                            <option value="NOT_AVAILABLE">Not Available</option>
                        </select>
                        {statusError && <p className="text-red-500 text-sm mt-1">{statusError}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
