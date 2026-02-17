"use client";

import React from "react";
import Image from "next/image";
import { TestimonialTooltip } from "./ui/Tooltip";
import TeamCarousel, { type TeamMember } from "./TeamCarousel";
import PricingSection from "./PricingSection";

const teamMembers: TeamMember[] = [
  { name: "Jhone", title: "Head of Engineering", image: "/box3.jpg" },
  { name: "Amile", title: "Head of Engineering", image: "/box3.jpg" },
  { name: "Bob", title: "Head of Engineering", image: "/box3.jpg" },
  { name: "Michel", title: "Head of Engineering", image: "/box3.jpg" },
  { name: "David", title: "Head of Engineering", image: "/box3.jpg" },
  { name: "Jane", title: "Head of Engineering", image: "/box3.jpg" },
  { name: "Nikolas", title: "Head of Engineering", image: "/box3.jpg" },
  { name: "Ana", title: "Head of Engineering", image: "/box3.jpg" },
];

export default function PricingPageSection() {
  return (
    <div className="overflow-x-hidden">
      {/* Main Heading */}
      <div className="relative flex items-center justify-center text-center h-[85vh] pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-5000"
          style={{
            backgroundImage: "url('/assets/aboutbg.png')",
          }}
          aria-hidden
        />
        <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-light leading-tight mb-4 tracking-tighter">
          <span
            className="font-light bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Scale
          </span>{" "}
          <span className="text-gray-700">as you grow</span>{" "}

          <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
            <Image
              src="/assets/scale.svg"
              alt="Teams"
              width={70}
              height={70}
              className="inline-block"
            />
          </span>{" "}
          <span className="text-gray-700">with</span>{" "}
          <br />
          <span
            className="font-light bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >flex</span>{" "}
          <span className="text-gray-700">options designed for </span>{" "}
          <br />
          <span
            className="font-light bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >businesses</span>

          <span className="text-gray-700"> of all sizes</span>{" "}
          <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
            <Image
              src="/assets/building.svg"
              alt="Goals"
              width={70}
              height={70}
              className="inline-block"
            />
          </span>{" "}
        </h1>
      </div>


      {/* Content Section - White Background */}
      <div className="relative bg-white -mt-40 w-full rounded-t-4xl z-10 overflow-hidden px-4 md:px-8 lg:px-24 pt-40 pb-20">
        <PricingSection />


      </div>
    </div>
  );
}
