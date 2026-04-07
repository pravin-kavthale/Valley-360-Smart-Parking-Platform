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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fff4ea] via-[#fbeee4] to-[#f8e3d5] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl bg-white/60 backdrop-blur-sm shadow-[0_20px_60px_rgba(168,118,92,0.18)] overflow-hidden border border-white/50">
        <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center animate-in fade-in duration-700">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#3d2a21] leading-tight">Access Your Account</h2>
          <p className="mt-2 text-lg sm:text-xl font-medium text-[#df8f5f]">Securely, Easily</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-7">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="relative">
              <label htmlFor="email" className="block text-sm text-[#5c463b] mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                required
                className="block w-full py-3 px-0 text-sm text-[#3d2a21] bg-transparent border-0 border-b-2 border-[#d8c5b8] appearance-none focus:outline-none focus:ring-0 focus:border-[#de8d69] placeholder:text-[#8f7869]/70 transition-colors duration-300"
                placeholder="Enter your email"
                style={{ caretColor: '#3d2a21' }}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm text-[#5c463b] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                required
                className="block w-full py-3 px-0 text-sm text-[#3d2a21] bg-transparent border-0 border-b-2 border-[#d8c5b8] appearance-none focus:outline-none focus:ring-0 focus:border-[#de8d69] placeholder:text-[#8f7869]/70 transition-colors duration-300"
                placeholder="Enter your password"
                style={{ caretColor: '#3d2a21' }}
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#d8705a] focus:ring-[#e3a17a] border-[#cfb7a8] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-[#5c463b]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#7a5c4e] hover:text-[#5a4035] transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto text-[18px] rounded-full bg-gradient-to-r from-[#ef7f7b] via-[#e3666b] to-[#d95563] py-2.5 px-14 text-white shadow-[0_10px_25px_rgba(217,85,99,0.35)] hover:scale-[1.02] transition-all duration-300"
              >
                Login
              </button>
            </div>

            <div>
              <span className="block text-sm text-[#6a5144]">
                Don&apos;t have an account?{' '}
                <a href="/SignUp" className="font-semibold text-[#d06f56] hover:text-[#b85d48] transition-colors duration-200">
                  Register
                </a>
              </span>
            </div>
          </form>
        </div>

        <div className="relative hidden lg:flex items-center justify-center p-12 bg-gradient-to-b from-[#f5dfcf] to-[#f2d7c6]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(222,141,105,0.22),transparent_45%)]" />
          <div className="relative h-[340px] w-[340px] rounded-full bg-white/60 shadow-[0_18px_45px_rgba(124,82,58,0.2)] border border-white/70 p-5 flex items-center justify-center">
            <img
              src={backgroundImage}
              alt="Parking illustration"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
