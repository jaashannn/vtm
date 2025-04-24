import React from "react";
import { motion } from "framer-motion";
import servicedevelopmentimg from "../../Assests/servicedevelopmentimg.avif";

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

const ServiceDevelopmentSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <motion.div
        className="w-full md:w-1/2 flex flex-col gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white/10 backdrop-blur-md border border-[#3a3a5a] shadow-lg">
          <h1 className="text-3xl font-bold text-[#00ff88] mb-2">Web Development</h1>
          <h2 className="text-xl font-semibold text-white mb-2">Custom Website Design</h2>
          <p className="text-gray-300">
            Your website is your digital storefront. Our expert web developers craft visually stunning and user-friendly websites tailored to your brand identity, ensuring a seamless user experience across all devices.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white/10 backdrop-blur-md border border-[#3a3a5a] shadow-lg">
          <h1 className="text-3xl font-bold text-[#00ff88] mb-2">E-Commerce Solutions</h1>
          <p className="text-gray-300">
            Take your business online with our e-commerce development services. We build secure and scalable e-commerce platforms that facilitate easy transactions, enhance user experiences, and drive sales.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="p-6 rounded-lg bg-white/10 backdrop-blur-md border border-[#3a3a5a] shadow-lg">
          <h1 className="text-3xl font-bold text-[#00ff88] mb-2">Mobile App Development</h1>
          <p className="text-gray-300">
            Reach your audience on the go with a custom mobile app. Our developers create intuitive and feature-rich applications that align with your business goals and provide a seamless mobile experience for your users.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <img
          src={servicedevelopmentimg}
          alt="Service Development"
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg" />
      </motion.div>
    </section>
  );
};

export default ServiceDevelopmentSection;