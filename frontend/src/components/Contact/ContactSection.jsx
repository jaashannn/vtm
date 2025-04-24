import React from "react";
import { motion } from "framer-motion";


const ContactSection = () => {
  // Framer Motion variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3 } },
  };

  return (
    <section className="flex flex-col md:flex-row p-8 min-h-[80vh] tracking-wider bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white items-center justify-center gap-16">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      {/* Contact Info Box */}
      <motion.div
        className="flex flex-col gap-8 z-10 max-w-md"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
      >
        <motion.div variants={headingVariants}>
          <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </motion.div>
        <p className="italic text-gray-300">
          <strong>
            Reach out for expert website development, app development, digital marketing, and logo design solutions.
          </strong>
        </p>
        <p className="italic text-gray-300">
          <strong className="text-xl">Address:</strong>
          <br />
          9166 34A Ave NW, Edmonton, AB, T6E5P5
        </p>
        <p className="italic text-gray-300">
          <strong className="text-xl">Contacts:</strong>
          <br />
          <a href="tel:+18257337276" className="font-semibold text-[#00ff88] hover:text-[#ff00ff] transition-colors">
            +1-825-733-7276
          </a>
          <br />
          <a
            href="mailto:info@virtualtechmasters.com"
            className="font-semibold text-[#00ff88] hover:text-[#ff00ff] transition-colors"
          >
            info@virtualtechmasters.com
          </a>
        </p>
        {/* <div className="flex justify-start gap-6 text-3xl">
          <motion.a href="#" variants={iconVariants} whileHover="hover" className="text-gray-300 hover:text-[#ff00ff]">
            <FaInstagram />
          </motion.a>
          <motion.a href="#" variants={iconVariants} whileHover="hover" className="text-gray-300 hover:text-[#00ff88]">
            <FaXTwitter />
          </motion.a>
          <motion.a href="#" variants={iconVariants} whileHover="hover" className="text-gray-300 hover:text-[#ff00ff]">
            <FaTiktok />
          </motion.a>
          <motion.a href="#" variants={iconVariants} whileHover="hover" className="text-gray-300 hover:text-[#00ff88]">
            <CiLinkedin />
          </motion.a>
        </div> */}
      </motion.div>

      {/* Contact Form Box */}
      <motion.div
        className="flex justify-center items-center z-10"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true }}
      >
        <form className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-7 w-full max-w-md shadow-lg border border-[#3a3a5a]">
          <input
            className="w-full p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:border-transparent transition-all"
            type="text"
            placeholder="Name"
          />
          <input
            className="w-full p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:border-transparent transition-all"
            type="email"
            placeholder="E-Mail I.D."
          />
          <textarea
            className="w-full p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:border-transparent transition-all"
            rows={6}
            placeholder="Enter message"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 w-full py-3 bg-white/10 text-white font-bold rounded-full shadow-md hover:bg-white/20 hover:shadow-lg backdrop-blur-sm border border-white/20 transition-all"
            type="button"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactSection;