"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { TestimonialTooltip } from "./ui/Tooltip";
import TeamCarousel, { type TeamMember } from "./TeamCarousel";
import DreamTeamSection from "./DreamTeamSection";

const HERO_BUBBLES = [
  { icon: "/assets/avatars/devhero.svg", alt: "Development", style: { top: "-15%", left: "18%" }, styleMd: { top: "15%", left: "28%" }, drift: { x: [0, 12, 0], y: [0, -8, 0] }, driftMd: { x: [0, 30, 0], y: [0, -10, 0] }, duration: 6, delay: 0.5 },
  { icon: "/assets/avatars/createhero.svg", alt: "Design", style: { top: "-50%", right: "28%", left: "auto" }, styleMd: { top: "20%", right: "20%", left: "auto" }, drift: { x: [0, -10, 0], y: [0, 5, 0] }, driftMd: { x: [0, -30, 0], y: [0, 6, 0] }, duration: 6.5, delay: 0.5 },
  { icon: "/assets/avatars/adverthero.svg", alt: "Marketing", style: { top: "90%", left: "18%" }, styleMd: { top: "70%", left: "20%" }, drift: { x: [0, 10, 0], y: [0, -5, 0] }, driftMd: { x: [0, 30, 0], y: [0, -7, 0] }, duration: 6.2, delay: 0.2 },
  { icon: "/assets/avatars/insighthero.svg", alt: "Analytics", style: { top: "92%", right: "18%", left: "auto" }, styleMd: { top: "70%", right: "8%", left: "auto" }, drift: { x: [0, -4, 0], y: [0, 4, 0] }, driftMd: { x: [0, -4, 0], y: [0, 5, 0] }, duration: 6.8, delay: 0.8 },
];

const teamMembers: TeamMember[] = [
  { name: "Shanilka Rajapaksha", title: "Founder", image: "/assets/avatars/shanilka.jpeg" },
  { name: "Nataly Undugodage", title: "Head of People & Culture", image: "/assets/avatars/nataly.jpeg" },
  { name: "Kotchakorn Janroong", title: "Head of Operations and Business Development", image: "/assets/avatars/Kotchakorn.jpeg" },
  { name: "Simon Abraham Tecle", title: "Partner Growth and Strategy", image: "/assets/avatars/simon.png" },
  { name: "Wehan Himsara", title: "Software Engineer", image: "/assets/avatars/wehan.jpg" },
  { name: "Oneli Kumarasinghe", title: "Web Development & E-commerce Specialist", image: "/assets/avatars/oneli.png" },
  { name: "Nipun Koshalya", title: "Product, Human Interaction & Motion Design Specialist", image: "/assets/avatars/Nipun.png" },
  { name: "Sakith Seneviratne", title: "Associate Software Engineer", image: "/assets/avatars/sakith.png" },
  { name: "Laura Sardinha", title: "Consultant Marketing & PR", image: "/assets/avatars/laura.png" },
];

export default function AboutUsSection() {
  const [isMd, setIsMd] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const fn = () => setIsMd(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <div>
      {/* Main Heading */}
      <div className="relative flex items-center justify-center text-center min-h-[60vh] h-[75vh] md:h-[85vh] pb-12 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-4000"
          style={{
            backgroundImage: "url('/assets/aboutbg.png')",
          }}
          aria-hidden
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          {/* Hero Bubbles */}
          {HERO_BUBBLES.map((bubble, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded-full flex items-center justify-center cursor-default pointer-events-auto backdrop-blur-[2px] transition-all duration-300"
              style={{
                ...(isMd ? bubble.styleMd : bubble.style),
                border: "2px solid rgba(0, 169, 238, 0.5)",
                backgroundColor: "rgba(239, 250, 255, 0.45)",
                boxShadow: "0 2px 12px rgba(0, 55, 138, 0.08)",
              }}
              animate={{
                x: [...(isMd ? bubble.driftMd : bubble.drift).x],
                y: [...(isMd ? bubble.driftMd : bubble.drift).y],
              }}
              transition={{
                repeat: Infinity,
                duration: bubble.duration,
                delay: bubble.delay,
                ease: "easeInOut",
              }}
            >
              <Image
                src={bubble.icon}
                alt={bubble.alt}
                width={60}
                height={60}
                className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-10 lg:h-10 object-contain opacity-90"
              />
            </motion.div>
          ))}
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-light leading-tight mb-4 tracking-tighter text-gray-700 px-4 max-w-[90vw]">
            We&apos;re on a{" "}
            <span
              className="font-light"
              style={{
                backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              mission
            </span>
            <br />
            to make teaming up
            <br />
            feel effortless
          </h1>
        </div>
      </div>


      {/* Content Section - White Background */}
      <div className="relative bg-white -mt-24 md:-mt-40 w-full rounded-t-4xl z-10 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-24 pt-24 md:pt-40 pb-12 md:pb-20">
        <TestimonialTooltip />
        <div className="max-w-5xl mx-auto">
          {/* Mission & Text Section */}
          <p className="text-center text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-700 font-light mb-8 sm:mb-12 md:mb-16 leading-tight tracking-tighter">
            We&apos;re on a{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              mission
            </span>{" "}
            to make teaming up feel effortless—no matter where you&apos;re
            based.
          </p>
          <div className="space-y-6 md:space-y-8 text-left">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Tezzeract helps startups and growing businesses across North America, Europe, the
              Middle East, and Asia-Pacific build scalable teams without the friction of traditional
              hiring. We work with companies in major startup hubs like the United States, United
              Kingdom, Canada, UAE, Australia, and India, supporting teams at every stage of
              growth.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Our global-first approach connects businesses with vetted talent across technology,
              growth, and creative functions—so you can scale faster while staying lean and
              flexible. Whether you&apos;re a startup in New York, a scale-up in London, or a
              growing business in Dubai or Singapore, we adapt to your timezone, goals, and pace.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              By combining global talent access with structured onboarding, clear communication, and
              scalable engagement models, Tezzeract makes it easy for businesses worldwide to build
              high-performing teams—without long-term contracts or hiring overhead.
            </p>
          </div>
        </div>
        <DreamTeamSection />

        {/* Team Carousel */}
        <div className="pt-12 md:pt-16">
          <TeamCarousel items={teamMembers} />
        </div>
      </div>
    </div>
  );
}
