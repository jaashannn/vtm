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

const AboutMeetTeamSection = () => {
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
          Meet the Team
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </h1>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={itemVariants}
          className="flex-1 p-6 rounded-lg bg-white/10 backdrop-blur-md border border-[#3a3a5a] shadow-lg text-center"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 255, 136, 0.2)" }}
        >
          <h3 className="text-xl font-bold text-[#00ff88] mb-2">Founder</h3>
          <strong className="text-white text-lg">Lovepreet Singh</strong>
          <p className="text-gray-300 mt-2">
            Lovepreet Singh is the visionary behind Virtual Tech Masters. With a background in IT, they bring a wealth of expertise to the table.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex-1 p-6 rounded-lg bg-white/10 backdrop-blur-md border border-[#3a3a5a] shadow-lg text-center"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 255, 136, 0.2)" }}
        >
          <h3 className="text-xl font-bold text-[#00ff88] mb-2">Creative Director</h3>
          <strong className="text-white text-lg">Gagandeep Sran</strong>
          <p className="text-gray-300 mt-2">
            Gagandeep Sran is the creative genius responsible for ensuring our projects not only function flawlessly but also look stunning and provide exceptional user experiences.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMeetTeamSection;