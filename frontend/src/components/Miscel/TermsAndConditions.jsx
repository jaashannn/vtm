import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white min-h-screen w-full">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <motion.h3
          className="border-b-[5px] border-[#00ff88] border-double text-center pb-2 mb-8 w-max mx-auto text-xl md:text-2xl font-semibold relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Terms and Conditions for Virtual Tech Masters
        </motion.h3>

        <motion.p
          className="text-justify relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <strong>Effective Date: 1 December, 2024</strong>
        </motion.p>

        <div className="my-6 border-t-2 border-[#3a3a5a] border-double relative z-10" />

        <ol className="flex flex-col mb-8 leading-relaxed list-none relative z-10">
          {[
            {
              title: "Acceptance of Terms",
              content:
                "By accessing or using the services provided by Virtual Tech Masters ('Company', 'we', 'our', or 'us'), you agree to be bound by these Terms and Conditions. If you do not agree with these terms, you must refrain from using our services.",
            },
            {
              title: "Services",
              content:
                "Virtual Tech Masters provides IT solutions and digital marketing services, including but not limited to website development, SEO optimization, software solutions, and social media management. Detailed descriptions of our services can be found on our website or in the specific service agreements.",
            },
            {
              title: "User Responsibilities",
              content: [
                "Users must provide accurate and complete information when engaging our services.",
                "Users are responsible for maintaining the confidentiality of their accounts and passwords.",
                "Users agree not to use our services for any unlawful or unauthorized purposes.",
              ],
            },
            {
              title: "Intellectual Property",
              content:
                "All content, designs, and intellectual property created by Virtual Tech Masters remain the sole property of the Company unless otherwise agreed upon in writing. Unauthorized use, reproduction, or distribution is strictly prohibited.",
            },
            {
              title: "Payment Terms",
              content: [
                "Payments must be made as per the invoices provided by Virtual Tech Masters.",
                "Late payments may result in service suspension or additional fees.",
                "All fees are non-refundable unless stated otherwise in a specific agreement.",
              ],
            },
            {
              title: "Confidentiality",
              content:
                "We will maintain the confidentiality of all client-provided information unless disclosure is required by law or agreed upon by the client.",
            },
            {
              title: "Liability Limitation",
              content: [
                "Virtual Tech Masters will not be held liable for any indirect, incidental, or consequential damages arising from the use of our services.",
                "Our maximum liability is limited to the fees paid by the client for the specific service in question.",
              ],
            },
            {
              title: "Termination",
              content:
                "Either party may terminate the service agreement with 30 days' written notice. In cases of breach of these terms, the Company reserves the right to terminate services immediately.",
            },
            {
              title: "Force Majeure",
              content:
                "Virtual Tech Masters shall not be held liable for delays or failures in performance resulting from events beyond our control, including but not limited to natural disasters, labor strikes, or technical failures.",
            },
            {
              title: "Governing Law",
              content:
                "These Terms and Conditions are governed by the laws of the Province of Alberta, Canada. Any disputes shall be resolved under Alberta jurisdiction.",
            },
            {
              title: "Amendments",
              content:
                "We reserve the right to amend these Terms and Conditions at any time. Updates will be posted on our website, and continued use of our services implies acceptance of the revised terms.",
            },
            {
              title: "Contact Information",
              content: [
                "For any questions or concerns regarding these Terms and Conditions, please contact us:",
                "Email: info@virtualtechmasters.com",
                "Phone: +1-825-733-7276",
                "Address: 9166 34A Ave NW, Edmonton, AB, T6E5P5",
              ],
            },
          ].map((item, index) => (
            <motion.li
              key={index}
              className="border-b-[3px] border-[#3a3a5a] border-ridge p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="pb-2 text-[#00ff88] font-semibold">
                <span className="font-bold pr-2 text-xs">{index + 1}.</span>
                {item.title}
              </h4>
              {Array.isArray(item.content) ? (
                item.content.map((line, i) => (
                  <p
                    key={i}
                    className={
                      i > 0 && i < 3 ? "pl-4 text-gray-300 font-bold" : "text-gray-300"
                    }
                  >
                    {i < 3 && <span className="font-bold pr-2">•</span>}
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-justify text-gray-300">{item.content}</p>
              )}
            </motion.li>
          ))}
        </ol>

        <div className="border-t-2 border-[#3a3a5a] border-double my-6 relative z-10" />

        <motion.p
          className="font-bold text-justify text-gray-300 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          By using our services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
        </motion.p>
      </div>
    </section>
  );
};

export default TermsAndConditions;