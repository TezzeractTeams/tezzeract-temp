import React from "react";
import { Globe } from "../ui/Globle";

export default function BentoBox2() {
  return (
    <div className="max-h-[400px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[520px] w-full rounded-2xl bg-gradient-to-tr from-[#F3F3F3] via-white to-[#00A9EE] relative overflow-hidden">
      <div className="relative flex flex-col size-full overflow-hidden pt-4 sm:pt-5 md:pt-6 lg:pt-9 pb-20 sm:pb-32 md:pb-40 lg:pb-52 xl:pb-60 px-4 sm:px-5 md:px-6 lg:px-9">
        <p className="text-[#242424] text-[28px] sm:text-2xl md:text-xl lg:text-3xl xl:text-2xl 2xl:text-3xl font-light mb-2 sm:mb-3 md:mb-4 leading-tight">
          Our teams have provided services to businesses globally across
        </p>
        <span className="pointer-events-none bg-gradient-to-b from-[#00378A] to-[#00A9EE] bg-clip-text text-left text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-light text-transparent  tracking-tighter">
          12+ countries
        </span>
        <div className="flex justify-center -mt-[10px] sm:-mt-[15px] md:mt-[100px] lg:-mt-[25px]">
          <Globe className="relative top-4 sm:top-6 md:top-0 lg:top-10 xl:top-12 max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1400px] scale-100 sm:scale-110 md:scale-250 lg:scale-130 xl:scale-140" />
        </div>
      </div>
    </div>
  );
}
