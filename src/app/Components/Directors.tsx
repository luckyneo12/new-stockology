"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

const teamMembers = [
  {
    id: 1,
    name: "Mr Aniket Shukla",
    role: "CEO & Founder",
    image: "/admin.jpeg",
    description: "Visionary leader with 10+ years of experience in tech innovation.",
  },
  {
    id: 2,
    name: "Mr Manish Kumar",
    role: "Director",
    image: "/admin.jpeg",
    description: "Expert in AI and machine learning, driving technological advancements.",
  },
  {
    id: 3,
    name: "Abhishek Sahu",
    role: "Director",
    image: "/admin.jpeg",
    description: "Creative mind behind our stunning user interfaces and experiences.",
  },
];

export default function MeetOurDirectors() {
  const [activeDirector, setActiveDirector] = useState(teamMembers[0].id);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDirector((prev) => (prev === teamMembers.length ? 1 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentDirector = teamMembers.find((member) => member.id === activeDirector);

  return (
    <div className=" py-10 px-4 md:px-10 container mx-auto text-center  ">

      <h1 className="md:text-5xl text-3xl font-bold text-primary md:mb-3">Board of Directors</h1>
<h1 className="md:text-xl text-lg font-semibold text-secondary ">
  &ldquo;The Board of Directors steers the company&apos;s vision, ensuring strategic growth, governance, and long-term success.&rdquo;
  </h1>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-12 gap-4">
   
        <div className="relative w-full md:w-1/2 h-[400px] flex items-center justify-center ">
      
        <div className="absolute inset-0 z-0">
            <img
              src="/bg.png"
              alt="Background"
              className="w-full h-full object-contain opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="md:text-3xl text-2xl  font-bold text-black">Stockology</h2>
            </div>
          </div>

          {/* Circular Positioned Icons */}
          {teamMembers.map((member, index) => {
            const angle = (360 / teamMembers.length) * index;
            const radius = 140;

            return (
              <div
                key={member.id}
                className="absolute flex items-center justify-center cursor-pointer transition-transform"
                style={{
                  transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                }}
                onClick={() => setActiveDirector(member.id)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className={clsx(
                    "w-10 h-10 md:w-16 md:h-16 rounded-full object-cover border-2 shadow-md transition-all transform hover:scale-110",
                    activeDirector === member.id
                      ? "border-green-400 scale-125 shadow-lg"
                      : "border-gray-300 grayscale opacity-75"
                  )}
                />
              </div>
            );
          })}
        </div>

        {/* Director Details Card */}
        
        <Card className="w-72 md:w-1/3 h-auto shadow-lg rounded-xl border border-green-100 shadow-green-300 p-6 transition-all transform hover:scale-105">
  <CardContent>
    <div className="relative bg-[url('/bg12.jpeg')] bg-cover bg-no-repeat w-full h-full p-4 rounded-lg">
      <div className="flex flex-col items-center text-center">
        <img
          src={currentDirector?.image}
          alt={currentDirector?.name}
          className="md:w-24 md:h-24 h-20 w-20 rounded-full border-2 border-green-300 shadow-lg mb-2"
        />
        <h2 className="text-xl font-bold text-primary">{currentDirector?.name}</h2>
        <p className="text-secondary font-semibold ">{currentDirector?.role}</p>
        <p className="mt-3 text-light font-medium">{currentDirector?.description}</p>
      </div>
    </div>
  </CardContent>
</Card>

      </div>
    </div>
  );
}
