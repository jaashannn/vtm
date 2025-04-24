import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiPlay, FiPause, FiFilter, FiX } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

// Dummy data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechNova Inc.",
    quote: "Virtual Tech Masters transformed our online presence completely. Our traffic increased by 300% in just 3 months!",
    rating: 5,
    service: "Digital Marketing",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    video: false
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "StartUpGrid",
    quote: "The web application they built for us exceeded all expectations. The team was professional, creative, and delivered ahead of schedule.",
    rating: 5,
    service: "Web Development",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    video: false
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Product Manager",
    company: "DesignHub",
    quote: "Their UI/UX design work is exceptional. They took our vague ideas and turned them into a beautiful, intuitive interface that our users love.",
    rating: 4,
    service: "UI/UX Design",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    video: false
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO",
    company: "DataFlow Systems",
    quote: "We partnered with Virtual Tech Masters for a complex cloud migration project. Their technical expertise and problem-solving skills saved us months of work and countless headaches. The team was available around the clock to ensure a smooth transition with zero downtime.",
    rating: 5,
    service: "Cloud Services",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    video: false
  },
  {
    id: 5,
    name: "Lisa Wong",
    role: "E-commerce Manager",
    company: "StyleTrendz",
    quote: "Our conversion rates improved dramatically after their optimization of our online store. The data-driven approach made all the difference.",
    rating: 5,
    service: "Digital Marketing",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    video: true
  },
  {
    id: 6,
    name: "James Peterson",
    role: "Founder",
    company: "AppVenture",
    quote: "As a startup, we needed a partner who could move fast without sacrificing quality. Virtual Tech Masters was the perfect fit - they understood our vision and helped us build an MVP that impressed our investors.",
    rating: 4,
    service: "Web Development",
    avatar: "https://randomuser.me/api/portraits/men/81.jpg",
    video: false
  }
];

const clientLogos = [
  "https://via.placeholder.com/120x60?text=TechNova",
  "https://via.placeholder.com/120x60?text=StartUpGrid",
  "https://via.placeholder.com/120x60?text=DesignHub",
  "https://via.placeholder.com/120x60?text=DataFlow",
  "https://via.placeholder.com/120x60?text=StyleTrendz",
  "https://via.placeholder.com/120x60?text=AppVenture"
];

const services = ["All", "Web Development", "Digital Marketing", "UI/UX Design", "Cloud Services"];

const TestimonialPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const { theme } = useContext(ThemeContext);
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const filteredTestimonials = activeFilter === "All" 
    ? testimonials 
    : testimonials.filter(t => t.service === activeFilter);

  React.useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filteredTestimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay, filteredTestimonials.length]);

  const ratingAverage = (testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1);
  const totalRatings = 127;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const starVariants = {
    hidden: { scale: 0 },
    visible: (i) => ({
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200
      }
    })
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'} py-16 px-4 sm:px-6 lg:px-8`}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header with animated rating */}
        <motion.div variants={headingVariants} className="text-center mb-16">
          <motion.h2 
            className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500`}
            whileHover={{ scale: 1.02 }}
          >
            What Our Clients Say
          </motion.h2>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  custom={star}
                  variants={starVariants}
                  className="text-yellow-400 text-2xl"
                >
                  ★
                </motion.div>
              ))}
            </div>
            <motion.p 
              className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {ratingAverage} from {totalRatings}+ reviews
            </motion.p>
          </div>
        </motion.div>

        {/* Client logos strip */}
        <motion.div 
          variants={itemVariants}
          className="mb-16 overflow-hidden"
        >
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 w-16 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900' : 'bg-gradient-to-r from-gray-50'} to-transparent z-10`}></div>
            <div className={`absolute inset-y-0 right-0 w-16 ${theme === 'dark' ? 'bg-gradient-to-l from-gray-900' : 'bg-gradient-to-l from-gray-50'} to-transparent z-10`}></div>
            
            <motion.div
              className="flex gap-12 py-4"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <img 
                  key={index} 
                  src={logo} 
                  alt="Client logo" 
                  className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Filter controls */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded-lg transition-colors md:hidden`}
            >
              <FiFilter /> Filter
            </button>
            
            <div className="hidden md:flex gap-2">
              {services.map(service => (
                <button
                  key={service}
                  onClick={() => setActiveFilter(service)}
                  className={`px-4 py-2 rounded-full transition-all ${activeFilter === service ? 'bg-purple-600 text-white' : theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {service}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setAutoPlay(!autoPlay)}
              className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded-lg transition-colors`}
            >
              {autoPlay ? <><FiPause /> Pause</> : <><FiPlay /> Play</>}
            </button>
          </div>
          
          {/* Mobile filter dropdown */}
          {showFilter && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 md:hidden"
            >
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg p-4`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Filter by service</h3>
                  <button onClick={() => setShowFilter(false)}>
                    <FiX className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {services.map(service => (
                    <button
                      key={service}
                      onClick={() => {
                        setActiveFilter(service);
                        setShowFilter(false);
                      }}
                      className={`px-3 py-2 text-sm rounded-full transition-all ${activeFilter === service ? 'bg-purple-600 text-white' : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Testimonials grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`${theme === 'dark' ? 'bg-gray-800 bg-opacity-60' : 'bg-white bg-opacity-90'} backdrop-blur-md rounded-xl p-6 shadow-lg overflow-hidden transition-all duration-300 ${index === currentIndex ? 'ring-2 ring-purple-500' : ''}`}
              style={{
                boxShadow: theme === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            >
              {testimonial.video ? (
                <div className="relative mb-6 rounded-lg overflow-hidden">
                  <div className={`aspect-w-16 aspect-h-9 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-800 ${theme === 'dark' ? 'opacity-60' : 'opacity-40'}`}></div>
                    <button className="relative z-10 w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                      <FiPlay className="text-purple-600 text-2xl ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <p className="text-white font-medium">{testimonial.name}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div>
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              )}
              
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{testimonial.quote}</p>
              
              <div className="text-sm text-purple-400 font-medium">
                {testimonial.service}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel indicators */}
        <motion.div variants={itemVariants} className="flex justify-center gap-2">
          {filteredTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoPlay(false);
                setTimeout(() => setAutoPlay(true), 5000);
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-purple-500 w-6' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TestimonialPage;