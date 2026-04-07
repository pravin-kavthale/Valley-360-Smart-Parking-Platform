import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                const response = await axios.get('http://localhost:8080/Admin/dashboard'); // Make sure this matches your actual endpoint
                setData(response.data);
               
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        // Call the async function
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Parking Slots" value={data.parkingSlots} />
                <Card title="Parking Areas" value={data.parkingAreas} />
                <Card title="Owners" value={data.owners} />
                <Card title="Customers" value={data.customers} />
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Manage</h2>
                <div className="flex space-x-4">
                    <Button href="/admin/parking-slots">Manage Parking Slots</Button>
                    <Button href="/admin/parking-areas">Manage Parking Areas</Button>
                    <Button href="/admin/owners">Manage Owners</Button>
                    <Button href="/admin/customers">Manage Customers</Button>
                </div>
            </div>
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const Button = ({ href, children }) => (
    <a href={href} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        {children}
    </a>
);

export default AdminDashboard;
