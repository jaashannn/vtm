import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import vtmlandingimg from "../../Assests/homelandingpage.avif";
import vtmlandingimg2 from "../../Assests/homelandingpage2.jpg";
import vtmlandingimg3 from "../../Assests/homelandingpage3.jpg";
import vtmlandingimg4 from "../../Assests/homelandingpage4.avif";
import { ThemeContext } from "../../context/ThemeContext";

const images = [vtmlandingimg, vtmlandingimg2, vtmlandingimg3, vtmlandingimg4];

const services = [
  { name: "Web Development", icon: "💻", description: "Custom websites built to perform" },
  { name: "App Development", icon: "📱", description: "Innovative mobile solutions" },
  { name: "Digital Marketing", icon: "📈", description: "Grow your online presence" },
  { name: "Branding", icon: "🎨", description: "Craft a memorable identity" },
];

const HomeAboutSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 1.1, transition: { duration: 0.7, ease: "easeInOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -5, boxShadow: "0 10px 20px rgba(0, 255, 136, 0.2)" },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className={`relative overflow-hidden py-20 px-4 md:px-8 lg:px-16 ${theme === 'dark' ? 'bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a]' : 'bg-gradient-to-br from-gray-50 to-gray-100'} text-${theme === 'dark' ? 'white' : 'gray-900'}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className={`border ${theme === 'dark' ? 'border-[#3a3a5a]' : 'border-gray-200'}`}></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={headingVariants}
          viewport={{ once: true }}
        >
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div
            className="w-full lg:w-1/2 relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`Our work ${currentImageIndex + 1}`}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${currentImageIndex === index
                      ? "bg-[#00ff88] w-6"
                      : theme === 'dark' ? "bg-white/50 hover:bg-white/80" : "bg-gray-700/50 hover:bg-gray-700/80"
                      }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-8 bg-[#00ff88]/20 w-32 h-32 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-[#ff00ff]/20 w-40 h-40 rounded-full blur-xl"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Who We Are</h3>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                We blend technology and creativity to build websites, apps, and campaigns that not only look great but deliver real results.
                Our focus is on making digital experiences that engage your audience and drive growth.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {services.map((service) => (
                <motion.div
                  key={service.name}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`p-6 rounded-xl backdrop-blur-md ${theme === 'dark' ? 'bg-white/10 border-[#3a3a5a]' : 'bg-gray-900/5 border-gray-200'} border shadow-sm transition-all`}
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{service.name}</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl backdrop-blur-sm border transition-all ${theme === 'dark' ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-gray-900/5 text-gray-900 border-gray-200 hover:bg-gray-900/10'}`}
                >
                  Discover Our Story
                  <span className="ml-2">→</span>
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`ml-4 mt-4 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl backdrop-blur-sm border transition-all ${theme === 'dark' ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-gray-900/5 text-gray-900 border-gray-200 hover:bg-gray-900/10'}`}
                >
                  Contact us
                  <span className="ml-2">→</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;