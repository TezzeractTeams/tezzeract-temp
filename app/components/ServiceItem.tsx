"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ServiceItemProps {
  name: string;
  avatarSrc: string;
  avatarAlt?: string;
}

export default function ServiceItem({ name, avatarSrc, avatarAlt }: ServiceItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Service Item Container - Pill shape on hover */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-3xl transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: isHovered ? "rgba(167, 217, 252, 0.12)" : "transparent",
          backdropFilter: isHovered ? "blur(10px)" : "none",
          transform: isHovered ? "scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: isHovered ? "0 0px 12px rgba(0, 0, 0, 0.04)" : "none",
        }}
      >
        {/* Text */}
        <span
          className={`
            text-base md:text-lg font-medium whitespace-nowrap transition-all duration-300 ease-in-out
            ${isHovered 
              ? "text-white font-light" 
              : "text-white/50"
            }
          `}
        >
          {name}
        </span>
        
        {/* Arrow - smooth opacity transition */}
        <span 
          className="text-white text-lg font-light transition-opacity duration-300 ease-in-out"
          style={{
            opacity: isHovered ? 1 : 0,
          }}
        >
          →
        </span>
        
        {/* Avatar */}
        <div
          className={`
            relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 ease-in-out
            ${isHovered 
              ? "ring-2 ring-white/30" 
              : ""
            }
          `}
        >
          <Image
            src={avatarSrc}
            alt={avatarAlt || name}
            width={40}
            height={40}
            className={`
              object-cover w-full h-full transition-all duration-300 ease-in-out
              ${isHovered ? "opacity-100 scale-105" : "opacity-60"}
            `}
          />
        </div>
      </div>
    </div>
  );
}
