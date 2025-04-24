import React, { useContext } from "react";
import { motion } from "framer-motion";
import serviceimg1 from "../../Assests/homeserviceimg1.avif";
import serviceimg2 from "../../Assests/homeserviceimg2.avif";
import serviceimg3 from "../../Assests/homeserviceimg3.avif";
import { ThemeContext } from "../../context/ThemeContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0, 255, 136, 0.2)", transition: { duration: 0.3 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HomeServiceSection = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`py-16 px-4 md:px-12 min-h-screen flex flex-col justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a]' : 'bg-gradient-to-br from-gray-50 to-gray-100'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className={`border ${theme === 'dark' ? 'border-[#3a3a5a]' : 'border-gray-200'}`}></div>
          ))}
        </div>
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial="hidden"
        whileInView="visible"
        variants={headingVariants}
        viewport={{ once: true }}
      >
        <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Our Services</h1>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 96, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Service Cards */}
      <motion.div
        className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6 max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Service Card 1 */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className={`w-full md:w-[387px] rounded-lg overflow-hidden flex flex-col text-center ${theme === 'dark' ? 'bg-white/10 backdrop-blur-md border-[#3a3a5a]' : 'bg-white backdrop-blur-sm border-gray-200'} border shadow-lg`}
        >
          <div className="relative overflow-hidden">
            <motion.img
              src={serviceimg1}
              alt="Website Development"
              className="w-full h-[304px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Website Development</h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              We craft responsive, high-performance websites tailored to your business goals.
            </p>
          </div>
        </motion.div>

        {/* Service Card 2 */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className={`w-full md:w-[387px] rounded-lg overflow-hidden flex flex-col text-center ${theme === 'dark' ? 'bg-white/10 backdrop-blur-md border-[#3a3a5a]' : 'bg-white backdrop-blur-sm border-gray-200'} border shadow-lg`}
        >
          <div className="relative overflow-hidden">
            <motion.img
              src={serviceimg2}
              alt="Digital Marketing"
              className="w-full h-[304px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Digital Marketing</h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Boost your online presence with data-driven strategies and targeted campaigns.
            </p>
          </div>
        </motion.div>

        {/* Service Card 3 */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className={`w-full md:w-[387px] rounded-lg overflow-hidden flex flex-col text-center ${theme === 'dark' ? 'bg-white/10 backdrop-blur-md border-[#3a3a5a]' : 'bg-white backdrop-blur-sm border-gray-200'} border shadow-lg`}
        >
          <div className="relative overflow-hidden">
            <motion.img
              src={serviceimg3}
              alt="Logo Design"
              className="w-full h-[304px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Logo Design</h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Create a memorable brand identity with unique, professional logo designs.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeServiceSection;