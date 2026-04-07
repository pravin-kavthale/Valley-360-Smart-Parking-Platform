import React from 'react'
import { motion , AnnimatePresence } from "framer-motion";

const ResponsiveMenu = ({open}) => {
  return (
    
      <AnnimatePresence mode="wait">
        {
            open && (
                <div className='absolute top-20 left-0 w-full h-screen z-20'>
                    <div className='text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl '>
                        <ul className='flext flex-col items-center gap-10'>
                            <li>Home</li>
                            <li>Admin</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
            )
        }
      </AnnimatePresence>
    
  )
}

export default ResponsiveMenu
