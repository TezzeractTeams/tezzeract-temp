"use client"

import React, { useState, useEffect } from "react";
import { Ripple } from "./Ripple";
import { File, Settings, Search, Zap, Star, Heart } from "lucide-react";    
import { OrbitingCircles } from "./OrbitingCircles";

export default function BentoBox1() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="bento-shape-1" clipPathUnits="objectBoundingBox">
            <path 
              d="M0 0.02C0 0.009 0.0125 0 0.028 0H0.6105C0.626 0 0.6385 0.009 0.6385 0.02V0.09C0.6385 0.102 0.651 0.11 0.6665 0.11H0.972C0.9875 0.11 1 0.118 1 0.13V0.979C1 0.99 0.9875 1 0.972 1H0.028C0.0125 1 0 0.99 0 0.979V0.02Z" 
            />
          </clipPath>
        </defs>
      </svg>
     
      <div 
        className={`relative h-full w-full flex items-center justify-center overflow-hidden ${!isDesktop ? 'rounded-xl min-h-[400px]' : ''}`}
        style={{ 
          clipPath: isDesktop ? 'url(#bento-shape-1)' : 'none',
          backgroundColor: isDesktop ? 'rgba(0, 0, 0, 0.22)' : 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(150px)',
          WebkitBackdropFilter: 'blur(150px)',
          border: '0px solid rgba(255, 255, 255, 0.47)',
          borderRadius: '30px'
        }}
      >
        {/* Text content - top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
          <div className="text-white p-5">
            <div className="text-6xl  md:text-7xl font-light tracking-tighter">250+</div>
            <p className="text-2xl sm:text-[20px] md:text-3xl font-light leading-tight pr-25 mt-1">
              professionals across the world, specialised across multiple domains.
            </p>
          </div>
        </div>
        <Ripple 
          mainCircleOpacity={0.5}
          numCircles={3}
          verticalOffset="95%"
        />
        {/* White circle with SVG at ripple center */}
        <div
          className="absolute pointer-events-none flex items-center justify-center rounded-full shadow-lg"
          style={{
            width: '140px',
            height: '140px',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, -68%)',
            zIndex: 1,
            background: 'linear-gradient(to bottom right, #00A9EE 20%, #0070BC 50%, #00A9EE 100%)',
          }}
        >
          <img
            src="/TezzeractLight.svg"
            alt="Tezzeract Light"
            className="w-[45%] h-[45%] object-contain"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {/* Calculate radii matching ripple circles: (mainCircleSize + i * 120) * scale / 2 */}
          {/* Circle 0: (210 + 0 * 120) * 1.3 / 2 = 136.5px */}
          <OrbitingCircles 
            radius={136.5} 
            path={false}
            verticalOffset="102%"
          >
            <File />
            <Settings />
            <Search />
          </OrbitingCircles>
          {/* Circle 1: (210 + 1 * 120) * 1.3 / 2 = 214.5px */}
          <OrbitingCircles 
            radius={214.5} 
            path={false} 
            reverse
            verticalOffset="102%"
          >
            <File />
            <Settings />
            <Search />
            <Zap />
          </OrbitingCircles>
        </div>
      </div>
    </>
  );
}
