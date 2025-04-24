import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutourvaluesimg from "../../Assests/aboutourvaluesimg.avif";

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

const AboutOurValue = () => {
  return (
    <section className="flex justify-center items-center gap-12 min-h-[90vh] flex-col-reverse md:flex-row px-4 py-16 md:p-12 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white">
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
          src={aboutourvaluesimg}
          alt="Our Values"
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg" />
      </motion.div>

      <motion.div
        className="flex flex-col gap-6 text-center items-center w-full md:w-1/2 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mt-7"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Values
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </motion.h1>

        <motion.p variants={itemVariants} className="tracking-wide font-bold text-gray-300">
          <span className="text-[#00ff88]">Innovation:</span> We embrace innovation in every project, constantly pushing for new ideas and better solutions.
        </motion.p>
        <motion.p variants={itemVariants} className="tracking-wide font-bold text-gray-300">
          <span className="text-[#00ff88]">Collaboration:</span> We believe in the power of collaboration, working closely with our clients to understand their unique needs and goals.
        </motion.p>
        <motion.p variants={itemVariants} className="tracking-wide font-bold text-gray-300">
          <span className="text-[#00ff88]">Excellence:</span> Our commitment to excellence is reflected in the quality of our work and the satisfaction of our clients.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link to="/our-values">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(0, 255, 136, 0.5)" }}
              whileTap={{ scale: 0.95 }}
               className="px-8 py-3 bg-white/15 text-white rounded-full font-bold uppercase tracking-wide shadow-md hover:bg-white/25 backdrop-blur-sm border border-white/25 transition-all flex items-center justify-center gap-2"
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutOurValue;