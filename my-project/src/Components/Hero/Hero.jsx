import React from 'react'
import {IoBagHandleOutline} from 'react-icons/io5'
import Image from "../../Images/Bg-clg.jpg";
import LOGO from '../../Images/logo.jpeg';
import {motion} from "framer-motion";
import { FadeRight } from '../Annimations/annimation';

const Hero = () => {
  return (
   <section className='container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative'>
    {/*Brand Info */}
    <div className='flex flex-col justify-center py-50 md:py-0 relative z-10'>
        <div className='text-center md:text-left space-y-30 lg:max-w-[1000px]'>

            <motion.h1
            variants={FadeRight(0.6)}
            initial="hidden"
            animate="visible"
             className='text-5xl lg:text-16xl font-bold leading-relaxed xl:leading-loose font-averia'>Find the Perfect Parking
            <br /><span className='text-secondary'> Anywhere  </span> <label className='text-primary'>Anytime!</label></motion.h1>
            
            <motion.p
            variants={FadeRight(0.9)}
            initial="hidden"
            animate="visible"
            className='text-2xl tracking-wide'> Discover a new era of parking convenience with<br/><span>Valley360 Parking.</span>  </motion.p>
            
            <motion.p
            variants={FadeRight(1.2)}
            initial="hidden"
            animate="visible"
            className='text-slate-800-400'> Whether you're a business owner, a commuter, or just visiting the city, Valley360 Parking offers a range of services tailored to your needs . <br /> <span className='font-bold'>"Book Now" | "Confirm My Spot"</span></motion.p>

            <motion.div
            variants={FadeRight(1.6)}
            initial="hidden"
            animate="visible"
            className='flex justify-center md:justify-start'>
                <button className='primary-btn flex items-center gap-2'>
                    <span><IoBagHandleOutline></IoBagHandleOutline></span>Book Now</button>
            </motion.div>
      
            
        </div>
        
    </div>
     {/* Hero Image*/}
            <div className='flex flex-col justify-center ml-10'>
                <motion.img 
                initial={{opacity:0, x:200, rotate:75}}
                animate={{opacity:1, x:0, rotate:0}}
                transition={{duration:1, delay:0.2}}
                src={Image} alt='' className='w-[350px] ms:w=[550px] drop-shadow md:px-10'></motion.img>
            </div>
            
            <div className='absolute left-80 top-10  bottom-00 10md:top-0 right-2/3 blur-sm opacity-40 rotate-[40deg]'>
                <motion.img 
                initial={{opacity:0, y:-200, rotate:75}}
                animate={{opacity:1, y:0, rotate:0}}
                transition={{duration:1, delay:1.0}}
                
                src={LOGO} alt='' className='w-full md:max-W-[100px]' ></motion.img>
            </div>

   </section>
  )
}

export default Hero