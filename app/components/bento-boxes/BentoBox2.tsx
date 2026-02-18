import React from "react";
import { Globe } from "../ui/Globle";

export default function BentoBox2() {
  return (
    <div className="max-h-[400px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[45vh] w-full rounded-[30px] bg-[#F5F5F5] border border-[#00A9EE]/30 relative overflow-hidden">
      <div className="flex flex-row h-full min-h-[280px] px-5 sm:px-5 md:px-6 lg:px-9 py-6 lg:py-9">
        {/* Left - Text */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <p className="text-[16px] sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-light mb-2 sm:mb-3 md:mb-4 tracking-tighter leading-tight text-black/90">
            Our teams have provided services to businesses globally across
          </p>
          <span className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter bg-gradient-to-r from-[#00378A] via-[#00A9EE] to-[#00378A] bg-clip-text text-transparent">
            120+
          </span>
          <span className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter bg-gradient-to-r from-[#00378A] via-[#00A9EE] to-[#00378A] bg-clip-text text-transparent">
            countries
          </span>
        </div>
        {/* Right - Globe (half visible) */}
        <div className="flex-1 relative  min-h-0">
          <div className="absolute -right-[100%] top-1/2 -translate-y-1/2 w-[200%] aspect-square">
            <Globe className="!relative w-full h-full !max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
