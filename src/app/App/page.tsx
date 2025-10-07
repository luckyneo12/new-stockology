'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from "react";
import { FaChartLine, FaUserShield, FaBolt } from "react-icons/fa";
import Button from '../Components/Button';
import Value from '../Components/Value';
import FAQSection from '../Components/AppFAQ';


export default function App() {
  const [activeImage, setActiveImage] = useState("/phone11.png");

  const features = [
    {
      icon: <FaChartLine className="text-3xl text-blue-500" />,
      title: "Real-time Stock Analysis",
      description: "Get real-time stock insights and analysis powered by AI.",
      image: "/phone01.png"
    },
    {
      icon: <FaUserShield className="text-3xl text-green-500" />,
      title: "Secure Transactions",
      description: "Your investments are protected with end-to-end encryption.",
      image: "/phone4.png"
    },
    {
      icon: <FaBolt className="text-3xl text-yellow-500" />,
      title: "Fast Execution",
      description: "Instant order execution to help you stay ahead in the market.",
      image: "/phone11.png"
    },
    {
      icon: <FaBolt className="text-3xl text-yellow-500" />,
      title: "Goal Setting",
      description: "Like any self improving process, everything starts with setting your goals and committing to them.",
      image: "/phone4.png"
    },
   
   
  ];

  return (
    <div className='container mx-auto '>
      <section 
        className="  w-full  h-full items-center bg-black/70 bg-cover  bg-no-repeat overflow-hidden" 
        style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: 'cover',backgroundPosition: 'center',
          width: '100%', }}  >
        <div className=" flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }} 
            className="text-center md:text-left max-w-xl"
          >
            <h1 className="text-3xl md:text-6xl font-extrabold text-primary leading-tight">
              Elevate Your <span className="text-secondary">Trading</span> Experience
            </h1>
            <p className="text-lg text-light font-semibold mt-6 leading-relaxed">
              Stay ahead in the stock market with real-time updates, expert insights, and seamless trading tools.
            </p>
            <button className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-secondary rounded-full shadow-lg hover:bg-green-400 transition">
              Get Started
            </button>
          </motion.div>

          {/* Right SVG Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }} 
            className="w-full md:w-1/2 flex justify-center"
          >
            <img src="/app.svg" alt="Stock Trading Illustration" className="w-80 md:w-[450px] lg:w-[500px] py-8 h-auto" />
          </motion.div>

        </div>
      </section>

      {/**second section */}
      <div className="flex flex-col px-3 lg:flex-row items-center justify-center py-6  bg-no-repeat overflow-hidden" style={{ backgroundImage: "url('/second-planbg.png')", backgroundSize: 'cover',
          width: '100%',maxWidth:"1600px" }}  
          >
        
        {/* Left Section: Mobile Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="relative w-96 md:w-[550px] lg:w-[500px] h-auto"
        >
         <h1 className=" top-5 left-0 text-xl md:text-2xl font-bold text-primary">📲 Explore Stockology&apos;s Mobile App</h1>
          {/* Mobile Background */}
          <img src="/mobile1.png" alt="Mobile Mockup" className="w-full h-auto max-w-full" />

          {/* Screenshots inside mobile */}
          <div className="absolute top-[9.3%] left-[19%] w-[56.8%] h-[70%]  overflow-hidden object-cover ">
            <Image 
              src={activeImage} 
              alt="App Screenshot" 
              width={250} 
              height={450} 
              className="w-full h-full object-contain rounded-3xl "
            />
          </div>
        </motion.div>

        {/* Right Section: Info Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="flex  flex-col gap-4 "
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }} 
              onMouseEnter={() => setActiveImage(feature.image)}
              onMouseLeave={() => setActiveImage("/phone01.png")}
              className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md"
            >
              {feature.icon}
              <div>
                <h3 className="text-lg font-bold text-primary">{feature.title}</h3>
                <p className="text-light text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

{/**third section */}
      <div className=" px-3 md:py-24 py-10 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg1.jpeg')" }}>
        <h1 className="md:text-5xl text-3xl font-bold text-center text-primary ">
          Manage Your Wealth On the Go{" "}
        </h1>
        <div className="flex flex-wrap justify-evenly  md:mt-20 mt-8 text-center">
          <div>
            <h1 className="md:text-4xl text-lg text-primary font-semibold">1.5+ Thousand</h1>
            <p className="text-secondary font-semibold">App Downloads</p>
          </div>
          <div>
            <h1 className="md:text-4xl text-lg font-semibold text-primary">
              Fast & Secured
            </h1>
            <p className="text-secondary font-semibold">App </p>
          </div>
          <div>
            <h1 className="md:text-4xl text-primary text-lg font-semibold">8K + Users</h1>
            <p className="text-secondary font-semibold">Rated Till Now</p>
          </div>
        </div>
        <div className="md:mt-14 mt-8  flex justify-center">
          <Button name={"Google Play"} href={""} image={"/google.svg"} />
          <span className="mx-5">
            <Button name={"Apple store"} href={""} image={"/app.png"} />
          </span>
        </div>
      </div>

