import React from "react";
import BentoBox1 from "./bento-boxes/BentoBox1";
import BentoBox2 from "./bento-boxes/BentoBox2";
import BentoBox3 from "./bento-boxes/BentoBox3";
import BentoBox4 from "./bento-boxes/BentoBox4";
import BentoBox5 from "./bento-boxes/BentoBox5";
import BentoBox6 from "./bento-boxes/BentoBox6";

export default function BentoGrid() {
  return (
    <section className="w-full h-screen flex flex-col justify-center p-4 bg-gray-900">
      <div className="w-full h-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {/* Column 1 - Left */}
          <div className="flex flex-col gap-4 h-full">
            {/* Box 1 - Top Left (medium-dark gray) */}
            <div className="flex-1">
              <BentoBox1 />
            </div>
            {/* Box 2 - Bottom Left (white with light blue gradient) */}
            <div className="flex-1">
              <BentoBox2 />
            </div>
          </div>

          {/* Column 2 - Middle */}
          <div className="flex flex-col gap-4 h-full">
            {/* Box 3 - Spans both rows (white with light blue gradient) */}
            <div className="flex-[2]">
              <BentoBox3 />
            </div>
            {/* Box 4 - Bottom Middle (medium blue) */}
            <div className="flex-1">
              <BentoBox4 />
            </div>
          </div>

          {/* Column 3 - Right */}
          <div className="flex flex-col gap-4 h-full">
            {/* Box 5 - Top Right (dark blue) */}
            <div className="flex-1">
              <BentoBox5 />
            </div>
            {/* Box 6 - Bottom Right (very dark blue-grey) */}
            <div className="flex-1">
              <BentoBox6 />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
