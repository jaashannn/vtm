import React from "react";
import { motion } from "framer-motion";

const ServiceWebApplicationSection = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Web Applications Development
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </h1>
        <motion.p
          className="text-gray-300 text-lg tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our web application development company is dedicated to providing top-notch solutions that meet the needs of our clients. We understand the importance of engaging and functional web applications in the digital world. As experts in the field, we offer a range of services including website design, user interface development, and content management system integration. Our team of skilled professionals strives to deliver exceptional results tailored to each client's specifications. We stay up-to-date with the latest trends and technologies to ensure that our applications are not only visually appealing but also user-friendly and optimized for search engines. Whether you are a small business or a large corporation, we have the expertise and resources to create innovative and functional web applications that will enhance your online presence. Trust us to provide you with the high-quality solutions your company deserves.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ServiceWebApplicationSection;