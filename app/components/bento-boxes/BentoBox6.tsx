"use client";

import React from "react";
import Image from "next/image";

interface LogoConfig {
  src: string;
  alt: string;
  glowColor: string;
  name: string;
}

// Row 1: Design & Productivity tools
const row1Logos: LogoConfig[] = [
  {
    src: "/assets/chatgpt.svg",
    alt: "ChatGPT",
    glowColor: "rgba(16, 163, 127, 0.6)",
    name: "chatgpt",
  },
  {
    src: "/assets/figma.svg",
    alt: "Figma",
    glowColor: "rgba(162, 89, 255, 0.6)",
    name: "figma",
  },
  {
    src: "/assets/notion.svg",
    alt: "Notion",
    glowColor: "rgba(255, 255, 255, 0.5)",
    name: "notion",
  },
  {
    src: "/assets/slack.svg",
    alt: "Slack",
    glowColor: "rgba(74, 21, 75, 0.6)",
    name: "slack",
  },
  {
    src: "/assets/webflow.svg",
    alt: "Webflow",
    glowColor: "rgba(66, 99, 235, 0.6)",
    name: "webflow",
  },
  {
    src: "/assets/illustrator.svg",
    alt: "Illustrator",
    glowColor: "rgba(255, 154, 0, 0.6)",
    name: "illustrator",
  },
  {
    src: "/assets/photoshop.svg",
    alt: "Photoshop",
    glowColor: "rgba(49, 168, 255, 0.6)",
    name: "photoshop",
  },
];

// Row 2: Frontend & Web technologies
const row2Logos: LogoConfig[] = [
  {
    src: "/assets/react.svg",
    alt: "React",
    glowColor: "rgba(97, 218, 251, 0.6)",
    name: "react",
  },
  {
    src: "/assets/nextjs.svg",
    alt: "Next.js",
    glowColor: "rgba(255, 255, 255, 0.5)",
    name: "nextjs",
  },
  {
    src: "/assets/typescript.svg",
    alt: "TypeScript",
    glowColor: "rgba(49, 120, 198, 0.6)",
    name: "typescript",
  },
  {
    src: "/assets/js.svg",
    alt: "JavaScript",
    glowColor: "rgba(247, 223, 30, 0.6)",
    name: "js",
  },
  {
    src: "/assets/css.svg",
    alt: "CSS",
    glowColor: "rgba(38, 77, 228, 0.6)",
    name: "css",
  },
  {
    src: "/assets/express.svg",
    alt: "Express",
    glowColor: "rgba(255, 255, 255, 0.5)",
    name: "express",
  },
  {
    src: "/assets/flutter.svg",
    alt: "Flutter",
    glowColor: "rgba(69, 209, 253, 0.6)",
    name: "flutter",
  },
];

// Row 3: Backend & AI technologies
const row3Logos: LogoConfig[] = [
  {
    src: "/assets/java.svg",
    alt: "Java",
    glowColor: "rgba(248, 152, 32, 0.6)",
    name: "java",
  },
  {
    src: "/assets/kotlin.svg",
    alt: "Kotlin",
    glowColor: "rgba(127, 82, 255, 0.6)",
    name: "kotlin",
  },
  {
    src: "/assets/git.svg",
    alt: "Git",
    glowColor: "rgba(240, 80, 51, 0.6)",
    name: "git",
  },
  {
    src: "/assets/Gemini.svg",
    alt: "Gemini",
    glowColor: "rgba(66, 133, 244, 0.6)",
    name: "gemini",
  },
  {
    src: "/assets/googletag.svg",
    alt: "Google Tag",
    glowColor: "rgba(66, 133, 244, 0.6)",
    name: "googletag",
  },
  {
    src: "/assets/premiere.svg",
    alt: "Premiere Pro",
    glowColor: "rgba(154, 154, 255, 0.6)",
    name: "premiere",
  },
];

// Triple duplicate each row for seamless scrolling (3x for perfect loop)
const row1Duplicated = [...row1Logos, ...row1Logos, ...row1Logos];
const row2Duplicated = [...row2Logos, ...row2Logos, ...row2Logos];
const row3Duplicated = [...row3Logos, ...row3Logos, ...row3Logos];

interface ScrollingRowProps {
  logos: LogoConfig[];
  direction: "right" | "left";
  className?: string;
}

function ScrollingRow({ logos, direction, className }: ScrollingRowProps) {
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
        {logos.map((logoConfig, index) => (
          <div
            key={`${logoConfig.name}-${index}`}
            className="flex-shrink-0 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[70px] md:h-[70px] rounded-xl sm:rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300"
          >
            <div
              className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
            >
              <Image
                src={logoConfig.src}
                alt={logoConfig.alt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BentoBox6() {
  return (
    <div className="h-full w-full rounded-2xl bg-[#1E293B] flex flex-col justify-between gap-4 sm:gap-5 md:gap-6  sm:pt-6  pb-2 sm:pb-6 md:pb-2 overflow-hidden">
      {/* Text content at the top */}
      <div className="p-5 sm:px-6 md:px-10">
        <p className="text-white text-[16px] sm:text-base md:text-xl xl:text-3xl font-light leading-tight">
          Teams built for high productivity and ready to execute across tools in tech, marketing, design, and analytics
        </p>
      </div>

      {/* Scrolling logo rows */}
      <div className="flex flex-col gap-4 sm:gap-5 md:gap-3">
        {/* Top row - scrolls right */}
        <ScrollingRow logos={row1Duplicated} direction="right" />

        {/* Middle row - scrolls left */}
        <ScrollingRow logos={row2Duplicated} direction="left" />

        {/* Bottom row - scrolls right */}
        <ScrollingRow logos={row3Duplicated} direction="right" />
      </div>
    </div>
  );
}
