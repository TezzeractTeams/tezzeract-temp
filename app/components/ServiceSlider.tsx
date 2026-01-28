"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import ServiceItem from "./ServiceItem";

interface Service {
  name: string;
  avatarSrc: string;
  avatarAlt?: string;
}

interface ServiceSliderProps {
  services: Service[];
}

export default function ServiceSlider({ services }: ServiceSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [columnOpacities, setColumnOpacities] = useState<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  // Organize services into columns (3 items per column)
  const columns: Service[][] = [];
  for (let i = 0; i < services.length; i += 3) {
    columns.push(services.slice(i, i + 3));
  }

  // Triplicate columns for seamless infinite loop
  const duplicatedColumns = [...columns, ...columns, ...columns];

  // Calculate opacity based on distance from center
  const updateOpacities = useCallback(() => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    // Use a wider fade zone for smoother transition
    const fadeZone = containerRect.width * 0.05;

    const opacities = columnRefs.current.map((colRef) => {
      if (!colRef) return 1;

      const colRect = colRef.getBoundingClientRect();
      const colCenter = colRect.left + colRect.width / 2;
      const distance = Math.abs(colCenter - containerCenter);
      
      // Smooth fade: full opacity in center, gradually fade to 0.15 at edges
      let opacity = 1;
      if (distance > fadeZone) {
        // Fade out more aggressively as we move away
        const fadeDistance = distance - fadeZone;
        const maxFadeDistance = containerRect.width / 2 - fadeZone;
        opacity = Math.max(0.15, 1 - (fadeDistance / maxFadeDistance) * 0.85);
      }
      
      return opacity;
    });

    setColumnOpacities(opacities);
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;

    const scrollSpeed = 0.5;

    const animate = () => {
      if (!sliderRef.current) return;

      scrollPositionRef.current += scrollSpeed;
      sliderRef.current.scrollLeft = scrollPositionRef.current;

      // Reset at 1/3 for seamless loop with tripled columns
      if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 3) {
        scrollPositionRef.current = 0;
        sliderRef.current.scrollLeft = 0;
      }

      updateOpacities();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateOpacities]);

  // Update opacities on scroll
  useEffect(() => {
    const handleScroll = () => {
      updateOpacities();
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      // Initial calculation
      updateOpacities();
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
    };
  }, [updateOpacities]);

  // Initialize opacities
  useEffect(() => {
    setColumnOpacities(new Array(duplicatedColumns.length).fill(1));
  }, [duplicatedColumns.length]);

  return (
    <div className="relative w-full">
      {/* Slider Container with Grid Layout - horizontal scroll */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 relative z-0"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {duplicatedColumns.map((column, colIndex) => (
          <div
            key={colIndex}
            ref={(el) => {
              columnRefs.current[colIndex] = el;
            }}
            className="flex flex-col gap-4 flex-shrink-0 transition-opacity duration-300"
            style={{ 
              minWidth: "fit-content",
              opacity: columnOpacities[colIndex] ?? 1
            }}
          >
            {column.map((service, serviceIndex) => (
              <ServiceItem
                key={`${colIndex}-${serviceIndex}`}
                name={service.name}
                avatarSrc={service.avatarSrc}
                avatarAlt={service.avatarAlt}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Optional: Navigation arrows */}
      {/* Uncomment if you want visible navigation arrows */}
      {/* 
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
        aria-label="Scroll left"
      >
        ←
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all"
        aria-label="Scroll right"
      >
        →
      </button>
      */}
    </div>
  );
}
