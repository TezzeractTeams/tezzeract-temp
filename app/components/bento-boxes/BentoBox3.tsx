import React from "react";
import Image from "next/image";

export default function BentoBox3() {
  return (
    <div className="h-[650px] w-full mt-[100px] rounded-2xl bg-gradient-to-br from-black via-[#001122] to-[#003366] relative overflow-hidden">
      <div className="h-full w-full flex flex-col">
        {/* Top part - Text */}
        <div className="flex-shrink-0 p-6 md:p-8 lg:p-10">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-2 md:mb-4">
              120+
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90">
              Successfully Completed
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90">
              Projects
            </p>
          </div>
        </div>
        
        {/* Bottom part - Image */}
        <div className="flex-1 relative overflow-hidden">
          <Image
            src="/portfolio.png"
            alt="Portfolio showcase"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  );
}
