import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import homeblogimg1 from "../../Assests/homeblogimg1.avif";
import homeblogimg2 from "../../Assests/homeblogimg2.avif";
import hometestimonialimg1 from "../../Assests/hometestimonialimg1.avif";

// Enhanced blog data with full content
const blogPosts = [
  {
    id: 1,
    title: "Why Having a Strong Online Presence is Crucial for Your Business",
    excerpt: "In today's digital age, having a strong online presence is essential for business success.",
    fullContent: [
      "In today's digital-first world, your online presence is often the first impression customers have of your business. A professional website acts as your 24/7 storefront, accessible to potential customers around the globe at any time.",
      "Digital marketing strategies like SEO and social media marketing help you reach targeted audiences with precision. A well-designed logo and consistent branding across all platforms establish trust and recognition.",
      "Studies show that businesses with strong digital presences grow 40% faster than those without. The key is an integrated approach combining website development, digital marketing, and professional branding."
    ],
    image: homeblogimg1,
    date: "12/27/2023",
    readTime: "4 min read",
    category: "Digital Marketing",
    author: "Sarah Johnson",
    authorRole: "Digital Strategist"
  },
  {
    id: 2,
    title: "The Benefits of Professional Website Development",
    excerpt: "Discover how professional website development can enhance your online presence.",
    fullContent: [
      "A professionally developed website is more than just an online brochure—it's a powerful business tool. Responsive design ensures your site looks perfect on any device, from desktops to smartphones.",
      "Performance optimization means faster load times, reducing bounce rates by up to 50%. Proper website architecture improves SEO rankings and makes your content more discoverable.",
      "Security features protect both your business and your customers from cyber threats. Integrated analytics provide valuable insights into customer behavior and conversion paths.",
      "Most importantly, a professional website builds credibility—75% of users admit to judging a company's credibility based on their website design alone."
    ],
    image: homeblogimg2,
    date: "12/26/2023",
    readTime: "5 min read",
    category: "Web Development",
    author: "Michael Chen",
    authorRole: "Lead Developer"
  },
  {
    id: 3,
    title: "Top UI/UX Trends to Watch in 2025",
    excerpt: "Stay ahead of the curve with the latest UI/UX design trends shaping the digital landscape.",
    fullContent: [
      "2025 brings exciting developments in user interface and experience design. Dark mode interfaces continue to dominate, reducing eye strain and saving device battery life.",
      "Micro-interactions have evolved into 'micro-experiences'—small animations that guide users and provide satisfying feedback. 3D elements are becoming more prevalent, creating depth and realism without sacrificing performance.",
      "Voice user interfaces (VUI) are expanding beyond smart speakers to web and mobile applications. AI-powered personalization creates dynamic interfaces that adapt to individual user preferences in real-time.",
      "Accessibility is no longer optional—design systems now prioritize inclusive design from the ground up. The most successful designs will balance these technological advancements with intuitive, human-centered approaches."
    ],
    image: hometestimonialimg1,
    date: "04/01/2025",
    readTime: "6 min read",
    category: "UI/UX Design",
    author: "Emma Rodriguez",
    authorRole: "UX Designer"
  }
];

const HomeBlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState(null);

  const toggleExpand = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const filteredBlogs = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(blog => blog.category === selectedCategory);

  const categories = ["All", "Digital Marketing", "Web Development", "UI/UX Design"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      } 
    },
    hover: { 
      y: -5,
      boxShadow: "0 15px 30px rgba(0, 255, 136, 0.15)"
    }
  };

  const expandVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      } 
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      } 
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] text-white px-4 py-24 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00ff88] to-[#00a1ff]">
            Latest Insights
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover industry trends, expert tips, and innovative strategies
          </p>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#00a1ff] mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#00ff88] to-[#00a1ff] text-[#0f0f1a] shadow-lg"
                  : "bg-[#2a2a4a] text-white hover:bg-[#3a3a5a]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-[#1a1a2e] to-[#1e1e3a] border border-[#3a3a5a]"
              variants={cardVariants}
              whileHover="hover"
              layout // Enables smooth layout animations
            >
              {/* Blog Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#00ff88] text-[#0f0f1a] text-xs font-bold rounded-full shadow-md">
                  {blog.category}
                </span>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-400 mb-3">
                  <span>{blog.date}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 leading-tight">
                  {blog.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-5">{blog.excerpt}</p>
                
                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedPost === blog.id && (
                    <motion.div
                      className="overflow-hidden"
                      variants={expandVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="space-y-4 text-sm text-gray-300 mb-6">
                        {blog.fullContent.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-[#00a1ff]/20 flex items-center justify-center">
                          <span className="text-[#00a1ff] font-bold">
                            {blog.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{blog.author}</p>
                          <p className="text-xs text-gray-400">{blog.authorRole}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Read More Button */}
                <motion.button
                  onClick={() => toggleExpand(blog.id)}
                  className={`mt-4 w-full py-2 text-sm font-medium rounded-lg transition-all ${
                    expandedPost === blog.id 
                      ? "bg-[#3a3a5a] text-gray-300"
                      : "hover:bg-white/20 hover:shadow-lg backdrop-blur-sm border border-gray-200 dark:border-[#3a3a5a] text-[#00ff88]"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {expandedPost === blog.id ? "Show Less" : "Read More"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBlogSection;