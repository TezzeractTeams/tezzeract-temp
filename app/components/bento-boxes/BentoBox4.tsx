import React from "react";
import { AnimatedShinyText } from "./AnimatedShinyText";

export default function BentoBox4() {
  return (
    <div className="h-full w-full rounded-2xl bg-gradient-to-br from-#D6ECFF via-[#27AAE1] to-[#00378A] flex flex-col relative p-4 sm:p-6 md:p-8">
      {/* Industry Expertise Label */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
        <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
        <AnimatedShinyText>Indrusty Expertise</AnimatedShinyText>       
         </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center mt-8 sm:mt-12 md:mt-16">
        <div className="flex flex-col">
          <p className="text-white text-sm sm:text-base md:text-3xl font-light">
            Specialities across
          </p>
          <p className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-tight tracking-tighter">
            20+Industries
          </p>
        </div>
      </div>
    </div>
  );
}
