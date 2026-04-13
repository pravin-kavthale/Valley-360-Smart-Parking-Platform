import React, { useEffect, useState } from 'react';
import api from '/src/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import {
  LuMapPinned,
  LuCalendarDays,
  LuCircleDollarSign,
  LuUsers,
  LuClock3,
  LuEye,
  LuCarFront,
  LuRefreshCw,
  LuPin,
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import NavbarUser from './NavbarUser';
import Footer from '../Footer/Footer';
import ParkingMap from './ParkingMap';
import { FadeRight, FadeUp } from '../../utility/annimation';

const UserDashboard = () => {
  const [parkingAreas, setParkingAreas] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [user, setUser] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const fetchParkingAreas = async () => {
    setLocationError('');
    if (!navigator.geolocation) {
      const message = 'Location access required to find nearby parking';
      toast.error(message);
      setLocationError(message);
      setUserLocation({ lat: 6.9271, lng: 79.8612 });
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('User is not authenticated. Please log in.');
          setLoadingLocation(false);
          return;
        }

        try {
          const response = await api.get('/parkingArea/nearby', {
            params: {
              latitude,
              longitude,
              radius: 3,
            },
          });

          setParkingAreas(response.data);
        } catch (error) {
          toast.error('Error fetching nearby parking areas');
          console.error('Error fetching nearby parking areas:', error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        const message = 'Location access required to find nearby parking';
        toast.error(message);
        setLocationError(message);
        setUserLocation({ lat: 6.9271, lng: 79.8612 });
        console.error('Error fetching location:', error);
        setLoadingLocation(false);
      }
    );
  };

  useEffect(() => {
    fetchParkingAreas();
  }, []);

  const handleBookNow = (id) => {
    navigate(`/ViewSlots/${id}`);
  };

  const handleRefresh = () => {
    setLoadingLocation(true);
    fetchParkingAreas();
  };

  const activeAreas = parkingAreas.filter((area) => String(area.status).toUpperCase() === 'ACTIVE').length;
  const estimatedTotal = parkingAreas.reduce((sum, area) => sum + Number(area.price || 0), 0);

  const stats = [
    {
      label: 'Nearby areas',
      value: parkingAreas.length,
      icon: LuMapPinned,
    },
    {
      label: 'Active areas',
      value: activeAreas,
      icon: LuCalendarDays,
    },
    {
      label: 'Search radius',
      value: '3 km',
      icon: LuCircleDollarSign,
    },
    {
      label: 'User ID',
      value: user?.id ?? 'N/A',
      icon: LuUsers,
    },
  ];

  const parkingCard = (area, index) => (
    <motion.article
      key={area.id}
      variants={FadeUp(0.15 + index * 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <LuPin className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{area.city}</h3>
            <p className="text-sm text-slate-500">{area.area}</p>
          </div>
        </div>
        <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
          {area.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <p><span className="text-slate-500">PinCode:</span> {area.pincode}</p>
        <p><span className="text-slate-500">Distance:</span> {area.distance ? area.distance.toFixed(2) : 'N/A'} km</p>
      </div>

      <button
        className="primary-btn inline-flex items-center gap-2"
        onClick={() => handleBookNow(area.id)}
      >
        <LuCarFront />
        View Slots
      </button>
    </motion.article>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-100 via-orange-100 to-amber-200 overflow-x-hidden">
      <NavbarUser />

      <section className="py-10 sm:py-16">
        <div className="container mx-auto max-w-[1200px] px-6 lg:px-8">
          <motion.div
            variants={FadeRight(0.2)}
            initial="hidden"
            animate="visible"
            className="rounded-3xl border border-rose-100 bg-white p-6 shadow-md sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Welcome back, find and book parking with clarity.</h1>
                <p className="max-w-2xl text-slate-600">
                  Search nearby parking areas, view available slots, and manage your account from one consistent interface.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
                <div className="rounded-xl bg-rose-100 p-3 text-rose-500">
                  <LuUsers className="text-xl" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Logged in user</p>
                  <p className="text-base font-semibold text-slate-900">{user?.firstName || user?.email || 'User account'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <ToastContainer position="top-center" />

          <section className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <LuEye className="text-xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Overview</h2>
                <p className="text-slate-600">A quick summary of your parking search context.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    variants={FadeUp(0.2 + index * 0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="rounded-xl bg-primary/10 p-3 text-primary">
                        <Icon className="text-xl" />
                      </div>
                    </div>
                    <p className="mt-4 text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="mt-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <LuClock3 className="text-xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Quick Actions</h2>
                <p className="text-slate-600">Move through the common user flows quickly.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
                <p className="text-xl font-bold text-slate-900">View Nearby Slots</p>
                <p className="text-slate-600">Browse nearby parking areas and open the slots view for booking.</p>
                <button className="primary-btn inline-flex items-center gap-2" onClick={handleRefresh}>
                  <LuRefreshCw />
                  Refresh Results
                </button>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
                <p className="text-xl font-bold text-slate-900">Update Profile</p>
                <p className="text-slate-600">Keep your contact details and account information current.</p>
                <button
                  className="border border-slate-200 bg-white px-6 py-3 rounded-xl font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                  onClick={() => navigate('/Update')}
                >
                  Update Profile
                </button>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-4">
                <p className="text-xl font-bold text-slate-900">Profile</p>
                <p className="text-slate-600">View your account information in a consistent dashboard style.</p>
                <button
                  className="border border-slate-200 bg-white px-6 py-3 rounded-xl font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                  onClick={() => navigate('/Profile')}
                >
                  Open Profile
                </button>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <LuMapPinned className="text-xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Recent Activity / Data</h2>
                <p className="text-slate-600">Nearby parking areas available right now, shown in the same card structure as the rest of the app.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Nearby Parking Areas</h3>
                  <p className="mt-2 text-slate-600">
                    {loadingLocation
                      ? 'Locating nearby parking areas...'
                      : locationError || `Showing parking areas near ${userLocation.lat?.toFixed(3) ?? 'your'} / ${userLocation.lng?.toFixed(3) ?? 'location'}.`}
                  </p>
                </div>
                <button
                  className="border border-slate-200 bg-white px-6 py-3 rounded-xl font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                  onClick={handleRefresh}
                >
                  Refresh
                </button>
              </div>

              <div className="mt-6">
                <ParkingMap
                  parkingAreas={parkingAreas}
                  userLocation={userLocation}
                  loading={loadingLocation}
                  locationError={locationError}
                  onBookNow={handleBookNow}
                />
              </div>

              {parkingAreas.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {parkingAreas.map((area, index) => parkingCard(area, index))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6">
                  <p className="text-slate-600">No parking areas found.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default UserDashboard;