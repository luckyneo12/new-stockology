import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const content = [
  { title: "Future & Options", description: "Trade derivatives smartly with our expert guidance." },
  { title: "IPO Investments", description: "Gain early access to high-growth potential companies." },
  { title: "NRI & NRO Accounts", description: "Seamless trading solutions for global investors." },
  { title: "Equity Trading", description: "Invest in stocks with strategic insights and risk management." },
];

const EquityBroking = () => {
  return (
    <div className="py-10 px-1 md:px-14 container mx-auto flex flex-col md:flex-row items-center">
      <div className="md:w-1/3 mb-8 md:mb-0 relative flex justify-center items-center">
       
        <div className="absolute md:w-[110%] w-[90%] h-[370px] md:h-[550px] z-0  flex justify-center items-center">
          <Image
            src="/Vector.svg"
            layout="fill"
            objectFit="contain"
            className="opacity-70"
            alt="Background"
          />
        </div>
        <Image src="/equity01.png" width={600} height={600} className="w-full md:h-[450px] h-[280px] relative z-10" alt="Equity Broking" />
      </div>

      <motion.div className="md:w-2/3 px-8"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}>
        <div className=" flex items-center gap-3">
       <video width="120" height="120" autoPlay loop muted className="rounded-full  ">
            <source src="/equity.mp4" type="video/mp4" />
          </video>
        <h1 className="md:text-5xl text-primary text-3xl font-bold">Equity Broking</h1></div>
        <p className="text-light  md:text-xl text-lg">
          Personalized equity broking services to help investors make informed decisions, maximize returns, and manage risks effectively.
        </p>
        <div className="md:px-8 px-3">
          <div className="mt-6 space-y-6 md:max-w-xl ">
            {content.map((item, index) => (
              <motion.div key={index} className="border-b px-6 py-4 bg-green-400/40 rounded-3xl transition duration-300"
              whileHover={{ scale: 1.05 }}>
                <h2 className="text-xl text-primary font-semibold">{item.title}</h2>
                <p className="text-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EquityBroking;
