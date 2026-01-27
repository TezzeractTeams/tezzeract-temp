"use client";

import React from "react";
import { 
  SiNotion, 
  SiFigma, 
  SiSlack, 
  SiTrello, 
  SiAsana, 
  SiHubspot, 
  SiSalesforce, 
  SiGoogleads, 
  SiMeta 
} from "react-icons/si";

interface IconConfig {
  icon: React.ReactNode;
  glowColor: string;
  name: string;
}

const iconSet: IconConfig[] = [
  {
    icon: <SiNotion className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(0, 0, 0, 0.6)",
    name: "notion",
  },
  {
    icon: <SiFigma className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(162, 89, 255, 0.6)",
    name: "figma",
  },
  {
    icon: <SiSlack className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(91, 71, 255, 0.6)",
    name: "slack",
  },
  {
    icon: <SiTrello className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(0, 101, 255, 0.6)",
    name: "trello",
  },
  {
    icon: <SiAsana className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(255, 99, 135, 0.6)",
    name: "asana",
  },
  {
    icon: <SiHubspot className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(255, 152, 0, 0.6)",
    name: "hubspot",
  },
  {
    icon: <SiSalesforce className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(0, 161, 223, 0.6)",
    name: "salesforce",
  },
  {
    icon: <SiGoogleads className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(255, 204, 0, 0.6)",
    name: "googleads",
  },
  {
    icon: <SiMeta className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    glowColor: "rgba(0, 132, 255, 0.6)",
    name: "meta",
  },
];

// Triple duplicate icons for seamless scrolling (3x for perfect loop)
const duplicatedIcons = [...iconSet, ...iconSet, ...iconSet];

interface ScrollingRowProps {
  icons: IconConfig[];
  direction: "right" | "left";
  className?: string;
}

function ScrollingRow({ icons, direction, className }: ScrollingRowProps) {
  return (
    <div className={`relative overflow-hidden w-full ${className || ""}`}>
      <div
        className="flex flex-nowrap gap-4 sm:gap-5 md:gap-6 will-change-transform"
        style={{
          animation: direction === "right" 
            ? "var(--animate-scroll-right)" 
            : "var(--animate-scroll-left)",
          width: "max-content",
        }}
      >
        {icons.map((iconConfig, index) => (
          <div
            key={`${iconConfig.name}-${index}`}
            className="flex-shrink-0 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] md:w-[96px] md:h-[96px] rounded-xl sm:rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300"
            style={{
              boxShadow: `0 0 20px ${iconConfig.glowColor}, inset 0 0 10px ${iconConfig.glowColor}20`,
            }}
          >
            <div
              className="text-white"
              style={{
                filter: `drop-shadow(0 0 8px ${iconConfig.glowColor})`,
              }}
            >
              {iconConfig.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BentoBox6() {
  return (
    <div className="h-full w-full rounded-2xl bg-[#1E293B] flex flex-col justify-end gap-4 sm:gap-5 md:gap-6 pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
      {/* Top row - scrolls right */}
      <ScrollingRow icons={duplicatedIcons} direction="right" />
      
      {/* Middle row - scrolls left */}
      <ScrollingRow icons={duplicatedIcons} direction="left" />
      
      {/* Bottom row - scrolls right */}
      <ScrollingRow icons={duplicatedIcons} direction="right" />
    </div>
  );
}
