"use client";

import React from "react";
import ServiceSlider from "./ui/ServiceSlider";

const services = [
  { name: "Product Development", avatarSrc: "/assets/avatars/Nipun.png", avatarAlt: "Product Development" },
  { name: "Web Development", avatarSrc: "/assets/avatars/wehan.jpg", avatarAlt: "Web Development" },
  { name: "Digital Transformation", avatarSrc: "/assets/avatars/simon.png", avatarAlt: "Digital Marketing" },
  { name: "Social Media Marketing", avatarSrc: "/assets/avatars/nataly.jpeg", avatarAlt: "UI/UX Design" },
  { name: "Business Consultancy", avatarSrc: "/assets/avatars/laura.png", avatarAlt: "E-Commerce" },
  { name: "Branding & Creative", avatarSrc: "/assets/avatars/nila.jpeg", avatarAlt: "Branding & Creative" },
  { name: "E-Commerce", avatarSrc: "/assets/avatars/southmale.png", avatarAlt: "Branding & Creative" },
  { name: "Content & SEO", avatarSrc: "/assets/avatars/oneli.png", avatarAlt: "Content & SEO" },
  { name: "AI & Automation", avatarSrc: "/assets/avatars/sakith.png", avatarAlt: "Dedicated Remote Teams" },
  { name: "Paid Ads & Performance Marketing", avatarSrc: "/assets/avatars/shanilka.jpeg", avatarAlt: "Paid Ads & Performance Marketing" },
];

export default function TeamsSection() {
  return (
    <section className="w-full  py-20 md:py-10 px-4  relative">
      {/* Main Container with Gradient Background */}
      <div className="w-full  ">
        <div className="relative rounded-[30px] lg:pt-3 overflow-hidden lg:h-[500px] h-[450px] md:h-[300px]">
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
          <div className="relative  p-4 md:p-8 lg:p-24">
            {/* Layer 1 (back): Slider full width, behind text */}
            <div

              className="absolute top-80 md:top-10 inset-0 z-0 flex items-center justify-center overflow-visible pointer-events-auto"
            >
              <div className="w-full  md:px-0 lg:px-16  ml-0 md:ml-[500px] lg:ml-[200px] xl:ml-[850px]">
                <ServiceSlider services={services} />
              </div>
            </div>

            {/* Layer 2 (front): Grid with text on top */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-2 items-center pointer-events-none">
              {/* Left Side - Text (sits on top of slider) */}
              <div className="flex flex-col mr-0 md:mr-8 lg:mr-[100px] pointer-events-none">
                <h2 className="text-white md:pt-4 lg:pt-0 p-8 md:p-0 text-5xl text-center md:text-left lg:text-left lg:text-7xl  font-light leading-[1.2em] tracking-tighter">
                  Start working <br></br> with Teams <br></br> specialised in
                </h2>
              </div>
              {/* Right Side - Spacer so slider shows through from behind */}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
