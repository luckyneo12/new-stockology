"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const Vision = () => {
  return (
    <motion.div
      className="container mx-auto md:py-10 py-5 px-3 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="md:grid grid-cols-3 gap-5 max-w-7xl mx-auto"
        variants={containerVariants}
      >
        {/* Vision */}
        <motion.div
          className="flex flex-col justify-center items-center text-center px-5  "
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
        >
          <div className=" border border-green-200 p-5 rounded-xl shadow-lg shadow-green-100  hover:shadow-green-200  hover:shadow-2xl">
            {" "}
            <h1 className="md:text-4xl text-2xl font-bold mb-4 text-primary">VISION</h1>
            <p className="text-light md:text-lg text-sm">
            Stockology aims to be India&apos;s most trusted plateform for empowering investors with real-time insights. 
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex justify-center"
          variants={fadeInUp}
          whileHover={{ scale: 1 }} 
        >
          <motion.img
            src="/mission.png"
            alt="Stockology Vision & Mission"
            className="max-w-full h-auto "
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6 },
            }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1 }}
          />
        </motion.div>

        {/* Mission */}
        <motion.div
          className="flex flex-col justify-center items-center text-center px-5"
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
        >
          <div className=" border border-green-200 p-5 rounded-xl shadow-lg shadow-green-100  hover:shadow-green-200  hover:shadow-2xl">
            <h1 className="md:text-4xl text-2xl font-bold mb-4 text-primary">MISSION</h1>
            <p className="text-light md:text-lg text-sm">
              we aim to provide seamless access to stock market trends, investment strategies ensuring every user has power to navigate financial markets confidently.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Values */}
      <motion.div
        className="flex flex-col justify-center items-center text-center mt-10 px-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        whileHover={{ scale: 1 }}
      >
        <div className=" border border-green-200 p-5 rounded-xl shadow-lg shadow-green-100  hover:shadow-green-200  hover:shadow-2xl">
          <h1 className="md:text-4xl text-2xl font-bold mb-4 text-primary">VALUES</h1>
          <p className="text-light max-w-lg md:text-lg text-sm">
             Stockology appears to initiate valuable investment strategies focusing on stock market analysis and investment approaches.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Vision;