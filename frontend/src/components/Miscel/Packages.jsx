import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { StoreFunction } from "../../Store/store";
import { useNavigate } from "react-router-dom";

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

const Packages = () => {
  const navigate = useNavigate();
  const {
    getPackages,
    packages,
    createPaymentIntent,
    option,
    setOption,
    stripeCustomerId,
    clientFormData,
    selectedPackage,
    setSelectedPackage,
    setClientSecret,
  } = StoreFunction();

  const handlePackage = (pkg) => {
    setSelectedPackage(pkg);
    setOption({
      mode: "subscription",
      amount: pkg.unit_amount,
      currency: pkg.currency || "cad",
      appearance: {
        theme: "stripe",
      },
    });
  };

  useEffect(() => {
    getPackages();
  }, []);

  useEffect(() => {
    if (
      selectedPackage &&
      option.amount &&
      option.currency &&
      selectedPackage.id &&
      clientFormData.email
    ) {
      createIntent();
    }
  }, [option, selectedPackage, stripeCustomerId, clientFormData]);

  const createIntent = async () => {
    if (!stripeCustomerId || !clientFormData.email) {
      alert("Email or ID is missing");
      return;
    }
    try {
      const response = await createPaymentIntent(
        option.amount,
        option.currency,
        stripeCustomerId,
        selectedPackage.id,
        clientFormData.email
      );
      const data = await response.json();
      if (data.success) {
        setClientSecret(data.result);
        navigate("/payment");
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Choose Your Package
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
          initial={{ width: 0 }}
          animate={{ width: 96, transition: { duration: 0.8 } }}
        />
      </motion.h1>

      <motion.div
        className="flex flex-wrap justify-center gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={cardVariants}
            whileHover="hover"
            className="w-72 rounded-lg bg-white/10 backdrop-blur-md border border-[#3a3a5a] shadow-lg p-6 cursor-pointer"
            onClick={() => handlePackage(pkg)}
          >
            <h2 className="text-xl font-semibold text-[#00ff88] mb-2">
              {pkg.product.name}
            </h2>
            <p className="text-gray-300 mb-1">
              {pkg.nickname ? `Plan: ${pkg.nickname}` : "Standard Plan"}
            </p>
            <p className="text-[#ff00ff] font-bold text-lg">
              {pkg.unit_amount > 0
                ? `${(pkg.unit_amount / 100).toFixed(2)} ${pkg.currency.toUpperCase()}`
                : "Free"}
            </p>
            {pkg.type === "recurring" && pkg.recurring && (
              <p className="text-sm text-gray-400 mt-1 mb-3">
                Billed every {pkg.recurring.interval_count} {pkg.recurring.interval}
              </p>
            )}
            {pkg.product.marketing_features?.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-gray-300">
                {pkg.product.marketing_features.map((feature, index) => (
                  <li key={index}>{feature.name}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Packages;