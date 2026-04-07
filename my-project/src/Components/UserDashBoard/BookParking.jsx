import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookParking = () => {
  const { slotId } = useParams(); // Get parking slot ID from the URL params
  console.log('Parking Slot ID:', slotId);

  const [formData, setFormData] = useState({
    bookingDate: '',
    arrivalDate: '',
    departureDate: '',
    vehicleNo: '',
    vehicleType: 'TWO_WHEELER',
    parkingHours: 1,
    price: 0.0,
    customer_id: '',
    parking_slot_id: slotId,
    status: 'RESERVED',
  });

  const [errors, setErrors] = useState({
    bookingDate: '',
    arrivalDate: '',
    departureDate: '',
    vehicleNo: '',
  });

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    console.log(userId);
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        customer_id: userId,
        bookingDate: new Date().toISOString().split('T')[0],
      }));
    }
  }, []);

  const calculatePrice = (hours, vehicleType) => {
    let price = 0;
    if (vehicleType === 'TWO_WHEELER') {
      if (hours <= 1) price = 50;
      else if (hours > 1 && hours <= 3) price = 80;
      else if (hours > 3) price = 120;
    } else if (vehicleType === 'FOUR_WHEELER') {
      if (hours <= 1) price = 100;
      else if (hours > 1 && hours <= 3) price = 160;
      else if (hours > 3) price = 200;
    }
    return price;
  };

  const validateForm = () => {
    const errors = {};

    const bookingDate = new Date(formData.bookingDate);
    const arrivalDate = new Date(formData.arrivalDate);
    const departureDate = new Date(formData.departureDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    if (bookingDate < today) {
      errors.bookingDate = 'Booking date must be today or in the future.';
    }

    if (arrivalDate >= departureDate) {
      errors.arrivalDate = 'Departure time must be after arrival time.';
    }

    if (!formData.vehicleNo.trim()) {
      errors.vehicleNo = 'Vehicle number is required.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const arrivalDateTime = new Date(formData.arrivalDate);
    const departureDateTime = new Date(formData.departureDate);
    const hours = Math.ceil((departureDateTime - arrivalDateTime) / (1000 * 60 * 60));

    const calculatedPrice = calculatePrice(hours, formData.vehicleType);

    try {
      await axios.post('http://localhost:8080/booking/add', {
        ...formData,
        parkingHours: hours,
        price: calculatedPrice,
      });
      alert('Booking successful!');
    } catch (error) {
      alert('Error during booking');
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Book Parking</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bookingDate" className="block text-gray-700 font-medium mb-2">
          Booking Date:
        </label>
        <input
          type="date"
          id="bookingDate"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          className={`w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.bookingDate ? 'border-red-500' : ''}`}
        />
        {errors.bookingDate && <p className="text-red-500 text-sm mb-4">{errors.bookingDate}</p>}

        <label htmlFor="arrivalDate" className="block text-gray-700 font-medium mb-2">
          Arrival Date and Time:
        </label>
        <input
          type="datetime-local"
          id="arrivalDate"
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.arrivalDate ? 'border-red-500' : ''}`}
        />
        {errors.arrivalDate && <p className="text-red-500 text-sm mb-4">{errors.arrivalDate}</p>}

        <label htmlFor="departureDate" className="block text-gray-700 font-medium mb-2">
          Departure Date and Time:
        </label>
        <input
          type="datetime-local"
          id="departureDate"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.departureDate ? 'border-red-500' : ''}`}
        />
        {errors.departureDate && <p className="text-red-500 text-sm mb-4">{errors.departureDate}</p>}

        <label htmlFor="vehicleNo" className="block text-gray-700 font-medium mb-2">
          Vehicle Number:
        </label>
        <input
          type="text"
          id="vehicleNo"
          name="vehicleNo"
          value={formData.vehicleNo}
          onChange={handleChange}
          required
          className={`w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.vehicleNo ? 'border-red-500' : ''}`}
        />
        {errors.vehicleNo && <p className="text-red-500 text-sm mb-4">{errors.vehicleNo}</p>}

        <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">
          Vehicle Type:
        </label>
        <select
          id="vehicleType"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="TWO_WHEELER">Two-Wheeler</option>
          <option value="FOUR_WHEELER">Four-Wheeler</option>
        </select>

        <label htmlFor="parkingHours" className="block text-gray-700 font-medium mb-2">
          Parking Hours:
        </label>
        <input
          type="number"
          id="parkingHours"
          name="parkingHours"
          value={Math.ceil((new Date(formData.departureDate) - new Date(formData.arrivalDate)) / (1000 * 60 * 60))}
          readOnly
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={calculatePrice(Math.ceil((new Date(formData.departureDate) - new Date(formData.arrivalDate)) / (1000 * 60 * 60)), formData.vehicleType)}
          readOnly
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookParking;
