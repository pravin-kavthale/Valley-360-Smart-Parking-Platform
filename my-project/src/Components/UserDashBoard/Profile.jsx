import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';

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

          if (id) {
            const response = await axios.get(`http://localhost:8080/User/${id}`);
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

  return (
    <div>
    <NavbarUser></NavbarUser>
    <div className="flex items-center justify-center min-h-screen bg-slate-600 p-4">
      <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
        {user ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Name:</span>
              <span>{user.firstName} {user.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Contact:</span>
              <span>{user.contact}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Address:</span>
              <span>{user.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Gender:</span>
              <span>{user.gender}</span>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center">No user profile data found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
