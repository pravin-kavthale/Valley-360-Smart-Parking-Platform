import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../../Images/Login.jpeg"; // Ensure the path is correct

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
      const response = await axios.post('http://localhost:8080/User/Login', null, {
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
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <div className='relative mb-4'>
            <label
              htmlFor="email"
              className="block text-sm text-white mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Enter your email"
              style={{ caretColor: 'white' }}
            />
          </div>

          <div className='relative mb-4'>
            <label
              htmlFor="password"
              className="block text-sm text-white mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              required
              className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Enter your password"
              style={{ caretColor: 'white' }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center mt-6">
           <button
            type="submit"
            className="text-[18px] rounded bg-blue-500 py-1 px-16 hover:bg-blue-600 transition-colors
            duration-300 text-white">
              Login
          </button>
          </div>
          <div className="flex justify-center items-center mt-6">
            <span className="block text-sm text-white mb-1">Don't have an account ?
            <a href="/SignUp" className="font-medium text-white-700 hover:text-white-800">
                Register
              </a>
            </span>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
