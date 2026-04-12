import React, { useState, useEffect } from 'react';
import api from '/src/api';

const AdminDashboard = () => {
    const [data, setData] = useState({
        parkingSlots: 0,
        parkingAreas: 0,
        owners: 0,
        customers: 0,
    });

    useEffect(() => {
        // Define the async function
        const fetchData = async () => {
            try {
                const response = await api.get('http://localhost:8080/Admin/dashboard'); // Make sure this matches your actual endpoint
                setData(response.data);
               
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        // Call the async function
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-purple-300 px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Parking Slots" value={data.parkingSlots} />
                <Card title="Parking Areas" value={data.parkingAreas} />
                <Card title="Owners" value={data.owners} />
                <Card title="Customers" value={data.customers} />
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage</h2>
                <div className="flex flex-wrap gap-4">
                    <Button href="/admin/parking-slots">Manage Parking Slots</Button>
                    <Button href="/admin/parking-areas">Manage Parking Areas</Button>
                    <Button href="/admin/owners">Manage Owners</Button>
                    <Button href="/admin/customers">Manage Customers</Button>
                    <Button href="/admin/validate-qr">Validate Booking QR</Button>
                </div>
            </div>
            </div>
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
);

const Button = ({ href, children }) => (
    <a href={href} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md py-2 px-4 hover:scale-105 hover:shadow-md transition">
        {children}
    </a>
);

export default AdminDashboard;


