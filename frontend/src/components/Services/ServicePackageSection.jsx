import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import digitalpackageimg1 from "../../Assests/digitalpackageimg1.avif";
import digitalpackageimg2 from "../../Assests/digitalpackageimg2.avif";
import digitalpackageimg3 from "../../Assests/digitalpackageimg3.avif";
import websitepackageimg1 from "../../Assests/websitepackageimg1.avif";
import websitepackageimg2 from "../../Assests/websitepackageimg2.avif";
import websitepackageimg3 from "../../Assests/websitepackageimg3.avif";
import { FaCheck } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0, 255, 136, 0.2)" },
};

const ServicePackageSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white flex flex-col gap-16" id="service-package-section">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      {/* Digital Marketing Packages */}
      <div className="flex flex-col gap-12 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Digital Marketing Packages
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </motion.h1>

        <motion.div
          className="relative overflow-x-auto rounded-xl border border-[#3a3a5a] bg-white/5 backdrop-blur-md shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-[#3a3a5a]">
                <th className="px-8 py-6 text-left"></th>
                <th className="px-8 py-6 text-center">
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <img src={digitalpackageimg1} alt="Silver Package" className="w-full h-32 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-bold text-[#00ff88] mt-4">Silver Package</h2>
                    <p className="text-lg mt-2">$550 CAD</p>
                  </motion.div>
                </th>
                <th className="px-8 py-6 text-center">
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <img src={digitalpackageimg2} alt="Gold Package" className="w-full h-32 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-bold text-[#00ff88] mt-4">Gold Package</h2>
                    <p className="text-lg mt-2">$999 CAD</p>
                  </motion.div>
                </th>
                <th className="px-8 py-6 text-center">
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <img src={digitalpackageimg3} alt="Platinum Package" className="w-full h-32 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-bold text-[#00ff88] mt-4">Platinum Package</h2>
                    <p className="text-lg mt-2">Custom Pricing</p>
                  </motion.div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Platforms Managed</td>
                <td className="px-8 py-4 text-center">FB, IG</td>
                <td className="px-8 py-4 text-center">FB, IG, LinkedIn, TikTok</td>
                <td className="px-8 py-4 text-center">All (as needed)</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Daily Posts</td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td><td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td><td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Custom Graphics</td>
                <td className="px-8 py-4 text-center">7/month</td>
                <td className="px-8 py-4 text-center">15/month</td>
                <td className="px-8 py-4 text-center">Tailored</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Custom Videos</td>
                <td className="px-8 py-4 text-center">2/month</td>
                <td className="px-8 py-4 text-center">4/month</td>
                <td className="px-8 py-4 text-center">Tailored</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Blog Posts</td>
                <td className="px-8 py-4 text-center">2/month</td>
                <td className="px-8 py-4 text-center">3 + SEO optimized</td>
                <td className="px-8 py-4 text-center">Tailored</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Ads (FB/IG)</td>
                <td className="px-8 py-4 text-center">1-time setup</td>
                <td className="px-8 py-4 text-center">Monthly management</td>
                <td className="px-8 py-4 text-center">Google/YouTube Ads</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Google Ad Sense</td>
                <td className="px-8 py-4 text-center"><span className="text-red-500 font-bold">✕</span></td>

                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                    <span className="ml-2 font-medium text-white">($200 included)</span>
                  </div>

                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Email Marketing</td>
                <td className="px-8 py-4 text-center"><span className="text-red-500 font-bold">✕</span></td>
                <td className="px-8 py-4 text-center">1/month</td>
                <td className="px-8 py-4 text-center">Advanced Funnels</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">SEO</td>
                <td className="px-8 py-4 text-center">Basic</td>
                <td className="px-8 py-4 text-center">Local + On-Page</td>
                <td className="px-8 py-4 text-center">Full SEO Strategy</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Strategy Support</td>
                <td className="px-8 py-4 text-center">Monthly report</td>
                <td className="px-8 py-4 text-center">Dedicated Manager</td>
                <td className="px-8 py-4 text-center">Full Campaign Team</td>
              </tr>
              <tr>
                <td className="px-8 py-6"></td>
                <td className="px-8 py-6 text-center">
                  <Link to="/subscribe">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 font-bold rounded-full text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-all"
                    >
                      Subscribe
                    </motion.button>
                  </Link>
                </td>
                <td className="px-8 py-6 text-center">
                  <Link to="/subscribe">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 font-bold rounded-full text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-all"
                    >
                      Subscribe
                    </motion.button>
                  </Link>
                </td>
                <td className="px-8 py-6 text-center">
                  <Link to="/subscribe">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 font-bold rounded-full text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-all"
                    >
                      Get Quote
                    </motion.button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Web Development Packages */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mt-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Web Development Packages
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          />
        </motion.h1>

        <motion.div
          className="relative overflow-x-auto rounded-xl border border-[#3a3a5a] bg-white/5 backdrop-blur-md shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-[#3a3a5a]">
                <th className="px-8 py-6 text-left"></th>
                <th className="px-8 py-6 text-center">
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <img src={websitepackageimg1} alt="Silver Package" className="w-full h-32 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-bold text-[#00ff88] mt-4">Silver Package</h2>
                    <p className="text-lg mt-2">$550 CAD</p>
                  </motion.div>
                </th>
                <th className="px-8 py-6 text-center">
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <img src={websitepackageimg2} alt="Gold Package" className="w-full h-32 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-bold text-[#00ff88] mt-4">Gold Package</h2>
                    <p className="text-lg mt-2">$1150 CAD</p>
                  </motion.div>
                </th>
                <th className="px-8 py-6 text-center">
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <img src={websitepackageimg3} alt="Platinum Package" className="w-full h-32 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-bold text-[#00ff88] mt-4">Platinum Package</h2>
                    <p className="text-lg mt-2">Custom Pricing</p>
                  </motion.div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Website Type</td>
                <td className="px-8 py-4 text-center">Basic Business Website</td>
                <td className="px-8 py-4 text-center">Advanced Business Website</td>
                <td className="px-8 py-4 text-center">E-commerce / Custom Web App / Portals</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Pages Included</td>
                <td className="px-8 py-4 text-center">Up to 5 Pages</td>
                <td className="px-8 py-4 text-center">Up to 10 Pages</td>
                <td className="px-8 py-4 text-center">Unlimited Pages (As per Requirement)</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Platform</td>
                <td className="px-8 py-4 text-center">WordPress / Wix</td>
                <td className="px-8 py-4 text-center">WordPress / Shopify / Custom</td>
                <td className="px-8 py-4 text-center">Any CMS or Fully Custom Built</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Responsive Design (Mobile-Friendly)</td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Contact / Inquiry Form</td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Basic SEO Setup</td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
                <td className="px-8 py-4 text-center">Advanced SEO Integration</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Social Media Integration</td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">

                <td className="px-8 py-4 font-medium">Image Gallery or Portfolio</td>

                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                    <span className="ml-2 font-medium text-white">(Simple Gallery)</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                    <span className="ml-2 font-medium text-white">(Advanced Display Options)</span>
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                    <span className="ml-2 font-medium text-white">(Custom Display + Filters)</span>
                  </div>
                </td>
                {/* <td className="px-8 py-4 text-center">✅ (Simple Gallery)</td>
                <td className="px-8 py-4 text-center">✅ (Advanced Display Options)</td>
                <td className="px-8 py-4 text-center">✅ (Custom Display + Filters)</td> */}
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Google Maps Integration</td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Blog Setup</td>
                <td className="px-8 py-4 text-center"><span className="text-red-500 font-bold">✕</span></td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Payment Gateway Integration</td>
                <td className="px-8 py-4 text-center"><span className="text-red-500 font-bold">✕</span></td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                    <span className="ml-2 font-medium text-white">(Multi-gateway or International Options)</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Newsletter Signup Integration</td>
                <td className="px-8 py-4 text-center"><span className="text-red-500 font-bold">✕</span></td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">E-Commerce Features (Products, Cart, Checkout)</td>
                <td className="px-8 py-4 text-center"><span className="text-red-500 font-bold">✕</span></td>
                <td className="px-8 py-4 text-center">Basic E-Commerce (up to 10 products)</td>
                <td className="px-8 py-4 text-center">Full E-Commerce / Multivendor / Subscriptions</td>
              </tr>
              <tr className="border-b border-[#3a3a5a] hover:bg-white/5">
                <td className="px-8 py-4 font-medium">Custom Features / Modules</td>
                <td className="px-8 py-4 text-center"><span className="text-red-500 font-bold">✕</span></td>
                <td className="px-8 py-4 text-center"><span className="text-red-500 font-bold">✕</span></td>
                <td className="px-8 py-4">
                  <div className="flex items-center justify-center text-green-600">
                    <FaCheck />
                    <span className="ml-2 font-medium text-white"> (Fully Customizable)</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-8 py-6"></td>
                <td className="px-8 py-6 text-center">
                  <Link to="/subscribe">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 font-bold rounded-full text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-all"
                    >
                      Subscribe
                    </motion.button>
                  </Link>
                </td>
                <td className="px-8 py-6 text-center">
                  <Link to="/subscribe">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 font-bold rounded-full text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-all"
                    >
                      Subscribe
                    </motion.button>
                  </Link>
                </td>
                <td className="px-8 py-6 text-center">
                  <Link to="/subscribe">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 font-bold rounded-full text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 transition-all"
                    >
                      Get Quote
                    </motion.button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePackageSection;