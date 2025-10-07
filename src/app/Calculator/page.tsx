"use client";


import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const calculators = [
  {
    id: "brokerage",
    title: "Brokerage Calculator",
    content: () => (
      <div className="text-gray-800">
        The Brokerage Calculator helps traders and investors estimate the total cost of executing a trade, including brokerage fees, taxes, and other charges. By entering details such as buy price, sell price, quantity, and brokerage percentage, users can calculate:
        <ul className="list-disc ml-5">
          <li>Total brokerage charges</li>
          <li>STT (Securities Transaction Tax)</li>
          <li>Exchange transaction charges</li>
          <li>GST (Goods & Services Tax)</li>
          <li>SEBI charges</li>
          <li>Final profit or loss after deductions</li>
        </ul>
        This tool ensures traders have a clear understanding of their net earnings or expenses before placing trades.
      </div>
    ),
    image: "/BRcalci1.jpg",
  },
  {
    id: "sip",
    title: "SIP Calculator",
    content: () => (
        <div className="text-gray-800">
         The Systematic Investment Plan (SIP) Calculator enables users to estimate the future value of their investments through SIPs. By entering:
          <ul className="list-disc ml-5">
            <li>Monthly investment amount</li>
            <li>Expected annual return rate (%)</li>
            <li>Investment duration (years/months)</li>
            </ul>
            <p>Users can determine:</p>
            <ul>
            <li>The total invested amount</li>
            <li>Estimated returns based on compound growth</li>
            <li>The maturity amount at the end of the tenure</li>
          </ul>
          This tool helps investors plan their financial goals efficiently with SIP investments.
        </div>
      ),
    image: "/SIP.jpg",
  },
  {
    id: "gst",
    title: "GST Calculator",
    content: () => (
        <div className="text-gray-800">
        The GST (Goods and Services Tax) Calculator allows users to compute the GST amount on goods or services easily. By entering:
         <ul className="list-disc ml-5">
           <li>Product/service price</li>
           <li>Applicable GST rate (5%, 12%, 18%, or 28%)</li>
           </ul>
           <p>Users can find:</p>
           <ul>
           <li>The GST amount</li>
           <li>Net price after adding GST (for buyers)</li>
           <li>Base price after removing GST (for sellers)</li>
         </ul>
         This calculator simplifies tax calculations, making it useful for businesses, traders, and consumers.
       </div>
    ),
    image: "/SIPcalci.jpg",
  },
  {
    id: "fd",
    title: "Fixed Deposit Calculator",
    content: () => (
        <div className="text-gray-800">
        The Fixed Deposit Calculator helps users estimate the maturity value of an FD investment based on:
         <ul className="list-disc ml-5">
           <li>Principal amount</li>
           <li>Interest rate (%)</li>
           <li>Tenure (years/months)</li>
           <li>Interest compounding frequency (monthly, quarterly, yearly)</li>
           </ul>
           <p>It provides:</p>
           <ul className="type-disc">
           <li>Total interest earned</li>
           <li>Final maturity amount</li>
         </ul>
         This tool is essential for investors looking to maximize returns through fixed deposits.
       </div>
    ),
    image: "/Depositcalci.jpg",
  },
];

const CalculatorSection = () => {
  return (
    <div className="container mx-auto py-8">
      {/* Banner / Slider */}
      <Carousel showThumbs={false} infiniteLoop autoPlay className="mb-8">
        <div className="h-64 bg-gradient-to-bl from-green-600 to-green-500 text-white flex items-center justify-center text-2xl font-bold">
          Calculators & Tools
        </div>
        <div className="h-64 bg-gradient-to-tl from-green-700 to-green-600 text-white flex items-center justify-center text-2xl font-bold">
          Financial Planning Made Easy
        </div>
      </Carousel>

      {/* Small Calculator Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 px-8">
        {calculators.map((calc) => (
          <div key={calc.id} className="py-4 bg-transparent shadow-lg border-t-8 border-green-600 text-green-600 font-bold rounded-lg text-center">
            {calc.title}
          </div>
        ))}
      </div>

      {/* Individual Calculator Sections */}
      {calculators.map((calc) => (
        <div key={calc.id} className="flex flex-col md:flex-row bg-green-100 rounded-lg p-6 mb-8">
          {/* Left Side: Button & Description */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2">{calc.title}</h3>
            <p className="text-gray-700 mb-4">{calc.content()}</p>
            <button className="bg-green-600 w-44 text-white px-4 py-2 rounded hover:bg-green-700">
              Calculate {calc.title}
            </button>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2 flex justify-center items-center">
            <Image
              src={calc.image}
              alt={calc.title}
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalculatorSection;
