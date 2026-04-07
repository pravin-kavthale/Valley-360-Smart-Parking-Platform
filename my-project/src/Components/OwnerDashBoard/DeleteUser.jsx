import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate , useParams} from 'react-router-dom';

const DeleteUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast.error('User ID is required');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/User/Delete/${userId}`);

            if (response.status === 200) {
                toast.success('User deleted successfully');
                navigate('/admin/owners'); // Navigate to home or relevant page
            } else {
                toast.error('Unexpected response status');
                console.error('Response status:', response.status);
            }
        } catch (error) {
            toast.error('Error deleting user');
            console.error('Error:', error.response ? error.response.data : error.message); // Enhanced error logging
        }
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-emerald-300 to-purple-700 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Delete User</h2>
                <form onSubmit={handleDelete} className="space-y-4">
                   
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete User
                        </button>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </div>
    );
};

export default DeleteUser;
