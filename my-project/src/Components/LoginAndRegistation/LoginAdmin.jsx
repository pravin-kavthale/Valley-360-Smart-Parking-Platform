import React, { useState } from 'react';
import axios from 'axios';

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
        <div className="bg-[url('/src/Images/Login1.jpg')] bg-center bg-cover bg-no-repeat h-[100vh] w-screen relative flex items-center">
            <div className='w-screen h-[100vh] bg-black opacity-50 absolute top-0 left-0'>
            <div className='w-screen h-[100vh] bg-black absolute top-0 left-0 flex items-center'>

            <form onSubmit={handleSubmit} style={{ border: '3px solid gray', borderRadius: '8px' }} className='relative text-white text-center flex flex-col gap-4 mx-auto px-4 w-[30%] py-6 shadow-xl shadow-purple-500'>
            
            <h1 className='text-2xl uppercase font-semibold'>Login Page</h1>

                    <div className='flex flex-col gap-2 w-[70%] mx-auto'>
                        <label className="text-xl font-semibold text-left" for="email">Username</label>
                        <input
                            type="email"
                            className='outline-none px-4 py-2 rounded-full bg-transparent border-2 text-white'
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-[70%] mx-auto'>
                        <label className="text-xl font-semibold text-left" for="password">Password</label>
                        <input
                            type="password"
                            className='outline-none px-4 py-2 rounded-full bg-transparent border-2 text-white'
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className='bg-purple-700 px-4 py-2 rounded-md text-xl w-[200px] mx-auto hover:bg-transparent hover:border-purple-600 border-2 border-purple-500'
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
