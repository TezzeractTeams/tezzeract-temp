import React from "react";
import { AnimatedShinyText } from "./AnimatedShinyText";

export default function BentoBox4() {
  return (
    <div className="h-full w-full rounded-2xl bg-gradient-to-br from-[#D6ECFF] via-[#27AAE1] to-[#00378A] flex flex-col relative p-6 md:p-8">
      {/* Industry Expertise Label */}
      <div className="absolute top-5 left-6 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-10">
        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <AnimatedShinyText className="text-xs sm:text-sm md:text-base">Indrusty Expertise</AnimatedShinyText>       
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center mt-10 sm:mt-8 md:mt-12 lg:mt-16 px-2 sm:px-0">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          <p className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-light">
            Specialities across
          </p>
          <h2 className="text-white text-5xl xl:text-6xl 2xl:text-7xl font-light leading-tight sm:leading-tight md:leading-tight tracking-tighter break-words">
            20+Industries
          </h2>
        </div>
      </div>
    </div>
  );
}
