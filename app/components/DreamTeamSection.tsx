"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const BUBBLES = [
  {
    icon: "/assets/avatars/dev.svg",
    alt: "Development",
    position: "top-left",
    style: { top: "20%", left: "15%" },
    styleMd: { top: "15%", left: "10%" },
    drift: { x: [0, 2, 0], y: [0, -4, 0] },
    duration: 6,
    delay: 0,
  },
  {
    icon: "/assets/avatars/create.svg",
    alt: "Design",
    position: "top-right",
    style: { top: "20%", right: "15%", left: "auto" },
    styleMd: { top: "15%", right: "10%", left: "auto" },
    drift: { x: [0, -2, 0], y: [0, 4, 0] },
    duration: 6.5,
    delay: 0.5,
  },
  {
    icon: "/assets/avatars/advert.svg",
    alt: "Marketing",
    position: "bottom-left",
    style: { top: "72%", left: "15%" },
    styleMd: { top: "75%", left: "15%" },
    drift: { x: [0, 2, 0], y: [0, -4, 0] },
    duration: 7,
    delay: 0.2,
  },
  {
    icon: "/assets/avatars/insight.svg",
    alt: "Analytics",
    position: "bottom-right",
    style: { top: "72%", right: "15%", left: "auto" },
    styleMd: { top: "75%", right: "10%", left: "auto" },
    drift: { x: [0, -3, 0], y: [0, 4, 0] },
    duration: 6.8,
    delay: 0.8,
  },
] as const;

function Bubble({
  icon,
  alt,
  style,
  styleMd,
  drift,
  duration,
  delay,
  isMd,
}: (typeof BUBBLES)[number] & { isMd: boolean }) {
  return (
    <motion.div
      className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center pointer-events-auto cursor-default backdrop-blur-none hover:backdrop-blur-md transition-all duration-300"
      style={{
        ...(isMd ? styleMd : style),
        border: "1px solid rgba(0, 169, 238, 0.5)",
        backgroundColor: "rgba(0, 169, 238, 0.08)",
        boxShadow: "0 2px 12px rgba(0, 55, 138, 0.08)",
      }}
      animate={{ x: [...drift.x], y: [...drift.y] }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
    >
      <Image
        src={icon}
        alt={alt}
        width={40}
        height={40}
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 object-contain opacity-90"
      />
    </motion.div>
  );
}

export default function DreamTeamSection() {
  const [isMd, setIsMd] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const fn = () => setIsMd(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <section className="relative py-8 sm:py-12 md:py-20 min-h-[220px] sm:min-h-[260px] md:min-h-[320px]">
      <div className="relative flex flex-col items-center justify-center">
        {/* Bubbles */}
        {BUBBLES.map((bubble) => (
          <Bubble key={bubble.position} {...bubble} isMd={isMd} />
        ))}

        {/* Text */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight tracking-tight text-center px-4 max-w-3xl"
          style={{ color: "#00378A" }}
        >
          We have the team to
          <br />
          make your dream
          <br />
          come true.
        </h2>
      </div>
    </section>
  );
}
