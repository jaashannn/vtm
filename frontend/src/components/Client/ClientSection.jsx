import React, { useState } from "react";
import { motion } from "framer-motion";
import ClientCardItems from "./ClientCardItems";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ClientSection = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample client data; replace with actual data from your store or API
  const clients = [
    {
      name: "Company A",
      logo: "/path/to/company-a-logo.png",
      address: "123 Street A",
      country: "USA",
      postalCode: "12345",
      businessType: "Small",
      industry: "Technology",
      marketingGoals: "Brand Awareness",
      email: { address: "contact@companya.com", verified: true },
      phone: { number: "+123456789", verified: false },
      subscription: {
        activePlan: "Basic",
        startDate: "01/01/2024",
        endDate: "12/31/2024",
        status: "Active",
        history: [
          { plan: "Trial", start: "01/01/2023", end: "12/31/2023", status: "Completed" },
        ],
      },
      paymentMethods: [
        { type: "Credit", number: "**** **** **** 1234", expiry: "12/25", isDefault: true },
      ],
    },
    {
      name: "Company B",
      logo: "/path/to/company-b-logo.png",
      address: "456 Street B",
      country: "Canada",
      postalCode: "A1B2C3",
      businessType: "Mid",
      industry: "Finance",
      marketingGoals: "Lead Generation",
      email: { address: "info@companyb.com", verified: true },
      phone: { number: "+198765432", verified: true },
      subscription: {
        activePlan: "Premium",
        startDate: "03/01/2024",
        endDate: "02/28/2025",
        status: "Active",
        history: [
          { plan: "Basic", start: "03/01/2023", end: "02/28/2024", status: "Completed" },
        ],
      },
      paymentMethods: [
        { type: "Debit", number: "**** **** **** 5678", expiry: "06/26", isDefault: true },
      ],
    },
    {
      name: "Company C",
      logo: "/path/to/company-c-logo.png",
      address: "789 Street C",
      country: "UK",
      postalCode: "SW1A 1AA",
      businessType: "Large",
      industry: "E-commerce",
      marketingGoals: "Increase Sales",
      email: { address: "support@companyc.com", verified: false },
      phone: { number: "+447890123456", verified: false },
      subscription: {
        activePlan: "Enterprise",
        startDate: "06/01/2024",
        endDate: "05/31/2025",
        status: "Active",
        history: [
          { plan: "Premium", start: "06/01/2023", end: "05/31/2024", status: "Completed" },
        ],
      },
      paymentMethods: [
        { type: "Credit", number: "**** **** **** 9012", expiry: "09/27", isDefault: true },
      ],
    },
  ];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.section
      className="client-section py-16 px-4 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] min-h-screen w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row gap-8">
        <div className="left-section md:w-1/3 w-full">
          <motion.h2
            className="text-[#00ff88] text-3xl md:text-4xl font-bold mb-6 text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Clients
          </motion.h2>
          <div className="search-bar mb-6">
            <input
              type="text"
              placeholder="Search Company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-[#3a3a5a] rounded-md bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ff88] transition-all"
            />
          </div>
          <div className="client-list bg-white/5 backdrop-blur-md rounded-lg p-4 max-h-[60vh] overflow-y-auto">
            <ul className="space-y-2">
              {filteredClients.length > 0 ? (
                filteredClients.map((client, index) => (
                  <motion.li
                    key={index}
                    onClick={() => setSelectedClient(client)}
                    className={`p-3 rounded-md cursor-pointer text-gray-300 hover:bg-[#3a3a5a] transition-colors ${
                      selectedClient?.name === client.name ? "bg-[#3a3a5a] text-[#00ff88]" : ""
                    }`}
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                  >
                    {client.name}
                  </motion.li>
                ))
              ) : (
                <li className="text-gray-400 text-center p-3">No clients found</li>
              )}
            </ul>
          </div>
        </div>

        <div className="right-section md:w-2/3 w-full">
          {selectedClient ? (
            <ClientCardItems client={selectedClient} />
          ) : (
            <motion.div
              className="text-center text-gray-400 text-xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Select a client from the list to view details.
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ClientSection;