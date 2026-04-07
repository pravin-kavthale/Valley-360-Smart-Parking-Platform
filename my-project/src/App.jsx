import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components
import Navbar from './Components/Navbar';
import ProfileComponent from './Components/LoginAndRegistation/Update';
import Hero from './Components/Hero/Hero';
import Banner from './Components/Banners/Banner';
import Banner2 from './Components/Banners/Banner2';
import Footer from './Components/Footer/Footer';
import Registation from './Components/LoginAndRegistation/Registation';
import Login1 from './Components/LoginAndRegistation/Login1';
import Login from './Components/LoginAndRegistation/Login';
import ParkingSlotForm from './Components/OwnerDashBoard/AddParkingSlot';
import UserDashboard from './Components/UserDashBoard/UserDashBoard';
import ViewSlots from './Components/UserDashBoard/ViewSlots';
import AboutUs from './Components/Hero/AboutUs';
import ContactUs from './Components/Hero/ContactUs';
import BookParking from './Components/UserDashBoard/BookParking';
import Update from './Components/UserDashBoard/UpdateUser';
import Profile from './Components/UserDashBoard/Profile';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import ViewAllParkingSlots from './Components/AdminDashboard/ViewAllParkingSlots';
import ViewParkingArea from './Components/AdminDashboard/ViewParkingArea';
import OwnersList from './Components/AdminDashboard/ViewAllOwners';
import CustomersList from './Components/AdminDashboard/ViewAllCustomers';
import AddParkingArea from './Components/OwnerDashBoard/AddParkingArea';
import UpdateParkingArea from './Components/OwnerDashBoard/UpdateParkingArea';
import OwnerDashboard from './Components/OwnerDashBoard/OwnerDashBoard';
import DeleteUser from './Components/OwnerDashBoard/DeleteUser';
import Logout from './Components/LoginAndRegistation/Logout.jsx';
import Review from './Components/Banners/Review.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <main className='overflow-x-hidden'>
            <Navbar />
            <Hero />
            <Banner />
            <Banner2 />
            <Review></Review>
            <Footer />
          </main>
        } />
        <Route path="/SignUp" element={<Registation />} />
        <Route path="/AddParking" element={<ParkingSlotForm />} />
        <Route path="/UserDashBoard" element={<UserDashboard />} />
        <Route path="/ViewSlots/:parkingId" element={<ViewSlots />} />
        <Route path="/Login1" element={<Login1 />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="admin/parking-slots" element={<ViewAllParkingSlots />} />
        <Route path="admin/parking-areas" element={<ViewParkingArea />} />
        <Route path="admin/owners" element={<OwnersList />} />
        <Route path="admin/customers" element={<CustomersList />} />
        <Route path="Update1" element={<ProfileComponent />} />
        <Route path="/AddParkingSlot" element={<ParkingSlotForm />} />
        <Route path="/AddParkingArea" element={<AddParkingArea />} />
        <Route path="OwnerDashBoard" element={<OwnerDashboard />} />
        <Route path='Delete/:userid' element={<DeleteUser/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path="/Book/:slotId" element={<BookParking/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
