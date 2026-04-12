import React, { useState } from 'react';
import api from '/src/api';

const Login1 = () => {
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('http://localhost:8080/Admin/Login', null, {
            params: {
                email: user.email,
                password: user.password
            }
        })
            .then(response => {
                window.location.href = '/home';
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-100 via-orange-100 to-amber-200 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-200 shadow-md p-8 flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/2 bg-gradient-to-br from-rose-400 to-orange-300 text-white flex flex-col justify-center items-center text-center p-6">
                    <h1 className='text-4xl font-bold'>Admin Login</h1>
                    <p className='mt-3 text-sm sm:text-base text-white/90'>Securely access your admin dashboard and controls</p>
                </div>
                <div className="w-full md:w-1/2 p-6">

            <form onSubmit={handleSubmit} className='space-y-4'>
            
            <h1 className='text-2xl font-semibold text-slate-900'>Login Page</h1>

                    <div className='space-y-2'>
                        <label className="block text-sm text-slate-600" for="email">Username</label>
                        <input
                            type="email"
                            className='w-full border border-rose-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400'
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className="block text-sm text-slate-600" for="password">Password</label>
                        <input
                            type="password"
                            className='w-full border border-rose-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400'
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>

                    <div className='pt-2'>
                        <button
                            type="submit"
                            className='w-full bg-rose-500 hover:bg-rose-600 text-white rounded-md py-2 hover:scale-105 hover:shadow-md transition'
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


