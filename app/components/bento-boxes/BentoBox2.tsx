import React from "react";
import { Globe } from "../ui/Globle";

export default function BentoBox2() {
  return (
    <div className="max-h-[520px] w-full rounded-2xl bg-gradient-to-tr from-[#F3F3F3] via-white to-[#00A9EE] relative overflow-hidden">
<div className="relative flex flex-col size-full overflow-hidden pt-6 md:pt-9 pb-40 md:pb-60 px-6 md:px-9">        <p className="text-[#242424] text-base md:text-3xl font-light mb-4">
          Our teams have provided services to businesses globally across
        </p> 
        <span className="pointer-events-none bg-gradient-to-b from-[#00378A] to-[#00A9EE] bg-clip-text text-left text-5xl md:text-7xl font-light text-transparent tracking-tighter">
          120+ countries
        </span>
        <div className="flex justify-center -mt-[20px]">
        <Globe className="relative top-12 max-w-[1400px] scale-140"/>        </div>
      </div>
    </div>
  );
}
