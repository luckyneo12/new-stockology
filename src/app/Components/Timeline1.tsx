"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const timelineData = [
  {
    title: "Stockology Securities Pvt Ltd Incorporation",
    content:
      "In 2021, Stockology was founded with a vision to simplify stock market insights for investors. From the beginning, we focused on delivering reliable market analysis, empowering traders with data-driven decisions.",
    number: 2021,
    image: "/journey1.jpg",
  },
  {
    title: "Launch Stockology Mobile Application",
    content:
      "In 2022, Stockology expanded its reach by establishing a training institute in Bhopal, empowering aspiring traders with in-depth market knowledge. Our institute became a hub for financial education, equipping individuals with the skills to navigate the stock market confidently.",
    number: 2022,
    image: "/journey2.jpg",
  },
  {
    title: "Offline Training Institute Setup",
    content:
      "In 2023, we established offline education initiatives to empower aspiring traders with in-depth market knowledge. Our expert-led sessions provided hands-on training, bridging the gap between theory and real-world stock market strategies.",
    number: 2023,
    image: "/journey1.jpg",
  },
  {
    title: "Got Licence Of NSE For Stock Broking",
    content:
      "In 2025, Stockology achieved a major milestone by securing its official stock broker license. This marked a new era of trust, compliance, and expanded investment opportunities for our clients.",
    number: 2025,
    image: "/journey2.jpg",
  },
];

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div
      className="relative bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url(/journeybg.png)" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white opacity-70"></div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto text-white md:py-10 py-6 px-5 md:px-20 text-center">
        {/* Our Journey Section */}
        <h1 className="md:text-5xl text-3xl font-bold text-primary">Our Journey</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-light">
          Discover how Stockology evolved from a vision to a trusted stock broking firm.
          Explore our milestones, achievements, and relentless pursuit of excellence.
        </p>

        {/* Timeline */}
        <div
          className="relative flex justify-center  px-2 mt-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Timeline Line */}
          <motion.div
            className="absolute top-1/2 left-0 h-[3px] w-full bg-gradient-to-r from-green-500 to-red-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeIndex / (timelineData.length - 1)) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />

          {/* Year Circles */}
          <div className="relative flex md:space-x-36 space-x-6 gap-3 md:gap-12 shadow-lg rounded-2xl py-4 px-7">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className={`relative z-10 md:w-32 md:h-32 w-16 h-16 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-green-500 scale-110"
                    : "bg-gray-100 text-black shadow-green-300 shadow-lg border-green-500 border-2"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="md:text-xl font-bold">{item.number}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="mt-4 flex flex-col md:flex-row md:max-w-4xl justify-center border-green-200 border mx-auto py-4 px-2 items-center md:items-center bg-white shadow-green-400 rounded-xl shadow-lg">
          <img
            src={timelineData[activeIndex].image}
            alt={timelineData[activeIndex].title}
            className="w-56 h-56 object-cover rounded-lg shadow-lg"
          />
          <div className="md:ml-14 text-center md:text-left">
            <h2 className="md:text-3xl text-xl font-semibold text-secondary">
              {timelineData[activeIndex].title}
            </h2>
            <p className="text-light mt-4 md:max-w-lg max-w-md">
              {timelineData[activeIndex].content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
