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
    <section className="w-full h-auto py-16 px-4  relative">
      {/* Main Container with Gradient Background */}
      <div className="w-full h-[500px] ">
        <div className="relative rounded-3xl  overflow-hidden h-full">
          {/* Smooth gradual gradient background with multiple stops for seamless transition */}
          <div 
            className="absolute  inset-0"
            style={{
              background: "linear-gradient(to right, #00378A 0%,rgb(16, 117, 199) 20%, #2196F3 40%, #1976D2 60%, #1565C0 80%, #1A237E 100%)"
            }}
          />
          
          {/* Subtle edge definition - clean aesthetic */}
          <div className="absolute inset-0 " />
          
          {/* Content Container - relative for absolute child */}
          <div className="relative p-8 md:p-12 lg:p-16 lg:pt-[120px]">
            {/* Layer 1 (back): Slider full width, behind text */}
            <div className="absolute inset-0 z-0 flex items-center overflow-hidden pointer-events-auto">
              <div className="w-full px-8 md:px-12 lg:px-16 pt-16 md:pt-12 lg:pt-[120px] ml-8 md:ml-16 lg:ml-[500px]">
                <ServiceSlider services={services} />
              </div>
            </div>

            {/* Layer 2 (front): Grid with text on top */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-1 items-center pointer-events-none">
              {/* Left Side - Text (sits on top of slider) */}
              <div className="flex flex-col mr-[100px] pointer-events-none">
                <h2 className="text-white text-4xl md:text-5xl lg:text-8xl font-light leading-tighter tracking-tighter">
                  Start working with Teams specialised in
                </h2>
              </div>
              {/* Right Side - Spacer so slider shows through from behind */}
              <div className="-ml-[320px] -mr-8 md:-mr-12 lg:-mr-[100px] min-h-[120px] pointer-events-none" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
