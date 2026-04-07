import React,{useState , useEffect} from 'react'
import axios from 'axios';

const BookParking = () => {
    const [formData, setFormData] = useState({
        date: '',
        vehicleNo: '',
        vehicleType: 'CAR',
        parkingHours: 1,
        price: 0.0,
        
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:8080/booking/Book', formData);
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
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Date and Time:
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              <option value="TWO_WHEELER">Car</option>
              <option value="TWO_WHEELER">Motorcycle</option>
              
            </select>
            <label htmlFor="parkingHours" className="block text-gray-700 font-medium mb-2">
              Parking Hours:
            </label>
            <input
              type="number"
              id="parkingHours"
              name="parkingHours"
              value={formData.parkingHours}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
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
}

export default BookParking
