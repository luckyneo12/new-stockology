'use client';

import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin,  FaTwitter } from 'react-icons/fa6';
import ContactForm from '../Components/Form';
import { IoLocationSharp } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import Contact from '../Components/Contact';
import SearchBar from '../Components/Search';
import DepartmentRequest from '../Components/Departments';


export default function ContactUs() {

  return (
    <div className="container mx-auto text-primary md:py-16 py-5 px-3 ">
        <div className="relative bg-[url('/contact4.svg')] bg-cover bg-no-repeat md:py-14 py-5 px-3">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center md:px-16">
        <h2 className="md:text-5xl text-3xl font-bold   text-primary">CONTACT US</h2>
        <p className="text-light mt-2 text-lg py-2 font-semibold text-center max-w-xl">
          Get in touch with us, enquire anything you want, we&apos;re here to help and guide you!
        </p>
      </div>

      {/* Second Section */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="md:py-8 py-3 mt-4 grid md:grid-cols-4 gap-4">
          {/* Left Section */}
          <div className='flex flex-col items-center justify-center'>
            <h1 className="text-yellow-500 text-lg md:text-xl text-start font-bold">#Contact Us</h1>
            <h3 className="text-secondary text-3xl md:text-6xl font-semibold leading-tight">
              Get In <br /> Touch
            </h3>
          </div>

          {/* Contact Details */}
          {[
            {
              icon: <IoLocationSharp />,
              title: "Office Location",
              text: "621-623, Krishna Business Center, Vijay Nagar, 452010, Indore, Madhya Pradesh 452011",
            },
            {
              icon: <FaUserClock />,
              title: "Working Hours",
              text: "9:00 AM to 6:00 PM <br/> Monday to Saturday",
            },
            {
              icon: <PiPhoneCallFill />,
              title: "Communication",
              text: "+91-8349747038 <br/> support@stockologysecurities.com" ,
            },
          ].map((item, index) => (
            <div key={index} className="bg-green-700 p-6 rounded-lg text-center shadow-lg">
              <div className="flex justify-center text-white text-4xl mb-2">{item.icon}</div>
              <h3 className="text-lg text-white font-semibold">{item.title}</h3>
              <p className="text-gray-300 py-2" dangerouslySetInnerHTML={{ __html: item.text }}></p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className='my-10 '>
      <DepartmentRequest/>
    </div>

<div className='md:grid grid-cols-2  md:gap-10 gap-5 '>
    
      <div className="">
            <ContactForm/>
        
      </div>
      <div className='md:py-28 pb-5 items-center px-3'>
        <h1 className='text-secondary text-start text-xl py-2 font-bold'>Any Queries? </h1>
        <h2 className='text-primary md:text-5xl text-3xl font-bold py-2'>Contact Us</h2>
        <p className='text-light text-lg  '>For any queries feel  free to contact us regarding any stock trends ,investments or market insights.We&apos;re here to support your financial journey.</p>
        {/* Social Media Links */}
        <div className="py-3">
          <p className="text-secondary text-lg font-semibold mb-8">
            Stay updated with our latest news and updates.
          </p>
          <div className="flex px-6 gap-6">
            {[
              { icon: <FaFacebook />, color: "text-blue-600" },
              { icon: <FaTwitter />, color: "text-blue-400" },
              { icon: <FaLinkedin />, color: "text-blue-700" },
              { icon: <FaInstagram />, color: "text-pink-500" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`text-4xl ${item.color} hover:scale-110 transition-all duration-300`}
                whileHover={{ rotate: 15 }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
        </div>
    </div>
      </div>
      {/* Call-to-Action Banner */}
      <motion.div
      className="relative w-full h-44 flex  items-center justify-center overflow-hidden bg-gradient-to-r from-green-500 to-red-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background with Moving Elements */}
      <motion.div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-red-400 opacity-50 animate-pulse"></motion.div>
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 bg-white opacity-20 rounded-full"
        animate={{ x: [0, 300, -300, 0], y: [0, 150, -150, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-24 bg-black opacity-10 rounded-full"
        animate={{ x: [0, -200, 200, 0], y: [0, -100, 100, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      ></motion.div>

      {/* Large Text with Justified Center Alignment */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <h1 className="text-2xl md:text-4xl font-extrabold">
          Ready To Get Started?
        </h1>
        
          <p className="px-2 py-2 text-center text-lg">Contact us today and let&apos;s gain some profit together</p>
      </div>
    </motion.div>
    
     
      {/**customer support section */}
       <div className=" max-w-7xl mx-auto "> <Contact/> </div>

       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            A Collaborative Network
          </h2>
          <p className="text-light text-xl">
            Branches and Partner Offices Working Together
          </p>
        </div>
       <SearchBar/>
      </div>

{/* Map Section */}
<div className="mt-5 max-w-full mx-auto pb-5 px-10 rounded-lg ">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.4525351225648!2d75.8946659753057!3d22.748581279366768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd017f4c10db%3A0x46eab79a78b02055!2sKrishna%20business%20centre!5e0!3m2!1sen!2sin!4v1738587680128!5m2!1sen!2sin" 
          className="w-full h-[400px] rounded-lg shadow-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </div>
  );
}
