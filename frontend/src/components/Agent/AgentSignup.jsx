import React, { useState } from "react";
import { motion } from "framer-motion";
import CountryCodes from "../../Assests/CountryCodes.json";
import Select from "react-select";
import { StoreFunction } from "../../Store/store";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AgentSignup = () => {
  const { agentFormData, setAgentFormData, registerAgent } = StoreFunction();

  const handleDocumentChange = (index, event) => {
    const { name, value, files } = event.target;
    setAgentFormData((prevFormData) => {
      const updatedDocuments = [...prevFormData.verifiedIdDocuments];
      updatedDocuments[index][name] = files ? files[0] : value;
      return {
        ...prevFormData,
        verifiedIdDocuments: updatedDocuments,
      };
    });
  };

  const handleAddDocument = () => {
    setAgentFormData((prevFormData) => ({
      ...prevFormData,
      verifiedIdDocuments: [
        ...prevFormData.verifiedIdDocuments,
        { docName: "", docPath: null },
      ],
    }));
  };

  const handleRemoveDocument = (index) => {
    setAgentFormData((prevFormData) => {
      const updatedDocuments = [...prevFormData.verifiedIdDocuments];
      updatedDocuments.splice(index, 1);
      return {
        ...prevFormData,
        verifiedIdDocuments: updatedDocuments,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const countryCodeOptions = CountryCodes.map((country) => ({
    label: `${country.name} (${country.dial_code})`,
    value: country.dial_code,
    code: country.code,
    name: country.name,
  }));
  const countryOptions = CountryCodes.map((country) => ({
    label: `${country.name}`,
    value: country.name,
    name: country.name,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: '#3a3a5a',
      color: 'white',
      minHeight: '44px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#00ff88'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#00ff88' : state.isFocused ? 'rgba(0, 255, 136, 0.2)' : '#2a2a4a',
      color: state.isSelected ? '#1e1e2f' : 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2a2a4a',
      border: '1px solid #3a3a5a',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
    }),
  };

  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white relative">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#00ff88]"
          variants={itemVariants}
        >
          Sign up now to start your free sales trial
        </motion.h2>

        <motion.form
          onSubmit={registerAgent}
          className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-[#3a3a5a] shadow-lg"
          variants={itemVariants}
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                value={agentFormData.name}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={agentFormData.email}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
          </div>

          {/* Country Code & Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <motion.div variants={itemVariants}>
              <Select
                name="countryCode"
                value={countryCodeOptions.find(
                  (option) => option.value === agentFormData.countryCode
                )}
                onChange={(selectedOption) =>
                  handleChange({
                    target: { name: "countryCode", value: selectedOption.value },
                  })
                }
                options={countryCodeOptions.sort((a, b) => {
                  const nameA = a.label.toLowerCase();
                  const nameB = b.label.toLowerCase();
                  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                })}
                required
                isSearchable
                placeholder="Country Code"
                styles={customStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                minLength={10}
                maxLength={10}
                onChange={handleChange}
                value={agentFormData.phoneNumber}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
          </div>

          {/* Address Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={agentFormData.address}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                value={agentFormData.city}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="province"
                placeholder="Province"
                onChange={handleChange}
                value={agentFormData.province}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
          </div>

          {/* Country & Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <motion.div variants={itemVariants}>
              <Select
                name="country"
                value={
                  countryOptions.find(
                    (option) => option.name === agentFormData.country
                  ) || null
                }
                onChange={(selectedOption) =>
                  handleChange({
                    target: { name: "country", value: selectedOption.value },
                  })
                }
                options={countryOptions.map(({ name }) => ({
                  value: name,
                  label: name,
                }))}
                required
                placeholder="Select Country"
                isSearchable={true}
                styles={customStyles}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                onChange={handleChange}
                value={agentFormData.postalCode}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
          </div>

          {/* SIN Number */}
          <motion.div variants={itemVariants} className="mb-4">
            <input
              type="number"
              name="sinNumber"
              placeholder="SIN Number"
              onChange={handleChange}
              value={agentFormData.sinNumber}
              required
              className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
            />
          </motion.div>

          {/* Bank Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                onChange={handleChange}
                value={agentFormData.bankName}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="ifscCode"
                placeholder="IFSC Code"
                onChange={handleChange}
                value={agentFormData.ifscCode}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88] uppercase"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="text"
                name="accountHolderName"
                placeholder="Account Holder Name"
                onChange={handleChange}
                value={agentFormData.accountHolderName}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
          </div>

          {/* Verified ID Documents */}
          <motion.div variants={itemVariants} className="mb-4 text-sm text-gray-300">
            Upload 2 IDs or Driving Licence + Valid Passport or other documents with picture
          </motion.div>

          {agentFormData.verifiedIdDocuments.map((document, index) => (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end"
              key={index}
              variants={itemVariants}
            >
              <div>
                <input
                  type="text"
                  name="docName"
                  placeholder="ID Document Name"
                  value={document.docName}
                  onChange={(e) => handleDocumentChange(index, e)}
                  required
                  className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
                />
              </div>
              <div>
                <label
                  htmlFor={`verification-file-upload-${index}`}
                  className="block w-full p-3 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] text-white text-center rounded-lg cursor-pointer hover:opacity-90 transition-all duration-300"
                >
                  {document.docPath ? document.docPath.name : "Select PDF Document"}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id={`verification-file-upload-${index}`}
                  name="docPath"
                  accept="application/pdf"
                  onChange={(e) => handleDocumentChange(index, e)}
                  required
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(index)}
                  className="p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  Remove Document
                </button>
              )}
            </motion.div>
          ))}

          <motion.button
            type="button"
            onClick={handleAddDocument}
            className="mb-6 p-3 text-[#00ff88] border border-[#00ff88] rounded-lg hover:bg-[#00ff88]/10 transition-all w-full md:w-auto"
            variants={itemVariants}
          >
            ➕ Add More Documents
          </motion.button>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <motion.div variants={itemVariants}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={agentFormData.password}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={agentFormData.confirmPassword}
                required
                className="w-full p-3 bg-white/10 border border-[#3a3a5a] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ff88]"
              />
            </motion.div>
          </div>

          <motion.button
            type="submit"
            className="px-4 py-2 bg-white/10 text-gray-900 rounded-full font-medium shadow-md hover:bg-white/20 hover:shadow-lg backdrop-blur-sm border border-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/20 transition-all"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 5px 15px rgba(255, 255, 255, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            Verify Email
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default AgentSignup;