import React from 'react'
import BannerPng from "../../assets/Banner.png";
import {motion} from "framer-motion";
import {FadeUp} from "../Annimations/annimation";

const Banner = () => {
  return (
    <section className='bg-secondary/10'>

    <div className='container grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 py-14'>
      {/*Brand name*/}
      <div className='container flex justify-center items-center' >

        <motion.img
        initial={{opacity:0, scale:0.5}} whileInView={{opacity:1, scale:1}}
        transition={{type:"spring", stiffness:100, delay:0.2}} viewport={{once:true}}
        src={BannerPng} alt='w-[300px] md:max-w-[400px] h-full object-cover'/>
      </div>
       {/*Brand info*/}
        
      <div className='flex flex-col justify-between ml-auto'>
       <div className="text-right md:text-left space-y-4 lg:max-w-[400px] ">

        <motion.h1
        variants={FadeUp(0.5)} initial='hidden' whileInView="visible" viewport={{once:true}}
        className='text-3xl lg:text-6xl font-bold uppercase'>{" "}
            Why Choose Us?</motion.h1>

        <motion.p variants={FadeUp(0.7)} initial='hidden' whileInView="visible" viewport={{once:true}}>
        Comprehensive Parking Solutions: Valley360 Parking provides a wide array of parking options, ensuring you find the perfect spot, whether it's in the heart of the city or closer to home.
        Real-Time Availability with our real-time availability feature, you can easily see which parking spots are open, saving you time and reducing the hassle of searching for a place to park.
        </motion.p>

        <motion.p variants={FadeUp(0.9)} initial='hidden' whileInView="visible" viewport={{once:true}}>
        Advanced Booking: Reserve your parking spot in advance with just a few clicks, ensuring that your space is ready when you arrive.
        Smart Navigation our integrated navigation system guides you directly to your parking spot, making your journey smoother and more efficient.
        Secure and Reliable with 24/7 monitoring and secure payment options, you can trust Valley360 Parking to keep your vehicle safe.
        </motion.p>

        {/* button section */}
        <motion.div variants={FadeUp(1.1)} initial='hidden' animate='visible' 
        className="flex justify-center md:justify-start">
            <button className='primary-btn'>Know More</button>
        </motion.div>
        
       </div>
      </div>      
    </div>
    </section>
  );
};

export default Banner;
