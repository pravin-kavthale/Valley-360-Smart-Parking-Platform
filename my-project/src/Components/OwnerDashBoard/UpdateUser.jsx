import axios from 'axios';
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
      const response = await axios.put(`http://localhost:8080/User/updateUser/${user.email}`, {
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
    <div className="container mx-auto p-8">
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold mb-8 text-center">Update User Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">First Name:</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
            
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Last Name:</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                 
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Contact:</label>
              <input 
                type="tel" 
                value={contact} 
                onChange={(e) => setContact(e.target.value)} 
            
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Address:</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
            
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;