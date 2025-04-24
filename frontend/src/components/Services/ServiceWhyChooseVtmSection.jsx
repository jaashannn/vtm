import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import servicewhychooseimg from "../../Assests/servicewhychooseimg.avif";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ServiceWhyChooseVtmSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white flex flex-col items-center gap-12 relative">
      {/* Grid background (same as ServicePackageSection) */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Image Box with animation */}
        <motion.div
          className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden border border-[#3a3a5a] shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={servicewhychooseimg}
            alt="Virtual Tech Masters Services"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Box */}
        <motion.div
          className="flex flex-col items-center gap-8 text-center max-w-4xl"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-[#00ff88]"
            variants={itemVariants}
          >
            Why Choose Virtual Tech Masters
          </motion.h1>

          <motion.div className="flex flex-col gap-6 text-left md:text-center" variants={containerVariants}>
            <motion.p variants={itemVariants} className="text-gray-300">
              <strong className="font-bold text-white">Integrated Approach:</strong> We seamlessly integrate
              digital marketing and web development strategies to create a
              cohesive online presence for your brand.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-300">
              <strong className="font-bold text-white">Experienced Team:</strong> Our team of seasoned
              professionals brings a wealth of experience and creativity to every
              project.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-300">
              <strong className="font-bold text-white">Results-Driven:</strong> We are committed to delivering
              measurable results that contribute to the success and growth of your
              business.
            </motion.p>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold mt-8 text-[#00ff88]"
            variants={itemVariants}
          >
            Let's Transform Your Digital Landscape
          </motion.h1>

          <motion.div className="flex flex-col gap-6" variants={containerVariants}>
            <motion.p variants={itemVariants} className="text-gray-300">
              <strong className="font-bold text-white">Ready to elevate your digital presence?</strong>
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-300">
              Partner with Virtual Tech Masters for a holistic approach to digital
              marketing and web development. Contact us today to discuss how we
              can tailor our services to meet your unique needs.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="service-package-section"
              smooth={true}
              duration={500}
              className="group relative h-12 w-48 rounded-full cursor-pointer overflow-hidden transition-all duration-500 mt-6"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] flex items-center justify-center text-white text-sm font-bold transition-all duration-500">
                View Packages
              </span>
              {/* <span className="absolute inset-0 bg-black flex items-center justify-center text-gray-100 text-sm font-bold transition-all duration-500 opacity-0 group-hover:opacity-100">
                Get Started
              </span> */}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServiceWhyChooseVtmSection;