import React from "react";
import { motion } from "framer-motion";
import ContactSection from "./ContactSection";

const ContactPage = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[#0f0f1a] to-[#1e1e3a] text-white"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Header Section */}
      <motion.div 
        className="relative py-20 px-8 text-center"
        variants={childVariants}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00a1ff]"
            variants={childVariants}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={childVariants}
          >
            Get in touch with our team for expert digital solutions
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content - Equal Width Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Office Info - Now matching form height */}
          <motion.div 
            className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 shadow-xl border border-[#2a2a4a] h-full"
            variants={childVariants}
          >
            <h2 className="text-3xl font-bold mb-8">Our Office</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-[#00ff88]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Location</h3>
                  <p className="text-gray-400">9166 34A Ave NW, Edmonton, AB, T6E5P5</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-[#00a1ff]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#00a1ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Phone</h3>
                  <a href="tel:+18257337276" className="text-[#00a1ff] hover:text-[#00ff88] transition-colors">
                    +1-825-733-7276
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-[#ff00ff]/10 rounded-full">
                  <svg className="w-6 h-6 text-[#ff00ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <a href="mailto:info@virtualtechmasters.com" className="text-[#ff00ff] hover:text-[#00a1ff] transition-colors">
                    info@virtualtechmasters.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Expanded Contact Form - Now larger and cleaner */}
          <motion.div 
            className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 shadow-xl border border-[#2a2a4a]"
            variants={childVariants}
          >
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-4 bg-[#2a2a4a]/50 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-4 bg-[#2a2a4a]/50 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full p-4 bg-[#2a2a4a]/50 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full p-4 bg-[#2a2a4a]/50 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-white/10 text-gray-900 rounded-full font-medium shadow-md hover:bg-white/20 hover:shadow-lg backdrop-blur-sm border border-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/20 transition-all"

                type="button"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        variants={childVariants}
      >
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a4a]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.123456789012!2d-113.12345678901234!3d53.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDA3JzI0LjQiTiAxMTPCsDA3JzI0LjQiVw!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            className="opacity-90 hover:opacity-100 transition-opacity"
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;