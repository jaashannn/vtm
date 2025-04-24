import React from "react";
import { motion } from "framer-motion";
import servicelandingimg from "../../Assests/servicelandingimg.avif";

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

const ServicelandingPageSection = () => {
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
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl mt-12 md:text-5xl font-bold">
          Our Services
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-center items-center tracking-wide py-12 px-4 lg:px-12 gap-12 relative z-10">
        <motion.div
          className="w-full lg:w-2/5 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img
            src={servicelandingimg}
            alt="Digital Marketing Services"
            className="w-3/5 lg:w-full max-w-md rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg" />
        </motion.div>

        <motion.div
          className="w-full lg:w-3/5 flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-4 justify-center items-center text-center">
            <h1 className="text-2xl font-bold text-[#00ff88] underline">Digital Marketing</h1>
            <h2 className="text-xl text-white">Strategic Planning</h2>
            <p className="w-4/5 text-gray-300">
              Unlock the potential of your brand with our strategic digital marketing services. We tailor comprehensive plans to ensure your online presence aligns with your business objectives. From social media management to content marketing, we've got you covered.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 justify-center items-center text-center">
            <h1 className="text-2xl font-bold text-[#00ff88] underline">Search Engine Optimization (SEO)</h1>
            <p className="w-4/5 text-gray-300">
              Increase your visibility on search engines and drive organic traffic to your website. Our SEO experts employ cutting-edge techniques to enhance your website's ranking and ensure your business stands out in a crowded digital landscape.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 justify-center items-center text-center">
            <h1 className="text-2xl font-bold text-[#00ff88] underline">Pay-Per-Click (PPC) Advertising</h1>
            <p className="w-4/5 text-gray-300">
              Optimize your ad spend with our PPC advertising services. We create targeted campaigns that reach the right audience, driving qualified leads and maximizing your return on investment.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4 justify-center items-center text-center">
            <h1 className="text-2xl font-bold text-[#00ff88] underline">Content Marketing</h1>
            <p className="w-4/5 text-gray-300">
              Engage your audience with captivating content. Our content marketing strategies focus on creating valuable, shareable content that establishes your brand as an industry authority and resonates with your target audience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicelandingPageSection;