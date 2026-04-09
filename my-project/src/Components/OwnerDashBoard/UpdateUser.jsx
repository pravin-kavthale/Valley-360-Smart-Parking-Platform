import api from '/src/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUserPage = () => {
  const { email } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    // Retrieve the user object from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`http://localhost:8080/User/updateUser/${user.email}`, {
        firstName,
        lastName,
        contact,
        address,
      });
      toast.success('User details updated successfully!');
    } catch (error) {
      toast.error('Error updating user details');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center px-4 py-8">
      <ToastContainer position="top-center" />
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 text-white flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-3xl font-bold">Update User Details</h1>
          <p className="mt-3 text-sm sm:text-base text-white/90">Keep your profile information up to date</p>
        </div>
        <div className="w-full md:w-1/2 p-6">
        <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">First Name:</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
            
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Last Name:</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Contact:</label>
              <input 
                type="tel" 
                value={contact} 
                onChange={(e) => setContact(e.target.value)} 
            
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Address:</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
            
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md py-2 hover:scale-105 hover:shadow-md transition"
            >
              Update
            </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPage;

