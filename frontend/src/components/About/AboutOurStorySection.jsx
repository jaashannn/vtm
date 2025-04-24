import React from "react";
import { motion } from "framer-motion";

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

const AboutOurStorySection = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white min-h-[80vh] flex flex-col justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-12">
          Our Story & Mission
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </h1>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-lg bg-white/10 backdrop-blur-md border border-[#3a3a5a] shadow-lg"
        >
          <h2 className="text-2xl font-bold text-[#00ff88] mb-4">Our Story</h2>
          <p className="text-gray-300">
            Founded in 2023, Virtual Tech Masters started with a vision to transform ideas into exceptional digital experiences. From our humble beginnings, we’ve grown into a dynamic team of passionate professionals dedicated to pushing the boundaries of web development.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-6 rounded-lg bg-white/10 backdrop-blur-md border border-[#3a3a5a] shadow-lg"
        >
          <h2 className="text-2xl font-bold text-[#00ff88] mb-4">Our Mission</h2>
          <p className="text-gray-300">
            <span className="font-bold">Empowering Your Digital Presence:</span> Our mission is to empower businesses through bespoke digital solutions. We believe in creating websites and applications that not only meet but exceed the expectations of our clients and their users.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutOurStorySection;