import React, { useEffect, useState } from 'react';
import api from '/src/api';
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
      const response = await api.get('http://localhost:8080/User/GetAllOwners'); // Ensure URL matches the backend
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
      const response=await api.delete(`http://localhost:8080/Admin/Delete/${id}`);
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
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 p-6">
      <ToastContainer position="top-center" />
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-7xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">All Owners</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-purple-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {owners.length > 0 ? (
                owners.map(owner => (
                  <tr key={owner.id} className="border-t hover:bg-purple-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{owner.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{owner.firstName} {owner.lastName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{owner.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{owner.role.roleName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <button
                        onClick={() => handleDelete(owner.id)}
                        className="px-3 py-1 rounded-md text-white text-sm bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-t">
                  <td className="px-4 py-4 text-sm text-gray-700" colSpan="5">No owners found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnersList;


