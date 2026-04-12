import React from 'react';
import {motion} from "framer-motion";
import { FadeUp } from '../../utility/annimation';

const ContactUs = () => {
  return (
    <section className='container mx-auto px-4 py-16'>
      <div className='max-w-2xl mx-auto'>
        <motion.h1
          variants={FadeUp(0.5)}
          initial="hidden"
          animate="visible"
          className='text-3xl lg:text-4xl font-bold text-center mb-8'
        >
          Contact Us
        </motion.h1>

        <motion.div
          variants={FadeUp(0.7)}
          initial="hidden"
          animate="visible"
          className='bg-white p-8 rounded-lg shadow-lg'
        >
          <form
            action="#"
            method="POST"
            className='space-y-6'
          >
            <div>
              <label htmlFor="name" className='block text-sm font-medium text-slate-700'>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className='mt-1 block w-full px-3 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400 sm:text-sm'
              />
            </div>

            <div>
              <label htmlFor="email" className='block text-sm font-medium text-slate-700'>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className='mt-1 block w-full px-3 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400 sm:text-sm'
              />
            </div>

            <div>
              <label htmlFor="message" className='block text-sm font-medium text-slate-700'>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className='mt-1 block w-full px-3 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400 sm:text-sm'
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className='w-full bg-rose-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2'
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactUs;
