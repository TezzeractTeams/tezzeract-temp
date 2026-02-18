"use client";

import React from "react";
import { AnimatedShinyText } from "./bento-boxes/AnimatedShinyText";

export interface PricingCardTheme {
  background?: string;
  border?: string;
  titleColor?: string;
  subtitleColor?: string;
  bodyColor?: string;
  labelColor?: string;
  dividerColor?: string;
  priceColor?: string;
  priceSuffixColor?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  badgeSecondaryColor?: string;
  badgeShimmerColor?: string;
  checkmarkColor?: string;
}

interface PricingCardProps {
  title: string;
  subtitle: string;
  teamSize: number;
  inclusions: string[];
  specializations: string;
  price: number | string;
  theme?: PricingCardTheme;
}

const CheckIcon = ({ color = "linear-gradient(135deg, #00A9EE 0%, #00378A 100%)", uniqueId }: { color?: string; uniqueId?: string }) => {
  const isGradient = color.startsWith("linear-gradient");
  const gradientId = `checkGradient-${uniqueId || 'default'}`;
  
  if (isGradient) {
    // Extract colors from gradient string (simple parser for common gradient formats)
    const colorMatch = color.match(/#([0-9A-Fa-f]{6})/g) || [];
    const startColor = colorMatch[0] || "#00A9EE";
    const endColor = colorMatch[1] || colorMatch[0] || "#00378A";
    
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <circle cx="12" cy="12" r="10" fill={`url(#${gradientId})`} fillOpacity="0.2" />
        <path
          d="M8 12.5L10.5 15L16 9"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id={gradientId} x1="4" y1="4" x2="20" y2="20">
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" />
      <path
        d="M8 12.5L10.5 15L16 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PersonIcon = ({ color = "#9ca3af" }: { color?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
    <path
      d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DEFAULT_THEME: Required<PricingCardTheme> = {
  background: "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(226, 226, 226) 50%,rgb(244, 251, 255) 100%)",
  border: "",
  titleColor: "linear-gradient(135deg, #00A9EE 0%, #0070BC 50%, #00378A 100%)",
  subtitleColor: "linear-gradient(90deg, #00A9EE 0%, #0070BC 50%, #00378A 100%)",
  bodyColor: "#242424",
  labelColor: "#6b6b6b",
  dividerColor: "#4a4a4a",
  priceColor: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
  priceSuffixColor: "#6b6b6b",
  badgeBg: "#ffffff",
  badgeTextColor: "#0070BC",
  badgeSecondaryColor: "#9ca3af",
  badgeShimmerColor: "rgba(46, 46, 46, 0.35)",
  checkmarkColor: "linear-gradient(135deg, #00A9EE 0%, #00378A 100%)",
};

const PricingCard = ({
  title,
  subtitle,
  teamSize,
  inclusions,
  specializations,
  price,
  theme: tierTheme = {},
}: PricingCardProps) => {
  const t = { ...DEFAULT_THEME, ...tierTheme };
  const isGradient = (s: string) => s.startsWith("linear-gradient");

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 md:p-8 lg:p-10 h-full min-h-0 ${t.border}`}
      style={{ background: t.background }}
    >
      <h3
        className="text-4xl md:text-5xl font-light mb-4"
        style={
          isGradient(t.titleColor)
            ? {
                background: t.titleColor,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : { color: t.titleColor }
        }
      >
        {title}
      </h3>

      <p className="text-base md:text-lg mb-6 leading-relaxed">
        <span
          style={
            isGradient(t.subtitleColor)
              ? {
                  background: t.subtitleColor,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }
              : { color: t.subtitleColor }
          }
        >
          {subtitle}
        </span>
      </p>

      <div className="mb-8">
        <div 
          className="inline-flex items-center gap-3 px-4 py-1 sm:px-3 sm:py-1.5 !w-fit md:py-2 rounded-full backdrop-blur-lg border border-white/30"
          style={{ backgroundColor: t.badgeBg }}
        > 
          <PersonIcon color={t.badgeSecondaryColor} />
          <AnimatedShinyText 
            className="text-md font-light" 
            shimmerWidth={60}
            textColor={t.badgeTextColor}
            shimmerColor={t.badgeShimmerColor}
          >
            {teamSize} Member Flexible Teams
          </AnimatedShinyText>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px" style={{ backgroundColor: t.dividerColor }} />
        <span className="text-sm" style={{ color: t.labelColor }}>Inclusions</span>
        <div className="flex-1 h-px" style={{ backgroundColor: t.dividerColor }} />
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {inclusions.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckIcon color={t.checkmarkColor} uniqueId={`${title}-${index}`} />
            <span className="text-sm md:text-base" style={{ color: t.bodyColor }}>{item}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px" style={{ backgroundColor: t.dividerColor }} />
        <span className="text-sm sm:whitespace-nowrap" style={{ color: t.labelColor }}>
          Talent Specializations Covered
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: t.dividerColor }} />
      </div>

      <p className="text-sm md:text-base mb-8 leading-relaxed" style={{ color: t.bodyColor }}>
        {specializations}
      </p>

      <div className="mt-auto">
        <span
          className="text-4xl md:text-5xl font-light"
          style={
            isGradient(t.priceColor)
              ? {
                  background: t.priceColor,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }
              : { color: t.priceColor }
          }
        >
          {typeof price === "number" ? `$${price.toLocaleString()}` : price}
        </span>
        {typeof price === "number" && (
          <span className="text-base md:text-lg" style={{ color: t.priceSuffixColor }}>/month</span>
        )}
      </div>
    </div>
  );
};

const pricingTiers: (Omit<PricingCardProps, "theme"> & { theme?: PricingCardTheme })[] = [
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
    theme: {
      titleColor: "linear-gradient(135deg,rgb(98, 98, 98) 10%,rgb(178, 178, 178) 50%,rgb(98, 98, 98) 90%)",
      subtitleColor: "#555555",
      background: "linear-gradient(135deg,rgb(255, 255, 255) 10%,rgb(246, 245, 245) 50%,rgb(255, 255, 255) 90%)",
      border: "border border-[#BCBCBC]",
      checkmarkColor: "#9B9B9B",
      badgeShimmerColor: "#909090",
      badgeBg: "rgba(0, 0, 0, 0.05)",
      badgeTextColor: "#555555",
      badgeSecondaryColor: "#9ca3af",
    },
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
    theme: {
      background: "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(230, 242, 250) 50%,rgb(244, 251, 255) 100%)",
      subtitleColor: "#555555",
      border: "ring-1 ring-[#00A9EE]/30",
      checkmarkColor: "linear-gradient(135deg, #00A9EE 0%, #00378A 100%)",
      badgeBg: "rgba(0, 169, 238, 0.1)",
      badgeTextColor: "#0070BC",
      badgeSecondaryColor: "#00A9EE",
      badgeShimmerColor: "#3C91CE",
    },
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
    price: "Start a Call",
    theme: {
      background: "linear-gradient(135deg,#00378A 0%,#27AAE1 60%, #00378A 130%)",
      titleColor: "#ffffff",
      subtitleColor: "rgba(255,255,255,0.9)",
      bodyColor: "#e5e5e5",
      labelColor: "rgba(255,255,255,0.7)",
      dividerColor: "rgba(255,255,255,0.3)",
      priceColor: "#ffffff",
      priceSuffixColor: "rgba(255,255,255,0.8)",
      badgeShimmerColor: "#CCEAFF",

      badgeBg: "rgba(255,255,255,0.15)",
      badgeTextColor: "#ffffff",
      badgeSecondaryColor: "rgba(255,255,255,0.8)",
    },
  },
];

export default function PricingSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
            Choose Your <span className="text-[#00378A]">Plan</span>
          </h2>
          <p className="text-gray-600 font-light text-base md:text-lg max-w-2xl mx-auto">
            Flexible pricing that scales with your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricingTiers.map((tier, index) => (
            <div key={index} className={index === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
              <PricingCard
                title={tier.title}
                subtitle={tier.subtitle}
                teamSize={tier.teamSize}
                inclusions={tier.inclusions}
                specializations={tier.specializations}
                price={tier.price}
                theme={tier.theme}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
