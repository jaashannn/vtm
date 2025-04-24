import React from "react";
import { motion } from "framer-motion";
import whychooseimg from "../../Assests/aboutwhychoosevtmimg.avif";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AboutWhyChooseVtmSection = () => {
  return (
    <section className="flex justify-center items-center p-4 md:p-12 min-h-[80vh] flex-col-reverse md:flex-row gap-8 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <motion.div
        className="w-full md:w-1/2 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <img
          src={whychooseimg}
          alt="Why Choose VTM"
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg" />
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex flex-col gap-6 items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose Virtual Tech Masters
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </motion.h1>

        <ul className="flex flex-col justify-center items-center gap-4 tracking-wide">
          <motion.li variants={itemVariants} className="w-full md:w-3/5 font-bold text-gray-300">
            <span className="text-[#00ff88]">Expertise:</span> We bring years of experience and a proven track record in digital and web development.
          </motion.li>
          <motion.li variants={itemVariants} className="w-full md:w-3/5 font-bold text-gray-300">
            <span className="text-[#00ff88]">Innovation:</span> Our team is always exploring new technologies and approaches to keep your digital presence ahead of the curve.
          </motion.li>
          <motion.li variants={itemVariants} className="w-full md:w-3/5 font-bold text-gray-300">
            <span className="text-[#00ff88]">Client-Centric Approach:</span> Your success is our priority. We work closely with you to understand your goals and deliver tailored solutions.
          </motion.li>
        </ul>
      </motion.div>
    </section>
  );
};

export default AboutWhyChooseVtmSection;