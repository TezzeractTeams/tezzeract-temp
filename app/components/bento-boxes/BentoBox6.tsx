"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { usePinnedScroll } from "@/app/context/PinnedScrollContext";

const SCROLL_TO_SLIDER = 0.008;
const BOOST_DECAY = 0.92;
const BASE_SPEED = 1 / 55; // one full cycle per 55s (progress 0->1)

interface LogoConfig {
  src: string;
  alt: string;
  glowColor: string;
  name: string;
}

// Row 1: Design & Productivity tools
const row1Logos: LogoConfig[] = [
  { src: "/assets/chatgpt.svg", alt: "ChatGPT", glowColor: "rgba(16, 163, 127, 0.6)", name: "chatgpt" },
  { src: "/assets/figma.svg", alt: "Figma", glowColor: "rgba(162, 89, 255, 0.6)", name: "figma" },
  { src: "/assets/notion.svg", alt: "Notion", glowColor: "rgba(255, 255, 255, 0.5)", name: "notion" },
  { src: "/assets/slack.svg", alt: "Slack", glowColor: "rgba(74, 21, 75, 0.6)", name: "slack" },
  { src: "/assets/webflow.svg", alt: "Webflow", glowColor: "rgba(66, 99, 235, 0.6)", name: "webflow" },
  { src: "/assets/illustrator.svg", alt: "Illustrator", glowColor: "rgba(255, 154, 0, 0.6)", name: "illustrator" },
  { src: "/assets/photoshop.svg", alt: "Photoshop", glowColor: "rgba(49, 168, 255, 0.6)", name: "photoshop" },
];

// Row 2: Frontend & Web technologies
const row2Logos: LogoConfig[] = [
  { src: "/assets/react.svg", alt: "React", glowColor: "rgba(97, 218, 251, 0.6)", name: "react" },
  { src: "/assets/nextjs.svg", alt: "Next.js", glowColor: "rgba(255, 255, 255, 0.5)", name: "nextjs" },
  { src: "/assets/typescript.svg", alt: "TypeScript", glowColor: "rgba(49, 120, 198, 0.6)", name: "typescript" },
  { src: "/assets/js.svg", alt: "JavaScript", glowColor: "rgba(247, 223, 30, 0.6)", name: "js" },
  { src: "/assets/css.svg", alt: "CSS", glowColor: "rgba(38, 77, 228, 0.6)", name: "css" },
  { src: "/assets/express.svg", alt: "Express", glowColor: "rgba(255, 255, 255, 0.5)", name: "express" },
  { src: "/assets/flutter.svg", alt: "Flutter", glowColor: "rgba(69, 209, 253, 0.6)", name: "flutter" },
];

// Row 3: Backend & AI technologies
const row3Logos: LogoConfig[] = [
  { src: "/assets/java.svg", alt: "Java", glowColor: "rgba(248, 152, 32, 0.6)", name: "java" },
  { src: "/assets/kotlin.svg", alt: "Kotlin", glowColor: "rgba(127, 82, 255, 0.6)", name: "kotlin" },
  { src: "/assets/git.svg", alt: "Git", glowColor: "rgba(240, 80, 51, 0.6)", name: "git" },
  { src: "/assets/Gemini.svg", alt: "Gemini", glowColor: "rgba(66, 133, 244, 0.6)", name: "gemini" },
  { src: "/assets/googletag.svg", alt: "Google Tag", glowColor: "rgba(66, 133, 244, 0.6)", name: "googletag" },
  { src: "/assets/premiere.svg", alt: "Premiere Pro", glowColor: "rgba(154, 154, 255, 0.6)", name: "premiere" },
];

const row1Duplicated = [...row1Logos, ...row1Logos, ...row1Logos];
const row2Duplicated = [...row2Logos, ...row2Logos, ...row2Logos];
const row3Duplicated = [...row3Logos, ...row3Logos, ...row3Logos];

interface ScrollingRowProps {
  logos: LogoConfig[];
  direction: "right" | "left";
  className?: string;
  scrollBoostRef: React.MutableRefObject<number>;
}

function ScrollingRow({ logos, direction, className, scrollBoostRef }: ScrollingRowProps) {
  const progressRef = useRef(0);
  const elRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const now = performance.now();
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const boost = scrollBoostRef.current;
      const speed = BASE_SPEED + boost;
      progressRef.current += speed * dt;

      // Loop: one cycle = progress 0->1 (33.333% of content for seamless loop)
      if (progressRef.current >= 1) progressRef.current -= 1;
      else if (progressRef.current < 0) progressRef.current += 1;

      const p = progressRef.current;
      const percent = direction === "right" ? -p * 33.333 : -(1 - p) * 33.333;

      if (elRef.current) {
        elRef.current.style.transform = `translateX(${percent}%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [direction, scrollBoostRef]);

  return (
    <div className={`relative overflow-hidden w-full ${className || ""}`}>
      <div
        ref={elRef}
        className="flex flex-nowrap gap-2 sm:gap-4 md:gap-5 lg:gap-6 will-change-transform"
        style={{ width: "max-content" }}
      >
        {logos.map((logoConfig, index) => (
          <div
            key={`${logoConfig.name}-${index}`}
            className="flex-shrink-0 w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[56px] md:h-[56px] lg:w-[70px] lg:h-[70px] rounded-lg sm:rounded-xl md:rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10">
              <Image src={logoConfig.src} alt={logoConfig.alt} fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BentoBox6() {
  const scrollBoostRef = useRef(0);
  const pinnedScroll = usePinnedScroll();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const unsubscribe = lenis.on("scroll", (e: { velocity: number }) => {
      if (pinnedScroll?.isPinnedRef.current) {
        scrollBoostRef.current += e.velocity * SCROLL_TO_SLIDER;
      }
    });
    return () => unsubscribe();
  }, [lenis, pinnedScroll]);

  useEffect(() => {
    let rafId: number;
    const decay = () => {
      scrollBoostRef.current *= BOOST_DECAY;
      rafId = requestAnimationFrame(decay);
    };
    rafId = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="h-[45vh] min-h-[200px] w-full rounded-[30px] bg-[#1E293B] flex flex-col justify-between gap-3 sm:gap-5 md:gap-6 sm:pt-6 pb-2 sm:pb-6 md:pb-2 overflow-hidden">
      <div className="p-4 sm:p-5 sm:px-6 md:px-10 md:pt-6">
        <p className="text-white tracking-tighter text-[32px] sm:text-base md:text-xl xl:text-3xl font-light leading-tight">
          Teams built for high productivity and ready to execute across tools in tech, marketing, design, and analytics
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5 md:gap-3">
        <ScrollingRow logos={row1Duplicated} direction="right" scrollBoostRef={scrollBoostRef} />
        <ScrollingRow logos={row2Duplicated} direction="left" scrollBoostRef={scrollBoostRef} />
        <ScrollingRow logos={row3Duplicated} direction="right" scrollBoostRef={scrollBoostRef} />
      </div>
    </div>
  );
}
