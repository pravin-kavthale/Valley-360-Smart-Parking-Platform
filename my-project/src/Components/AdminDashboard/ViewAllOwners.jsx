import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const OwnersList = () => {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await axios.get('http://localhost:8080/User/GetAllOwners'); // Ensure URL matches the backend
      setOwners(response.data);
    } catch (error) {
      toast.error('Error fetching owners');
      console.error('Error fetching owners:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log({id})
      const response=await axios.delete(`http://localhost:8080/Admin/Delete/${id}`);
      toast.success('User deleted successfully');
      // Refresh the list after deletion
      fetchOwners();
    } catch (error) {
      toast.error('Error deleting user');
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
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
              <button
                onClick={() => handleDelete(owner.id)}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No owners found.</p>
      )}
    </div>
  );
};

export default OwnersList;
