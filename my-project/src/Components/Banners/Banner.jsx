import React from 'react'
import { motion } from "framer-motion";
import { FadeRight } from "../Annimations/annimation";
import { IoCarSportOutline, IoNavigateOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

const featureItems = [
  {
    title: 'Instant Spot Match',
    description: 'Find the right parking option near your destination without the usual search stress.',
    icon: IoCarSportOutline,
  },
  {
    title: 'Guided Parking Route',
    description: 'Get direct smart navigation to your reserved slot and avoid unnecessary detours.',
    icon: IoNavigateOutline,
  },
  {
    title: 'Reliable & Secure',
    description: 'Park confidently with continuous monitoring and secure digital payments.',
    icon: IoShieldCheckmarkOutline,
  },
  {
    title: 'Live Slot Visibility',
    description: 'See open spaces in real time so you can decide faster before you even arrive.',
    icon: IoCarSportOutline,
  },
  {
    title: 'Hassle-Free Booking',
    description: 'Reserve in a few taps and skip last-minute parking uncertainty during busy hours.',
    icon: IoNavigateOutline,
  },
];

const Banner = () => {
  return (
    <section className='py-16 sm:py-20 lg:py-24'>
      <div className='container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-10 rounded-[28px] border border-rose-100 bg-gradient-to-br from-[#FAF3EE] via-[#F7EFEB] to-[#FFF9F6] px-6 py-16 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-20'>
          <div className='text-center lg:text-left'>
            <motion.h3
              variants={FadeRight(0.5)}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='text-[36px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[42px]'
            >
              Why Choose Us?
            </motion.h3>

            <motion.p
              variants={FadeRight(0.7)}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='mt-4 text-slate-700'
            >
              Parking with Valley360 means less searching, faster booking, and a smoother arrival every time.
            </motion.p>

            <motion.p
              variants={FadeRight(0.85)}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='mt-4 text-slate-700'
            >
              From real-time availability to guided navigation and secure checkouts, everything is designed to make parking effortless.
             
              <br/>
              Your perfect parking spot is just one click away.
            </motion.p>

            <motion.div
              variants={FadeRight(1.0)}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='mt-8 flex justify-center lg:justify-start'
            >
              
              <button className='primary-btn px-7 py-3'>Know More</button>
            </motion.div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:pl-6'>
            {featureItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  variants={FadeRight(0.85 + index * 0.15)}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  className={`rounded-2xl border border-white/80 bg-white/85 p-5 shadow-sm ${index === 4 ? 'sm:col-span-2' : ''}`}
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
};

export default Banner;