{/* Fourth Section */}
<div className="mt-8 w-full py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-8">
    Why Choose <span className="text-secondary">Stockology?</span>
  </h2>

  <div className="bg-white  rounded-xl overflow-hidden py-2">
    <div className="overflow-x-auto">
      <table className="min-w-full py-4">
        <thead className="bg-gradient-to-r from-green-600 to-green-700 ">
          <tr>
            <th className="py-5 px-6 text-left text-white font-semibold text-lg">Feature</th>
            <th className="py-5 px-6 text-center text-white font-semibold text-lg">Stockology 📈</th>
            <th className="py-5 px-6 text-center text-white font-semibold text-lg">Other Apps ❌</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {[
            { feature: "Real-time Market Alerts", stockology: "✅ Yes", others: "❌ No" },
            { feature: "AI-Powered Stock Insights", stockology: "✅ Yes", others: "❌ No" },
            { feature: "Zero Commission Trading", stockology: "✅ Yes", others: "❌ No" },
            { feature: "24/7 Customer Support", stockology: "✅ Yes", others: "❌ No" },
            { feature: "Secure Transactions (256-bit Encryption)", stockology: "✅ Yes", others: "⚠️ Limited" },
            { feature: "Customizable Dashboard", stockology: "✅ Yes", others: "❌ No" },
          ].map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="py-4 px-6 text-primary font-medium">{row.feature}</td>
              <td className="py-4 px-6 text-center text-green-600 font-semibold">{row.stockology}</td>
              <td className="py-4 px-6 text-center text-red-500 font-semibold">{row.others}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Responsive Design for Mobile */}
  <div className="mt-8 block md:hidden">
    <div className="space-y-4">
      {[
        { feature: "Real-time Market Alerts", stockology: "✅ Yes", others: "❌ No" },
        { feature: "AI-Powered Stock Insights", stockology: "✅ Yes", others: "❌ No" },
        { feature: "Zero Commission Trading", stockology: "✅ Yes", others: "❌ No" },
        { feature: "24/7 Customer Support", stockology: "✅ Yes", others: "❌ No" },
        { feature: "Secure Transactions (256-bit Encryption)", stockology: "✅ Yes", others: "⚠️ Limited" },
        { feature: "Customizable Dashboard", stockology: "✅ Yes", others: "❌ No" },
      ].map((row, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">{row.feature}</h3>
          <div className="mt-2 flex justify-between">
            <span className="text-green-600 font-medium">{row.stockology}</span>
            <span className="text-red-500 font-medium">{row.others}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/*About part */}
<div
      className="relative bg-cover bg-fixed bg-center flex flex-col justify-between p-6 text-white min-h-[80vh]  mx-auto rounded-xl "
      style={{
        backgroundImage: "url('/app1.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.6)", 
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Benefits Heading (Top Left) */}
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:text-4xl text-2xl font-extrabold uppercase tracking-wide "
      >
        🚀 Benefits of <span className="text-secondary">Stockology</span>
      </motion.h2>

      {/* Description (Top Right) */}
      <motion.p
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:text-lg md:pl-16   text-gray-200 max-w-xl leading-relaxed "
      >
        Stockology offers a seamless and intelligent **stock trading experience**, empowering you with **real-time alerts, AI-powered insights, and zero-commission trades** to maximize your investments.
      </motion.p>

      {/* Benefits List */}
      <div className="md:flex  justify-center max-w-7xl items-center mx-auto gap-6 sm:space-y-0 space-y-2 text-white ">
        {[
          { icon: "📊", title: "Real-Time Alerts", desc: "Stay ahead with instant market notifications." },
          { icon: "🤖", title: "AI Insights", desc: "Smart recommendations tailored to your trading style." },
          { icon: "💰", title: "Zero Commission", desc: "Trade without extra fees, keep more profits." },
          { icon: "🔒", title: "Secure Transactions", desc: "256-bit encryption ensures safe investments." },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-center space-x-1  p-2 bg-white/10 sm:gap-0 gap-4 rounded-lg shadow-md  "
          >
            <span className="text-4xl">{item.icon}</span>
            <div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info (Bottom Left) */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-gray-200 text-xl "
      >
        Stockology is built for **investors, beginners, and traders** looking for an edge in the stock market. Experience **speed, security, and innovation** in every trade.
      </motion.p>
    </div>

      <div className='py-2'>
      <Value/>
        </div> 

        <div className=''>
<FAQSection/>
        </div>


    </div>
  );
}