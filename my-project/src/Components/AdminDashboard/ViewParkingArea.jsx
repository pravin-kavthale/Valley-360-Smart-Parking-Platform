import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewParkingArea = () => {
  const [parkingAreas, setParkingAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/parkingArea/GetAllParkingArea');
        setParkingAreas(response.data);
      } catch (error) {
        setError('Error fetching parking slots');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingAreas();
  }, []);

  
const handleDelete = async (id) => {
  try {
   const msg= await axios.delete(`http://localhost:8080/Admin/deleteParkignArea/${id}`);
    setParkingAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
  } catch (error) {
    console.error('Error deleting parking area:', error);
  }
};
  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <div className="p-6 bg-slate-500 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Parking Slots</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(parkingAreas) && parkingAreas.length > 0 ? (
            parkingAreas.map((area) => (
              <div key={area.id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Area ID: {area.id}</h2>
                <p className="text-gray-700">Parking area: {area.area}</p>
                <p className="text-gray-700">Parking Area city: {area.city}</p>
                <p className="text-gray-700">Parking Area latitude: {area.latitude}</p>
                <p className="text-gray-700">Parking Area longitude: {area.longitude}</p>
                <p className="text-gray-700">Pincode: {area.pincode}</p>
                <p
                  className={`text-sm font-medium ${
                    area.status === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  Status: {area.status}
                </p>
                <button
                  onClick={() => handleDelete(area.id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No parking slots available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewParkingArea;
