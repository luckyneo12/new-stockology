"use client";

import React from "react";
import StockGraph from "./StockGraph";
import Link from "next/link";
import { motion } from "framer-motion";

const Homebanner = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white py-8 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between">
      {/* Left Side: Stock Graph Section */}
      <div className="w-full  md:w-1/2 flex flex-col items-center">
        <div className="md:w-fit bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Live Stock Market Data</h2>
          <StockGraph />
        </div>
      </div>

      {/* Right Side: App Introduction Section */}
      <div className="w-full md:w-1/2 md:pl-12 mt-10 md:mt-0 text-center md:text-left">
        <h1 className="md:text-5xl text-3xl font-bold">Your Gateway to Smarter Investments</h1>
        <p className="mt-4 mb-4 text-lg md:text-xl text-gray-200">
          Stockology provides real-time stock insights and market trends to help you make informed investment decisions. Stay ahead with our cutting-edge analytics and data-driven strategies.
        </p>
        <Link href="/App">
        <motion.button
            className="px-8 py-3 bg-white hover:bg-gray-200 text-green-700 font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Learn more about Stockology"
          >
            Explore Our App
          </motion.button>
          </Link>
      </div>
    </div>
  );
};

export default Homebanner;
