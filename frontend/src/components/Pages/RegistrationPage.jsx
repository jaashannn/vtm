import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
// import vtmlogo from "../../Assests/vtmlogo.avif";
import VTM from "../../Assests/VTM.png";
import { StoreFunction } from "../../Store/store";
import AgentSignup from "../Agent/AgentSignup";
import AddClientForm from "../Client/AddClientForm";
import { IoMdArrowRoundBack } from "react-icons/io";

const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { x: "-100%", opacity: 0, transition: { duration: 0.6, ease: "easeIn" } },
};

const registrationVariants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.6, ease: "easeIn" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const RegistrationPage = () => {
  const {
    activeSignup,
    setActiveSignup,
    country,
    setCountry,
    registerMasterClient,
  } = StoreFunction();

  return (

    // Wrap your whole div in a main section
    <main className="mt-[.5rem]">


      <div className="w-full min-h-[90vh] mt-20 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white overflow-hidden relative">

        {/* Grid background */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="grid grid-cols-12 grid-rows-6 h-full">
            {[...Array(72)].map((_, i) => (
              <div key={i} className="border border-[#3a3a5a]"></div>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row w-full min-h-[90vh] relative z-10">
          {/* Left Side - Logo */}
          <motion.aside
            className="flex flex-1 justify-center items-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex justify-center items-center">
              <motion.img
                src={VTM}
                alt="Virtual Tech Masters"
                className="w-1/2 md:w-3/4 shadow-lg border-4 border-[#00ff88]/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  boxShadow: "0 0 30px rgba(0, 255, 136, 0.3)"
                }}
                transition={{
                  duration: 0.8,
                  scale: { type: "spring", stiffness: 100 }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
            </div>
          </motion.aside>

          {/* Right Side - Forms */}
          <AnimatePresence mode="wait">
            {activeSignup === "Registration" && (
              <motion.div
                key="registration"
                className="flex flex-1 flex-col justify-center items-center w-full md:w-[710px] p-8 bg-white/10 backdrop-blur-md shadow-lg border-l border-[#3a3a5a]"
                variants={registrationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div
                  className="w-full max-w-md"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2
                    className="text-3xl font-bold mb-8 text-center text-[#00ff88]"
                    variants={itemVariants}
                  >
                    Create Your Account
                  </motion.h2>

                  <motion.div variants={itemVariants} className="w-full mb-6">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-3 border border-[#3a3a5a] rounded-lg bg-[#2a2a4a] text-white focus:outline-none focus:ring-2 focus:ring-[#00ff88] cursor-pointer"
                    >
                      <option value="USA" className="bg-[#2a2a4a]">USA</option>
                      <option value="Canada" className="bg-[#2a2a4a]">Canada</option>
                    </select>
                  </motion.div>

                  <motion.div
                    className="flex flex-col md:flex-row gap-4 mb-6 w-full"
                    variants={itemVariants}
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)" // Soft white glow instead of green
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-3 font-bold rounded-full backdrop-blur-sm border border-white/20 transition-all ${activeSignup === "Master Signup"
                          ? "bg-white/20 text-white shadow-lg" // Active state
                          : "bg-white/10 text-white shadow-md hover:bg-white/15" // Inactive state
                        }`}
                      onClick={() => setActiveSignup("Master Signup")}
                    >
                      Signup
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-3 font-bold rounded-full backdrop-blur-sm border border-white/20 transition-all ${activeSignup === "Agent Signup"
                          ? "bg-white/20 text-white shadow-lg" // Active state
                          : "bg-white/10 text-white shadow-md hover:bg-white/15" // Inactive state
                        }`}
                      onClick={() => setActiveSignup("Agent Signup")}
                    >
                      Agent Signup
                    </motion.button>
                  </motion.div>

                  <motion.p
                    className="text-sm text-gray-300 text-center"
                    variants={itemVariants}
                  >
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-[#00ff88] font-bold hover:text-[#ff00ff] transition-colors"
                    >
                      Login here
                    </Link>
                  </motion.p>
                </motion.div>
              </motion.div>
            )}

            {activeSignup === "Agent Signup" && (
              <motion.div
                key="agent-signup"
                className="flex flex-1 flex-col justify-center items-center w-full md:w-[710px] p-8 bg-white/10 backdrop-blur-md shadow-lg border-l border-[#3a3a5a] relative"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 left-4 p-2 text-xl bg-gradient-to-r from-[#ff00ff] to-[#00ff88] text-[#1e1e2f] rounded-full shadow-lg"
                  onClick={() => setActiveSignup("Registration")}
                >
                  <IoMdArrowRoundBack />
                </motion.button>
                <AgentSignup />
              </motion.div>
            )}

            {activeSignup === "Master Signup" && (
              <motion.div
                key="master-signup"
                className="flex flex-1 flex-col justify-center items-center w-full md:w-[710px] p-8 bg-white/10 backdrop-blur-md shadow-lg border-l border-[#3a3a5a] relative"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 left-4 p-2 text-xl bg-gradient-to-r from-[#ff00ff] to-[#00ff88] text-[#1e1e2f] rounded-full shadow-lg"
                  onClick={() => setActiveSignup("Registration")}
                >
                  <IoMdArrowRoundBack />
                </motion.button>
                <AddClientForm
                  formWidth="100%"
                  formMargin="auto"
                  formBoxShadow="none"
                  formTransition="none"
                  submitRegistration={registerMasterClient}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>

  );
};

export default RegistrationPage;