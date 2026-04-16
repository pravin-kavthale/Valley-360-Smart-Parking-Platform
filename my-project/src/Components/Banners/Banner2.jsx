import React from 'react';
import { motion } from "framer-motion";
import { FadeRight } from "../Annimations/annimation";
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkCircleOutline, IoLockClosedOutline, IoTimeOutline } from 'react-icons/io5';

const featureItems = [
  {
    title: 'Easy Booking',
    description: 'Reserve a parking slot without unnecessary steps.',
    icon: IoCheckmarkCircleOutline,
  },
  {
    title: 'Real-time Availability',
    description: 'See updated parking options before you arrive.',
    icon: IoTimeOutline,
  },
  {
    title: 'Secure Payments',
    description: 'Complete transactions with a simple, trusted flow.',
    icon: IoLockClosedOutline,
  },
];

const Banner2 = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/ContactUs');
  };

  return (
    <section className='py-16 sm:py-20 lg:py-24'>
      <div className='container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-10 rounded-[28px] border border-rose-100 bg-gradient-to-br from-[#F9F0EA] via-[#F6EEE8] to-[#FBF7F2] px-6 py-16 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-20'>
          <div className='text-center lg:text-left'>
            <motion.h3
              variants={FadeRight(0.5)} initial='hidden' whileInView="visible" viewport={{ once: true }}
              className='text-[36px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[42px]'>
              Join the Valley360 Community
            </motion.h3>

            <motion.p
              variants={FadeRight(0.7)} initial='hidden' whileInView="visible" viewport={{ once: true }}>
              Explore our user-friendly platform and see how Valley360 Parking can transform your parking experience. From quick stops to long-term parking solutions, we're here to help you park smarter, faster, and with greater ease.
            </motion.p>

            {/* Button section */}
            <motion.div variants={FadeRight(0.9)} initial='hidden' animate='visible'
              className='mt-8 flex justify-center lg:justify-start'>
              <button className='primary-btn px-7 py-3' onClick={handleBookNow}>Join Us</button>
            </motion.div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:pl-6'>
            {featureItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={FadeRight(0.8 + index * 0.15)}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  className={`rounded-2xl border border-white/80 bg-white/85 p-5 shadow-sm ${index === 2 ? 'sm:col-span-2' : ''}`}
                >
                  <div className='flex items-start gap-4'>
                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600'>
                      <Icon className='text-2xl' />
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold text-slate-900'>{item.title}</h4>
                      <p className='mt-2 text-sm leading-6 text-slate-600'>{item.description}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner2;

