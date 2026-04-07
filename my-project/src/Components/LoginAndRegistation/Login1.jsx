import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Login1 = () => {
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/Admin/Login', null, {
            params: {
                email: user.email,
                password: user.password
            },
            headers: {
              'Authorization': 'Bearer ' + btoa('username:password')
            }
        })
            .then(response => {
                window.location.href = '/Admin';
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 flex flex-col lg:flex-row overflow-hidden">
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 text-white flex flex-col justify-center items-center text-center px-8 py-12">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/80">Valley 360 Parking</p>
                    <h2 className="mt-4 text-4xl font-bold leading-tight">Admin Access</h2>
                    <p className="mt-4 text-sm sm:text-base text-white/90">
                        Manage parking system securely and oversee operations with confidence.
                    </p>
                </div>

                <div className="w-full lg:w-1/2 px-4 py-8 sm:px-8 lg:px-10">
                    <div className="mb-4">
                        <Link to="/" className="text-sm text-purple-600 hover:text-purple-800 mb-4 inline-block">
                            ← Back to Home
                        </Link>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800">Admin Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Access your account securely</p>

                    <form onSubmit={handleSubmit} className='mt-6 space-y-4 text-left'>
                        <div className='space-y-2'>
                            <label className="block text-sm font-medium text-gray-700" for="email">Username</label>
                            <input
                                type="email"
                                className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400'
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder='Enter your Email'
                                required
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className="block text-sm font-medium text-gray-700" for="password">Password</label>
                            <input
                                type="password"
                                className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400'
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className='w-full rounded-md py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md transition hover:scale-105 hover:shadow-md'
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login1;
