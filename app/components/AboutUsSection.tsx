"use client";

import React from "react";
import Image from "next/image";
import { TrendingUp, Megaphone, Building2, Rocket } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  avatarSrc: string;
}

const teamMembers: TeamMember[] = [
  { name: "Jhone", title: "Head of Engineering", avatarSrc: "/box3.jpg" },
  { name: "Amile", title: "Head of Engineering", avatarSrc: "/box3.jpg" },
  { name: "Bob", title: "Head of Engineering", avatarSrc: "/box3.jpg" },
  { name: "Michel", title: "Head of Engineering", avatarSrc: "/box3.jpg" },
  { name: "David", title: "Head of Engineering", avatarSrc: "/box3.jpg" },
  { name: "Jane", title: "Head of Engineering", avatarSrc: "/box3.jpg" },
  { name: "Nikolas", title: "Head of Engineering", avatarSrc: "/box3.jpg" },
  { name: "Ana", title: "Head of Engineering", avatarSrc: "/box3.jpg" },
];

export default function AboutUsSection() {
  return (
    <section className="w-full min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div 
        className="w-full pt-32 pb-16 px-4 md:px-8 lg:px-24"
        style={{
          background: "linear-gradient(to bottom, rgba(135, 206, 250, 0.3) 0%, rgba(255, 255, 255, 1) 40%)"
        }}
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-8 md:mb-12 ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-light leading-tight mb-4 tracking-tighter">
              <span className="text-[#00A9EE] font-light">Teams</span>{" "}
              <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
                <Image 
                  src="/assets/Teams.svg" 
                  alt="Teams" 
                  width={70} 
                  height={70}
                  className="inline-block"
                />
              </span>{" "}
              <span className="text-gray-700">built to scale</span><br></br>
              <span className="text-gray-700"> with your business</span>{" "}
              <span className="text-[#00A9EE] font-light">goals</span>{" "}
              <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
                <Image 
                  src="/assets/Goals.svg" 
                  alt="Goals" 
                  width={70} 
                  height={70}
                  className="inline-block"
                />
              </span>{" "}<br></br>
              <span className="text-gray-700"> at every stage.</span>
            
            </h1>
          </div>

          {/* Growth Specialists Element */}
        
        </div>
      </div>

      {/* Content Section - White Background */}
      

      {/* Team Members Section */}
    
    </section>
  );
}
