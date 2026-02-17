"use client";

import React from "react";
import Image from "next/image";
import Silk from "./Silk";
import { TestimonialTooltip } from "./ui/Tooltip";

export default function CommunitySection() {
  return (
    <div>
<Silk
  speed={5}
  scale={1}
  color="#1657FF"
  noiseIntensity={1.5}
  rotation={0}
/>
      {/* Main Heading */}
      <div
        className="flex items-center justify-center text-center h-[85vh] pb-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/aboutbg.png')",
        }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-light leading-tight mb-4 tracking-tighter">
          <span
            className="font-light bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #0068B5, #00A9EE)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Connect
          </span>{" "}
          <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
            <Image
              src="/globe.svg"
              alt="Community"
              width={70}
              height={70}
              className="inline-block"
            />
          </span>{" "}
          <span className="text-gray-700">with a global community</span>
          <br />
          <span className="text-gray-700">of builders</span>{" "}
          <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
            <Image
              src="/assets/Teams.svg"
              alt="Teams"
              width={70}
              height={70}
              className="inline-block"
            />
          </span>{" "}
          <span className="text-gray-700">and innovators</span>
          <br />
          <span className="text-gray-700">shaping the future</span>{" "}
          <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
            <Image
              src="/assets/Goals.svg"
              alt="Goals"
              width={70}
              height={70}
              className="inline-block"
            />
          </span>{" "}
          <span className="text-gray-700">together</span>
        </h1>
      </div>

      <TestimonialTooltip />

      {/* Content Section - White Background */}
      <div className="bg-white -mt-40 w-full rounded-t-4xl z-2 px-4 md:px-8 lg:px-24 pt-40 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Mission & Text Section */}
          <p className="text-center text-xl md:text-2xl lg:text-3xl text-gray-700 font-light mb-12 md:mb-16 leading-tight tracking-tighter">
            Join a network of founders, leaders, and talent shaping the future of remote work.
          </p>
          <div className="space-y-6 md:space-y-8 text-left">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              The Tezzeract community brings together businesses and talent from across the globe—united by a shared belief that great teams can be built anywhere. Whether you&apos;re scaling your startup, exploring new markets, or looking to connect with like-minded professionals, you&apos;ll find a space to learn, share, and grow.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              From virtual meetups and industry events to knowledge-sharing sessions and networking opportunities, our community creates value beyond individual engagements. Connect with peers facing similar challenges, discover best practices from companies at every stage, and build relationships that extend beyond projects.
            </p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Whether you&apos;re based in San Francisco or Singapore, London or Lagos, the Tezzeract community is your gateway to a borderless ecosystem of talent, ideas, and opportunity. Join us and be part of what&apos;s next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
