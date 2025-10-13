"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import MutualFunds from "../Components/MutualFunds";
import IPO from "../Components/IPO";
import FinancialEducation from "../Components/FinancialEducation";
import Service1 from "../Components/Service1";
import MobileOnline from "../Components/Mobile&Online";
import EquityBroking from "../Components/EquityBroking";


const Page = () => {

    const services = [
        { title: "Equity Broking", description: "Strategic tax planning to minimize liabilities and maximize returns." },
        { title: "Mutual Funds", description: "Comprehensive audit support to ensure compliance and accuracy." },
        { title: "Financial Education", description: "Expert advice tailored to your unique financial situation." },
        { title: "IPO Investment", description: "Get early access to high-growth companies and invest in Initial Public Offerings (IPOs)." },
      ];


      const [, setCurrentService] = useState(Number);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  return (

    <div className="container mx-auto px-4 md:px-10 py-8 md:py-16">
      {/**first section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <img
          src="/service.jpg"
          alt="office image"
          className="w-full max-w-5xl rounded-3xl shadow-xl"
        />
      </motion.div>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center py-12"
      >
        <h3 className="text-3xl md:text-5xl font-bold text-primary ">Our Services</h3>
        <p className="mt-4 text-lg text-light">
          We offer a range of tax consulting services tailored to your needs.
        </p>
      

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-3xl shadow-lg border-l-8 border-green-500 hover:shadow-2xl hover:bg-gradient-to-r from-green-600 to-red-600 hover:text-white cursor-pointer"
          >
            <h4 className="text-xl text-primary font-semibold">{service.title}</h4>
            <p className="mt-2 text-light">{service.description}</p>
          </motion.div>
        ))}
      </div>
      </motion.section>
      </div>
{/**second section */}
<div className="pt-8">
<div className="text-center mb-14 pt-2">
        <h2 className="md:text-5xl text-3xl font-bold tracking-wide text-primary">
          We Provide Variety Of Services
        </h2>
        <p className="text-light md:text-lg  text-semibold mt-3">
          We offer a variety of services to help your business grow.
        </p>
      </div>
      <Service1/>
</div>
      
<div className="">
  <EquityBroking/>
</div>

<div className="py-2" >
  <IPO/>
</div>

  <div id="Mutual-funds">
  <MutualFunds/>
  </div>


<div className="py-2">
  <FinancialEducation/>
</div>

<div className="py-2">
<MobileOnline/>
</div>
    </div>
  );
};



export default Page;
