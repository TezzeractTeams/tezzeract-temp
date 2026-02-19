"use client";

import React, { useState, useEffect } from "react";

interface Testimonial {
  text: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    text: "The Tezzeract team approached our project with a highly collaborative approach, taking the time to fully understand our mission, values, and audience.",
    name: "Gabriele Mirabile",
    title: "Chief Marketing Officer – Beentouch",
    company: "Founder – United by Music for Charity",
  },
  {
    text: "Working with Tezzeract on our regional communications strategy in Asia has been an exceptional experience.",
    name: "Gurpreet Bhatia",
    title: "Regional Communications Director - Asia",
    company: "Heifer International",
  },
  {
    text: "Tezzeract has been an invaluable partner in optimizing our website performance and developing several projects from scratch.",
    name: "Marius Fittler",
    title: "Creative Director",
    company: "Panomatics VR International",
  }
];

export default function BentoBox5() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate testimonials with smooth transitions
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500); // Half of transition duration for fade out
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Safety check to ensure index is always valid
  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  // If no testimonials or current is undefined, don't crash
  if (!currentTestimonial) return null;

  return (
    <div className="h-[50vh]">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="bento-shape-5" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(-1, 1) translate(-1, 0)"
              d="M0 0.02C0 0.009 0.0125 0 0.028 0H0.6105C0.626 0 0.6385 0.009 0.6385 0.02V0.12C0.6385 0.132 0.651 0.14 0.6665 0.14H0.972C0.9875 0.14 1 0.148 1 0.16V0.979C1 0.99 0.9875 1 0.972 1H0.028C0.0125 1 0 0.99 0 0.979V0.02Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        className="bento-box-5 h-[50vh] sm:h-full w-full flex flex-col relative overflow-hidden p-4 sm:p-6 md:p-8 rounded-xl"
        style={{
          backgroundImage: 'url(/bento5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#00A9EE',
          borderRadius: '30px'
        }}
      >
        {/* Content inside shape */}
        <div className="relative z-10 flex flex-col p-4 sm:p-6 md:p-1 lg:p-10 h-full justify-between text-white min-h-0">

          {/* Testimonial text - fixed height area */}
          <div className="flex flex-col tracking-tighter leading-tight justify-start pt-4 sm:pt-6 md:pt-8 lg:pt-12 pb-2 sm:pb-4 md:pb-6 h-[180px] sm:h-[200px] md:h-[240px] lg:h-[260px] xl:h-[280px]">
            <p
              key={currentIndex}
              className="text-white mt-10 sm:mt-0 text-[28px] md:text-xl xl:text-2xl 2xl:text-3xl font-light max-w-[95%] sm:max-w-full transition-opacity duration-500 ease-in-out break-words"
              style={{ opacity: isAnimating ? 0 : 1 }}
            >
              {currentTestimonial.text}
            </p>
          </div>

          {/* Author info - fixed height */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-4 md:mt-1 flex-shrink-0 h-[50px] sm:h-[60px] md:h-[72px]">
            <div className="flex flex-col min-w-0 flex-1 transition-opacity duration-500 ease-in-out" style={{ opacity: isAnimating ? 0 : 1 }}>
              <p key={`name-${currentIndex}`} className="text-white font-bold text-sm sm:text-base truncate">{currentTestimonial.name}</p>
              <p key={`title-${currentIndex}`} className="text-white/90 text-xs sm:text-sm truncate">{currentTestimonial.title}</p>
              <p key={`company-${currentIndex}`} className="text-white/90 text-xs sm:text-sm truncate">{currentTestimonial.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
