import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomersList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await axios.get('http://localhost:8080/User/GetAllCustomers'); // Ensure URL matches the backend
      console.log(response.data); // Check this in the browser console
      setOwners(response.data);
    } catch (error) {
      toast.error('Error fetching owners');
      console.error('Error fetching owners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-center" />
      <h1 className="text-4xl font-bold mb-6">List of Owners</h1>
      {owners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {owners.map(owner => (
            <div key={owner.id} className="bg-white text-black rounded-lg p-4 shadow-md">
              <p>ID: {owner.id}</p>
              <p>Name: {owner.firstName} {owner.lastName}</p>
              <p>Email: {owner.email}</p>
              <p>Role: {owner.role.roleName}</p> {/* Adjust according to your DTO structure */}
            </div>
          ))}
        </div>
      ) : (
        <p>No owners found.</p>
      )}
    </div>
  );
};

export default CustomersList;
