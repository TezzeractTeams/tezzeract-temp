"use client";

import React from "react";

interface PricingCardProps {
  title: string;
  subtitle: string;
  teamSize: number;
  inclusions: string[];
  specializations: string;
  price: number;
  highlighted?: boolean;
  backgroundStyle?: string;
}

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <circle cx="12" cy="12" r="10" fill="url(#checkGradient)" fillOpacity="0.2" />
    <path
      d="M8 12.5L10.5 15L16 9"
      stroke="url(#checkGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="checkGradient" x1="4" y1="4" x2="20" y2="20">
        <stop stopColor="#00A9EE" />
        <stop offset="1" stopColor="#00378A" />
      </linearGradient>
    </defs>
  </svg>
);

const PersonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="1.5" />
    <path
      d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
      stroke="#9ca3af"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const PricingCard = ({
  title,
  subtitle,
  teamSize,
  inclusions,
  specializations,
  price,
  highlighted = false,
  backgroundStyle,
}: PricingCardProps) => {
  const defaultBackground = highlighted
    ? "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(230, 242, 250) 50%,rgb(244, 251, 255) 100%)"
    : "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(226, 226, 226) 50%,rgb(244, 251, 255) 100%)";

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-8 md:p-10 h-full ${
        highlighted
          ? "bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] ring-1 ring-[#00A9EE]/30"
          : "bg-[#2a2a2a]"
      }`}
      style={{
        background: backgroundStyle || defaultBackground,
      }}
    >
      {/* Title with gradient */}
      <h3
        className="text-4xl md:text-5xl font-light  mb-4"
        style={{
          background: "linear-gradient(135deg, #00A9EE 0%, #0070BC 50%, #00378A 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </h3>

      {/* Subtitle with mixed styling */}
      <p className="text-base md:text-lg mb-6 leading-relaxed">
        <span
          style={{
            background: "linear-gradient(90deg, #00A9EE 0%, #0070BC 50%, #00378A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {subtitle.split(" ").slice(0, 5).join(" ")}
        </span>{" "}
        <span className="text-[#242]">
          {subtitle.split(" ").slice(5).join(" ")}
        </span>
      </p>

      {/* Team size badge */}
      <div className="inline-flex items-center gap-3 bg-[#ffffff] rounded-full px-5 py-3 mb-8 w-fit">
        <PersonIcon />
        <span className="text-[#0070BC]">
          <span className="font-semibold">{teamSize} Member</span>{" "}
          <span className="text-gray-400">Flexible Teams</span>
        </span>
      </div>

      {/* Inclusions divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-[#4a4a4a]" />
        <span className="text-[#6b6b6b] text-sm">Inclusions</span>
        <div className="flex-1 h-px bg-[#4a4a4a]" />
      </div>

      {/* Inclusions list */}
      <div className="flex flex-col gap-4 mb-8">
        {inclusions.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckIcon />
            <span className="text-[#242424] text-sm md:text-base">{item}</span>
          </div>
        ))}
      </div>

      {/* Specializations divider */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-[#4a4a4a]" />
        <span className="text-[#6b6b6b] text-sm whitespace-nowrap">
          Talent Specializations Covered
        </span>
        <div className="flex-1 h-px bg-[#4a4a4a]" />
      </div>

      {/* Specializations text */}
      <p className="text-[#242424] text-sm md:text-base mb-8 leading-relaxed">
        {specializations}
      </p>

      {/* Price */}
      <div className="mt-auto">
        <span
          className="text-4xl md:text-5xl font-light"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #D6D6D6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ${price.toLocaleString()}
        </span>
        <span className="text-[#6b6b6b] text-base md:text-lg">/month</span>
      </div>
    </div>
  );
};

// Pricing data for 3 tiers
const pricingTiers = [
  {
    title: "Starter",
    subtitle: "For small to medium businesses looking for reliable, cost-effective support.",
    teamSize: 3,
    inclusions: [
      "Swap team members based on evolving needs",
      "Tezzeract's Project Guidance Support",
      "Monthly performance reports",
    ],
    specializations:
      "Marketing, creatives, content creation, UI/UX and Web development teams",
    price: 3999,
    highlighted: false,
    backgroundStyle: "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(226, 226, 226) 50%,rgb(244, 251, 255) 100%)",
  },
  {
    title: "Growth",
    subtitle: "For scaling companies that need dedicated teams to accelerate their growth.",
    teamSize: 5,
    inclusions: [
      "Swap team members based on evolving needs",
      "Tezzeract's Project Guidance Support",
      "Weekly performance reports & strategy calls",
      "Priority support & faster turnaround",
    ],
    specializations:
      "Marketing, creatives, content creation, UI/UX, Web development, Mobile development and Data analytics teams",
    price: 6999,
    highlighted: true,
    backgroundStyle: "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(230, 242, 250) 50%,rgb(244, 251, 255) 100%)",
  },
  {
    title: "Enterprise",
    subtitle: "For large organizations requiring comprehensive digital transformation support.",
    teamSize: 10,
    inclusions: [
      "Swap team members based on evolving needs",
      "Dedicated Account Manager",
      "Real-time performance dashboards",
      "24/7 Priority support",
      "Custom workflow integrations",
    ],
    specializations:
      "Full-stack development, DevOps, AI/ML, Marketing, Design, Content, Analytics, QA, and Project Management teams",
    price: 12999,
    highlighted: false,
    backgroundStyle: "linear-gradient(135deg,#00378A 0%,#27AAE1 60%, #00378A 130%)",
  },
];

export default function PricingSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Choose Your <span className="text-[#00378A]">Plan</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Flexible pricing that scales with your business needs
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={index}
              title={tier.title}
              subtitle={tier.subtitle}
              teamSize={tier.teamSize}
              inclusions={tier.inclusions}
              specializations={tier.specializations}
              price={tier.price}
              highlighted={tier.highlighted}
              backgroundStyle={tier.backgroundStyle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
