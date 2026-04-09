import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '/src/api';
import { Link } from 'react-router-dom';

// Function to validate the password
const validatePassword = (password) => {
    const minLength = 8;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;

    return (
        password.length >= minLength &&
        specialChar.test(password) &&
        uppercase.test(password) &&
        number.test(password)
    );
};

const Registration = () => {
    // State variables for form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [roleId, setRoleId] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    // Handler for form submission
    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError('');

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 special character, and a combination of digits and letters.');
            return;
        } else {
            setPasswordError('');
        }

        try {
            // Send a POST request to the backend with the form data
            await api.post('http://localhost:8080/User/Register', {
                firstName,
                lastName,
                email,
                password,
                contact,
                gender,
                address,
                roleId: parseInt(roleId, 10), // Convert roleId to integer
            });

            toast.success("Signup Successful!"); // Display success message
            window.location.href = '/';

        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 text-white flex flex-col justify-center items-center text-center px-8 py-12">
                    <p className='text-sm uppercase tracking-[0.35em] text-white/80'>Valley 360 Parking</p>
                    <h1 className='mt-4 text-4xl font-bold leading-tight'>Welcome</h1>
                    <p className='mt-4 text-sm sm:text-base text-white/90'>Hello! Your perfect parking spot is just a registration away. Join us now!</p>
                </div>

                <div className="w-full lg:w-1/2 px-4 py-8 sm:px-8 lg:px-10">
                    <div className="mb-4">
                        <Link to="/" className="text-sm text-purple-600 hover:text-purple-800 mb-4 inline-block">
                            ← Back to Home
                        </Link>
                    </div>

                    <h2 className='text-2xl font-semibold text-gray-800'>Register Here</h2>
                    <p className='mt-2 text-sm text-gray-600'>Create your account. It's free and only takes a minute</p>

                    {error && (
                        <p className='mt-4 text-sm text-red-500'>
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSignup} className="mt-6 space-y-4">

                        <div className='grid grid-cols-2 gap-4'>
                            <input type='text' placeholder='First Name' className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400' value={firstName} onChange={(e) => { setError(''); setFirstName(e.target.value); }} required />
                            <input type='text' placeholder='Last Name' className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400' value={lastName} onChange={(e) => { setError(''); setLastName(e.target.value); }} required />
                        </div>

                        <div className='space-y-2'>
                            <input type='email' placeholder='Email' className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400' value={email} onChange={(e) => { setError(''); setEmail(e.target.value); }} required />
                        </div>

                        <div className='space-y-2'>
                            <input
                                type='password'
                                placeholder='Password'
                                className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400'
                                value={password}
                                onChange={(e) => { setError(''); setPassword(e.target.value); }}
                                required
                            />
                            {passwordError && <p className='text-red-500 text-sm mt-1'>{passwordError}</p>}
                        </div>

                        <div className='space-y-2'>
                            <input type='tel' placeholder='Contact' pattern="[0-9]{10}" title="Please enter a 10-digit phone number" className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400' value={contact} onChange={(e) => { setError(''); setContact(e.target.value); }} required />
                        </div>

                        <div className='space-y-2'>
                            <input type='text' placeholder='Address' className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400' value={address} onChange={(e) => { setError(''); setAddress(e.target.value); }} required />
                        </div>

                        <div className='space-y-2'>
                            <span className='block text-sm font-medium text-gray-700'>Gender:</span>
                            <select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400' value={gender} onChange={(e) => { setError(''); setGender(e.target.value); }} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='space-y-2'>
                            <span className='block text-sm font-medium text-gray-700'>Role:</span>
                            <select className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400' value={roleId} onChange={(e) => { setError(''); setRoleId(e.target.value); }} required>
                                <option value="">Select Role</option>
                                <option value="2">Owner</option>
                                <option value="3">Customer</option>
                            </select>
                        </div>
                        <div className='pt-2'>
                            <button type='submit' className='w-full rounded-md py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md transition hover:scale-105 hover:shadow-md'> Register Now </button>
                        </div>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Registration;


