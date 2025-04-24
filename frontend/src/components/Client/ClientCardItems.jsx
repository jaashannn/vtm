import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.02, boxShadow: "0 10px 20px rgba(0, 255, 136, 0.2)" },
};

const ClientCardItems = ({ client }) => {
  // Sample data for demonstration; replace with actual props or data fetching logic
  const clientData = client || {
    logo: "/path/to/company-logo.png",
    name: "Company Name",
    address: "123 Business Ave",
    country: "USA",
    postalCode: "12345",
    businessType: "Mid",
    industry: "Technology",
    marketingGoals: "Increase market share",
    email: { address: "contact@company.com", verified: true },
    phone: { number: "+123456789", verified: false },
    subscription: {
      activePlan: "Premium",
      startDate: "01/01/2024",
      endDate: "12/31/2024",
      status: "Active",
      history: [
        { plan: "Plan 1", start: "01/01/2023", end: "12/31/2023", status: "Completed" },
        { plan: "Plan 2", start: "01/01/2022", end: "12/31/2022", status: "Completed" },
      ],
    },
    paymentMethods: [
      { type: "Credit", number: "**** **** **** 1234", expiry: "12/25", isDefault: true },
      { type: "Debit", number: "**** **** **** 5678", expiry: "06/26", isDefault: false },
    ],
  };

  return (
    <motion.section
      className="client-card-item border border-[#3a3a5a] p-6 m-4 rounded-lg bg-white/10 backdrop-blur-md shadow-lg text-white max-w-md w-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="company-header flex items-center gap-4 mb-6">
        <img
          src={clientData.logo}
          alt={`${clientData.name} Logo`}
          className="company-logo w-16 h-16 rounded-full object-cover border border-[#00ff88]"
        />
        <div className="company-info">
          <h2 className="company-name text-[#00ff88] text-xl font-semibold">
            {clientData.name}
          </h2>
        </div>
      </div>

      <div className="company-info-section mb-6">
        <h3 className="text-[#00ff88] font-semibold mb-2">Company Information</h3>
        <div className="space-y-2 text-gray-300">
          <p><strong>Address:</strong> {clientData.address}</p>
          <p><strong>Country:</strong> {clientData.country}</p>
          <p><strong>Postal Code:</strong> {clientData.postalCode}</p>
          <p><strong>Business Type:</strong> {clientData.businessType}</p>
          <p><strong>Industry:</strong> {clientData.industry}</p>
          <p><strong>Marketing Goals:</strong> {clientData.marketingGoals}</p>
        </div>
      </div>

      <div className="contact-info-section mb-6">
        <h3 className="text-[#00ff88] font-semibold mb-2">Contact Information</h3>
        <div className="space-y-2 text-gray-300">
          <p>
            <strong>Email:</strong> {clientData.email.address} (
            {clientData.email.verified ? (
              <span className="text-[#00ff88]">Verified</span>
            ) : (
              <span className="text-[#ff00ff]">Not Verified</span>
            )}
            )
          </p>
          <p>
            <strong>Phone:</strong> {clientData.phone.number} (
            {clientData.phone.verified ? (
              <span className="text-[#00ff88]">Verified</span>
            ) : (
              <span className="text-[#ff00ff]">Not Verified</span>
            )}
            )
          </p>
        </div>
      </div>

      <div className="subscription-section mb-6">
        <h3 className="text-[#00ff88] font-semibold mb-2">Subscription</h3>
        <div className="space-y-2 text-gray-300">
          <p><strong>Active Plan:</strong> {clientData.subscription.activePlan}</p>
          <p><strong>Start Date:</strong> {clientData.subscription.startDate}</p>
          <p><strong>End Date:</strong> {clientData.subscription.endDate}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={clientData.subscription.status === "Active" ? "text-[#00ff88]" : "text-[#ff00ff]"}>
              {clientData.subscription.status}
            </span>
          </p>
          <h4 className="font-semibold mt-4 text-gray-300">Subscription History:</h4>
          <ul className="list-disc pl-5 text-gray-300">
            {clientData.subscription.history.map((entry, index) => (
              <li key={index}>
                {entry.plan} | {entry.start} - {entry.end} | {entry.status}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="payment-methods-section">
        <h3 className="text-[#00ff88] font-semibold mb-2">Payment Methods</h3>
        <div className="space-y-2 text-gray-300">
          {clientData.paymentMethods.map((method, index) => (
            <p key={index}>
              {method.type} | {method.number} | {method.expiry} |{" "}
              {method.isDefault && <span className="text-[#00ff88]">Default</span>}
            </p>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="add-card-button mt-4 px-6 py-3 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] text-[#1e1e2f] rounded-md font-semibold w-full"
        >
          Add New Card
        </motion.button>
      </div>
    </motion.section>
  );
};

export default ClientCardItems;