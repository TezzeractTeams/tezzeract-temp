import React from "react";
import BentoBox1 from "./bento-boxes/BentoBox1";
import BentoBox2 from "./bento-boxes/BentoBox2";
import BentoBox3 from "./bento-boxes/BentoBox3";
import BentoBox4 from "./bento-boxes/BentoBox4";
import BentoBox5 from "./bento-boxes/BentoBox5";
import BentoBox6 from "./bento-boxes/BentoBox6";

interface BentoBoxWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const BentoBoxWrapper = ({ children, className = "" }: BentoBoxWrapperProps) => {
  return (
    <div
      className={`bg-white backdrop-blur-sm border-5 border-[#F5F5F5] rounded-2xl p-6 hover:border-[#B8B8B8]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#0077b6]/10 h-full w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default function BentoGrid() {
  return (
    <section className="w-full h-screen flex flex-col justify-center p-4">
      <div className="w-full h-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-fr h-full">
        
        {/* ROW 1 & 2: Box 1 (Left Sidebar) - Spans top 2 rows */}
        <BentoBoxWrapper className="col-span-12 md:col-span-3 md:row-span-2">
          <BentoBox1 />
        </BentoBoxWrapper>

        {/* ROW 1 & 2: Box 2 (Center Main) - NOW SPANS 2 ROWS (Taking Box 7's place) */}
        <BentoBoxWrapper className="col-span-12 md:col-span-6 md:row-span-2">
          <BentoBox2 />
        </BentoBoxWrapper>

        {/* ROW 1 & 2: Box 3 (Top Right) - Spans top 2 rows */}
        <BentoBoxWrapper className="col-span-12 md:col-span-3 md:row-span-2">
          <BentoBox3 />
        </BentoBoxWrapper>

        {/* ROW 3: Box 4 (Wide Bottom Left) */}
        <BentoBoxWrapper className="col-span-12 md:col-span-5 md:row-span-1">
          <BentoBox4 />
        </BentoBoxWrapper>

        {/* ROW 3: Box 5 (Bottom Center) */}
        <BentoBoxWrapper className="col-span-12 md:col-span-4 md:row-span-1">
          <BentoBox5 />
        </BentoBoxWrapper>

        {/* ROW 3: Box 6 (Bottom Right) */}
        <BentoBoxWrapper className="col-span-12 md:col-span-3 md:row-span-1">
          <BentoBox6 />
        </BentoBoxWrapper>
      </div>
    </div>
  </section>
);
}

export { BentoBoxWrapper };
