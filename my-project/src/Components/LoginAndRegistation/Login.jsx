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
      const token = response.data.token || response.data.jwtToken;
      const loggedInUser = response.data;

      // Store the token and user details for authenticated API access.
      localStorage.setItem('token', token);
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
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-orange-100 to-amber-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-200 shadow-md p-8 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-rose-400 to-orange-300 text-white flex flex-col justify-center items-center text-center px-8 py-12">
          <p className="text-sm uppercase tracking-[0.35em] text-white/80">Valley 360 Parking</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight">Welcome Back</h2>
          <p className="mt-4 text-sm sm:text-base text-white/90">
            Access your account securely and continue managing parking with ease.
          </p>
        </div>

        <div className="w-full lg:w-1/2 px-4 py-8 sm:px-8 lg:px-10">
          <div className="mb-4">
            <Link to="/" className="text-sm text-rose-600 hover:text-rose-500 mb-4 inline-block">
              ← Back to Home
            </Link>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900">Login</h2>
          <p className="mt-2 text-sm text-slate-600">Access your account securely</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full border border-rose-200 rounded-md px-3 py-2 text-sm text-slate-900 outline-none focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
                placeholder="Enter your email"
                style={{ caretColor: '#1f2937' }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                required
                className="w-full border border-rose-200 rounded-md px-3 py-2 text-sm text-slate-900 outline-none focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"
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
                  className="h-4 w-4 rounded border-rose-200 text-rose-600 focus:ring-rose-400"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-slate-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-md py-2 bg-rose-500 hover:bg-rose-600 text-white shadow-md transition hover:scale-105 hover:shadow-md"
              >
                Login
              </button>
            </div>

            <div className="pt-1 text-center">
              <span className="text-sm text-slate-600">
                Don&apos;t have an account?{' '}
                <a href="/SignUp" className="font-semibold text-rose-600 hover:text-rose-500">
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


