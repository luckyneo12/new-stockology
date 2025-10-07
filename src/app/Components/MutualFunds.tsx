import React from "react";
import Image from "next/image";
import { FaChartPie, FaUsers, FaMoneyBillWave, FaExchangeAlt, FaTaxi, FaBalanceScale } from "react-icons/fa";
import { motion } from "framer-motion";

const images = ["/mutualimage.jpg", "/mutualimage01.png", "/mutualimage03.png", "/mutualimage04.png"];

const content = [
  { title: "Diversified Investment", icon: <FaChartPie size={40} /> },
  { title: "Professional Fund Management", icon: <FaUsers size={40} /> },
  { title: "Systematic Investment Plan (SIP)", icon: <FaMoneyBillWave size={40} /> },
  { title: "Liquidity & Accessibility", icon: <FaExchangeAlt size={40} /> },
  { title: "Tax-Saving Benefits", icon: <FaTaxi size={40} /> },
  { title: "Risk-Adjusted Returns", icon: <FaBalanceScale size={40} /> },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, staggerChildren: 0.3 } },
};

const MutualFunds = () => {
  return (
    <motion.div
      className="container mx-auto md:p-6 p-2 flex flex-col items-center text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-primary">Mutual Funds</h1>
      <p className="text-light text-lg max-w-2xl mx-auto leading-tight py-2">
        Mutual funds offer professional management, risk diversification, and accessibility, making them a preferred investment choice.
      </p>

      <div className="flex flex-col md:flex-row w-full mt-8 gap-6 items-center">
        {/* Left Side - Image Arrangement */}
        <motion.div
          className="relative w-full md:w-1/2 flex justify-center items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Main Image (Ensured Proper Sizing on Small Screens) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] md:w-[500px] md:h-[500px] overflow-hidden"
          >
            <Image src={images[0]} layout="fill" objectFit="contain" alt="Main Image" />
          </motion.div>

          {/* Smaller Positioned Images */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 overflow-hidden top-0 left-2 sm:bottom-80 sm:left-4 md:top-4 md:left-5"
          >
            <Image src={images[1]} layout="fill" objectFit="cover" alt="Top Image" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
            className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 overflow-hidden right-2 top-2 sm:right-4 sm:top-4 md:right-14 md:top-10"
          >
            <Image src={images[2]} layout="fill" objectFit="cover" alt="Right Image" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6 }}
            className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 overflow-hidden left-2 top-32 sm:left-4 sm:top-36 md:left-0 md:top-80"
          >
            <Image src={images[3]} layout="fill" objectFit="cover" alt="Left Image" />
          </motion.div>
        </motion.div>

        {/* Right Side - Icons & Titles */}
        <motion.div
          className="w-full md:w-1/2 flex flex-wrap gap-6 justify-center items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {content.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
              }}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center border-secondary border-y-4 hover:bg-gradient-to-tl from-green-500/70 to-green-600/70 hover:text-white bg-white p-4 shadow-lg rounded-lg w-40 h-40 transition-all"
            >
              <div className="text-secondary">{item.icon}</div>
              <h2 className="text-md text-primary font-semibold mt-2">{item.title}</h2>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MutualFunds;
