"use client";

import React, { useRef, useEffect } from "react";
import ServiceItem from "./ServiceItem";

interface Service {
  name: string;
  avatarSrc: string;
  avatarAlt?: string;
}

interface ServiceSliderProps {
  services: Service[];
}

interface SliderRowProps {
  services: Service[];
  direction: "left" | "right";
  speed?: number;
}

// Individual row component with its own animation
function SliderRow({ services, direction, speed = 0.5 }: SliderRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const initializedRef = useRef(false);

  // Triplicate services for seamless infinite loop
  const duplicatedServices = [...services, ...services, ...services];

  useEffect(() => {
    if (!rowRef.current) return;

    const row = rowRef.current;

    // Initialize scroll position for right-scrolling rows
    if (!initializedRef.current) {
      if (direction === "right") {
        // Start from the middle section for right-scrolling
        scrollPositionRef.current = row.scrollWidth / 3;
        row.scrollLeft = scrollPositionRef.current;
      }
      initializedRef.current = true;
    }

    const animate = () => {
      if (!rowRef.current) return;

      if (direction === "left") {
        // Scroll left (items move right-to-left)
        scrollPositionRef.current += speed;
        
        // Reset at 1/3 for seamless loop
        if (scrollPositionRef.current >= rowRef.current.scrollWidth / 3) {
          scrollPositionRef.current = 0;
        }
      } else {
        // Scroll right (items move left-to-right)
        scrollPositionRef.current -= speed;
        
        // Reset when reaching the start
        if (scrollPositionRef.current <= 0) {
          scrollPositionRef.current = rowRef.current.scrollWidth / 3;
        }
      }

      rowRef.current.scrollLeft = scrollPositionRef.current;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [direction, speed]);

  return (
    <div
      ref={rowRef}
      className="flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {duplicatedServices.map((service, index) => (
        <div key={`${index}`} className="flex-shrink-0">
          <ServiceItem
            name={service.name}
            avatarSrc={service.avatarSrc}
            avatarAlt={service.avatarAlt}
          />
        </div>
      ))}
    </div>
  );
}

export default function ServiceSlider({ services }: ServiceSliderProps) {
  // Distribute services across 3 rows; ensure each row has enough items to scroll
  const rowSize = Math.max(2, Math.ceil(services.length / 3));
  const row1Services = services.slice(0, rowSize);
  const row2Services = services.slice(rowSize, rowSize * 2);
  const row3Services = services.slice(rowSize * 2);

  // If any row is empty or has too few items to scroll, use full list so it animates
  const minItemsToScroll = 2;
  const filledRow1 = row1Services.length >= minItemsToScroll ? row1Services : services;
  const filledRow2 = row2Services.length >= minItemsToScroll ? row2Services : services;
  const filledRow3 = row3Services.length >= minItemsToScroll ? row3Services : services;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 20%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%)",
      }}
    >
      {/* 3 horizontal rows with alternating scroll directions */}
      <div className="flex flex-col gap-4">
        {/* Row 1: Scroll Left */}
        <SliderRow services={filledRow1} direction="left" speed={0.5} />
        
        {/* Row 2: Scroll Right */}
        <SliderRow services={filledRow2} direction="right" speed={0.5} />
        
        {/* Row 3: Scroll Left */}
        <SliderRow services={filledRow3} direction="left" speed={0.5} />
      </div>
    </div>
  );
}
