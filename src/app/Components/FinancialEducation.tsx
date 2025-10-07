import React, { useState, useEffect } from "react";
import { FaChartLine, FaExchangeAlt, FaCubes, FaChartPie, FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const content = [
  {
    title: "Equity Market",
    description:
      "The equity market, or stock market, is where shares of publicly listed companies are bought and sold. Investors buy shares to own a part of a company, and they earn profits through price appreciation and dividends.",
    image: "/equity101.svg",
    icon: <FaChartLine />,
    points: ["Invest in shares", "Earn dividends", "Long-term growth potential"],
  },
  {
    title: "Derivative Market",
    description:
      "Derivatives are financial contracts whose value depends on the price of an underlying asset, such as stocks, commodities, or interest rates. The most common types of derivatives are options, futures, and swaps.",
    image: "/equity105.svg",
    icon: <FaExchangeAlt />,
    points: ["Manage risk", "Leverage trading", "High potential returns"],
  },
  {
    title: "Commodity Market",
    description:
      "The commodity market involves trading raw materials or primary agricultural products like oil, gold, silver, wheat, and natural gas.",
    image: "/equity104.svg",
    icon: <FaCubes />,
    points: ["Trade raw materials", "Hedge against inflation", "Diverse asset classes"],
  },
  {
    title: "Investment Strategy",
    description:
      "Investment strategy refers to the approach an investor uses to meet their financial goals. This includes asset selection, diversification, risk management, and time horizon.",
    image: "/equity103.svg",
    icon: <FaChartPie />,
    points: ["Diversification", "Risk management", "Long-term planning"],
  },
  {
    title: "Hedging",
    description:
      "Hedging is a risk management strategy used to offset potential losses in investments by taking an opposite position in a related asset.",
    image: "/equity102.svg",
    icon: <FaShieldAlt />,
    points: ["Reduce investment risk", "Use derivatives", "Protect assets"],
  },
];

const FinancialEducation = () => {
  const [selected, setSelected] = useState(content[0]);

  // Auto change selected content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => {
        const nextIndex = (content.indexOf(prev) + 1) % content.length;
        return content[nextIndex];
      });
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto text-center py-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold pb-6 text-primary">Financial Education</h1>

      {/* Icons Row */}
      <div className="flex justify-center gap-8 py-6 flex-wrap md:flex-nowrap">
        {content.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              selected.title === item.title ? "text-secondary scale-110" : "text-light"
            }`}
            onClick={() => setSelected(item)}
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 hover:bg-green-200 text-2xl p-4">
              {item.icon}
            </div>
            <p className="mt-2 text-lg text-primary font-semibold">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Description & Image Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.title}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-8 px-6 md:px-20 pt-8"
        >
          {/* Left Side: Description */}
          <div className="text-left">
            <h2 className="text-3xl  text-primary font-bold pb-3">{selected.title}</h2>
            <p className="text-lg text-light leading-relaxed">{selected.description}</p>
            <ul className="list-disc  ml-8 pl-8 pb-4 pt-0.5 rounded-lg text-light">
              {selected.points.map((point, index) => (
                <li key={index} className="py-1 rounded-xl px-4 bg-green-100 m-2">{point}</li>
              ))}
            </ul>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center">
            <img
              src={selected.image}
              alt={selected.title}
             
              className="rounded-lg shadow-lg md:w-[450px] md:h-[300px] w-[250px] h-[200px] shadow-green-100 object-contain  transition-all "
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FinancialEducation;
