import React from "react";
import { Globe } from "../Globle";

export default function BentoBox2() {
  return (
    <div className="max-h-[520px] w-full rounded-2xl bg-gradient-to-tr from-white via-[#FFFFFF] to-[#00A9EE] relative overflow-hidden">
      <div className="relative flex flex-col size-full max-w-4xl overflow-hidden pt-6 md:pt-8 pb-40 md:pb-60 px-6 md:px-8">
        <p className="text-black text-base md:text-3xl font-light mb-4">
          Our teams have provided services to businesses globally across
        </p> 
        <span className="pointer-events-none bg-gradient-to-b from-[#00378A] to-[#00A9EE] bg-clip-text text-left text-5xl md:text-8xl font-light text-transparent tracking-tighter">
          120+ Countries
        </span>
        <div className="flex justify-center -mt-[80px] ">
          <Globe className="relative top-0" />
        </div>
      </div>
    </div>
  );
}
