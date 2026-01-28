"use client";

import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { TezzeractH1 } from './ui/TezzeractH1'
import PortfolioCard from './ui/PortfolioCard'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'

function PortfolioSection() {
  const portfolioItems = [
    {
      tag: "Industry Expertise",
      caseStudyTitle: "Helped Beentouch to grow their revenue by 10%",
      image: "/portfolioimage1.jpg"
    },
    {
      tag: "Digital Transformation",
      caseStudyTitle: "Transformed startup's digital presence with scalable solutions",
      image: "/portfolioimage1.jpg"
    },
    {
      tag: "Growth Strategy",
      caseStudyTitle: "Increased client engagement by 25% through innovative approach",
      image: "/portfolioimage1.jpg"
    }
  ];

  // Duplicate items for seamless infinite loop
  const duplicatedItems = [...portfolioItems, ...portfolioItems, ...portfolioItems];

  const swiperRef1 = useRef<SwiperType | null>(null);
  const swiperRef2 = useRef<SwiperType | null>(null);
  const containerRef1 = useRef<HTMLDivElement | null>(null);
  const containerRef2 = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef1 = useRef(0);
  const scrollPositionRef2 = useRef(0);
  const animationFrameRef1 = useRef<number | null>(null);
  const animationFrameRef2 = useRef<number | null>(null);
  const isInitializedRef2 = useRef(false);
  const speed = 0.5;

  const [isPaused1, setIsPaused1] = useState(false);
  const [isPaused2, setIsPaused2] = useState(false);

  // Custom continuous scroll for first carousel (right)
  useEffect(() => {
    if (!containerRef1.current || isPaused1) {
      if (animationFrameRef1.current !== null) {
        cancelAnimationFrame(animationFrameRef1.current);
        animationFrameRef1.current = null;
      }
      return;
    }

    const scroll = () => {
      const container = containerRef1.current;
      if (!container || isPaused1) {
        animationFrameRef1.current = null;
        return;
      }

      scrollPositionRef1.current += speed;
      const wrapper = container.querySelector('.swiper-wrapper') as HTMLElement;
      if (wrapper) {
        wrapper.style.transform = `translate3d(-${scrollPositionRef1.current}px, 0, 0)`;
        
        // Reset when we've scrolled through one full set (1/3 of total width)
        const thirdWidth = wrapper.scrollWidth / 3;
        if (scrollPositionRef1.current >= thirdWidth) {
          scrollPositionRef1.current = 0;
          wrapper.style.transform = `translate3d(0px, 0, 0)`;
        }
      }

      animationFrameRef1.current = requestAnimationFrame(scroll);
    };

    const timeout = setTimeout(() => {
      animationFrameRef1.current = requestAnimationFrame(scroll);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (animationFrameRef1.current !== null) {
        cancelAnimationFrame(animationFrameRef1.current);
      }
    };
  }, [isPaused1, speed]);

  // Custom continuous scroll for second carousel (left)
  useEffect(() => {
    if (!containerRef2.current) return;

    // Initialize second carousel to start from middle position (only once)
    if (!isInitializedRef2.current) {
      const initScroll = () => {
        const container = containerRef2.current;
        if (container) {
          const wrapper = container.querySelector('.swiper-wrapper') as HTMLElement;
          if (wrapper && wrapper.scrollWidth > 0) {
            const thirdWidth = wrapper.scrollWidth / 3;
            scrollPositionRef2.current = thirdWidth;
            wrapper.style.transform = `translate3d(-${thirdWidth}px, 0, 0)`;
            isInitializedRef2.current = true;
          }
        }
      };
      
      // Try initialization multiple times until wrapper is ready
      const initInterval = setInterval(() => {
        const container = containerRef2.current;
        if (container) {
          const wrapper = container.querySelector('.swiper-wrapper') as HTMLElement;
          if (wrapper && wrapper.scrollWidth > 0) {
            clearInterval(initInterval);
            initScroll();
          }
        }
      }, 50);

      return () => clearInterval(initInterval);
    }
  }, []);

  useEffect(() => {
    if (!containerRef2.current || !isInitializedRef2.current || isPaused2) {
      if (animationFrameRef2.current !== null) {
        cancelAnimationFrame(animationFrameRef2.current);
        animationFrameRef2.current = null;
      }
      return;
    }

    const scroll = () => {
      const container = containerRef2.current;
      if (!container || isPaused2) {
        animationFrameRef2.current = null;
        return;
      }

      scrollPositionRef2.current -= speed;
      const wrapper = container.querySelector('.swiper-wrapper') as HTMLElement;
      if (wrapper) {
        wrapper.style.transform = `translate3d(-${scrollPositionRef2.current}px, 0, 0)`;
        
        // Reset when we've scrolled through one full set
        if (scrollPositionRef2.current <= 0) {
          const thirdWidth = wrapper.scrollWidth / 3;
          scrollPositionRef2.current = thirdWidth;
          wrapper.style.transform = `translate3d(-${thirdWidth}px, 0, 0)`;
        }
      }

      animationFrameRef2.current = requestAnimationFrame(scroll);
    };

    const timeout = setTimeout(() => {
      animationFrameRef2.current = requestAnimationFrame(scroll);
    }, 200);

    return () => {
      clearTimeout(timeout);
      if (animationFrameRef2.current !== null) {
        cancelAnimationFrame(animationFrameRef2.current);
      }
    };
  }, [isPaused2, speed]);

  // Handle hover pause/resume for first carousel
  const onMouseEnter1 = () => {
    setIsPaused1(true);
    if (animationFrameRef1.current !== null) {
      cancelAnimationFrame(animationFrameRef1.current);
      animationFrameRef1.current = null;
    }
  };

  const onMouseLeave1 = () => {
    setIsPaused1(false);
  };

  // Handle hover pause/resume for second carousel - fixed to prevent reset glitch
  const onMouseEnter2 = () => {
    setIsPaused2(true);
  };

  const onMouseLeave2 = () => {
    setIsPaused2(false);
  };

  return (
    <div className='bg-transparent py-10 md:py-20'>
      <TezzeractH1 variant="dark" className="text-center md:text-center text-4xl md:text-6xl mb-12">Our Portfolio</TezzeractH1>  
      
      {/* First Carousel Row - Scrolls Right */}
      <div 
        className="relative w-full overflow-hidden mb-6 px-0 md:px-4"
        onMouseEnter={onMouseEnter1}
        onMouseLeave={onMouseLeave1}
      >
        <div ref={(el) => { containerRef1.current = el; }}>
          <Swiper
            onSwiper={(swiper: SwiperType) => {
              swiperRef1.current = swiper;
            }}
            modules={[FreeMode]}
            freeMode={{
              enabled: true,
              momentum: false,
              momentumBounce: false,
            }}
            loop={true}
            slidesPerView="auto"
            spaceBetween={16}
            allowTouchMove={false}
            className="overflow-visible!"
            breakpoints={{
              640: {
                spaceBetween: 24,
              },
            }}
          >
          {duplicatedItems.map((item, index) => (
            <SwiperSlide
              key={`carousel1-${index}`}
              className="w-[calc((100%-1rem)/1.5)]! md:w-[calc((100%-3rem)/2.5)]!"
            >
              <PortfolioCard
                tag={item.tag}
                caseStudyTitle={item.caseStudyTitle}
                image={item.image}
              />
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>

      {/* Second Carousel Row - Scrolls Left */}
      <div 
        className="relative w-full overflow-hidden px-0 md:px-4 pt-8"
        onMouseEnter={onMouseEnter2}
        onMouseLeave={onMouseLeave2}
      >
        <div ref={(el) => { containerRef2.current = el; }}>
          <Swiper
            onSwiper={(swiper: SwiperType) => {
              swiperRef2.current = swiper;
            }}
            modules={[FreeMode]}
            freeMode={{
              enabled: true,
              momentum: false,
              momentumBounce: false,
            }}
            loop={true}
            slidesPerView="auto"
            spaceBetween={16}
            allowTouchMove={false}
            className="overflow-visible!"
            breakpoints={{
              640: {
                spaceBetween: 24,
              },
            }}
          >
          {duplicatedItems.map((item, index) => (
            <SwiperSlide
              key={`carousel2-${index}`}
              className="w-[calc((100%-1rem)/1.5)]! md:w-[calc((100%-3rem)/2.5)]!"
            >
              <PortfolioCard
                tag={item.tag}
                caseStudyTitle={item.caseStudyTitle}
                image={item.image}
              />
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default PortfolioSection
