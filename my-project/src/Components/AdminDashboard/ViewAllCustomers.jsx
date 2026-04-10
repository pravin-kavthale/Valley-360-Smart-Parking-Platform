import React, { useEffect, useState } from 'react';
import api from '/src/api';
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
      const response = await api.get('http://localhost:8080/User/GetAllCustomers'); // Ensure URL matches the backend
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
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 p-6">
      <ToastContainer position="top-center" />
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-7xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">All Customers</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-purple-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
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
                  </tr>
                ))
              ) : (
                <tr className="border-t">
                  <td className="px-4 py-4 text-sm text-gray-700" colSpan="4">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;


