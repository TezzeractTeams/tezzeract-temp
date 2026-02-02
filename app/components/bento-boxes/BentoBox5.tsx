"use client";

import React, { useState, useEffect } from "react";

interface Testimonial {
  text: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Tezzeract teams works with us just as our own exisiting team and it was very easy to collaborate.",
    name: "Gabriele Mirabile",
    title: "Chief Marketing Officer",
    company: "Beentouch s.r.l.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    text: "The platform has revolutionized our workflow. Seamless integration and incredible support from the Tezzeract team.",
    name: "Sarah Johnson",
    title: "CEO",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    text: "Outstanding service and innovative solutions. Tezzeract has become an essential part of our daily operations.",
    name: "Michael Chen",
    title: "CTO",
    company: "InnovateLabs",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    text: "Best decision we made this year. The collaboration tools are intuitive and the team is always responsive.",
    name: "Emily Rodriguez",
    title: "Product Manager",
    company: "StartupHub",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export default function BentoBox5() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const currentTestimonial = testimonials[currentIndex];

  // Auto-rotate testimonials with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500); // Half of transition duration for fade out
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Check screen size for responsive clipPath
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
          <clipPath id="bento-shape-5" clipPathUnits="objectBoundingBox">
            <path 
              transform="scale(-1, 1) translate(-1, 0)" 
              d="M0 0L0.028 0H0.6105C0.626 0 0.6385 0.009 0.6385 0.02V0.09C0.6385 0.102 0.651 0.11 0.6665 0.11H0.972C0.9875 0.11 1 0.118 1 0.13V0.979C1 0.99 0.9875 1 0.972 1H0.028C0.0125 1 0 0.99 0 0.979V0Z" 
            />
          </clipPath>
        </defs>
      </svg>
      <div 
        className={`h-full w-full flex flex-col relative overflow-hidden p-4 sm:p-6 md:p-8 ${!isDesktop ? 'rounded-xl' : ''}`}
        style={{ 
          clipPath: isDesktop ? 'url(#bento-shape-5)' : 'none',
          backgroundImage: 'url(/bento5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#00A9EE',
          borderRadius: '30px'  
          
        }}
      >
      {/* Content inside shape */}
      <div className="relative z-10 flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 h-full justify-between text-white min-h-0">
        
        {/* Testimonial text - fixed height area */}
        <div className="flex flex-col justify-start pt-4 sm:pt-6 md:pt-8 lg:pt-12 pb-2 sm:pb-4 md:pb-6 h-[180px] sm:h-[200px] md:h-[240px] lg:h-[260px] xl:h-[280px]">
          <p 
            key={currentIndex}
            className="text-white text-2xl xl:text-2xl 2xl:text-3xl font-light max-w-[95%] sm:max-w-[90%] transition-opacity duration-500 ease-in-out break-words"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            {currentTestimonial.text}
          </p>
        </div>

        {/* Author info - fixed height */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-4 md:mt-6 flex-shrink-0 h-[50px] sm:h-[60px] md:h-[72px]">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 border-2 border-white/30 overflow-hidden flex-shrink-0 transition-opacity duration-500 ease-in-out" style={{ opacity: isAnimating ? 0 : 1 }}>
            <img 
              key={`avatar-${currentIndex}`}
              src={currentTestimonial.avatar} 
              alt={currentTestimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1 transition-opacity duration-500 ease-in-out" style={{ opacity: isAnimating ? 0 : 1 }}>
            <p key={`name-${currentIndex}`} className="text-white font-bold text-sm sm:text-base truncate">{currentTestimonial.name}</p>
            <p key={`title-${currentIndex}`} className="text-white/90 text-xs sm:text-sm truncate">{currentTestimonial.title}</p>
            <p key={`company-${currentIndex}`} className="text-white/90 text-xs sm:text-sm truncate">{currentTestimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
