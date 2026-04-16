import React from "react";
import { motion } from "framer-motion";

const testimonialData = [
  {
    name: "- John M., Parking Area Owner",
    image: "",
    description: "The Valley360 Parking system significantly streamlines parking area and slot management, making it easier for owners to update availability and oversee bookings.",
    aosDelay: "0",
  },
  {
    name: "- Sarah K., Regular Customer",
    image: "",
    description: "Valley360 Parking provides a hassle-free booking experience with a simple process to find and secure parking slots quickly.",
    aosDelay: "300",
  },
  {
    name: "- Emily R., Parking Area Owner",
    image: "",
    description: "With detailed booking management features, owners can easily monitor and handle parking reservations, ensuring smooth operations and optimal use of parking spaces.",
    aosDelay: "1000",
  },
];
const Review = () => {
  return (
    <>
      <span id="about"></span>
      <section className="bg-[linear-gradient(135deg,#fdf0f3,#fbe4d8)] py-20 sm:py-24">
        <div className="container mx-auto max-w-[1200px] px-4 sm:px-10 lg:px-12">
          <div className="space-y-4 pb-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55 }}
              className="text-[32px] font-semibold tracking-[0.02em] text-[#2c2c2c] sm:text-[38px]"
            >
              What Our Clients Say About Us
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mx-auto max-w-[700px] text-base leading-7 text-[#555] sm:text-lg"
            >
              Our clients rave about the exceptional service and heartfelt dedication of our team. With countless positive reviews and loyal customers, their experiences reflect our commitment to excellence and the real difference we make in their lives. Discover why our clients trust us to deliver outstanding results every time.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
            {testimonialData.map((skill) => (
              <motion.article
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: Number(skill.aosDelay) / 1000 }}
                className="group rounded-2xl bg-white p-7 text-center shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)] sm:p-8"
              >
                <div className="grid place-items-center">
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="h-[68px] w-[68px] rounded-full border-4 border-[#f8e7df] object-cover shadow-sm"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-1 text-[#f4c430]">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="mt-4 text-[15px] leading-6 text-[#555] sm:text-[16px]">
                  {skill.description}
                </p>
                <p className="mt-4 text-center font-bold text-[#333]">{skill.name}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
