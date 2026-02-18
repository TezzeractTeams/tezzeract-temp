"use client";

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay } from 'swiper/modules'
import { TezzeractH1 } from './ui/TezzeractH1'
import PortfolioCard from './ui/PortfolioCard'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'

interface PortfolioItem {
  tag: string;
  caseStudyTitle: string;
  image: string;
  slug?: string;
  id?: string | number;
}

interface PortfolioSectionProps {
  initialData?: PortfolioItem[];
}

function PortfolioSection({ initialData = [] }: PortfolioSectionProps) {
  const defaultPortfolioItems = [
    {
      tag: "Industry Expertise",
      caseStudyTitle: "Helped Beentouch to grow their revenue by 10%",
      image: "/portfolioimage1.jpg",
      slug: "beentouch-case-study"
    },
    {
      tag: "Digital Transformation",
      caseStudyTitle: "Transformed startup's digital presence with scalable solutions",
      image: "/portfolioimage1.jpg",
      slug: "startup-transformation"
    },
    {
      tag: "Growth Strategy",
      caseStudyTitle: "Increased client engagement by 25% through innovative approach",
      image: "/portfolioimage1.jpg",
      slug: "growth-strategy-case-study"
    }
  ];

  const portfolioItems = initialData.length > 0 ? initialData : defaultPortfolioItems;

  // Duplicate items for Swiper - more duplicates for smoother loop if needed
  const swiperItems = [...portfolioItems, ...portfolioItems, ...portfolioItems, ...portfolioItems];

  return (
    <div id="portfolio-section" className='bg-transparent py-10 md:py-20'>
      <TezzeractH1 variant="dark" className="text-center md:text-center text-4xl md:text-6xl mb-12">Work That Creates Impact</TezzeractH1>
      <p className="text-[#ffffff] font-light text-base md:text-lg lg:pb-16 pb-8 md:pb-16 lg:w-[60%] md:w-[80%] px-4 w-full mx-auto text-center">
        Tezzeract teams deliver high-impact projects across tech, marketing, design, and analytics. Specialized, tool-ready, and execution-focused, they help businesses scale and succeed.
      </p>

      {/* First Carousel Row - Scrolls Left (Natural Loop with Drag) */}
      <div className="relative w-full overflow-hidden px-0 md:px-4 pt-8">
        <div>
          <Swiper
            modules={[FreeMode, Autoplay]}
            freeMode={{
              enabled: true,
              momentum: false,
              momentumBounce: false,
            }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={16000}
            slidesPerView="auto"
            spaceBetween={16}
            allowTouchMove={true}
            className="!overflow-visible swiper-linear-ease"
            breakpoints={{
              640: {
                spaceBetween: 24,
              },
            }}
          >
            {swiperItems.map((item, index) => (
              <SwiperSlide
                key={`carousel3-${index}`}
                className="!w-[calc((100%-1rem)/1.5)] md:!w-[calc((100%-3rem)/2.5)]"
              >
                <PortfolioCard
                  tag={item.tag}
                  caseStudyTitle={item.caseStudyTitle}
                  image={item.image}
                  slug={item.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <style jsx global>{`
            .swiper-linear-ease .swiper-wrapper {
              transition-timing-function: linear;
            }
          `}</style>
        </div>
      </div>

      {/* Second Carousel Row - Scrolls Right (Natural Loop with Drag) */}
      <div className="relative w-full overflow-hidden px-0 md:px-4 pt-8">
        <div>
          <Swiper
            modules={[FreeMode, Autoplay]}
            freeMode={{
              enabled: true,
              momentum: false,
              momentumBounce: false,
            }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: true,
            }}
            loop={true}
            speed={16000}
            slidesPerView="auto"
            spaceBetween={16}
            allowTouchMove={true}
            className="!overflow-visible swiper-linear-ease"
            breakpoints={{
              640: {
                spaceBetween: 24,
              },
            }}
          >
            {swiperItems.map((item, index) => (
              <SwiperSlide
                key={`carousel4-${index}`}
                className="!w-[calc((100%-1rem)/1.5)] md:!w-[calc((100%-3rem)/2.5)]"
              >
                <PortfolioCard
                  tag={item.tag}
                  caseStudyTitle={item.caseStudyTitle}
                  image={item.image}
                  slug={item.slug}
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