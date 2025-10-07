"use client";


import { motion } from "framer-motion";
import { TrendingUp, LineChart, BarChart3, Activity,PieChart, CandlestickChart  } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import { FaChartLine, FaShieldAlt, FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";



const icons = [
    { icon: <FaChartLine />, name: "Market Analysis" },
    { icon: <FaShieldAlt />, name: "Secure Investments" },
    { icon: <FaUsers />, name: "Community Driven" },
    { icon: <FaLightbulb />, name: "Smart Strategies" },
    { icon: <FaHandshake />, name: "Trusted Partnerships" },
  ];


const WhoWeAre = () => {
  return (

    <section
      id="who-we-are"
      className="relative py-20 flex flex-col md:flex-row container mx-auto items-center justify-center bg-gradient-to-r from-green-500 to-green-700 text-white px-6 lg:px-20 overflow-hidden"
    >
      {/* Floating Stock Icons */}
      <motion.div
        className="absolute top-10 left-10 text-white/70"
        animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <TrendingUp size={45} className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="absolute top-20 center text-white/80"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <PieChart size={40} className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-white/80"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <LineChart size={40} className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="absolute top-1/4 right-20 text-white/60"
        animate={{ y: [0, 10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <BarChart3 size={38} className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/3 text-white/90"
        animate={{ y: [0, -10, 0], rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <Activity size={35} className="drop-shadow-lg" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 text-white/80"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <CandlestickChart size={40} className="drop-shadow-lg" />
      </motion.div>

      {/* Left Side: Image with Motion */}
      <motion.div
        className="relative w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="relative bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-3xl overflow-hidden p-4 max-w-md"
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/whobg.jpg"
            alt="Stockology Team"
            width={500}
            height={300}
            className="w-full h-64 object-cover rounded-xl shadow-lg"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Right Side: Text */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl">
          Who We Are
        </h2>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          At <span className="font-bold">Stockology</span>, we are a team of market experts and tech enthusiasts dedicated to providing cutting-edge trading solutions.
        </p>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          Our platform empowers traders with AI-driven insights, real-time analytics, and personalized strategies to maximize market potential.
        </p>
        <Link href="/About" passHref>
          <motion.button
            className="px-8 py-3 bg-white hover:bg-gray-200 text-green-700 font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Learn more about Stockology"
          >
            Learn More
          </motion.button>
        </Link>
      </motion.div>
      {/* Moving Icons Section */}
 <motion.div 
  className="absolute bottom-0 left-0 w-full h-14 bg-green-800/90 flex items-center overflow-hidden"
>
  <motion.div 
    className="flex space-x-10 whitespace-nowrap"
    animate={{ x: ["0%", "-100%"] }} 
    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
  >
    {/* First Set */}
    {icons.map((item, index) => (
      <div key={index} className="flex items-center space-x-2 text-white text-lg px-6">
        <span className="text-3xl text-green-400">{item.icon}</span>
        <p className="font-semibold">{item.name}</p>
      </div>
    ))}
    {/* Second Set for Seamless Transition */}
    {icons.map((item, index) => (
      <div key={`copy-${index}`} className="flex items-center space-x-2 text-white text-lg px-6">
        <span className="text-3xl text-green-400">{item.icon}</span>
        <p className="font-semibold">{item.name}</p>
      </div>
    ))}
  </motion.div>
</motion.div> 
    </section>
  );
};

export default WhoWeAre;



