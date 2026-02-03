"use client";

import React from "react";
import Image from "next/image";
import { TestimonialTooltip } from "./ui/Tooltip";
import TeamCarousel, { type TeamMember } from "./TeamCarousel";

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

export default function AboutUsSection() {
  return (
    <div>
      {/* Main Heading */}
      <div
        className="flex items-center justify-center text-center h-[85vh] pb-20"
        style={{
          background:
            "radial-gradient(160.39% 60.24% at 50% 90%,rgb(0, 135, 239) 1.02%, #96D6F2 37.56%, #FFFFFF 70%)",
        }}
      >
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
          <span className="text-gray-700">built to scale</span>
          <br />
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
          </span>{" "}
          <br />
          <span className="text-gray-700"> at every stage.</span>
        </h1>
      </div>

      <TestimonialTooltip />

      {/* Content Section - White Background */}
      <div className="bg-white -mt-40 w-full rounded-t-4xl z-2 px-4 md:px-8 lg:px-24 pt-40 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Mission & Text Section */}
          <p className="text-center text-xl md:text-2xl lg:text-3xl text-gray-700 font-light mb-12 md:mb-16 leading-tight tracking-tighter">
            We&apos;re on a mission to make teaming up feel effortless—no matter where you&apos;re
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

        {/* Team Carousel */}
        <div className="pt-12 md:pt-16">
          <TeamCarousel items={teamMembers} />
        </div>
      </div>
    </div>
  );
}
