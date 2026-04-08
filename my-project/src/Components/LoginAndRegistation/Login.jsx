import React, { useState } from 'react';
import api from '/src/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("email", user.email);
      console.log("password", user.password);
      const response = await api.post('http://localhost:8080/User/Login', null, {
        params: {
          email: user.email,
          password: user.password,
        },
          headers: {
            'Authorization': 'Bearer ' + btoa('username:password')
          }
        
      });
      console.log('Login response:', response.data.userRoles);
      //const { token, loggedInUser } = response.data;
      const token = response.data.jwtToken;
      const loggedInUser = response.data;

      // Store the token and user details in sessionStorage
      sessionStorage.setItem('jwtToken', token);
      sessionStorage.setItem('user', JSON.stringify(loggedInUser));

      console.log("Logged in user:", loggedInUser);
      
      if (loggedInUser.userRoles[0] == "ROLE_CUSTOMER") {
        navigate('/UserDashBoard');
      } else if (loggedInUser.userRoles[0] == "ROLE_OWNER") {
        navigate('/OwnerDashBoard');
      } else {
        console.log('Unrecognized user role.');
      }
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error('Login error:', error);
    }
  };
  const RegisterNow = () => {
    navigate(`/SignUp`); // Navigate to booking page with Slot ID
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 text-white flex flex-col justify-center items-center text-center px-8 py-12">
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">Valley 360 Parking</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight">Welcome Back</h2>
          <p className="mt-4 text-sm sm:text-base text-white/90">
            Access your account securely and continue managing parking with ease.
          </p>
        </div>

        <div className="w-full lg:w-1/2 px-4 py-8 sm:px-8 lg:px-10">
          <div className="mb-4">
            <Link to="/" className="text-sm text-purple-600 hover:text-purple-800 mb-4 inline-block">
              ← Back to Home
            </Link>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          <p className="mt-2 text-sm text-gray-600">Access your account securely</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                placeholder="Enter your email"
                style={{ caretColor: '#1f2937' }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 outline-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                placeholder="Enter your password"
                style={{ caretColor: '#1f2937' }}
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-400"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-800">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-md py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md transition hover:scale-105 hover:shadow-md"
              >
                Login
              </button>
            </div>

            <div className="pt-1 text-center">
              <span className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="/SignUp" className="font-semibold text-purple-600 hover:text-purple-800">
                  Register
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


