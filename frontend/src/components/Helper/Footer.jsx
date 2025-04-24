import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  // Framer Motion variants
  const linkVariants = {
    hover: { scale: 1.05, color: "#00ff88", transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3 } },
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white p-6 md:p-8 font-bold tracking-wider text-sm md:text-base">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/" className="text-xl font-bold text-white">
            Virtual Tech Masters
          </Link>
          <p className="text-gray-400 text-xs mt-2">
            © {currentYear}. All Rights Reserved.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div variants={linkVariants} whileHover="hover">
            <Link to="/termsandconditions" className="text-gray-300 hover:text-[#00ff88]">
              Terms & Conditions
            </Link>
          </motion.div>
          <span className="hidden md:inline-block text-gray-500">•</span>
          <motion.div variants={linkVariants} whileHover="hover">
            <Link to="/privacyandpolicy" className="text-gray-300 hover:text-[#00ff88]">
              Privacy & Policy
            </Link>
          </motion.div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center gap-6 text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#"
            variants={iconVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-[#ff00ff]"
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href="#"
            variants={iconVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-[#00ff88]"
          >
            <FaXTwitter />
          </motion.a>
          <motion.a
            href="#"
            variants={iconVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-[#ff00ff]"
          >
            <FaTiktok />
          </motion.a>
          <motion.a
            href="#"
            variants={iconVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-[#00ff88]"
          >
            <CiLinkedin />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;