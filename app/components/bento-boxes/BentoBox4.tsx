import React from "react";
import Image from "next/image";
import { AnimatedShinyText } from "./AnimatedShinyText";

export default function BentoBox4() {
  return (
    <div className="sm:h-[28vh] w-full rounded-[30px] bg-[linear-gradient(35deg,#00378A_0%,#27AAE1_64%,#D6ECFF_100%)] flex flex-col relative p-6 md:p-8 overflow-hidden">
      {/* 3D Logo - Top Left Corner */}
      <div className="absolute -top-10 right-4 sm:-right-15 z-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 transition-all duration-300">
        <Image
          src="/assets/tezzeract3d.svg"
          alt="Tezzeract"
          width={160}
          height={160}
          className="w-full h-full object-contain opacity-90 scale-300 sm:scale-110 md:scale-125 lg:scale-200 transition-transform duration-300"
        />
      </div>
      {/* Industry Expertise Label */}
      <div className="absolute top-5 left-6 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-10">
        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
          <AnimatedShinyText className="text-xs sm:text-sm md:text-base">Indrusty Expertise</AnimatedShinyText>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center mt-10 sm:mt-8 md:mt-0 lg:mt-16 px-2 sm:px-0">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-1 lg:gap-4">
          <p className="text-white tracking-tighter text-lg md:text-xl lg:text-2xl md:pt-10 lg:pt-0 xl:text-3xl font-light">
            Specialities across
          </p>
          <h2 className="text-white text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tighter break-words">
            20+ Industries
          </h2>
        </div>
      </div>
    </div>
  );
}
