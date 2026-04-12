import React, { useEffect, useState } from 'react';
import api from '/src/api';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';
import NavbarUser from './NavbarUser';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userStr = sessionStorage.getItem('user'); // Fetch user from sessionStorage
      console.log('User fetched from sessionStorage:', userStr); // Debugging

      if (userStr) {
        try {
          const user = JSON.parse(userStr); // Parse user data
          const id = user.id; // Extract user ID
          console.log('User ID:', id); // Debugging
          
          const token = sessionStorage.getItem('jwtToken'); // Fetch JWT token
          console.log('JWT Token:', token); // Debugging
          if (!token) {
            toast.error('Authentication token not found. Please log in again.');
            console.log('JWT token was not found in sessionStorage.');
            setLoading(false);
            return;
          }

          if (id) {
            const response = await api.get(`http://localhost:8080/User/${id}`);
            console.log('User data fetched from API:', response.data); // Debugging
            setUser(response.data);
          } else {
            toast.error('User ID not found.');
            console.log('User ID not available.');
          }
        } catch (error) {
          toast.error('Error fetching user profile');
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error('User not found in session');
        console.log('User was not found in sessionStorage.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-white text-center">Loading profile...</p>;

  const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';
  const initials = fullName
    ? fullName
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <NavbarUser></NavbarUser>
      <div className="max-w-4xl mx-auto mt-16 px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
          {user ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-center sm:text-left">
                <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold mx-auto sm:mx-0">
                  {initials}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{fullName || 'Profile'}</h2>
                  <p className="text-gray-500 mt-1">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-medium text-gray-800 mt-1">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-800 mt-1 break-all">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="text-lg font-medium text-gray-800 mt-1">{user.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-lg font-medium text-gray-800 mt-1">{user.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-lg font-medium text-gray-800 mt-1">{user.gender}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                <Link
                  to="/Update"
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg text-center hover:opacity-95 transition"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/UserDashBoard"
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-center hover:bg-gray-50 transition"
                >
                  Back to Dashboard
                </Link>
              </div>
            </>
          ) : (
            <p className="text-red-500 text-center">No user profile data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


