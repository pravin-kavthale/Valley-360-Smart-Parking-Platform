import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllParkingSlots = () => {
    const [parkingSlots, setParkingSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParkingSlots = async () => {
            try {
                const response = await axios.get('http://localhost:8080/parkingSlots/GetAllParkingSlots');
                setParkingSlots(response.data);
            } catch (error) {
                setError('Error fetching parking slots');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchParkingSlots();
    }, []);

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-slate-500 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Parking Slots</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(parkingSlots) && parkingSlots.length > 0 ? (
                    parkingSlots.map(slot => (
                        <div key={slot.id} className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-2">Slot ID: {slot.id}</h2>
                            
                            <p className="text-gray-700">Vehicle Type: {slot.vehicleType}</p>
                            <p className="text-gray-700">Parking Area ID: {slot.parkingId}</p>
                            <p className="text-gray-700">Price: ₹{slot.price}</p>
                            <p className={`text-sm font-medium ${slot.status === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'}`}>
                                Status: {slot.status}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-600">No parking slots available</div>
                )}
            </div>
        </div>
    );
};

export default ViewAllParkingSlots;
