import React from 'react'
import {IoBagHandleOutline} from 'react-icons/io5'
import {motion} from "framer-motion";
import { FadeRight } from '../Annimations/annimation';
import ParkingAnimation from './ParkingAnimation';
import Parking3D from './Parking3D';
import Login1 from '../LoginAndRegistation/Login1';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const handleBookNow = () => {
        navigate('/Login');
    };

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
            className='text-slate-800-400 gap-2'> Whether you're a business owner, a commuter, or just visiting the city, Valley360 Parking offers a range of services tailored to your needs . <br /> <span className='font-bold'>"Book Now" | "Confirm My Spot"</span></motion.p>
            <br />
            <motion.div
            variants={FadeRight(1.6)}
            initial="hidden"
            animate="visible"
            className='flex justify-center md:justify-start'>
                <button className='primary-btn flex items-center gap-2' onClick={handleBookNow}>
                <span><IoBagHandleOutline></IoBagHandleOutline></span>
                Book Now</button>
            </motion.div>
      
            
        </div>
        
    </div>
         {/* Hero Image*/}
                        <div className='flex flex-col justify-center ml-10'>
                                <motion.div
                                initial={{opacity:0, x:200, rotate:0}}
                                animate={{opacity:1, x:0, rotate:0}}
                                transition={{duration:1, delay:0.2}}
                                className='w-[450px] h-[350px] max-w-full'>
                                    <ParkingAnimation />
                                </motion.div>
                        </div>

   </section>
  )
}



export default Hero
