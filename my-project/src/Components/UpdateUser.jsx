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
  const [user, setUser] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    contact: '',
  });

  // Fetch the existing user details to pre-fill the form
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFirstName(parsedUser.firstName || '');
      setLastName(parsedUser.lastName || '');
      setContact(parsedUser.contact || '');
      setAddress(parsedUser.address || '');
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    const contactRegex = /^\d{10}$/;

    if (firstName === lastName) {
      errors.firstName = 'First name and last name must not be the same.';
    }

    if (!contactRegex.test(contact)) {
      errors.contact = 'Contact number must be exactly 10 digits.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
                required
                className={`mt-1 p-2 border border-gray-300 rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Last Name:</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required
                className={`mt-1 p-2 border border-gray-300 rounded-md ${errors.firstName ? 'border-red-500' : ''}`} // Use same class for border if error present
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Contact:</label>
              <input 
                type="tel" 
                value={contact} 
                onChange={(e) => setContact(e.target.value)} 
                required
                className={`mt-1 p-2 border border-gray-300 rounded-md ${errors.contact ? 'border-red-500' : ''}`}
              />
              {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700">Address:</label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required
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
