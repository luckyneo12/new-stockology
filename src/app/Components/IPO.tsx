"use client";

import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

export default function IPO() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:py-16 py-6">
      {/* Heading */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="mb-12 text-center"
      >
        <h2 className="md:text-5xl text-3xl font-bold text-primary">
          IPO Investment Opportunities
        </h2>
        <p className="mt-4 text-lg text-light">
          Discover high-growth potential by investing in promising companies at an early stage.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Image with Animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/IPOimage.png" 
            alt="IPO Investment" 
            className="md:w-[500px] md:h-[450px] w-[300px] h-[300px] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="w-full lg:w-1/2 space-y-6"
        >
          <h3 className="md:text-4xl text-3xl font-semibold text-primary">
            Why Invest in IPOs?
          </h3>

          <ul className="space-y-4">
            {[
              "Opportunity for High Returns",
              "Exposure to Emerging Companies",
              "Access to Early-Stage Growth",
              "Potential for Long-Term Value",
            ].map((benefit, index) => (
              <motion.li 
                key={index} 
                className="flex items-center space-x-3 text-lg text-light"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-secondary text-2xl"><FaCheck /></span>
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>

          <p className="text-base text-light leading-relaxed">
            Investing in IPOs provides an opportunity to be part of a company&apos;s 
            journey from the start. However, thorough research and due diligence 
            are essential before making investment decisions.
          </p>

          {/* CTA Button with Animation */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link href="/IPOInvestments">
              <button className="mt-6 px-6 py-3 bg-secondary text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
                Explore More
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
