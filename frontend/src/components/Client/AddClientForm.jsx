import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreatableSelect from "react-select/creatable";
import { StoreFunction } from "../../Store/store";
import { useNavigate } from "react-router-dom";

const AddClientForm = ({
  formWidth,
  formMargin,
  formBoxShadow,
  formTransition,
  submitRegistration,
}) => {
  const navigate = useNavigate();
  const {
    clientFormData,
    setClientFormData,
    setStripeCustomerId,
  } = StoreFunction();

  const industryOptions = [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "ecommerce", label: "E-commerce" },
  ];
  const companySizeOptions = [
    { value: "small", label: "Small (1-10 employees)" },
    { value: "mid", label: "Mid (11-50 employees)" },
    { value: "large", label: "Large (51+ employees)" },
  ];

  const [activeTab, setActiveTab] = useState("companyDetails");

  const handleClientCompanyDataChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setClientFormData({ ...clientFormData, [name]: files[0] });
    } else {
      setClientFormData({ ...clientFormData, [name]: value });
    }
  };

  const handleIndustryChange = (selectedOption) => {
    setClientFormData({ ...clientFormData, industry: selectedOption });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (activeTab === "companyDetails") setActiveTab("businessModel");
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (activeTab === "businessModel") setActiveTab("companyDetails");
  };

  const handleRegisterationAndNext = async (e) => {
    e.preventDefault();
    const response = await submitRegistration();
    const data = await response.json();
    if (data.success) {
      setStripeCustomerId(data.result.stripeCustomerId);
      navigate("/packages");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col justify-start h-full gap-6 p-6 pt-12 bg-white/10 backdrop-blur-md rounded-lg text-white"
      style={{
        width: formWidth,
        margin: formMargin,
        boxShadow: formBoxShadow,
        transition: formTransition,
      }}
    >
      <div className="flex justify-evenly mb-6 gap-4">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(255, 255, 255, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("companyDetails")}
          className={`px-6 py-3 rounded-full font-bold backdrop-blur-sm border transition-all ${activeTab === "companyDetails"
            ? "bg-white/20 text-white border-white/30 shadow-lg"  // Active state
            : "bg-white/10 text-white/90 border-white/20 shadow-md hover:bg-white/15"  // Inactive state
            }`}
        >
          Company Details
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(255, 255, 255, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab("businessModel")}
          className={`px-6 py-3 rounded-full font-bold backdrop-blur-sm border transition-all ${activeTab === "businessModel"
            ? "bg-white/20 text-white border-white/30 shadow-lg"  // Active state
            : "bg-white/10 text-white/90 border-white/20 shadow-md hover:bg-white/15"  // Inactive state
            }`}
        >
          Business Model & Goals
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <form>
          {activeTab === "companyDetails" && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <label className="font-bold">Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={clientFormData.companyName}
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <label className="font-bold">Company Logo</label>
              <input
                type="file"
                name="companyLogo"
                accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white"
              />
              <label className="font-bold">Company Address</label>
              <input
                type="text"
                name="companyAddress"
                placeholder="Company Address"
                value={clientFormData.companyAddress}
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <label className="font-bold">Company Country</label>
              <input
                type="text"
                name="companyCountry"
                value={clientFormData.companyCountry}
                placeholder="Company Country"
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <label className="font-bold">Company Postal Code</label>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={clientFormData.postalCode}
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <label className="font-bold">Company Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={clientFormData.phoneNumber}
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <label className="font-bold">Company Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={clientFormData.email}
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleNext}
                className="mt-4 px-6 py-3 bg-white/10 text-white font-bold rounded-full shadow-md hover:bg-white/20 hover:shadow-lg backdrop-blur-sm border border-white/20 transition-all"
              >
                Next
              </motion.button>
            </motion.div>
          )}
          {activeTab === "businessModel" && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <select
                name="companySize"
                value={clientFormData.companySize}
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              >
                <option value="" disabled className="text-black">
                  Select Company Size
                </option>
                {companySizeOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-black">
                    {option.label}
                  </option>
                ))}
              </select>
              <CreatableSelect
                isClearable
                options={industryOptions}
                value={clientFormData.industry}
                onChange={handleIndustryChange}
                placeholder="Industry of Operation"
                className="text-black"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                    borderColor: "#3a3a5a",
                    color: "white",
                    "&:hover": { borderColor: "#00ff88" },
                  }),
                  singleValue: (base) => ({ ...base, color: "white" }),
                  menu: (base) => ({ ...base, backgroundColor: "#2a2a4a" }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused ? "#3a3a5a" : "#2a2a4a",
                    color: "white",
                    "&:hover": { backgroundColor: "#3a3a5a" },
                  }),
                  placeholder: (base) => ({ ...base, color: "#9ca3af" }),
                }}
              />
              <input
                type="text"
                name="marketingGoals"
                placeholder="Marketing Goals"
                value={clientFormData.marketingGoals}
                onChange={handleClientCompanyDataChange}
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleClientCompanyDataChange}
                value={clientFormData.password}
                required
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleClientCompanyDataChange}
                value={clientFormData.confirmPassword}
                required
                className="p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
              <div className="flex gap-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleBack}
                  className="mt-4 px-6 py-3 bg-white/10 text-white font-bold rounded-full shadow-md hover:bg-white/20 hover:shadow-lg backdrop-blur-sm border border-white/20 transition-all"
                >
                  Back
                </motion.button>

                {/* Next/Register Button - More prominent */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleRegisterationAndNext}
                  className="mt-4 px-6 py-3 bg-white/20 text-white font-bold rounded-full shadow-lg hover:bg-white/30 hover:shadow-xl backdrop-blur-sm border border-white/30 transition-all"
                >
                  Next
                </motion.button>
              </div>
            </motion.div>
          )}
        </form>
      </AnimatePresence>
    </div>
  );
};

export default AddClientForm;