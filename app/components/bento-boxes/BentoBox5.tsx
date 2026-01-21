"use client";

import React, { useState } from "react";

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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="bento-shape-5" clipPathUnits="objectBoundingBox">
            <path 
              transform="scale(-1, 1) translate(-1, 0)" 
              d="M0 0.0417599C0 0.0186966 0.0250721 0 0.056 0H0.6105C0.641428 0 0.6665 0.0186965 0.6665 0.0417599V0.148024C0.6665 0.171087 0.691572 0.189784 0.7225 0.189784H0.944C0.974928 0.189784 1 0.20848 1 0.231544V0.95824C1 0.981303 0.974928 1 0.944 1H0.056C0.0250721 1 0 0.981303 0 0.95824V0.0417599Z" 
            />
          </clipPath>
        </defs>
      </svg>
      <div 
        className="h-full w-full flex flex-col relative overflow-hidden p-4 sm:p-6 md:p-8"
        style={{ 
          clipPath: 'url(#bento-shape-5)',
          backgroundImage: 'url(/bento5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#00A9EE'
        }}
      >
      
      {/* Navigation arrows */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex gap-2">
        <button 
          onClick={prevTestimonial}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextTestimonial}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Next testimonial"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content inside shape */}
      <div className="relative z-10 flex flex-col h-full justify-between text-white min-h-0">
        
        {/* Testimonial text - fixed height area */}
        <div className="flex-1 flex flex-col justify-center py-2 sm:py-6 min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
          <p className="text-white text-light sm:text-lg md:text-2xl font-light max-w-[95%] sm:max-w-[90%]">
            {currentTestimonial.text}
          </p>
        </div>

        {/* Author info - fixed height */}
        <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6 flex-shrink-0 h-[60px] sm:h-[72px]">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 border-2 border-white/30 overflow-hidden flex-shrink-0">
            <img 
              src={currentTestimonial.avatar} 
              alt={currentTestimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-white font-bold text-sm sm:text-base truncate">{currentTestimonial.name}</p>
            <p className="text-white/90 text-xs sm:text-sm truncate">{currentTestimonial.title}</p>
            <p className="text-white/90 text-xs sm:text-sm truncate">{currentTestimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
