import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "lucide-react"; // For star ratings
import client1 from "../../Assests/client1.png";
import client2 from "../../Assests/client2.png";
import client3 from "../../Assests/client3.png";
import client4 from "../../Assests/client4.png";
import review1 from "../../Assests/review1.jpg";   
import review2 from "../../Assests/review2.jpg"; 
import review3 from "../../Assests/review3.jpg";

// Dummy testimonial data
const testimonials = [
  {
    id: 1,
    name: "Palwinder singh",
    role: "Patti construction",
    avatar: review1,
    quote: "The team delivered a stunning website that exceeded our expectations. Highly recommend!",
    rating: 5,
    service: "Web Development",
  },
  {
    id: 2,
    name: "Manveer singh",
    role: "j.k construction",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "Their digital marketing strategies skyrocketed our conversions. Absolute game-changer.",
    rating: 4.5,
    service: "Digital Marketing",
  },
  {
    
    id: 3,
    name: "Joban singh",
    role: "Founder, CodeZap",
    avatar: review2,
    quote:
      "Working with this team was a breeze. They took our vision and turned it into a sleek, user-friendly app that our customers love. Their attention to detail and proactive communication made the process seamless.",
    rating: 5,
    service: "App Development",
    isLong: true, // For longer testimonials
  },
  {
    id: 4,
    name: "jashan",
    role: "Web-dev, Jaashannn",
    avatar: review3,
    quote: "Fast, reliable, and creative. Their UI/UX design transformed our product.",
    rating: 4.8,
    service: "UI/UX Design",
  },
  // {
  //   id: 5,
  //   name: "Laura Kim",
  //   role: "COO, SkyVibe",
  //   avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  //   quote: "The SEO campaign they ran for us doubled our organic traffic in just 3 months!",
  //   rating: 5,
  //   service: "Digital Marketing",
  // },
  // {
  //   id: 6,
  //   name: "Jaashannn",
  //   role: "Product Manager, TechTrend",
  //   avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  //   quote:
  //     "From concept to launch, their team guided us every step of the way. The final product was not only visually stunning but also incredibly functional. We’ve received amazing feedback from our users!",
  //   rating: 5,
  //   service: "Web Development",
  //   isLong: true,
  // },
];

// Dummy client logos
const clientLogos = [
  client1,
  client2,
  client3,
  client4,
];

// Video testimonial placeholder
const videoTestimonial = {
  name: "Robert Rodriguez",
  role: "Founder, GrowEasy",
  thumbnail: "https://randomuser.me/api/portraits/men/6.jpg",
  rating: 5,
  service: "Digital Marketing",
};

const TestimonialSection = () => {
  const [selectedService, setSelectedService] = useState("All");
  const [ratingCount, setRatingCount] = useState(0);

  // Filter testimonials by service
  const filteredTestimonials =
    selectedService === "All"
      ? testimonials
      : testimonials.filter((t) => t.service === selectedService);

  // Animate rating counter
  useEffect(() => {
    let start = 0;
    const end = 4.8; // Average rating
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 100);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setRatingCount(start.toFixed(1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Service filter options
  const services = [
    "All",
    "Web Development",
    "Digital Marketing",
    "App Development",
    "UI/UX Design",
  ];

  // Framer Motion variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white px-4 py-20 md:px-12">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        variants={headingVariants}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          What Our Clients Say
        </h2>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 96, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Average Rating */}
      <div className="text-center mb-12">
        <p className="text-2xl font-semibold">
          <span className="text-[#00ff88]">{ratingCount}</span>/5 from 100+ happy
          clients
        </p>
      </div>

      {/* Service Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => setSelectedService(service)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedService === service
                ? "bg-[#00ff88] text-[#1e1e2f]"
                : "bg-[#2a2a4a] text-white hover:bg-[#3a3a5a]"
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Video Testimonial */}
        <motion.div
          className="relative rounded-xl overflow-hidden shadow-xl"
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          viewport={{ once: true }}
        >
          <img
            src={videoTestimonial.thumbnail}
            alt="Video testimonial"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <button className="w-12 h-12 bg-[#00ff88] rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#1e1e2f]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="mt-4 font-semibold">{videoTestimonial.name}</p>
              <p className="text-sm">{videoTestimonial.role}</p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 text-[#00ff88]"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quote Cards */}
        {filteredTestimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className={`p-6 rounded-xl shadow-lg backdrop-blur-md bg-white bg-opacity-10 border border-[#3a3a5a] ${
              testimonial.isLong ? "md:col-span-2" : ""
            }`}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-300">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-200 mb-4">{testimonial.quote}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(testimonial.rating)
                      ? "text-[#00ff88]"
                      : "text-gray-500"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Client Logos Strip */}
      <div className="mt-16 overflow-hidden bg-white rounded-lg shadow-lg">
        <h3 className="text-center text-xl font-semibold mb-6 text-[#1e1e2f]">
          Trusted by Leading Brands
        </h3>
        <div className="flex animate-marquee">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Client logo"
              className="h-14 mx-8 mb-4 opacity-100 hover:grayscale hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;