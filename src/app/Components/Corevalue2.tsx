import React from "react";

const Corevalue2 = () => {
  return (
    <div 
      className="relative bg-repeat bg-contain  container mx-auto  px-4 py-6 flex flex-col justify-center items-center text-center"
      style={{ 
        backgroundImage: "url('/corebg.png')",
        backgroundRepeat: "repeat", 
        backgroundSize: "43.3% auto" 
      }}
      
    >
    
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>
      <div className="relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
        Our Fundamental Belief
      </h1>
      <p className="text-lg md:text-2xl text-secondary font-semibold max-w-7xl mb-5">
        Our core values define who we are, guide our actions, and inspire us to
        achieve excellence in everything we do.
      </p>
      </div>

<img src="/CoreValue.png" className="md:w-4/5 relative z-10 sm:w-3/5 md:h-[500px] flex justify-center items-center object-contain md:ml-24 sm:ml-0 ml-14 "></img>
      
    </div>
  );
};

export default Corevalue2;
