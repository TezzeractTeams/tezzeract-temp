"use client";

import React from "react";
import ServiceSlider from "./ServiceSlider";

const services = [
  { name: "Product Development", avatarSrc: "/box3.jpg", avatarAlt: "Product Development" },
  { name: "Web Development", avatarSrc: "/box3.jpg", avatarAlt: "Web Development" },
  { name: "Digital Marketing", avatarSrc: "/box3.jpg", avatarAlt: "Digital Marketing" },
  { name: "UI/UX Design", avatarSrc: "/box3.jpg", avatarAlt: "UI/UX Design" },
  { name: "E-Commerce", avatarSrc: "/box3.jpg", avatarAlt: "E-Commerce" },
  { name: "Branding & Creative", avatarSrc: "/box3.jpg", avatarAlt: "Branding & Creative" },
  { name: "Content & SEO", avatarSrc: "/box3.jpg", avatarAlt: "Content & SEO" },
  { name: "Dedicated Remote Teams", avatarSrc: "/box3.jpg", avatarAlt: "Dedicated Remote Teams" },
  { name: "Paid Ads & Performance Marketing", avatarSrc: "/box3.jpg", avatarAlt: "Paid Ads & Performance Marketing" },
];

export default function TeamsSection() {
  return (
    <section className="w-full  py-20 px-6  relative">
      {/* Main Container with Gradient Background */}
      <div className="w-full  ">
        <div className="relative rounded-[30px] lg:pt-3 overflow-hidden lg:h-[500px] h-[300px]">
          {/* Smooth gradual gradient background - light blue top-left to darker blue bottom-right */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(135, 206, 250, 0.9) 0%, rgba(116, 182, 253, 0.95) 20%, #2196F3 40%, #1976D2 60%, #1565C0 80%, #00378A 100%)"
            }}
          />
          
          {/* Subtle edge definition - clean aesthetic */}
          <div className="absolute inset-0 " />
          
          {/* Content Container - relative for absolute child */}
          <div className="relative p-4 md:p-8 lg:p-24">
            {/* Layer 1 (back): Slider full width, behind text */}
            <div 
              ref={(el) => {
                if (el) {
                  const rect = el.getBoundingClientRect();
                  const sliderEl = el.querySelector('[class*="ServiceSlider"]') as HTMLElement;
                  const sliderRect = sliderEl?.getBoundingClientRect();
                  fetch('http://127.0.0.1:7242/ingest/69aca90b-7973-4e12-aca1-b9909e760da5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TeamsSection.tsx:38',message:'Parent container measurements',data:{parentHeight:rect.height,parentWidth:rect.width,parentTop:rect.top,parentBottom:rect.bottom,hasOverflowHidden:el.classList.contains('overflow-hidden'),sliderTop:sliderRect?.top,sliderBottom:sliderRect?.bottom,sliderHeight:sliderRect?.height},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C,D'})}).catch(()=>{});
                }
              }}
              className="absolute inset-0 z-0 flex items-center justify-center overflow-visible pointer-events-auto"
            >
              <div className="w-full px-10 md:px-8 lg:px-16  ml-0 md:ml-8 lg:ml-[200px] xl:ml-[850px]">
                <ServiceSlider services={services} />
              </div>
            </div>

            {/* Layer 2 (front): Grid with text on top */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-2 items-center pointer-events-none">
              {/* Left Side - Text (sits on top of slider) */}
              <div className="flex flex-col mr-0 md:mr-8 lg:mr-[100px] pointer-events-none">
                <h2 className="text-white p-8 md:p-0 text-4xl lg:text-6xl xl:text-8xl font-light leading-tighter tracking-tighter">
                  Start working <br></br> with Teams <br></br> specialised in
                </h2>
              </div>
              {/* Right Side - Spacer so slider shows through from behind */}
              <div className="-ml-0 -mr-[100px] md:-ml-[100px] md:-mr-[100px] lg:-ml-[20px] lg:-mr-[90px] min-h-[120px] pointer-events-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
