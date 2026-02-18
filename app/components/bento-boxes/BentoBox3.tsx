import React from "react";
import Image from "next/image";

export default function BentoBox3() {
  return (
    <div className="h-[60vh] w-full sm:mt-[7vh] rounded-[30px] bg-[linear-gradient(15deg,#00378A_0%,#00A9EE_6%,#FFFFFF_40%)] relative overflow-hidden">
      <div className="h-full w-full flex flex-col">
        {/* Top part - Text */}
        <div className="flex-shrink-0 p-6 md:p-8 lg:p-10">
          <div className="text-white">
            <h2
              className="text-5xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-2 md:mb-4"
              style={{
                background: "linear-gradient(90deg, #0068B5 0%, #00A9EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              120+
            </h2>
            <p className="text-[16px] sm:text-2xl md:text-xl lg:text-3xl xl:text-2xl 2xl:text-3xl tracking-tighter  font-light text-black/90">
              Successfully Completed
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90">
              Projects
            </p>
          </div>
        </div>

        {/* Bottom part - Image */}
        <div className="flex-1 relative ">
          <Image
            src="/portfolio.png"
            alt="Portfolio showcase"
            fill
            className="object-cover object-center mt-20 scale-200"
            priority
            style={{ transition: 'transform 1s' }}
          />
        </div>
      </div>
    </div>
  );
}
