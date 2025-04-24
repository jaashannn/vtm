import React from "react";
import { motion } from "framer-motion";
import innovationImg from "../../Assests/OurValues Innovationimg.jpg";
import clientCentricImg from "../../Assests/OurValues Client-Centricimg.jpg";
import integrityImg from "../../Assests/OurValues Integrityimg.png";
import excellenceImg from "../../Assests/OurValues Excellenceimg.jpg";
import teamworkImg from "../../Assests/OurValues Teamworkimg.png";
import growthImg from "../../Assests/OurValues Continuous learningimg.png";
import socialImg from "../../Assests/OurValues socialimg.png";

const values = [
  {
    title: "Innovation",
    description:
      "We embrace the power of creativity and cutting-edge technology to deliver solutions that drive progress. Our team thrives on exploring new ideas, pushing boundaries, and finding ways to transform challenges into opportunities.",
    img: innovationImg,
  },
  {
    title: "Client-Centric Approach",
    description:
      "Our clients are at the heart of everything we do. We are dedicated to understanding their unique needs and delivering customized IT solutions that exceed expectations. Your success is our success.",
    img: clientCentricImg,
  },
  {
    title: "Integrity and Transparency",
    description:
      "We believe in doing the right thing, always. Our commitment to honesty, accountability, and open communication builds trust with our clients, partners, and team members.",
    img: integrityImg,
  },
  {
    title: "Excellence and Quality",
    description:
      "We are relentless in our pursuit of excellence. From the smallest detail to the most complex project, we strive to deliver the highest quality outcomes that set industry standards.",
    img: excellenceImg,
  },
  {
    title: "Collaboration and Teamwork",
    description:
      "Great achievements are made through teamwork. We foster a collaborative environment where diverse perspectives are valued, and every team member is empowered to contribute their best.",
    img: teamworkImg,
  },
  {
    title: "Continuous Learning and Growth",
    description:
      "In the ever-evolving world of technology, staying ahead is crucial. We are committed to continuous learning, adapting to new trends, and sharing knowledge to grow both individually and as a company.",
    img: growthImg,
  },
  {
    title: "Social Responsibility",
    description:
      "We are passionate about making a positive impact beyond the digital world. By supporting sustainable practices and giving back to our community, we aim to create a better future for all.",
    img: socialImg,
  },
];

const OurValuesSection = () => {
  return (
    <section className="px-4 py-16 md:px-12 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-6 h-full">
          {[...Array(72)].map((_, i) => (
            <div key={i} className="border border-[#3a3a5a]"></div>
          ))}
        </div>
      </div>

      <motion.div
        className="text-center mb-12 mt-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold">Our Values</h2>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-[#00ff88] to-[#ff00ff] mx-auto mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 96, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        />
        <p className="w-[90%] md:w-[60%] mx-auto mt-4 text-gray-300">
          At Virtual Tech Masters, we are guided by a set of core values that define who we are, shape our culture, and guide our actions. These values reflect our commitment to innovation, integrity, and excellence in the IT industry.
        </p>
      </motion.div>

      {values.map((item, index) => (
        <motion.div
          key={index}
          className={`flex flex-col ${
            index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
          } items-center justify-center gap-8 md:gap-20 my-10 relative z-10`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="w-[350px] md:w-[400px] flex-shrink-0"
            variants={{
              hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="rounded-lg w-full h-auto shadow-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg" />
          </motion.div>

          <motion.div
            className="max-w-[90%] md:max-w-[500px] text-center md:text-left"
            variants={{
              hidden: { opacity: 0, x: index % 2 === 0 ? 100 : -100 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
            }}
          >
            <h3 className="text-2xl font-semibold text-[#00ff88] mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        className="w-[90%] md:w-[60%] mx-auto text-center font-semibold mt-16 text-gray-300 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        At Virtual Tech Masters, our values are not just words—they are the foundation of everything we do. We invite you to partner with us and experience the difference of a company that truly values excellence, innovation, and integrity.
      </motion.div>
    </section>
  );
};

export default OurValuesSection;