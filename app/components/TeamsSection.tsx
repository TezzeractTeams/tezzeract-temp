"use client";

import React from "react";
import ServiceSlider from "./ServiceSlider";

// Placeholder data - replace with your actual service data
const services = [
  { name: "Service One", avatarSrc: "/box3.jpg", avatarAlt: "Service One" },
  { name: "Service Two", avatarSrc: "/box3.jpg", avatarAlt: "Service Two" },
  { name: "Service Three", avatarSrc: "/box3.jpg", avatarAlt: "Service Three" },
  { name: "Service Five", avatarSrc: "/box3.jpg", avatarAlt: "Service Five" },
  { name: "Service Six", avatarSrc: "/box3.jpg", avatarAlt: "Service Six" },
  { name: "Service Seven", avatarSrc: "/box3.jpg", avatarAlt: "Service Seven" },
  { name: "Service Eight", avatarSrc: "/box3.jpg", avatarAlt: "Service Eight" },
  { name: "Service Nine", avatarSrc: "/box3.jpg", avatarAlt: "Service Nine" },
];

export default function TeamsSection() {
  return (
    <section className="w-full py-16 px-4 bg-white relative overflow-hidden">
      {/* Main Container with Gradient Background */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Smooth gradual gradient background with multiple stops for seamless transition */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, #00378A 0%, #004A9E 25%, #005DB2 50%, #0070C6 75%, #00A9EE 100%)"
            }}
          />
          
          {/* Subtle edge definition - clean aesthetic */}
          <div className="absolute inset-0 rounded-3xl border border-white/5" />
          
          {/* Content Container */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center p-8 md:p-12 lg:p-16">
            {/* Left Side - Text */}
            <div className="flex flex-col">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-2 tracking-tight">
                Start working
              </h2>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-2 tracking-tight">
                with Teams
              </h2>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
                specialised in
              </h2>
            </div>

            {/* Right Side - Slider */}
            <div className="w-full">
              <ServiceSlider services={services} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
