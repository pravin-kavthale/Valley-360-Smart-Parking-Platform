import React from 'react';
import BannerPng from "../../Images/Parking-Banner.png";
import { motion } from "framer-motion";
import { FadeRight } from "../Annimations/annimation";
import { useNavigate } from 'react-router-dom';

const bgStyle = {
  backgroundImage: `url('${BannerPng}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Banner2 = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBookNow = () => {
    navigate('/ContactUs'); // Navigate to booking page with parking ID
  };

  return (
    <section className='md:py-20'>
      <div style={bgStyle} className='container grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 py-14 md:py-24 rounded-3xl'>
        {/* Blank div */}
        <div className='flex flex-col justify-between'>
          <div className="text-right md:text-left space-y-4 lg:max-w-[400px]">
            <motion.h3
              variants={FadeRight(0.5)} initial='hidden' whileInView="visible" viewport={{ once: true }}
              className='text-3xl lg:text-6xl font-bold uppercase'>
              {" "}
              Join the Valley360 Community
            </motion.h3>

            <motion.p
              variants={FadeRight(0.7)} initial='hidden' whileInView="visible" viewport={{ once: true }}>
              Explore our user-friendly platform and see how Valley360 Parking can transform your parking experience. From quick stops to long-term parking solutions, we're here to help you park smarter, faster, and with greater ease.
            </motion.p>

            {/* Button section */}
            <motion.div variants={FadeRight(0.9)} initial='hidden' animate='visible'
              className="flex justify-center md:justify-start">
              <button className='primary-btn' onClick={handleBookNow}>Join Us</button>
            </motion.div>
          </div>
        </div>
        {/* Brand info */}
        <div></div>
      </div>
    </section>
  );
}

export default Banner2;
