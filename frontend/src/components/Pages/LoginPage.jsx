import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import VTM from "../../Assests/VTM.png";
import { StoreFunction } from "../../Store/store";

const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    loginUser,
    email,
    password,
    setEmail,
    setPassword,
    setToken,
    setName,
    setUserRole,
    setUserId,
  } = StoreFunction();

  const handleLoginBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser();
      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        setUserId(data.userId);
        setName(data.userName);
        setUserRole(data.userRole);
        alert("Login Successful");
        navigate("/signup"); // Consider redirecting to a dashboard instead
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white rounded-xl overflow-hidden">
      <aside className="flex-1 flex justify-center items-center p-8 relative">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl pointer-events-none" />
      </aside>

      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          className="flex flex-1 flex-col items-center justify-center gap-8 w-full md:w-[710px] p-8 bg-white/10 backdrop-blur-md shadow-lg relative z-10"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Login
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: 96, transition: { duration: 0.8 } }}
            />
          </h2>

          <form className="flex flex-col gap-4 w-4/5" onSubmit={handleLoginBtn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#3a3a5a] px-4 py-3 rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#3a3a5a] px-4 py-3 rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
            />
            <motion.button
              // ... other props
              className={`mt-2 px-6 py-3 bg-white/15 text-white font-bold rounded-full shadow-md transition-all flex items-center justify-center gap-2`}

              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginBtn}
            >
              Login
                  
          
            </motion.button>
          </form>

          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#00ff88] font-bold hover:text-[#ff00ff] transition-colors"
            >
              Register here
            </Link>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;