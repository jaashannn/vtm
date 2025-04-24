import React from "react";
import { motion } from "framer-motion";

const PrivacyAndPolicy = () => {
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
          className="pb-2 mx-auto mb-8 text-center border-b-4 border-double border-[#00ff88] w-max text-xl md:text-2xl font-semibold relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Privacy Policy for Virtual Tech Masters
        </motion.h3>

        <motion.p
          className="text-justify font-medium relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Effective Date: December 2024
        </motion.p>
        <br />

        <motion.p
          className="text-justify relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <strong>Virtual Tech Masters</strong> (referred to as “we,” “us,” or “our”) respects your privacy and is committed to protecting it through compliance with this policy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our IT and digital marketing services. By accessing or using our services, you agree to this policy.
        </motion.p>

        <hr className="border-2 border-double border-[#3a3a5a] my-8 relative z-10" />

        <ol className="space-y-8 relative z-10">
          {[
            {
              title: "Information We Collect",
              content: [
                "We may collect the following types of information:",
                {
                  subtitle: "A. Personal Information:",
                  items: [
                    "Name, email address, phone number, and physical address.",
                    "Billing and payment information, including credit card details.",
                  ],
                },
                {
                  subtitle: "B. Non-Personal Information:",
                  items: [
                    "IP address, browser type, operating system, and usage details through cookies and similar technologies.",
                    "Anonymous demographic data.",
                  ],
                },
              ],
            },
            {
              title: "How We Use Your Information",
              content: [
                "We use the information collected to:",
                "Provide, operate, and maintain our services.",
                "Communicate with you about updates, promotions, and technical support.",
                "Process payments and manage billing.",
                "Enhance and personalize user experience.",
                "Comply with legal and regulatory requirements.",
              ],
            },
            {
              title: "How We Share Your Information",
              content: [
                "We do not sell or rent your personal information. However, we may share your information in the following scenarios:",
                "<strong>Service Providers:</strong> To third-party vendors, consultants, or service providers who perform services on our behalf.",
                "<strong>Legal Obligations:</strong> To comply with legal processes or regulatory requirements.",
                "<strong>Business Transfers:</strong> In connection with a merger, sale, or transfer of company assets.",
              ],
            },
            {
              title: "Data Security",
              content:
                "We implement technical and organizational measures to secure your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.",
            },
            {
              title: "Cookies and Tracking Technologies",
              content:
                "Our website uses cookies to improve user experience and track usage statistics. You can set your browser to refuse all or some browser cookies. However, disabling cookies may affect the functionality of our website.",
            },
            {
              title: "Your Data Protection Rights",
              content: [
                "Depending on your location, you may have the following rights:",
                "Access to your data.",
                "Request corrections or deletion of your data.",
                "Opt-out of marketing communications.",
                "File a complaint with a data protection authority if you believe your rights have been violated.",
              ],
            },
            {
              title: "Third-Party Links",
              content:
                "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. Please review their privacy policies for more information.",
            },
            {
              title: "Children's Privacy",
              content:
                "Our services are not directed to children under 13. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will delete it promptly.",
            },
            {
              title: "Changes to This Policy",
              content:
                "We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting the revised policy on our website. Your continued use of our services constitutes acceptance of the updated policy.",
            },
            {
              title: "Contact Us",
              content: [
                "If you have any questions about this Privacy Policy or our data practices, please contact us:",
                "Email: info@virtualtechmasters.com",
                "Phone: +1-825-733-7276",
                "Address: 9166 34A Ave NW, Edmonton, AB, T6E5P5",
              ],
            },
          ].map((item, index) => (
            <motion.li
              key={index}
              className="border-b-2 border-[#3a3a5a] pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-[#00ff88]">
                <span className="font-bold pr-2">{index + 1}.</span>
                {item.title}
              </h4>
              {Array.isArray(item.content) ? (
                item.content.map((line, i) =>
                  typeof line === "string" ? (
                    <p
                      key={i}
                      className="pt-2 text-gray-300"
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  ) : (
                    <div key={i} className="mt-2">
                      <p className="font-semibold text-gray-300">
                        <span className="pr-2">{line.subtitle.split(" ")[0]}</span>
                        {line.subtitle.split(" ").slice(1).join(" ")}
                      </p>
                      <ul className="list-disc pl-6 text-gray-300">
                        {line.items.map((subItem, j) => (
                          <li key={j}>{subItem}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )
              ) : (
                <p className="pt-2 text-gray-300">{item.content}</p>
              )}
            </motion.li>
          ))}
        </ol>

        <motion.p
          className="text-center mt-8 font-medium text-gray-300 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Thank you for trusting Virtual Tech Masters. Your privacy is our priority.
        </motion.p>
      </div>
    </section>
  );
};

export default PrivacyAndPolicy;