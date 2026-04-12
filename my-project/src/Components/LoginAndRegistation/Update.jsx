import React, { useEffect, useState } from 'react';
import api from '/src/api';

const ProfileComponent = () => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    contact: '',
    gender: '',
    address: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get('http://localhost:8080/User/Register')
      .then((response) => {
        setFormData((prev) => ({ ...prev, ...response.data }));
      })
      .catch((error) => {
        console.error('There was an error fetching the profile!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      api.post('http://localhost:8080/api/users', formData)
        .then((response) => {
          console.log('Profile updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('There was an error updating the profile!', error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-orange-100 to-amber-200 flex items-center justify-center px-4 py-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-200 shadow-md p-8 w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-rose-400 to-orange-300 text-white flex flex-col justify-center items-center text-center p-6">
          <h4 className="text-3xl font-bold">Account Settings</h4>
          <p className="mt-3 text-sm sm:text-base text-white/90">Manage your account profile information in one place</p>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm text-slate-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-rose-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-rose-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-rose-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-rose-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-600">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border border-rose-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-600">Gender</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-rose-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-600">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-rose-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-600">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-rose-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-md py-2 hover:scale-105 hover:shadow-md transition">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;


