"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const BUBBLES = [
  {
    icon: "/assets/avatars/dev.svg",
    alt: "Development",
    position: "top-left",
    style: { top: "15%", left: "10%" },
    drift: { x: [0, 250, 0], y: [0, 20, 0] },
    duration: 20,
    delay: 0,
  },
  {
    icon: "/assets/avatars/create.svg",
    alt: "Design",
    position: "top-right",
    style: { top: "15%", right: "10%", left: "auto" },
    drift: { x: [0, -240, 0], y: [0, -15, 0] },
    duration: 24,
    delay: 3,
  },
  {
    icon: "/assets/avatars/advert.svg",
    alt: "Marketing",
    position: "bottom-left",
    style: { top: "75%", left: "15%" },
    drift: { x: [0, 220, 0], y: [0, 15, 0] },
    duration: 22,
    delay: 1,
  },
  {
    icon: "/assets/avatars/insight.svg",
    alt: "Analytics",
    position: "bottom-right",
    style: { top: "75%", right: "10%", left: "auto" },
    drift: { x: [0, -230, 0], y: [0, -18, 0] },
    duration: 26,
    delay: 5,
  },
] as const;

function Bubble({
  icon,
  alt,
  style,
  drift,
  duration,
  delay,
}: (typeof BUBBLES)[number]) {
  return (
    <motion.div
      className="absolute  rounded-full flex items-center justify-center pointer-events-auto cursor-default"
      style={{
        ...style,
        border: "1px solid rgba(0, 169, 238, 0.5)",
        backgroundColor: "rgba(0, 169, 238, 0.06)",
        boxShadow: "0 2px 12px rgba(0, 55, 138, 0.08)",
      }}
      animate={{ x: [...drift.x], y: [...drift.y] }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.2 },
      }}
    >
      <Image
        src={icon}
        alt={alt}
        width={40}
        height={40}
        className="w-6 h-6 md:w-7 md:h-7 lg:w-16 lg:h-16 object-contain opacity-90"
      />
    </motion.div>
  );
}

export default function DreamTeamSection() {
  return (
    <section className="relative py-12 md:py-16 mb-12 md:mb-16 min-h-[280px] md:min-h-[320px]">
      <div className="relative flex flex-col items-center justify-center">
        {/* Bubbles */}
        {BUBBLES.map((bubble) => (
          <Bubble key={bubble.position} {...bubble} />
        ))}

        {/* Text */}
        <h2
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight tracking-tight text-center px-4 max-w-3xl"
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
