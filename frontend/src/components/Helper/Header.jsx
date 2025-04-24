import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import VTM from "../../Assests/vtm2.svg";
import { Menu, X, Home, Users, Briefcase, UserPlus, MessageSquare, Sun, Moon } from "lucide-react";

import { ThemeContext } from "../../context/ThemeContext"; // Adjust the import path as necessary


const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About Us", path: "/about", icon: Users },
  { label: "Services", path: "/service", icon: Briefcase },
  { label: "Register", path: "/register", icon: UserPlus },
  { label: "Contact", path: "/contact", icon: MessageSquare },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const navItemVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-gradient-to-br dark:from-[#1e1e2f]/90 dark:to-[#2a2a4a]/90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-gradient-to-br dark:from-[#1e1e2f]/70 dark:to-[#2a2a4a]/70 backdrop-blur-sm"
        }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="flex items-center space-x-2 rounded-md"
              aria-label="Home"
            >
              <img
                src={VTM}
                alt="VTM Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#00ff88] dark:border-[#00ff88] shadow-md"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-6 lg:space-x-8 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center text-sm font-medium transition-colors duration-300 px-3 py-2 rounded-lg ${isActive
                    ? "text-[#00ff88] bg-white/10 dark:bg-white/10 dark:text-[#00ff88]"
                    : "text-gray-700 hover:text-[#00ff88] hover:bg-white/5 dark:text-gray-300 dark:hover:text-[#00ff88] dark:hover:bg-white/5"
                  }`
                }
              >
                {({ isActive }) => (
                  <motion.div
                    variants={navItemVariants}
                    whileHover="hover"
                    className="flex items-center"
                  >
                    <item.icon
                      className={`h-4 w-4 mr-2 ${isActive ? "text-[#00ff88] dark:text-[#00ff88]" : "text-gray-600 group-hover:text-[#00ff88] dark:text-gray-400 dark:group-hover:text-[#00ff88]"
                        } transition-colors duration-200`}
                    />
                    <span className="relative">
                      {item.label}
                      <span
                        className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#00ff88] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${isActive ? "scale-x-100" : ""
                          } dark:bg-[#00ff88]`}
                      />
                    </span>
                  </motion.div>
                )}
              </NavLink>
            ))}
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-700 hover:text-[#00ff88] hover:bg-white/10 dark:text-gray-300 dark:hover:text-[#00ff88] dark:hover:bg-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            {/* Optional CTA Button */}
            <Link to="/service">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white/10 text-gray-900 rounded-full font-medium shadow-md hover:bg-white/20 hover:shadow-lg backdrop-blur-sm border border-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/20 transition-all"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-700 hover:text-[#00ff88] hover:bg-white/10 dark:text-gray-300 dark:hover:text-[#00ff88] dark:hover:bg-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#00ff88] hover:bg-white/10 dark:text-gray-300 dark:hover:text-[#00ff88] dark:hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden px-2 pt-2 pb-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
            >
              <div className="space-y-1 bg-gray-50 dark:bg-[#1e1e2f]/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 dark:border-[#3a3a5a] p-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${isActive
                        ? "text-[#00ff88] bg-white/10 dark:text-[#00ff88] dark:bg-white/10"
                        : "text-gray-700 hover:text-[#00ff88] hover:bg-white/5 dark:text-gray-300 dark:hover:text-[#00ff88] dark:hover:bg-white/5"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={`h-5 w-5 mr-3 ${isActive ? "text-[#00ff88] dark:text-[#00ff88]" : "text-gray-600 dark:text-gray-400"
                            }`}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
                {/* Mobile CTA */}
                <Link to="/service" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] text-[#1e1e2f] dark:text-[#1e1e2f] rounded-md font-medium shadow-md hover:shadow-lg transition-all"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;