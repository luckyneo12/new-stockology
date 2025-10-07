"use client";


import { cn } from "@/lib/utils";
import React from "react";
import { Star } from "lucide-react"; // For active icon indicator

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  duration?: number;
  speed?: number;
  icons?: { id: number; image: string; name: string; role: string; description: string }[];
  setActiveDirector?: (id: number) => void;
  activeDirector?: number;
  centerLogo?: string; // Add this prop for the center logo
}

export function OrbitingCircles({
  duration = 30, // Slower rotation
  speed = 0.5,
  icons = [],
  activeDirector,
  setActiveDirector,
  centerLogo, // Destructure the new prop

}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Center Logo */}
      {centerLogo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={centerLogo} alt="Center Logo" className="w-14 h-14  " />
        </div>
      )}

      {/* Multiple orbits */}
      {icons.map((icon, index) => {
        const radius = 120 + index * 60; // Different orbit sizes
        const angle = (360 / icons.length + 1) * index ;
        const isActive = activeDirector === icon.id;

        return (
          <div key={icon.id} className="absolute inset-0 flex items-center justify-center">
            {/* SVG Orbit */}
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute inset-0 w-full h-full">
              <circle className="stroke-gray-300 dark:stroke-black stroke-[2]" cx="50%" cy="50%" r={radius} fill="none" />
            </svg>
            {/* Icon inside orbit */}
            <div
              onClick={() => setActiveDirector?.(icon.id)}
              style={
                {
                  "--duration": calculatedDuration,
                  "--radius": radius,
                  "--angle": angle,
                } as React.CSSProperties
              }
              className={cn(
                `absolute transition-all  size-[var(--icon-size)] flex items-start justify-between rounded-full border-2 cursor-pointer`,
                isActive ? "scale-125 border-green-500 shadow-xl" : "animate-orbit grayscale opacity-50"
              )}
            >
              <img
                src={icon.image}
                alt={icon.name}
                className={cn("w-20 h-20 rounded-full object-cover transition-all", isActive ? "scale-125 filter-none" : "grayscale")}
              />
              {isActive && <Star className="absolute -top-3 right-1 text-yellow-500 w-6 h-6 fill-amber-500" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}