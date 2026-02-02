"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface LogoStripProps {
  className?: string;
}

export default function LogoStrip({ className }: LogoStripProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const speed = 0.5;

  // Logos array - client logos from assets/clients folder
  const logos = [
    { name: "Beentouch", logoSrc: "/assets/clients/beentouch.svg" },
    { name: "DMS", logoSrc: "/assets/clients/dms.svg" },
    { name: "Heifer", logoSrc: "/assets/clients/heifer.svg" },
    { name: "Panomatics", logoSrc: "/assets/clients/panomatics.svg" },
    { name: "Uncamino", logoSrc: "/assets/clients/uncamino.svg" },
    { name: "Work Paradise", logoSrc: "/assets/clients/workparadise.svg" },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    if (!sliderRef.current) return;

    const animate = () => {
      if (!sliderRef.current) {
        animationFrameRef.current = null;
        return;
      }

      if (isPaused) {
        // When paused, save current scroll position
        scrollPositionRef.current = sliderRef.current.scrollLeft;
        animationFrameRef.current = null;
        return;
      }

      // Continue from saved position
      scrollPositionRef.current += speed;
      sliderRef.current.scrollLeft = scrollPositionRef.current;

      // Reset scroll position when reaching the end of first set
      if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 3) {
        scrollPositionRef.current = 0;
        sliderRef.current.scrollLeft = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPaused, speed]);

  return (
    <div 
      className={`relative w-full overflow-hidden ${className || ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={sliderRef}
        className="flex flex-nowrap gap-8 md:gap-12 items-center scrollbar-hide overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          overflowX: "auto",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="shrink-0 flex items-center justify-center"
            style={{
              width: "150px",
            }}
          >
            <Image
              src={logo.logoSrc}
              alt={logo.name}
              width={120}
              height={40}
              className="object-contain py-6 opacity-90 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
